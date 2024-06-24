import Logo from "../components/Logo";
import emailSendedImg from "../assets/img-send-email.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import appsettings from "../appsettings.json";
import { api } from "../App";

export default function EmailSended() {
  const [count, setCount] = useState(60);
  const [active, setActive] = useState(true);

  const matches = useMediaQuery("(min-width:600px)");

  const location = useLocation();
  const email = location.state.email;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setActive(false);
    };
  }, [active]);

  const recoverPasswordEmail = async () => {
    await api
      .recoverPasswordEmail(email)
      .then((res) => res.json())
      .then(() => {
        setCount(60);
        setActive(true);
        return;
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <Grid container sx={container}>
      <Grid item xs={12} sx={alignCenter}>
        <Logo />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography sx={title}>¡Te enviamos un correo a tu casilla!</Typography>
        <Typography sx={text}>
          Te enviamos un correo a{" "}
          <Typography
            component="span"
            sx={{ color: "gray", fontSize: "2vh", fontWeight: "bold" }}
          >
            {email.userEmail}
          </Typography>{" "}
          para que puedas reestablecer tu contraseña. Este puede demorar unos
          minutos en llegar. Cuando lo recibas, segui las instrucciones y podrás
          volver a acceder al portal sin problemas.
        </Typography>
        <Typography sx={text}>
          ¿No lo recibiste? Intentalo nuevamente en unos segundos.
        </Typography>
        <Button
          sx={count > 0 ? [button, { backgroundColor: "gray" }] : button}
          disabled={count > 0}
          onClick={recoverPasswordEmail}
        >
          Volver a enviar {count > 0 ? `(${count}s)` : null}
        </Button>
      </Grid>
      <Grid xs={12} md={6} sx={[image, matches ? { marginTop: "15vh" } : null]}>
        <img src={emailSendedImg} width={"85%"} height={"70%"} />
      </Grid>
    </Grid>
  );
}

const container = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
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
};

const button = {
  backgroundColor: appsettings.colors.primary,
  color: "white",
  width: "60%",
  borderRadius: 20,
  marginTop: "2vh",
};

const alignCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const image = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};
