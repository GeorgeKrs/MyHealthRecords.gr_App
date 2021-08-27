import "./screens.css";
import SignUpForm from "../Login_SignUp_Forms/SignUpForm";

const SignUpScreen = () => {
  return (
    <div className="outer-SignUpDiv">
      <div className="container pt-5">
        <h2 className="text-center">
          <b>My Health Records App.gr</b>
        </h2>
        <div className="row pt-2 justify-content-center">
          <div className="col-sm-12 col-lg-7">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
