import React, { Fragment,  useState } from "react";
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";
import { useNavigate } from "react-router-dom";

function LoginFunc(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({ type: "d-none", message: "" });
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.jwt === "") {
      navigate("/login");
      return;
    }

    if (email === "") {
      errors.push("email");
    }

    if (password === "") {
      errors.push("password");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());
    
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
    }

    fetch(`${process.env.REACT_APP_API_URL}/v1/signin`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {}
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setAlert({type: "alert-danger", message: "Invalid login" });
                } else {
                    handleJWTChange(Object.values(data)[0]);
                    window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
                    /* Trevor code - change start */
              let date = new Date();
              let expDays = 1;
              date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
              const expires = "expires=" + date.toUTCString();
 
              // set the cookie
              document.cookie =  "jwt="
                  + JSON.stringify(Object.values(data)[0])
                  + "; "
                  + expires
                  + "; path=/; SameSite=Strict; Secure;";
              /* Trevor code - change end */
                    navigate('/admin');
                }
            })

  };

  function handleJWTChange(jwt) {
    props.handleJWTChange(jwt);
  }

  function hasError(key) {
    return errors.indexOf(key) !== -1;
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <Fragment>
      <h2>Login</h2>
      <hr />
      <Alert alertType={alert.type} alertMessage={alert.message} />

      <form className="pt-3" onSubmit={handleSubmit}>
        <Input
          title={"Email"}
          type={"email"}
          name={"email"}
          handleChange={handleEmail}
          className={hasError("email") ? "is-invalid" : ""}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a valid email address"}
        />

        <Input
          title={"Password"}
          type={"password"}
          name={"password"}
          handleChange={handlePassword}
          className={hasError("password") ? "is-invalid" : ""}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a password"}
        />

        <hr />
        <button className="btn btn-primary">Login</button>
      </form>
    </Fragment>
  );
}

export default LoginFunc;
