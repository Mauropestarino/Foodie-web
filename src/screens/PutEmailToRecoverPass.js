import Logo from "../components/Logo";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, useLocation } from "react-router-dom";
import appsettings from "../appsettings.json";
import { isValidEmail, isNotEmptyString } from "../utils";
import { api } from "../App";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const [error, setError] = useState({ emailError: "" });
  const [email, setEmail] = useState({ userEmail: "" });
  const [recaptcha, setRecaptcha] = useState(false);

  const location = useLocation();
  const mail = location.state.email;

  const matches = useMediaQuery("(min-width:600px)");

  const isInputEmailOk = (typeInput) => {
    if (typeInput === "email") {
      if (!isNotEmptyString(email.userEmail)) {
        setError({ ...error, emailError: "El email no puede estar vacío" });
      } else if (!isValidEmail(email.userEmail)) {
        setError({ ...error, emailError: "El formato del email no es válido" });
      } else {
        setError({ ...error, emailError: "" });
      }
    }
  };

  const handleChangeEmail = (e) => {
    setEmail({ userEmail: e });
  };

  const onChangeCaptcha = () => {
    console.log(!recaptcha);
    setRecaptcha(!recaptcha);
  };

  const recoverPasswordEmail = async () => {
    await api
      .recoverPasswordEmail(email)
      .then((res) => res.json())
      .then((result) => navigate("/email-sended", { state: { email: email } }))
      .catch((error) => console.log("Error al enviar el correo: ", error));
  };

  return (
    <Box sx={container}>
      <Grid item xs={12} md={12} sx={alignCenter}>
        <Logo />
      </Grid>
      <Box>
        <Typography sx={title}>¿Olvidaste tu contraseña?</Typography>
        <Typography sx={title}>¡No te preocupes!</Typography>
        <Typography sx={text}>
          Siempre y cuando tengas acceso al correo electrónico que utilizaste
          para crear tu cuenta, podrás recuperar tu contraseña sin problema.
        </Typography>
      </Box>
      <TextField
        autoFocus
        id="standard-basic"
        error={error.emailError != ""}
        label="Email"
        variant="standard"
        defaultValue={mail}
        sx={[input, matches ? { width: "30vw" } : { width: "80vw" }]}
        onChange={(e) => handleChangeEmail(e.target.value)}
        onBlur={() => isInputEmailOk("email")}
        helperText={error.emailError}
      />
      <ReCAPTCHA
        sitekey="6LcgMSQpAAAAAMqUPzBHjmrov4LE-0K-vk-gJzTE"
        onChange={onChangeCaptcha}
      />
      <Button
        sx={
          error.emailError != "" || !recaptcha
            ? [button, { backgroundColor: "gray" }]
            : button
        }
        disabled={error.emailError != "" || !recaptcha}
        onClick={recoverPasswordEmail}
      >
        Recuperar contraseña
      </Button>
      <Box />
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
  textAlign: "left",
};

const text = {
  color: "gray",
  fontSize: "2vh",
  textAlign: "left",
  marginBottom: "4vh",
  maxWidth: 500,
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
  backgroundColor: appsettings.colors.primary,
  color: "white",
  borderRadius: 20,
  marginTop: "6vh",
  paddingLeft: "10%",
  paddingRight: "10%",
};

const alignCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
