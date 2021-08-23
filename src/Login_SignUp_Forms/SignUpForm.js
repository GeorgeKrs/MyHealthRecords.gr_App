import Input from "../general/Input";

const SignUpForm = () => {
  return (
    <div className="pt-5 d-flex flex-column align-items-center mb-4">
      <Input LabelName={"Όνομα"}></Input>
      <Input LabelName={"Επώνυμο"}></Input>
      <Input LabelName={"Κωδικός"}></Input>
      <Input LabelName={"Email"}></Input>
      <Input LabelName={"ΑΦΜ (Προαιρετικό)"}></Input>
      <Input LabelName={"ΑΜΚΑ (Προαιρετικό)"}></Input>
      <Input LabelName={"Κινητό (Προαιρετικό)"}></Input>
      <div className="p-5">
        <button type="button" className="btn btn-primary">
          Εγγραφή
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
