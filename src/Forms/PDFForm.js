import { useState, useEffect } from "react";
import "./form.css";
import DoctorsSpecs from "../general/DoctorsSpecs";
import ErrorMsg from "../general/ErrorMsg";
import ModalInfo from "../general/ModalInfo";
// font ICONS
import { ICONS_errHANDLING } from "../icons/icons";
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../utils/firebase";
import {
  addDoc,
  Timestamp,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";

const PDFForm = (props) => {
  const [doctorSpec, setDoctorSpec] = useState("");
  const [selectedFile, setFile] = useState(null);
  const [comments, setComments] = useState("");

  const [erDoctorSpec, setErDoctorSpec] = useState("");
  const [erFile, setErFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [duplicateState, setDuplicateState] = useState(false);
  const [duplicateData, setDuplicateData] = useState([]);

  const [justUpload, setJustUpload] = useState(false);
  const [uploading, setUploading] = useState(0);

  // modal options
  const [show, setShow] = useState("none");
  const [apiState, setApiState] = useState(false);
  const modalState = () => {
    setShow("none");
    setApiState(false);
  };

  const userEmail = props.loggedInUser;
  let duplicateDataArray = [];

  useEffect(() => {}, [
    duplicateState,
    duplicateData,
    justUpload,
    uploading,
    show,
    apiState,
  ]);

  const FileHandler = async (event) => {
    setJustUpload(false);
    if (event.target.files[0] != undefined || event.target.files[0] != null) {
      setFile(event.target.files[0]);
      const docIDRef = event.target.files[0].name.split(".");

      const duplicateQuery = query(
        collection(db, "pdfRecords"),
        where("userEmail", "==", userEmail),
        where("fileName", "==", docIDRef[0])
      );

      duplicateDataArray.length = 0;

      const querySnapshot = await getDocs(duplicateQuery);
      querySnapshot.forEach((doc) => {
        duplicateDataArray.push(doc.data());
      });

      if (duplicateDataArray.length === 0) {
        setDuplicateState(false);
        duplicateDataArray.length = 0;
        setDuplicateData(duplicateDataArray);
      } else if (duplicateDataArray.length === 1) {
        setDuplicateState(true);
        setDuplicateData(duplicateDataArray);
      } else {
        alert("Unexpected error");
      }
    }
  };

  const UploadFileHandler = () => {
    if (duplicateState === false) {
      if (selectedFile.type === "application/pdf") {
        setUploading(1);
        const storage = getStorage();
        const storageRef = ref(storage, userEmail + "/" + selectedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        const docIDRef = selectedFile.name.split(".");

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const progressView = Math.round(progress);
            setUploading(progressView);
          },
          (error) => {
            setShow("1");
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setLoading(false);

              (async () => {
                await addDoc(collection(db, "pdfRecords"), {
                  userEmail: userEmail,
                  doctorSpec: doctorSpec,
                  pdfUrl: downloadURL,
                  comments: comments,
                  fileName: docIDRef[0],
                  SubmitDate: Timestamp.fromDate(new Date()),
                });
              })().finally(setShow("0"));
            });
          }
        );
        setDuplicateState(true);
        setJustUpload(true);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setShow("2");
      }
    } else {
      setShow("3");
      setLoading(false);
    }
  };

  const FormHandler = () => {
    setUploading(0);
    setLoading(true);
    if (
      doctorSpec === undefined ||
      doctorSpec === "" ||
      doctorSpec === null ||
      doctorSpec === "Ειδικότητες Ιατρών"
    ) {
      setErDoctorSpec("Παρακαλώ Επιλέξτε ειδικότητα Ιατρού");
      setLoading(false);
    } else {
      setErDoctorSpec("");
      if (
        selectedFile === undefined ||
        selectedFile === null ||
        selectedFile === ""
      ) {
        setErFile("Παρακαλώ επιλέξτε αρχείο PDF");
        setLoading(false);
      } else {
        setErFile("");
        setApiState(true);

        UploadFileHandler();
      }
    }
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
              disabled={loading ? true : false}
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
              disabled={loading ? true : false}
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
              disabled={loading ? true : false}
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={FormHandler}
            disabled={loading ? true : justUpload ? true : false}
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
      {uploading === 0 ? null : (
        <div className="mt-5">
          <h5>Ανέβασμα αρχείου:</h5>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${uploading}%` }}>
              {uploading}%
            </div>
          </div>
        </div>
      )}
      {apiState === true ? (
        show === "0" ? (
          <ModalInfo
            show={show}
            modalState={modalState}
            modalTitle={"Επιτυχής Καταχώρηση"}
            modalMsg={"Το αρχείο καταχωρήθηκε με επιτυχία."}
            icon={ICONS_errHANDLING[0].icon}
            className={"btn btn-outline-success"}
          />
        ) : show === "1" ? (
          <ModalInfo
            show={show}
            modalState={modalState}
            modalTitle={"Αποτυχία Καταχώρησης"}
            modalMsg={"Προέκυψε κάποιο σφάλμα. Προσπαθήστε αργότερα."}
            icon={ICONS_errHANDLING[1].icon}
            className={"btn btn-outline-danger"}
          />
        ) : show === "2" ? (
          <ModalInfo
            show={show}
            modalState={modalState}
            modalTitle={"Αποτυχία Καταχώρησης"}
            modalMsg={"Το επιλεγμένο αρχείο δεν είναι της μορφής PDF."}
            icon={ICONS_errHANDLING[1].icon}
            className={"btn btn-outline-danger"}
          />
        ) : show === "3" ? (
          <ModalInfo
            show={show}
            modalState={modalState}
            modalTitle={"Αποτυχία Καταχώρησης"}
            dateInfo={true}
            modalMsg={"Το επιλεγμένο αρχείο έχει ήδη καταχωρηθεί."}
            modalDate={
              duplicateData === undefined || null
                ? null
                : duplicateData[0].SubmitDate.toDate().getDate()
            }
            modalMonth={
              duplicateData === undefined || null
                ? null
                : duplicateData[0].SubmitDate.toDate().getMonth() + 1
            }
            modalYear={
              duplicateData === undefined || null
                ? null
                : duplicateData[0].SubmitDate.toDate().getFullYear()
            }
            icon={ICONS_errHANDLING[1].icon}
            className={"btn btn-outline-danger"}
          />
        ) : null
      ) : null}
    </div>
  );
};

export default PDFForm;
