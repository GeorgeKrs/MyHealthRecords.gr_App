import "./screens.css";
import SignUpForm from "../Forms/SignUpForm";

const SignUpScreen = () => {
  return (
    <div className="outer-SignUpDiv">
      <div className="container pt-5">
        <h2 className="text-center">
          <u>
            <b>My Health Records App.gr</b>
          </u>
        </h2>
        <div className="row pt-2 justify-content-center">
          <div className="col-sm-12 col-lg-7 h-100">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
