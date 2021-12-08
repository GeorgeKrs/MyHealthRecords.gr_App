import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firebase
import { auth, db, createUserWithEmailAndPassword } from "../utils/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
// modal
import { Modal } from "react-bootstrap";

const SignUpForm = () => {
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleOpenInfo = () => setShowInfo(true);

  const [form, setForm] = useState([
    { email: "" },
    { firstName: "" },
    { lastName: "" },
    { password: "" },
    { passwordVerif: "" },
    { AMKA: "" },
    { AFM: "" },
    { phone: "" },
    { conditions: false },
  ]);

  const [errors, setError] = useState([
    { erEmail: "" },
    { erFirstName: "" },
    { erLastName: "" },
    { erPassword: "" },
    { erConditions: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // error signing in modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleOpenErrorModal = () => setShowErrorModal(true);

  // email exists modal
  const [showEmailExists, setShowEmailExists] = useState(false);
  const handleCloseEmailExists = () => setShowEmailExists(false);
  const handleOpenEmailExists = () => setShowEmailExists(true);

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (form.firstName !== undefined) {
      if (form.firstName.length < 4) {
        setError((errors) => ({
          ...errors,
          erFirstName:
            "Το όνομα δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erFirstName: "",
        }));
      }
    }

    if (form.lastName !== undefined) {
      if (form.lastName.length < 4) {
        setError((errors) => ({
          ...errors,
          erLastName:
            "Το επώνυμο δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erLastName: "",
        }));
      }
    }

    if (form.email !== undefined) {
      let emailValidation = re.test(String(form.email).toLowerCase());
      if (!emailValidation) {
        setError((errors) => ({
          ...errors,
          erEmail: "Μη έγκυρο email.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erEmail: "",
        }));
      }
    }

    if (form.password !== undefined || form.passwordVerif !== undefined) {
      if (
        form.password !== form.passwordVerif ||
        form.password === 0 ||
        form.password < 4
      ) {
        setError((errors) => ({
          ...errors,
          erPassword: "Λανθασμένος κωδικός.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erPassword: "",
        }));
      }
    }

    if (!form.conditions || form.conditions === undefined) {
      setError((errors) => ({
        ...errors,
        erConditions: "Πρέπει να αποδεχτείτε τους όρους & προϋποθέσεις.",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erConditions: "",
      }));
    }
  }, [form]);

  const FormHandler = () => {
    setLoading(true);

    let isValid = false;
    if (
      errors.erEmail !== "" ||
      errors.erFirstName !== "" ||
      errors.erLastName !== "" ||
      errors.erPassword !== "" ||
      errors.erConditions !== ""
    ) {
      handleOpenErrorModal();
      isValid = false;
    } else {
      isValid = true;
      if (form.AMKA === undefined) {
        form.AMKA = "";
      }
      if (form.AFM === undefined) {
        form.AFM = "";
      }
      if (form.phone === undefined) {
        form.phone = "";
      }
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          setLoading(false);
          const userCred = userCredential.user;
          (async () => {
            await setDoc(doc(db, "users", form.email), {
              uuid: userCred.uid,
              email: form.email,
              password: form.password,
              firstName: form.firstName,
              lastName: form.lastName,
              AMKA: form.AMKA,
              AFM: form.AFM,
              phone: form.phone,
              conditions: true,
              validAcc: false,
              userLevel: "patient",
              signUpDate: Timestamp.fromDate(new Date()),
              accModifications: Timestamp.fromDate(new Date()),
            });
          })();
          (async () => {
            await setDoc(doc(db, "allergiesRecords", form.email), {
              food_allergies: false,
              food_comments: "",
              breathe_allergies: false,
              breathe_comments: "",
              skin_allergies: false,
              skin_comments: "",
              sting_allergies: false,
              sting_comments: "",
              drug_allergies: false,
              drug_comments: "",
              other_allergies: false,
              other_comments: "",
              LastModification: Timestamp.fromDate(new Date()),
            });
          })();
        })
        .catch((error) => {
          setLoading(false);
          handleOpenEmailExists();
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="pt-5 mt-1 form-cumstom-tab">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, firstName: e.target.value }))
            }
          />
          {errors.erFirstName ? (
            <ErrorMsg ErrorMsg={errors.erFirstName}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, lastName: e.target.value }))
            }
          />
          {errors.erLastName ? (
            <ErrorMsg ErrorMsg={errors.erLastName}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, email: e.target.value }))
            }
          />
          {errors.erEmail ? (
            <ErrorMsg ErrorMsg={errors.erEmail}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός</label>
          <input
            type="password"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, password: e.target.value }))
            }
          />
          {errors.erPassword ? (
            <ErrorMsg ErrorMsg={errors.erPassword}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός (Επαλήθευση)</label>
          <input
            type="password"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, passwordVerif: e.target.value }))
            }
          />
          {errors.erPassword ? (
            <ErrorMsg ErrorMsg={errors.erPassword}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, AMKA: e.target.value }))
            }
          />
          {errors.erAMKA ? (
            <ErrorMsg ErrorMsg={errors.erAMKA}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΦΜ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, AFM: e.target.value }))
            }
          />
          {errors.erAFM ? <ErrorMsg ErrorMsg={errors.erAFM}></ErrorMsg> : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, phone: e.target.value }))
            }
          />
          {errors.erPhone ? (
            <ErrorMsg ErrorMsg={errors.erPhone}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="mt-3 mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={false}
            onChange={(e) =>
              setForm((form) => ({ ...form, conditions: e.target.checked }))
            }
          />
          <span onClick={handleOpenInfo} className="link-primary">
            <label style={{ fontSize: "12px" }}>
              Συμφωνώ με τους όρους χρήσης και τις προϋποθέσεις
            </label>
          </span>
        </div>
        {errors.erConditions ? (
          <ErrorMsg ErrorMsg={errors.erConditions}></ErrorMsg>
        ) : null}
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            )}
            <span>{loading ? "Περιμένετε..." : "Εγγραφή"}</span>
          </button>
        </div>
      </div>

      {/* no SignIn modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Εγγραφής</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία ακολουθώντας τους
          περιορισμούς.
        </Modal.Body>

        <Modal.Body>
          <ul className="list-group list-group-numbered">
            Υποχρεωτικά πεδία θεωρούνται τα παρακάτω:
            <li className="list-group-item mt-2">Όνομα</li>
            <li className="list-group-item">Επώνυμο</li>
            <li className="list-group-item">Email</li>
            <li className="list-group-item">Κωδικός</li>
            <li className="list-group-item">Όροι Χρήσης και προϋποθέσεις</li>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseErrorModal}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of no SignIn modal */}

      {/* Email exists */}
      <Modal show={showEmailExists} onHide={handleCloseEmailExists}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Εγγραφής</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul className="list-group list-group-numbered">
            Αποτυχία εγγραφής για έναν από τους παρακάτω λόγους:
            <li className=" list-group-item mt-2">
              Υπάρχει ήδη ένας λογαριασμός με αυτό το email.
            </li>
            <li className="list-group-item">
              Ο κωδικός που επιλέξατε είναι μικρότερος από 6 ψηφία.
            </li>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseEmailExists}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of Email exists modal */}

      {/* info modal */}
      <Modal show={showInfo} onHide={handleCloseInfo}>
        <Modal.Header>
          <Modal.Title>Όροι κ' Προϋποθέσεις</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            <strong>Γενικά</strong>
          </h3>

          <p>Καλως Ήρθατε στη Medrchive!</p>

          <p>
            Αυτοί οι όροι και προϋποθέσεις περιγράφουν τους κανονισμούς για τη
            χρήση της εφαρμογής Medrchive, που βρίσκεται στη παρακάτω
            ηλεκτρονική διεύθυνση: www.medrchive.gr
          </p>

          <p>
            Έχοντας πρόσβαση σε αυτήν την εφαρμογή, υποθέτουμε ότι αποδέχεστε
            τους όρους και τις προϋποθέσεις. Δεν μπορείτε να συνεχίσετε στη
            Medrchive εάν δεν συμφωνείτε με όλα όσα είναι δηλωμένα σε αυτή τη
            σελίδα.
          </p>

          <p>
            Η παρακάτω ορολογία ισχύει σε αυτούς τους όρους και προϋποθέσεις,
            Δήλωση απορρήτου και σημείωση αποποίησης ευθύνης και όλες τις
            Συμφωνίες: "Πελάτης", "Εσείς" και "Δικό σας" αναφέρεται σε εσάς, στό
            άτομο που επισκέπτεται την εφαρμογή και συμφωνεί στους όρους και
            προϋποθέσεις της εταιρίας. "Η εταιρία", "Εμεις", "Δικό μας" είναι
            εκφράσεις που αναφέρονται σε εμάς, την εταιρία. Όλοι οι όροι
            αναφέρονται στη προσφορά, αποδοχή και θεώρηση όλων των μέτρων που
            πρέπει να ληφθούν με τον καταλληλότερο τρόπο, για να εκφράσουμε τις
            ανάγκες σας σε συνδυασμό με τις υπηρεσίες της εταιρίας που είναι
            σύμφωνες με τους νόμους της Ελλάδας.
          </p>

          <h3>
            <strong>Cookies</strong>
          </h3>

          <p>
            Η εφαρμογή κάνει χρήση cookies. Έχοντας πρόσβαση στην εφαρογή
            Medrchive, συφωνείτε στη χρήση των cookies που είναι σύμφωνα με την
            πολιτική της εταιρίας.
          </p>

          <p>
            Θεωρούμε σημαντικό να ξέρετε ποια είναι τα cookies που
            χρησιμοποιούνται στην ιστοσελίδα-εφαρμογή μας και για ποιούς λόγους
            αυτά χρησιμοποιούνται. Στόχος μας είναι η σωστή ενημέρωση και
            προστασία σας αλλά και η καλύτερη εμπειρία από την επίσκεψη σας στην
            εφαρμογή μας. Έτσι χρησιμοποιούμε cookies για την καλύτερη δυνατή
            λειτουργίας της, τη σωστή περιήγηση σας, τη σύνδεση και τη
            μετακίνηση στις σελίδες καθώς και για την παροχή διαφημιστικού
            περιεχομένου βασιζόμενο στα ενδιαφέροντα και τις ανάγκες σας
            (Μελλοντικά).
          </p>

          <p>
            Επίσης, τα cookies χρησιμοποιούνται για να αναλύσουμε πώς οι
            επισκέπτες χρησιμοποιούν τον ιστότοπο μας, πώς περιηγούνται ή αν
            αντιμετωπίζουν κάποιο πρόβλημα για να μπορέσουμε να το διορθώσουμε.
            Όλες οι πληροφορίες που συλλέγονται από αυτά τα cookies είναι
            ανώνυμες και χρησιμοποιούνται μόνο για να βελτιώσουμε τη δομή και το
            περιεχόμενο του ιστοτόπου. Τα cookies είναι μικρά κομμάτια
            πληροφορίας (αρχεία), με τη μορφή απλού κειμένου, που αποθηκεύονται
            στον υπολογιστή σας (ή σε άλλες συσκευές με πρόσβαση στο διαδίκτυο,
            όπως ένα smartphone ή tablet) όταν επισκέπτεστε διάφορες σελίδες στο
            διαδίκτυο. Τα Cookies δεν προκαλούν κάποια βλάβη στον ηλεκτρονικό
            σας υπολογιστή, αλλά ούτε και στα αρχεία που φυλάσσονται σε αυτόν.
            Χωρίς αυτά, οι προσωπικές σας προτιμήσεις θα ήταν αδύνατον να
            αποθηκευτούν και κάθε φορά που θα μπαίνατε σε μία ιστοσελίδα, θα
            ήταν σαν να μπαίνατε για πρώτη φορά.
          </p>
          <p>
            Μελλόντικα, θα προσθεθούν και άλλα cookies που θα κριθούν απαραίτητα
            για τη βελτιστοποίηση της εμπειρίας σας, αλλά και για τη λειτουργία
            της εφαρμογής.
          </p>

          <p>
            Αυτή τη στιγμή η εφαρογή μας χρησιμοποιεί μόνο third-party cookies.
            Συγκεκριμένα:
          </p>
          <ul>
            <li>
              <b>Google's Firebase Authentication:</b> Είναι υπεύθυνο για την
              αναγνώριση του χρήστη και τη διευκόλυνσή του όσο αναφορά την
              είσοδό του στην εφαρογή, καθώς και για την ασφαλή αποθήκευση των
              δεδομένων του. (Διάρκεια &rarr; Άπειρη, Δεν λήγει ποτέ,
              ανανεώνεται κάθε φορά που ο χρήστης κάνει Σύνδεση στην εφαρμογή.)
              Περισσότερες πληροφορίες:
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
              προτιμήσεων του χρήστη στην εφαρμογή για τη καλύτερη εμπειρία του
              χρήστη. Περισσότερες πληροφορίες:
              <a
                className="px-2"
                href="https://firebase.google.com/docs/analytics/events?platform=web"
                target="_blank"
              >
                Firebase - Log Events
              </a>
            </li>
          </ul>
          <p>
            <b>
              Για να είστε συνδεδεμένος και να βλέπετε τις ρυθμίσεις της
              εφαρμογής σημαίνει πως έχετε ήδη αποδεχτεί τους όρους των Cookies
              αλλά και τους Όρους-Προϋποθέσεις.
            </b>
          </p>

          <h3>
            <strong>Άδεια</strong>
          </h3>

          <p>
            Εκτός αν δηλωθεί, η Medrchive ή/και δικαιοπάροχοι κατέχουν την
            πνευματική ιδιοκτησία για όλη την Medrchive.
          </p>

          <p>Δεν επιτρέπεται:</p>
          <ul>
            <li>Να αναπαράγετε ή να αντιγράψετε υλικό από τη Medrchive</li>
            <li>Να πουλήσετε ή να νοικιάσετε οτιδήποτε από τη Medrchive</li>
            <li>Η διανομή από τη Medrchive</li>
          </ul>

          <p>
            Μερικά μέρη της εφαρμογής προσφέρουν την ευκαιρία στους χρήστες να
            ανεβάσουν και να αποθηκεύσουν πληροφορίες. Η Medrchive δεν
            επεξεργάζετε, τροποποιεί, δημοσιεύει η βλέπει τις πληροφορίες αυτές.
            Η εφαρμογή της Medrchive αποθηκεύει τα αρχεία της στη Firestore και
            δεν ευθύνεται για οποιαδήποτε χρήση των αρχείων κάνει η Google.Για
            περισσότερες πληροφορίες επισκευτείτe τη σελίδα της{" "}
            <a
              href="https://firebase.google.com/products/firestore?gclid=CjwKCAiAhreNBhAYEiwAFGGKPIq8NZJE8Ro0r8Hf6iOsiPi9eX_sKxrjmgYlLmgsfTQ5uU9bnD2IeRoCptsQAvD_BwE&gclsrc=aw.ds"
              target="_blank"
            >
              Firestore
            </a>
            . Η Medrchive δεν έχει καμία ευθύνη για τη καταστροφή, διαγραφή ή
            την υποκλοπή των δεδομένων αυτών.
          </p>

          <p>
            Η Medrchive έχει το δικαίωμα να παρακολουθεί και να διαγράφει ότι η
            εταιρία θεωρήσει ότι παραβιάσει τους όρους και τις προϋποθέσεις ή
            είναι ακατάλληλο.
          </p>

          <p>Εσείς εγγυάστε και εκποροσωπείτε:</p>

          <ul>
            <li>
              Είστε υπεύθυνος για όλες τις καταχωρήσεις, καθώς και τα σχόλια που
              ανεβάζετε στην εφαρογή.
            </li>
            <li>
              Τα σχόλια των καταχωρήσεων δεν περιέχουν προσβλητικό περιεχόμενο,
              καθώς αυτό θα ήταν παραβίαση των όρων και θα μπορούσε να οδηγήσει
              σε διαγραφή του λογαριασού σας.
            </li>

            <li>
              Τα σχόλια σας δεν θα χρησιμοποιηθούν για να προάγουν διαφημιστικό
              περιεχόμενο, ούτε παράνομη δραστηριότητα.
            </li>
          </ul>

          <h3>
            <strong>Σύνδεση στο περιεχόμενό μας</strong>
          </h3>

          <p>
            Οι παρακάτω οργανισμού μπορεί να συνδεθούν στην εφαρμογή μας χωρίς
            γραπτή άδεια.
          </p>

          <ul>
            <li>Υπηρεσίες της κυβέρνησης</li>
            <li>Μηχανές αναζήτησης</li>

            <li>Διαδικτυακοι διανομείς</li>
            <li>Μη κερδοσκοπικοί οργανισμοί</li>
          </ul>

          <p>
            Οι παραπάνω μπορούν να συνδεθούν στην εφαρμογή μας εφόσον: (α) δεν
            είναι παραπλανητικοί, (β) δεν προάγουν ψεύτικες εγγυήσεις, (γ)
            συμφωνούν με τους όρους όχι μόνο της εταιρίας, αλλά και των χρηστών.
          </p>

          <p>
            Ενδεχομένος να δεχτούμε και συνδέσεις από τους παρακάτω οργανισμούς:
          </p>

          <ul>
            <li>Γνωστούς καταναλωτές ή/και ενημερωτικές πηγές</li>

            <li>Οργανισμούς που αντιπροσωπεύουν φιλανθρωπίες</li>
            <li>Διαδικτυακές Πύλες</li>
            <li>Λογιστικές και Νομικές Εταιρίες</li>
            <li>Πανεπιστήμια</li>
          </ul>

          <p>
            Θα δεχτούμε τις συνδέσεις αυτές εάν: (α) δεν μας κάνει να φαινόμαστε
            αναξιόπιστοι, (β) η εταιρία δεν έχει αρνητικό αντίκτυπο, (γ)
            Προωθηθούμε.
          </p>

          <h3>
            <strong>iFrames</strong>
          </h3>

          <p>
            Χωρίς την γραπτή άδεια μας, δεν μπορείτε να δημιουργήσετε frames
            στην εφαρμογή που μπορεί να επηρεάσουν την οπτική εικόνα και την
            παρουσίαση της εφαρμογής.
          </p>

          <h3>
            <strong>Ευθύνη Περιεχομένου</strong>
          </h3>

          <p>
            Δεν είμαστε υπεύθυνοι για ότι περιεχόενο εμφαρνιστεί στην ιστοσελίδα
            - εφαρογή σας. Συφωνείτε να μας υπερασπιστείτε για όλους τους
            ισχυρισμούς που μπορεί να προκύψουν.
          </p>

          <h3>
            <strong>Το απόρρητό σας</strong>
          </h3>

          <p>Παρακαλώ διαβάστε το απόρρητό σας</p>

          <h3>
            <strong>Επιφύλαξη Δικαιωμάτων</strong>
          </h3>

          <p>
            Σας αφαιρείται το δικαίωμα να ζητήσετε την αφαίρεση οποιουδήποτε
            link ή διαφήμισης στην εφαρμογή μας. Επίσης συναινείτε να αφαιρέσετε
            οποιοδήποτε link προσθέσετε χωρίς άδεια. Επίσης έχουμε το δικαίωμα
            να αλλάξουμε τους όρους και τις προϋποθέσεις οποιαδήποτε στιγμή
            χωρίς ενημέρωση. Με την είσοδο σας στην εφαρμογή, συμφωνείτε στους
            υπάρχοντες όρους, κανόνες και προϋποθέσεις.
          </p>

          <h3>
            <strong>Αφαίρεση Υλικού από την εφαρμογή</strong>
          </h3>

          <p>
            Εάν βρείτε κάτι προσβλητικό στην εφαρογή μας για οποιοδήποτε λόγο,
            μπορείτε να επικοινωνήσετε μαζί μας οποιαδήποτε στιγμή. Θα
            εξετάσουμε το αίτημά σας και θα σας απαντήσουμε, αλλά δεν είμαστε
            υποχρεωμένοι να συμμορφωθούμε με αυτό.
          </p>

          <p>
            Δεν σας διαβεβαιώνουμε ότι οι πληροφορίες σε αυτή την εφαρμογή είναι
            σωστές, ούτε για την αρκίβειά τους. Επίσης δεν σας διαβεβαιώνουμε
            ότι η ιστοσελίδα - εφαρμογή θα μένει διαθέσιμη αλλά και
            αναβαθμισμένη συνέχεια.
          </p>

          <h3>
            <strong>Αποποίηση ευθυνών</strong>
          </h3>

          <p>Δεν έχουμε καμία ευθύνη για τα παρακάτω:</p>

          <ul>
            <li>Τραυματισμό, θανατηφόρο ή μη.</li>
            <li>Για οποιαδήποτε απάτη, ή υποκλοπή πληροφοριών</li>
          </ul>

          <p>
            Όσο λειτουργεί η ιστοσελίδα - εφαρμογή, δεν έχουμε καμία ευθύνη για
            οποιαδήποτε κλοπή, απάτη κτλπ οποιασδήποτε φύσεως.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleCloseInfo}
          >
            Κλείσιμο
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of info modal */}
    </div>
  );
};

export default SignUpForm;
