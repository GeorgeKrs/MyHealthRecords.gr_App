import Input from "../general/Input";

const SignUpForm = () => {
  return (
    <div className="pt-5 mb-4" style={{height: "100vh"}}>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"Όνομα"}></Input>
        </div>
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"Επώνυμο"}></Input>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"Email"}></Input>
        </div>
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"Κωδικός"}></Input>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"ΑΜΚΑ (Προαιρετικό)"}></Input>
        </div>
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"ΑΦΜ (Προαιρετικό)"}></Input>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <Input LabelName={"Κινητό (Προαιρετικό)"}></Input>
        </div>
      </div>
      <div className="mt-4 p-2">
        <button type="button" className="btn btn-primary">
          Εγγραφή
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
