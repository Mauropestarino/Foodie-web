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
import FoodieBackendApi from "./api/FoodieBackendApi";
import CreateAccount from "./screens/CreateAccount";
import Main from "./screens/Main";

const api = new FoodieBackendApi();

const WrappedView = () => {
  var navigate = useNavigate();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [loginToken, setLoginToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    console.log("Adento del useEffect");
    console.log(`${token}`);
    if (token) {    
      setLoginToken(token);
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setIsAuthenticated(false);
      navigate("/login");
      setLoginToken("");
    }
  }, [navigate]);

  const handleRedirect = async () => {
    instance
      .loginPopup({
        ...loginRequest,
        prompt: "create",
      })
      .then((response) => {
        var userObject = jwtDecode(response.accessToken);
        console.log("userObject ", userObject.unique_name);
        //isAUser(userObject.unique_name, response.accessToken);
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
    console.log("token localstorage borrado", localStorage.getItem("loginToken"));
  };

  const onSuccess = () => {
    console.log("Log out successfull!");
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Main handleLogout={handleLogout} />
      ) : (
        <Login
          handleRedirect={handleRedirect}
          setLoginToken={setLoginToken}
          //isAUser={isAUser}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WrappedView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Main />} />
        <Route path="/registrarme" element={<CreateAccount />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { api };

/*
         />
        <Route path="/reset-password" element={<RecoverPassword />} />
        <Route path="/insert-email" element={<PutEmailToRecoverPass />} />
        <Route path="/email-sended" element={<EmailSended />} />
        <Route path="/account-requested" element={<AccountRequested />} />
*/