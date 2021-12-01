import { useState, useEffect } from "react";
// screens
import AppPresentation from "./IndexScreen_tabs/AppPresentation";
import ContactTab from "./IndexScreen_tabs/ContactTab";
import InfoTab from "./IndexScreen_tabs/InfoTab";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
// logo
import AppLogo from "../assets/logo.png";
// modal
import { Modal } from "react-bootstrap";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const IndexScreen = () => {
  const [tab, setTab] = useState("0");
  const [activeTab, setActiveTab] = useState("0");

  // modal options
  const [showCookiesModal, setShowCookiesModal] = useState(false);

  const [infoModal, setInfoModal] = useState(false);
  const [cookiesInfoModal, setCookiesInfoModal] = useState(false);

  const tabSelectorHandler = (buttonId) => {
    setTab(buttonId);
    setActiveTab(buttonId);
  };

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="appName-style">Medrchive</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ρυθμίσεις Cookies</h4>
          <p>
            Χρησιμοποιούμε cookies για να κάνουμε ακόμα καλύτερη την εμπειρία
            σας στην εφαρμογή μας και για να διασφαλιστεί η αποτελεσματική
            λειτουργία της. Επιλέγοντας «Αποδοχή όλων» παρέχετε τη συγκατάθεση
            σας για τη χρήση των cookies, σύμφωνα με την πολιτική μας.
          </p>
          <p>
            <b>
              Απαραίτητη προϋπόθεση για τη χρήση της εφαρμογής είναι η αποδοχή
              όλων. Κάθε φορά που θα κάνετε αποσύνδεση, αλλά και πριν την είσοδό
              σας στην εφαρμογή θα υπάρχει το αντίστοιχο παράθυρο για αποδοχή
              ξανά. Αυτό γίνεται για να ενημερώνεστε για όλες τις αλλαγές στις
              λειτουργίες των Cookies.
            </b>
          </p>
        </Modal.Body>
        {infoModal ? (
          <Modal.Body>
            <h4>
              Πληροφορίες:
              <button
                className="mx-3 btn btn-sm btn-outline-dark"
                onClick={() => setInfoModal(false)}
              >
                <FontAwesomeIcon
                  size="lg"
                  icon={faTimes}
                  style={{ color: "var(--bs-primary)" }}
                  className="hoverCookies-btn"
                />
              </button>
            </h4>

            <p>
              Θεωρούμε σημαντικό να ξέρετε ποια είναι τα cookies που
              χρησιμοποιούνται στην ιστοσελίδα-εφαρμογή μας και για ποιούς
              λόγους αυτά χρησιμοποιούνται. Στόχος μας είναι η σωστή ενημέρωση
              και προστασία σας αλλά και η καλύτερη εμπειρία από την επίσκεψη
              σας στην εφαρμογή μας. Έτσι χρησιμοποιούμε cookies για την
              καλύτερη δυνατή λειτουργίας της, τη σωστή περιήγηση σας, τη
              σύνδεση και τη μετακίνηση στις σελίδες καθώς και για την παροχή
              διαφημιστικού περιεχομένου βασιζόμενο στα ενδιαφέροντα και τις
              ανάγκες σας (Μελλοντικά, ακόμη δεν ισχύει).
            </p>
            <p>
              Επίσης, τα cookies χρησιμοποιούνται για να αναλύσουμε πώς οι
              επισκέπτες χρησιμοποιούν τον ιστότοπο μας, πώς περιηγούνται ή αν
              αντιμετωπίζουν κάποιο πρόβλημα για να μπορέσουμε να το
              διορθώσουμε. Όλες οι πληροφορίες που συλλέγονται από αυτά τα
              cookies είναι ανώνυμες και χρησιμοποιούνται μόνο για να
              βελτιώσουμε τη δομή και το περιεχόμενο του ιστοτόπου. Τα cookies
              είναι μικρά κομμάτια πληροφορίας (αρχεία), με τη μορφή απλού
              κειμένου, που αποθηκεύονται στον υπολογιστή σας (ή σε άλλες
              συσκευές με πρόσβαση στο διαδίκτυο, όπως ένα smartphone ή tablet)
              όταν επισκέπτεστε διάφορες σελίδες στο διαδίκτυο. Τα Cookies δεν
              προκαλούν κάποια βλάβη στον ηλεκτρονικό σας υπολογιστή, αλλά ούτε
              και στα αρχεία που φυλάσσονται σε αυτόν. Χωρίς αυτά, οι προσωπικές
              σας προτιμήσεις θα ήταν αδύνατον να αποθηκευτούν και κάθε φορά που
              θα μπαίνατε σε μία ιστοσελίδα, θα ήταν σαν να μπαίνατε για πρώτη
              φορά.
            </p>

            <p>
              Μελλόντικα, θα προσθεθούν και άλλα cookies που θα κριθούν
              απαραίτητα για τη βελτιστοποίηση της εμπειρίας σας, αλλά και για
              τη λειτουργία της εφαρμογής.
            </p>
          </Modal.Body>
        ) : null}

        {cookiesInfoModal ? (
          <Modal.Body>
            <h4>
              Cookies:
              <button
                className="mx-3 btn btn-sm btn-outline-dark"
                onClick={() => setCookiesInfoModal(false)}
              >
                <FontAwesomeIcon
                  size="lg"
                  icon={faTimes}
                  style={{ color: "var(--bs-primary)" }}
                />
              </button>
            </h4>
            <p>
              Αυτή τη στιγμή η εφαρογή μας χρησιμοποιεί μόνο third-party
              cookies. Συγκεκριμένα:
            </p>
            <ul>
              <li>
                <b>Google's Firebase Authentication:</b> Είναι υπεύθυνο για την
                αναγνώριση του χρήστη και τη διευκόλυνσή του όσο αναφορά την
                είσοδό του στην εφαρογή, καθώς και για την ασφαλή αποθήκευση των
                δεδομένων του. (Διάρκεια &rarr; Άπειρη, Δεν λήγει
                ποτέ,ανανεώνεται κάθε φορά που ο χρήστης κάνει Σύνδεση στην
                εφαρμογή.) Περισσότερες πληροφορίες:
                <a
                  className="px-2"
                  href="  https://firebase.google.com/docs/auth"
                  target="_blank"
                >
                  Firebase - Authentication
                </a>
              </li>

              <li className="mt-3">
                <b>Google's Log Events:</b> Είναι υπεύθυνο για την καταγραφή
                γεγονότων, καταγραφή σφαλμάτων της εφαρμογής και καταγραφή των
                προτιμήσεων του χρήστη στην εφαρμογή για τη καλύτερη εμπειρία
                του. Περισσότερες πληροφορίες:
                <a
                  className="px-2"
                  href="https://firebase.google.com/docs/analytics/events?platform=web"
                  target="_blank"
                >
                  Firebase - Log Events
                </a>
              </li>
            </ul>
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <button
            className={
              cookiesInfoModal ? "btn btn-dark" : "btn btn-outline-dark"
            }
            onClick={() => setCookiesInfoModal(true)}
            id="cookiesBtn"
          >
            Cookies
          </button>
          <button
            className={
              infoModal ? "btn btn-primary" : "btn btn-outline-primary"
            }
            onClick={() => setInfoModal(true)}
            id="cookiesBtn"
          >
            Πληροφορίες
          </button>
          <button
            className="btn btn-outline-success"
            onClick={props.onHide}
            id="cookiesBtn"
          >
            Αποδοχή Όλων
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  const cookieObligation = () => {
    setTimeout(() => setShowCookiesModal(true), 1500);
  };

  useEffect(() => {
    cookieObligation();
  }, []);

  return (
    <div className="outer-indexdiv" style={{ overflow: "hidden" }}>
      <div className="p-3 bd-highlight d-sm-block d-md-none d-lg-none">
        <span
          style={{ cursor: "pointer" }}
          onClick={tabSelectorHandler.bind(this, "0")}
        >
          <span className="">
            <div className="d-flex">
              <div>
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                  }}
                  src={AppLogo}
                ></img>
              </div>

              <div className="text-center">
                <h3 className="p-3 align-items-center text-dark appName-style">
                  <b>Medrchive</b>
                </h3>
              </div>
            </div>
          </span>
        </span>
      </div>
      <div className="pt-4 d-flex flex-column align-items-center d-sm-block d-md-none d-lg-none">
        {(tab === "0" && <AppPresentation />) ||
          (tab === "1" && <ContactTab />) ||
          (tab === "2" && <InfoTab />) ||
          (tab === "3" && <LoginForm />) ||
          (tab === "4" && <SignUpForm />)}
      </div>

      {/* web large screens */}
      <div className="container">
        <div className="d-lg-flex d-md-flex bd-highlight mb-3">
          <div className="me-auto px-5 bd-highlight d-none d-sm-none d-md-block d-lg-block">
            <span
              style={{ cursor: "pointer" }}
              onClick={tabSelectorHandler.bind(this, "0")}
            >
              <span>
                <div className="d-flex">
                  <div>
                    <img
                      style={{
                        height: "70px",
                        width: "70px",
                      }}
                      src={AppLogo}
                    ></img>
                  </div>

                  <div>
                    <h3 className="p-3 align-items-center text-dark appName-style">
                      <b>Medrchive</b>
                    </h3>
                  </div>
                </div>
              </span>
            </span>
          </div>

          <div className="p-3 bd-highlight" id="firstButtonMargin">
            <button
              id="3"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "3"
                  ? "btn btn-primary w-100 mt-1"
                  : "btn btn-outline-primary w-100 mt-1"
              }
              onClick={tabSelectorHandler.bind(this, "3")}
            >
              Είσοδος
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="4"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "4"
                  ? "btn btn-dark w-100 mt-1"
                  : "btn btn-outline-dark w-100 mt-1"
              }
              onClick={tabSelectorHandler.bind(this, "4")}
            >
              Εγγραφή
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="2"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "2"
                  ? "btn btn-success w-100 mt-1"
                  : "btn btn-outline-success w-100 mt-1"
              }
              onClick={tabSelectorHandler.bind(this, "2")}
            >
              Σχετικά με εμάς
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="1"
              style={{
                fontWeight: "bolder",
              }}
              className={
                activeTab === "1"
                  ? "btn btn-danger w-100 mt-1"
                  : "btn btn-outline-danger w-100 mt-1"
              }
              onClick={tabSelectorHandler.bind(this, "1")}
            >
              Επικοινωνία
            </button>
          </div>
        </div>
      </div>
      <div
        className="mt-5 pt-5 d-flex flex-column align-items-center"
        id="IndexTabsForLargeScreen"
      >
        {(tab === "0" && <AppPresentation />) ||
          (tab === "1" && <ContactTab />) ||
          (tab === "2" && <InfoTab />) ||
          (tab === "3" && <LoginForm />) ||
          (tab === "4" && <SignUpForm />)}
      </div>

      <MyVerticallyCenteredModal
        show={showCookiesModal}
        onHide={() => setShowCookiesModal(false)}
      />
    </div>
  );
};

export default IndexScreen;
