import React, { useState } from "react";

const AuthModel = () => {
  const [reg, setreg] = useState(true);
  const [regform, setregform] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginform, setloginform] = useState({
    email: "",
    password: "",
  });
  async function HandleReg(e) {
    e.preventDefault();
  }
  async function HandleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className="Authmodel">
      <div className="AuthNav">
        <button onClick={() => setreg((previous) => !previous)}>
          {reg ? "Login" : "Register"}
        </button>
      </div>
      <div className="Auth-form">
        {reg ? (
          <form className="Auth-reg-form" onSubmit={(e) => HandleReg(e)}>
            <label>NAME:</label>
            <input
              value={regform.username}
              onChange={(e) =>
                setregform((formdata) => ({
                  ...formdata,
                  username: e.target.value, //username
                }))
              }
            />
            <label>Email:</label>
            <input
              value={regform.email}
              onChange={(e) =>
                setregform((formdata) => ({
                  ...formdata,
                  email: e.target.value,
                }))
              }
            />
            <label>PASSWORD:</label>
            <input
              value={regform.password}
              onChange={(e) =>
                setregform((formdata) => ({
                  ...formdata,
                  password: e.target.value,
                }))
              }
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form className="Auth-login-form" onSubmit={(e) => HandleLogin(e)}>
            <label>Email:</label>
            <input
              value={loginform.email}
              onChange={(e) =>
                setloginform((formdata) => ({
                  ...formdata,
                  email: e.target.value,
                }))
              }
            />
            <label>PASSWORD:</label>
            <input
              value={loginform.password}
              onChange={(e) =>
                setloginform((formdata) => ({
                  ...formdata,
                  password: e.target.value,
                }))
              }
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModel;
