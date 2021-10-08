import { useState, useEffect } from "react";
import "./form.css";
import DoctorsSpecs from "../general/DoctorsSpecs";
import ErrorMsg from "../general/ErrorMsg";
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../utils/firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const PDFForm = (props) => {
  const [doctorSpec, setDoctorSpec] = useState("");
  const [selectedFile, setFile] = useState(null);
  const [comments, setComments] = useState("");

  const [erDoctorSpec, setErDoctorSpec] = useState("");
  const [erFile, setErFile] = useState("");

  const [loading, setLoading] = useState(false);

  const [uploadingState, setUploadingState] = useState(false);
  const [uploading, setUploading] = useState(37);

  const userEmail = props.loggedInUser;

  useEffect(() => {
    console.log(uploading);
  }, [uploading, uploadingState]);

  const FileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const FormHandler = () => {
    setLoading(true);

    if (
      doctorSpec === undefined ||
      doctorSpec === "" ||
      doctorSpec === null ||
      doctorSpec === "Ειδικότητες Ιατρών"
    ) {
      setErDoctorSpec("Παρακαλώ Επιλέξτε ειδικότητα Ιατρού");
    } else {
      setErDoctorSpec("");
      if (
        selectedFile === undefined ||
        selectedFile === null ||
        selectedFile === ""
      ) {
        setErFile("Παρακαλώ επιλέξτε αρχείο PDF");
      } else {
        setErFile("");
        UploadFileHandler();
      }
    }

    setLoading(false);
    console.log(doctorSpec);
    console.log(selectedFile);
    console.log(comments);
  };

  const UploadFileHandler = () => {
    if (selectedFile.type === "application/pdf") {
      const storage = getStorage();
      const storageRef = ref(storage, userEmail + "/" + selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploading(progress);

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert("Error occured, try again later");
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            (async () => {
              await addDoc(collection(db, "pdfRecords"), {
                userEmail: userEmail,
                doctorSpec: doctorSpec,
                pdfUrl: downloadURL,
                comments: comments,
                SubmitDate: Timestamp.fromDate(new Date()),
              });
            })();
          });
        }
      );
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    alert("NO PDF");
  };

  return (
    <div className="pt-4 mb-4">
      <div className="form-custom">
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Επιλογή Ειδικότητας</label>
            <select
              className="inputValues"
              value={doctorSpec}
              onChange={(e) => setDoctorSpec(e.target.value)}
            >
              <option>Ειδικότητες Ιατρών</option>
              {DoctorsSpecs.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
            {erDoctorSpec ? (
              <ErrorMsg ErrorMsg={erDoctorSpec}></ErrorMsg>
            ) : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">PDF Αρχείο</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-control inputValues"
              onChange={FileHandler}
            />
            {erFile ? <ErrorMsg ErrorMsg={erFile}></ErrorMsg> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Εξετάσεων:</label>
            <textarea
              className="inputValues"
              rows="4"
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            )}
            <span>{loading ? "Περιμένετε..." : "Καταχώρηση"}</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h5>Ανέβασμα αρχείου:</h5>
        <div className="progress">
          <div className="progress-bar " style={{ width: `${uploading}%` }}>
            {uploading}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFForm;
