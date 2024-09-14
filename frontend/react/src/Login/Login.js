import React from "react";
import "./Login.css";

function Login() {
  return (
    <React.Fragment>
      <div className="App-body">
        <form>
          <input type="email" name="Email Address" placeholder="Email Address"></input>

          <input type="password" name="password" placeholder="Password"></input>

	  <p>By signing up, you are agreeing to our privacy policy, terms of use and code of conduct.</p>

          <input type="Login" value="Login"></input>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
