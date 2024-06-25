import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginRequest } from "./auth-config";
import Login from "./screens/Login";
import RecoverPassword from "./screens/RecoverPassword";
import PutEmailToRecoverPass from "./screens/PutEmailToRecoverPass";
import LicenseManagerApi from "./api/LicenseManagerApi";
import EmailSended from "./screens/EmailSended";
import RequestAccount from "./screens/RequestAccount";
import AccountRequested from "./screens/AccountRequested";
import Main from "./screens/Main";

const api = new LicenseManagerApi();

const WrappedView = () => {
  var navigate = useNavigate();
  //msal
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [loginToken, setLoginToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    // console.log("token ", token);
    // console.log("verifyToken ", token != "" ? verifyToken(token) : null);
    if (token) {
      // if (!verifyToken(token)) {
      //   navigate("/login");
      // }
      setLoginToken(token);
      // setIsAuthenticated(isTokenValid);
    } else {
      setLoginToken("");
    }
  }, [loginToken]);

  // const verifyToken = (token) => {
  //   var userObject = jwtDecode(token);
  //   console.log("userObject ", userObject);
  // };

  async function isAUser(email, token) {
    await api
      .isLogged(email)
      .then((res) => {
        console.log("responseeeee ", res);
        if (res.ok) {
          localStorage.setItem("loginToken", token);
          setLoginToken(token);
        }
        console.log(res);
      })
      .catch((error) => console.log("Error: ", error));
  }

  const handleRedirect = async () => {
    instance
      .loginPopup({
        ...loginRequest,
        prompt: "create",
      })
      .then((response) => {
        var userObject = jwtDecode(response.accessToken);
        console.log("userObject ", userObject.unique_name);
        isAUser(userObject.unique_name, response.accessToken);
        // localStorage.setItem("loginToken", response.accessToken);
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    localStorage.setItem("loginToken", "");
    setLoginToken("");
    if (activeAccount) {
      instance.logoutPopup();
    }
    navigate("/login");
    console.log("token localstorage ", localStorage.getItem("loginToken"));
  };

  const onSuccess = () => {
    console.log("Log out successfull!");
  };

  return (
    <div className="App">
      {/*loginToken != "" ? (
        <Main handleLogout={handleLogout} />
      ) : (
        <Login
          handleRedirect={handleRedirect}
          setLoginToken={setLoginToken}
          isAUser={isAUser}
        />
      )*/}
      <Login
        handleRedirect={handleRedirect}
        setLoginToken={setLoginToken}
        isAUser={isAUser}
      />
    </div>
  );
};

function App({ instance }) {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="" element={<WrappedView />}>
          </Route> */}
        <Route path="/login" element={<WrappedView />} />
        <Route path="/" element={<Main />} />
        <Route path="/request-account" element={<RequestAccount />} />
        <Route path="/reset-password" element={<RecoverPassword />} />
        <Route path="/insert-email" element={<PutEmailToRecoverPass />} />
        <Route path="/email-sended" element={<EmailSended />} />
        <Route path="/account-requested" element={<AccountRequested />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { api };
