import Logo from "../components/Logo";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import appsettings from "../appsettings.json";
import { isValidEmail, isNotEmptyString } from "../utils";
import { api } from "../App";

export default function RequestAccount() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    companyError: "",
    emailError: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
  });

  const matches = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isInputEmailOk = () => {
    if (!isNotEmptyString(formData.email)) {
      setError({ ...error, emailError: "El email no puede estar vacío" });
    } else if (!isValidEmail(formData.email)) {
      setError({ ...error, emailError: "El formato del email no es válido" });
    } else {
      setError({ ...error, emailError: "" });
    }
  };

  const isInputOk = (e, prop) => {
    const errorMessages = {
      name: "El nombre no puede estar vacío",
      lastName: "El apellido no puede estar vacío",
      company: "La empresa no puede estar vacía",
    };

    const condition = !isNotEmptyString(formData[e.target.name]);

    setError({
      ...error,
      [prop + "Error"]: condition ? errorMessages[prop] : "",
    });
  };

  const areAllErrorsEmpty = () => {
    for (const key in error) {
      if (error.hasOwnProperty(key) && error[key] !== "") {
        return false;
      }
    }
    return true;
  };

  const sendEmailToCreateAccount = () => {
    setTimeout(() => {
      if (areAllErrorsEmpty) {
        emailToCreateAccount();
      }
      return;
    }, 3000);

    const emailToCreateAccount = async () => {
      await api
        .emailToCreateAccount(formData)
        .then(() =>
          navigate("/account-requested", { state: { email: formData.email } })
        )
        .catch((error) => console.log("Error al enviar el correo: ", error));
    };
    return;
  };

  return (
    <Box sx={container}>
      <Logo />
      <Box>
        <Typography sx={title}>¡Solicita tu cuenta!</Typography>
        <Typography sx={text}>
          Por favor, rellena todos los campos. <br /> Te enviamos un correo
          cuando esté listo.
        </Typography>
      </Box>
      <TextField
        autoFocus
        id="standard-basic"
        error={error.nameError != ""}
        label="Nombre/s"
        variant="standard"
        name="name"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={(e) => handleChange(e, "name")}
        onBlur={(e) => isInputOk(e, "name")}
        helperText={error.nameError}
      />
      <TextField
        id="standard-basic"
        error={error.lastNameError != ""}
        label="Apellido/s"
        variant="standard"
        name="lastName"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={(e) => handleChange(e, "lastName")}
        onBlur={(e) => isInputOk(e, "lastName")}
        helperText={error.lastNameError}
      />
      <TextField
        id="standard-basic"
        error={error.companyError != ""}
        label="Empresa"
        variant="standard"
        name="company"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={(e) => handleChange(e, "company")}
        onBlur={(e) => isInputOk(e, "company")}
        helperText={error.companyError}
      />
      <TextField
        id="standard-basic"
        error={error.emailError != ""}
        label="Correo electrónico"
        variant="standard"
        name="email"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={(e) => handleChange(e, "email")}
        onBlur={() => isInputEmailOk("email")}
        helperText={error.emailError}
      />
      <Button
        sx={
          !areAllErrorsEmpty() ? [button, { backgroundColor: "gray" }] : button
        }
        disabled={!areAllErrorsEmpty()}
        onClick={sendEmailToCreateAccount}
      >
        ¡Listo! Enviar
      </Button>
      <div style={{ height: "10%" }}></div>
    </Box>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80%",
  height: "100vh",
  marginLeft: "10%",
  marginRight: "10%",
};

const title = {
  color: appsettings.colors.primary,
  fontSize: "4vh",
  fontWeight: "bold",
  textAlign: "center",
};

const text = {
  color: "gray",
  fontSize: "2vh",
  textAlign: "center",
  marginBottom: "4vh",
};

const subtext = {
  fontSize: "2vh",
  textAlign: "center",
};

const input = {
  marginBottom: "1vh",
  marginTop: "1vh",
};

const button = {
  backgroundColor: appsettings.colors.accent,
  color: "white",
  borderRadius: 20,
  marginTop: "6vh",
  paddingLeft: "10vh",
  paddingRight: "10vh",
};
