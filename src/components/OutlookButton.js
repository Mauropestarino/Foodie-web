import outlookLogo from "../assets/outlook.png";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function OutlookButton({ onClick }) {
  const matches = useMediaQuery("(min-width:600px)");

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e0e0e0", // Borde cuadrado gris
    borderRadius: "4px",
    padding: "10px", // Espaciado interno
    cursor: "pointer",
    backgroundColor: "white",
    width: matches ? "30vw" : "80vw",
  };

  const logoStyle = {
    marginRight: "8px", // Espaciado entre el logo y el texto
    width: 22,
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <img src={outlookLogo} alt="Outlook Logo" style={logoStyle} />
      <span style={{ color: "black", fontSize: 14 }}>Acceder con Outlook</span>
    </button>
  );
}
