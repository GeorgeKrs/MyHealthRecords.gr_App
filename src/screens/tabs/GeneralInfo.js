import TabTitles from "../../general/TabTitles";
import TableTemperature from "../../general/TableTemperature";
import TablePressure from "../../general/TablePressure";
import InfoList from "../../general/InfoList";

const GeneralInfo = () => {
  return (
    <div className="outer-tabsDiv w-100" style={{ overflowX: "hidden" }}>
      <div className="container">
        <TabTitles title={"Γενικές Πληροφορίες - Ενδεικτικές Τιμές"} />
        <div className="mt-5 ">
          <div>
            <h5>
              Σε αυτό το τμήμα της εφαρμογής ακολουθούν κάποιοι πίνακες με
              ενδεικτικές τιμές ζωτικών λειτουργιών, καθώς και τιμών σακχάρου
              του αίματος.
            </h5>
          </div>
          <div className="mt-4">
            <h5>
              <span className="text-danger">
                <u>ΠΡΟΣΟΧΗ:</u>
              </span>
              <span className="px-1">
                Οι τιμές αυτές είναι ενδεικτικές και σε κάθε περίπτωση θα πρέπει
                να συμβουλευτείτε τον γιατρό σας.
              </span>
            </h5>
          </div>
          <div className="mt-5 p-1">
            <h5 className="text-dark">
              <b>
                <u>Θερμοκρασία Σώματος</u>
              </b>
            </h5>
            <TableTemperature />
          </div>
          <div className="mt-5 p-1">
            <h5 className="text-dark">
              <b>
                <u>Συστολική και Διαστολική Πίεση</u>
              </b>
            </h5>
            <TablePressure />
          </div>

          <div className="mt-5">
            <h5 className="text-dark">
              <b>
                <u>Σάκχαρο</u>
              </b>
            </h5>
          </div>

          <div
            className="p-1 border border-primary border border-1"
            style={{ overflowX: "hidden" }}
          >
            <div className="p-1 border">
              <InfoList
                title={"Μέτρηση γλυκοζυλιωμένης αιμοσφαιρίνης"}
                li1={"Φυσιολογικές τιμές = κάτω από 5,7%"}
                li2={"Προδιαβήτης = από 5,7% έως 6,4%"}
                li3={"Διαβήτης = 6,5% ή υψηλότερο"}
              />
            </div>
            <div className="mt-4 p-1 ">
              <InfoList
                title={"Σάκχαρο (ή γλυκόζη) νηστείας"}
                li1={"Φυσιολογικές τιμές = κάτω από 100 mg/dl"}
                li2={"Προδιαβήτης = 100 έως 125 mg/dl"}
                li3={"Διαβήτης = 126 mg/dl ή υψηλότερο"}
              />
            </div>
            <div className="mt-4 p-1 ">
              <InfoList
                title={"Καμπύλη σακχάρου (ή δοκιμασία ανοχής στη γλυκόζη)"}
                li1={"Φυσιολογικές τιμές = κάτω από 140 mg/dl"}
                li2={"Προδιαβήτης = από 140 έως 199 mg/dl"}
                li3={"Διαβήτης = 200 mg/dl ή υψηλότερο"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
