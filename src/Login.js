import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./services/auth.service";

function Login({ logged, setLogged }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  //eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      navigate("/clubs");
    }
    //eslint-disable-next-line
  }, [logged]);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    setLoading(true);
    const res = await auth({ username, password });

    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
      setErrorMessages({ name: "pass", message: "" });
      setLogged(true);
    } else {
      setLogged(false);
      setErrorMessages({ name: "pass", message: res.error });
    }

    setLoading(false);

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="uname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="login-sbm"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
