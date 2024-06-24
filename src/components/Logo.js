import logo from "../assets/foodie-logo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Logo() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <img
      src={logo}
      onClick={() => navigate("/login")}
      width={matches ? "200vh" : "100vh"}
      style={{
        marginTop: "2vh",
        cursor: isHovered ? "pointer" : "default",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
