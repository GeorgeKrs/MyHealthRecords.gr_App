import "./screens.css";
import LoginForm from "../Forms/LoginForm";

const LoginScreen = () => {
  return (
    <div className="outer-LoginDiv">
      <div className="container pt-4">
        <h2 className="text-center">
          <u>
            <b>My Health Records App.gr</b>
          </u>
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
