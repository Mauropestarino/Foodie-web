import Logo from "../components/Logo";
import emailSendedImg from "../assets/img-send-email.png";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import appsettings from "../appsettings.json";

export default function AccountRequested(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Grid container sx={container}>
      <Grid xs={12} md={12} sx={alignCenter}>
        <Logo />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography sx={title}>¡La solicitud fue enviada!</Typography>
        <Typography sx={text}>
          El administrador se pondrá en contacto y recibirás un correo en{" "}
          <Typography
            component="span"
            sx={{ color: "gray", fontSize: "2vh", fontWeight: "bold" }}
          >
            {state.email}
          </Typography>{" "}
          cuando tu cuenta haya sido dada de alta.
        </Typography>

        <Button sx={button} onClick={() => navigate("/login")}>
          Ir al inicio
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
  textAlign: "flex-start",
};

const text = {
  color: "gray",
  fontSize: "2vh",
  textAlign: "flex-start",
  marginBottom: "4vh",
};

const alignCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const button = {
  backgroundColor: appsettings.colors.primary,
  color: "white",
  width: "60%",
  borderRadius: 20,
  marginTop: "6vh",
};

const image = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};
