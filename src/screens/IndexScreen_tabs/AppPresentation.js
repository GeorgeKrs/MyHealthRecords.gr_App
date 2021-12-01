const AppPresentation = () => {
  return (
    <div className="form-cumstom-tab p-3">
      <h3 style={{ fontWeight: "bolder" }}>
        Καλώς Ήρθατε στην εφαρμογή Medrchive!
      </h3>
      <br />
      <ul className="list-unstyled">
        <li>
          <h5>
            Εδώ μπορείτε να αποθηκεύσετε όλα σας τα ιατρικά δεδομένα
            (αποτελέσματα εξετάσεων),
          </h5>
        </li>
        <li>
          <h5>
            καθώς και να καταγράψετε μετρήσεις ζωτικών λειτουργιών. Οι μετρήσεις
            σας σε συνδυασμό
          </h5>
        </li>

        <li>
          <h5>
            με την ημερομηνία που καταγράφτηκαν μπορούν να σας δώσουν όχι μόνο
            στατιστικά
          </h5>
        </li>
        <li>
          <h5>στοιχεία, αλλά και γραφήματα για τις ζωτικές σας λειτουργίες.</h5>
        </li>
        <li>
          <br />
          <h5>Τέλος υπάρχει ειδικό πεδίο για καταγραφές μετρήσεων σακχάρου.</h5>
        </li>
        <li>
          <h5>Το ίδιο ισχύει και για τα γραφήματα σακχάρου.</h5>
        </li>
        <br />
        <li>
          <h5>
            Για περισσότερες λεπτομέρειες και πληροφορίες δείτε τις παρακάτω
            εικόνες,
          </h5>
        </li>
        <li>
          <h5>
            ή ακόμα καλύτερα δημιουργήστε το λογιαριασμό σας και ξεκινήστε τη
            καταγραφή!
          </h5>
        </li>
      </ul>

      <div
        className="p-3 py-5 mt-4 bg-secondary"
        style={{ borderRadius: "1rem" }}
      >
        <h4 className="text-light" style={{ fontWeight: "bolder" }}>
          Για περισσότερες πληροφορίες διαβάστε τον οδηγό της εφαρμογής μας
          online:
        </h4>

        <div className="appGuideLink">
          <h4 style={{ fontWeight: "bolder" }}>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/myhealthrecords-1b568.appspot.com/o/Medrchive%20-%20Web%20App.pdf?alt=media&token=86fe1991-5d40-4068-865d-953a1bb45918"
              target="_blank"
              className="link-light appGuideLink"
            >
              <div className="round ">
                <div id="cta">
                  <span className="arrow primera next "></span>
                  <span className="arrow segunda next "></span>
                  <span className="px-5">Εδώ</span>
                </div>
              </div>
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AppPresentation;
