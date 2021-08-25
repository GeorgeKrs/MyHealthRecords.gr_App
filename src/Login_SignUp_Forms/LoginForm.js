import Input from "../general/Input";

const LoginForm = () => {
  return (
    <div className="pt-5 d-flex flex-column mb-4">
      <Input LabelName={"Email"}></Input>
      <Input LabelName={"Κωδικός"}></Input>
      <div className="mt-4 p-2">
        <button type="button" className="btn btn-primary">
          Είσοδος
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
