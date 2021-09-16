import { useState } from "react";
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

const PDFForm = () => {
  const [doctorSpec, setDoctorSpec] = useState("");
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState("");

  const [erDoctorSpec, setErDoctorSpec] = useState("");
  const [erFile, setErFile] = useState("");

  const [loading, setLoading] = useState(false);

  // const ValidateDocSpec = (doctorSelected) => {};

  const FormHandler = () => {
    setLoading(true);

    let isEmpty = true;

    if (
      doctorSpec === undefined ||
      doctorSpec === "" ||
      doctorSpec === null ||
      doctorSpec === "Ειδικότητες Ιατρών"
    ) {
      setErDoctorSpec("Please Select a doctor");
    } else {
      setErDoctorSpec("");
      if (file === undefined || file === null || file === "") {
        setErFile("Please Select a file");
      } else {
        setErFile("");
        isEmpty = false;
      }
    }

    if (!isEmpty) {
      const storage = getStorage();
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "pdf",
      };

      // Upload file and metadata to the object 'pdfFiles/file_name.jpg'
      const storageRef = ref(storage, "pdfFiles/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;

            // ...

            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            (async () => {
              await addDoc(collection(db, "pdfRecords"), {
                userEmail: "gkoursoumis97@gmail.com",
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
      alert("failed modal");
    }

    console.log(doctorSpec);
    console.log(file);
    console.log(comments);

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
              onChange={(e) => setFile(e.target.value)}
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
    </div>
  );
};

export default PDFForm;
