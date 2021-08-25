import LoginForm from "../Login_SignUp_Forms/LoginForm";

const LoginScreen = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--color-green)",
        height: "100vh",
        padding: "14vh",
      }}
    >
      <div className="container pt-4">
        <h2 className="text-center">
          <b>My Health Records App.gr</b>
        </h2>
        <div className="row pt-2 justify-content-center">
          <div className="col-sm-4 col-lg-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
