import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import appsettings from "../appsettings.json";
import { isValidPassword, isNotEmptyString } from "../utils";
import Logo from "../components/Logo";
import { api } from "../App";

export default function RecoverPassword() {
  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const matches = useMediaQuery("(min-width:600px)");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isInputPasswordOk = (password, value, value2) => {
    if (!isNotEmptyString(value)) {
      setError({
        ...error,
        [password + "Error"]: "La contraseña no puede estar vacía",
      });

      return;
    } else if (!isValidPassword(value)) {
      console.log("La contraseña es muy corta");
      setError({
        ...error,
        [password + "Error"]: "La contraseña es muy corta",
      });
      return;
    } else if (value !== value2) {
      console.log(
        "Las contraseñas no coinciden ",
        value,
        " - ",
        value2,
        " - ",
        value !== value2
      );
      setError({
        passwordError: " ",
        confirmPasswordError: "Las contraseñas no coinciden",
      });
    } else if (value === value2) {
      console.log("Las contraseñas coinciden ");
      setError({
        passwordError: "",
        confirmPasswordError: "",
      });
    }
  };

  const handleChangePassword = (e, typeInput) => {
    setPasswords({ ...passwords, password: e.target.value });
    isInputPasswordOk(typeInput, e.target.value, passwords.confirmPassword);
  };

  const handleChangeConfirmPassword = (e, typeInput) => {
    setPasswords({ ...passwords, confirmPassword: e.target.value });
    isInputPasswordOk(typeInput, e.target.value, passwords.password);
  };

  const areAllErrorsEmpty = () => {
    for (const key in error) {
      if (error.hasOwnProperty(key) && error[key] !== "") {
        return false;
      }
    }
    return true;
  };

  const changePassword = async () => {
    await api.changePassword({
      token: "poner token",
      newPassword: passwords.password,
    });
  };

  return (
    <Box sx={container}>
      <Logo />
      <Box sx={subContainer}>
        <Typography sx={title}>Ingresa la nueva contraseña</Typography>
        <Typography sx={text}>Por favor, rellena todos los campos.</Typography>

        <Box sx={alignRight}>
          <FormControl
            sx={[input, matches ? { width: "20vw" } : { width: "60vw" }]}
            variant="standard"
            error={error.passwordError != ""}
            onBlur={(e) =>
              isInputPasswordOk(
                "password",
                e.target.value,
                passwords.confirmPassword
              )
            }
          >
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleChangePassword(e, "password")}
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
          <FormControl
            sx={[input, matches ? { width: "20vw" } : { width: "60vw" }]}
            variant="standard"
            error={error.confirmPasswordError != ""}
            onBlur={(e) =>
              isInputPasswordOk(
                "confirmPassword",
                e.target.value,
                passwords.password
              )
            }
          >
            <InputLabel htmlFor="standard-adornment-password">
              Confirmar contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                handleChangeConfirmPassword(e, "confirmPassword")
              }
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
              {error.confirmPasswordError}
            </FormHelperText>
          </FormControl>

          <Button
            sx={
              !areAllErrorsEmpty() ||
              passwords.password === "" ||
              passwords.confirmPassword === "" ||
              passwords.password !== passwords.confirmPassword
                ? [button, { backgroundColor: "gray" }]
                : button
            }
            disabled={
              !areAllErrorsEmpty() ||
              passwords.password === "" ||
              passwords.confirmPassword === "" ||
              passwords.password !== passwords.confirmPassword
            }
            onClick={changePassword}
          >
            Modificar contraseña
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "80%",
  height: "100vh",
  marginLeft: "10%",
  marginRight: "10%",
};

const subContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

const alignRight = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

const columnAlignment = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "25vw",
  height: "25vh",
  marginLeft: "8vh",
  marginRight: "8vh",
};

const rowAlignment = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

const title = {
  color: appsettings.colors.primary,
  fontSize: "4vh",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "1vh",
};

const text = {
  color: "gray",
  fontSize: "2vh",
  textAlign: "center",
  marginBottom: "5vh",
};

const input = {
  width: "100%",
  marginBottom: "2vh",
  marginTop: "1vh",
};

const button = {
  backgroundColor: appsettings.colors.primary,
  color: "white",
  width: "100%",
  borderRadius: 20,
  marginTop: "6vh",
  marginBottom: "12vh",
};

const errorText = {
  color: "#bd2406",
};
