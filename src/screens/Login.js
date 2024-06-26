import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword, isNotEmptyString } from "../utils";
import appsettings from "../appsettings.json";
import OutlookButton from "../components/OutlookButton";
import { api } from "../App";
import Logo from "../components/Logo";

export default function Login({ handleRedirect, setLoginToken, isAUser }) {
  var navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState({ emailError: "", passwordError: "" });

  const matches = useMediaQuery("(min-width:600px)");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isValidInput = (typeInput) => {
    isInputEmailOk(typeInput);
    isInputPasswordOk(typeInput);
  };

  const isInputEmailOk = (typeInput) => {
    if (typeInput === "email") {
      if (!isNotEmptyString(loginInfo.email)) {
        setError({ ...error, emailError: "El email no puede estar vacío" });
      } else if (!isValidEmail(loginInfo.email)) {
        setError({ ...error, emailError: "El formato del email no es válido" });
      } else {
        setError({ ...error, emailError: "" });
      }
    }
  };

  const isInputPasswordOk = (typeInput) => {
    if (typeInput === "password") {
      if (!isNotEmptyString(loginInfo.password)) {
        setError({
          ...error,
          passwordError: "La contraseña no puede estar vacía",
        });
      } else if (!isValidPassword(loginInfo.password)) {
        setError({ ...error, passwordError: "La contraseña es muy corta" });
      } else {
        setError({ ...error, passwordError: "" });
      }
    }
  };

  const handleChangeInput = (e, typeInput) => {
    if (typeInput === "email") {
      setLoginInfo({ ...loginInfo, email: e.target.value });
    } else if (typeInput === "password") {
      setLoginInfo({ ...loginInfo, password: e.target.value });
    }
    isValidInput(typeInput);
  };

  const loginWithEmail = async () => {
    setTimeout(async () => {
      if (error.emailError === "" || error.passwordError === "") {
        await api
          .login(loginInfo)
          .then((res) => res.json())
          .then((result) => {
            if (result.auth) {
              localStorage.setItem("loginToken", `Bearer ${result.token}`);
              navigate("/");
            }
          });
      }
    }, 3000);
  };

  const onSuccess = (res) => {
    console.log("Login Success. User: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login Failed. Res: ", res);
  };

  const forgotPassword = () => {
    navigate("/insert-email", { state: { email: loginInfo.email } });
  };

  return (
    <Grid container spacing={2} sx={container}>
      <Grid item xs={12} md={12} sx={alignCenter}>
        <Logo />
        <Box sx={alignRight}>
          <Typography sx={title}>¡Bienvenido a nuestro portal!</Typography>
          <Typography sx={text}>
            Inicia sesión para visualizar tu stock y tus recetas.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} sx={alignCenter}>
        <Box>
          <TextField
            autoFocus
            id="standard-basic"
            error={error.emailError != ""}
            label="Email"
            variant="standard"
            sx={input}
            onChange={(e) => handleChangeInput(e, "email")}
            onBlur={() => isValidInput("email")}
            helperText={error.emailError}
          />
          <FormControl
            sx={input}
            variant="standard"
            error={error.passwordError != ""}
            onBlur={() => isValidInput("password")}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleChangeInput(e, "password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <FormHelperText id="component-error-text">
              {error.passwordError}
            </FormHelperText>
          </FormControl>

          <Button
            sx={
              error.emailError != "" || error.passwordError != ""
                ? [button, { backgroundColor: "gray" }]
                : button
            }
            disabled={error.emailError != "" || error.passwordError != ""}
            onClick={loginWithEmail}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} sx={rowAlignment}>
        <Typography sx={{ marginRight: 1 }}>¿Eres nuevo? </Typography>
        <Typography
          sx={{
            color: "#537ec9",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/registrarme")}
        >
          Crear una cuenta
        </Typography>
      </Grid>
    </Grid>
  );
}

const container = {
  display: "flex",
  height: "100vh",
};

const alignRight = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  marginLeft: "10%",
  marginRight: "10%",
};

const alignCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const columnAlignment = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  marginTop: "2vh",
  width: "25vw",
  height: "15vh",
};

const rowAlignment = {
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  justifyContent: "center",
  marginBottom: "1vh",
};

const title = {
  color: appsettings.colors.primary,
  fontSize: "4vh",
  fontWeight: "bold",
  marginTop: "2vh",
  textAlign: "center",
};

const text = {
  color: "gray",
  fontSize: "2vh",
  textAlign: "right",
  maxWidth: 350,
};

const forgetPasswordText = {
  color: "#537ec9",
  fontSize: "2vh",
  textAlign: "right",
  width: "100%",
  marginTop: "2vh",
  "&:hover": {
    cursor: "pointer",
  },
};

const input = {
  width: "100%",
  marginBottom: "1vh",
  marginTop: "1vh",
};

const button = {
  backgroundColor: appsettings.colors.primary,
  color: "white",
  width: "100%",
  borderRadius: 20,
  marginTop: "6vh",
};

const margin = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10%",
  marginRight: "10%",
};
