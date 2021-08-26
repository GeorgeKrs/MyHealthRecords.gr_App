import Navbar from "../navbars/Navbar";

const MainScreen = () => {
  return (
    <div
      style={{ backgroundColor: "var(--color-ice-light)" }}
      className="d-flex"
    >
      <div
        style={{
          backgroundColor: "var(--color-ice)",
          height: "100vh",
        }}
        className="d-flex flex-column"
      >
        <Navbar
          FontIconClass={[
            "VITALS",
            "VITALS_R",
            "PDF",
            "PDF_R",
            "ALLERGIES",
            "METRICS",
            "CAL",
            "SETTINGS",
            "EXIT",
          ]}
        ></Navbar>
      </div>
    </div>
  );
};

export default MainScreen;
