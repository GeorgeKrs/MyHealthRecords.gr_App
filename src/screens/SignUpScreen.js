import SignUpForm from "../Login_SignUp_Forms/SignUpForm";

const SignUpScreen = () => {
  return (
    <div
      id="SignUp_Background"
      style={{
        background: "linear-gradient(#1dcdfe, #34f5c5)",
      }}
    >
      <div className="container pt-5">
        {/* on fullscreen */}
        <h2 className="d-none d-lg-block text-Left">
          <b>My Health Records App.gr</b>
        </h2>
        {/* on small screens */}
        <h2 className="d-sm-block d-md-block d-lg-none text-center">
          <b>My Health Records App.gr</b>
        </h2>

        <div className="row pt-2">
          <div className="d-none d-lg-block col-lg-6">
            <img src="" className="img-fluid" alt="SIGN UP IMAGE"></img>
          </div>
          <div className="col-sm-12 col-lg-6">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
