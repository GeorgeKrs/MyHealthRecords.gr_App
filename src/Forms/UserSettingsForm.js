import { useState, useEffect } from "react";
import UserSettingsTab from "../screens/tabs/UserSettingsTab";
// firestore
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import FullScreenLoader from "../general/FullScreenLoader";

const UserSettingsForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const loggedInUser = props.loggedInUser;

  const fetchUserData = async () => {
    const docRef = doc(db, "users", loggedInUser);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData();

    setTimeout(function () {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <FullScreenLoader LoadingMsg={"Φόρτωση Δεδομένων..."} />
      ) : (
        <div className="pt-5 mt-5 form-custom">
          <div className="row">
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Όνομα</label>
              <input
                type="text"
                className="inputValues"
                value={userData.firstName}
              />
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Επώνυμο</label>
              <input
                type="text"
                className="inputValues"
                value={userData.lastName}
              />
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
              <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
              <input
                type="text"
                className="inputValues"
                value={userData.AMKA}
              />
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">ΑΦΜ (Προαιρετικό)</label>
              <input type="text" className="inputValues" value={userData.AFM} />
            </div>
            <div className="col-sm-12 col-lg-4 mt-4">
              <label className="label">Κινητό (Προαιρετικό)</label>
              <input
                type="text"
                className="inputValues"
                value={userData.phone}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-outline-dark"
                //   onClick={FormHandler}
                disabled={loading ? true : false}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                )}
                <span>{loading ? "Περιμένετε..." : "Αποθήκευση"}</span>
              </button>
            </div>
            <div className="mt-4 ms-auto">
              <button
                type="button"
                className="btn btn-outline-danger"
                //   onClick={FormHandler}
                disabled={loading ? true : false}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                )}
                <span>{loading ? "Περιμένετε..." : "Αλλαγή Κωδικού"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingsForm;
