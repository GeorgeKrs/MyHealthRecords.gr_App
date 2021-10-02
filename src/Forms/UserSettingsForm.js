import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firestore
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import FullScreenLoader from "../general/FullScreenLoader";

const UserSettingsForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [btnLoading, setBtnLoading] = useState(false);
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");

  const loggedInUser = props.loggedInUser;

  const fetchUserData = async () => {
    const docRef = doc(db, "users", loggedInUser);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData().finally(
      setTimeout(function () {
        setLoading(false);
      }, 500)
    );

    setUserData((userData) => ({
      ...userData,
      accModifications: Timestamp.fromDate(new Date()),
    }));
  }, []);

  const ValidateFirstName = (firstName) => {
    if (firstName.length < 4) {
      setErrFirstName(
        "Το όνομα δε μπορεί να έχει λιγότερους από 4 χαρακτήρες."
      );
    } else {
      setErrFirstName("");
    }
  };

  const ValidateLastName = (lastName) => {
    if (lastName.length < 4) {
      setErrLastName(
        "Το επώνυμο δε μπορεί να έχει λιγότερους από 4 χαρακτήρες."
      );
    } else {
      setErrLastName("");
    }
  };

  const FormHandler = () => {
    setBtnLoading(true);
    let isValid = false;

    if (
      errFirstName === "" &&
      errLastName === "" &&
      userData.firstName !== "" &&
      userData.firstName.length > 3 &&
      userData.lastName.length > 3 &&
      userData.lastName !== ""
    ) {
      isValid = true;
    }

    if (isValid) {
      const UserSettingsRef = doc(db, "users", loggedInUser);
      setDoc(UserSettingsRef, userData, { merge: true });
    } else {
      alert("fORM ERROR");
    }

    setTimeout(function () {
      setBtnLoading(false);
    }, 300);
  };

  return (
    <div>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <div className="pt-5 mt-5 form-custom">
          <div className="row">
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Όνομα</label>
              <input
                type="text"
                className="inputValues"
                value={userData.firstName}
                onInput={(e) => ValidateFirstName(e.target.value)}
                onChange={(e) =>
                  setUserData((userData) => ({
                    ...userData,
                    firstName: e.target.value,
                  }))
                }
              />
              {errFirstName ? <ErrorMsg ErrorMsg={errFirstName} /> : null}
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Επώνυμο</label>
              <input
                type="text"
                className="inputValues"
                value={userData.lastName}
                onInput={(e) => ValidateLastName(e.target.value)}
                onChange={(e) =>
                  setUserData((userData) => ({
                    ...userData,
                    lastName: e.target.value,
                  }))
                }
              />
              {errLastName ? <ErrorMsg ErrorMsg={errLastName} /> : null}
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Email</label>
              <input
                type="email"
                className="inputValues"
                disabled={true}
                value={userData.email}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">ΑΜΚΑ</label>
              <input
                type="text"
                className="inputValues"
                value={userData.AMKA}
                onChange={(e) =>
                  setUserData((userData) => ({
                    ...userData,
                    AMKA: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">ΑΦΜ</label>
              <input
                type="text"
                className="inputValues"
                value={userData.AFM}
                onChange={(e) =>
                  setUserData((userData) => ({
                    ...userData,
                    AFM: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Κινητό</label>
              <input
                type="text"
                className="inputValues"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((userData) => ({
                    ...userData,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={FormHandler}
                disabled={btnLoading ? true : false}
              >
                {btnLoading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                )}
                <span>{btnLoading ? "Περιμένετε..." : "Αποθήκευση"}</span>
              </button>
            </div>
            <div className="mt-4 ms-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingsForm;
