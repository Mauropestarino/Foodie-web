import Logo from "../components/Logo";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import appsettings from "../appsettings.json";
import { isValidEmail, isNotEmptyString } from "../utils";
import { api } from "../App";

const RestriccionesEnum = {
  CELIACO: "Celiaquía",
  EMBARAZADA: "Embarazo",
  VEGETARIANO: "Vegetarianismo",
  VEGANO: "Veganismo",
  DIABETES: "Diabetes",
  KOSHER: "Kosher",
  HIPERTENSION: "Hipertensión",
  INTOLERANTE_LACTOSA: "Intolerancia a la lactosa",
};

export default function CreateUser() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    ageError: "",
  });
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    edad: "",
    restricciones: [],
  });

  const matches = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      nombre: "El nombre no puede estar vacío",
      apellido: "El apellido no puede estar vacío",
      password: "La contraseña no puede estar vacía",
      edad: "La edad no puede estar vacía",
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

  const handleCreateUser = async () => {
    const payload = {
      mail: formData.email,
      password: formData.password,
      persona: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: parseInt(formData.edad, 10),
        restricciones: formData.restricciones.map(restriccion => RestriccionesEnum[restriccion]),
      }
    };

    try {
      await api.createUser(payload);
      await ingresarACuenta({ email: formData.email, password: formData.password }, navigate);
    } catch (error) {
      console.log("Error al crear usuario: ", error);
    }
  };

  const ingresarACuenta = async (loginInfo, navigate) => {
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

  return (
    <Box sx={container}>
      <Logo />
      <Box>
        <Typography sx={title}>¡Registrate!</Typography>
        <Typography sx={text}>
          Por favor, rellena todos los campos.
        </Typography>
      </Box>
      <TextField
        autoFocus
        id="nombre"
        error={error.nameError !== ""}
        label="Nombre/s"
        variant="standard"
        name="nombre"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={handleChange}
        onBlur={(e) => isInputOk(e, "name")}
        helperText={error.nameError}
      />
      <TextField
        id="apellido"
        error={error.lastNameError !== ""}
        label="Apellido/s"
        variant="standard"
        name="apellido"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={handleChange}
        onBlur={(e) => isInputOk(e, "lastName")}
        helperText={error.lastNameError}
      />
      <TextField
        id="email"
        error={error.emailError !== ""}
        label="Correo electrónico"
        variant="standard"
        name="email"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={handleChange}
        onBlur={isInputEmailOk}
        helperText={error.emailError}
      />
      <TextField
        id="password"
        error={error.passwordError !== ""}
        label="Contraseña"
        variant="standard"
        type="password"
        name="password"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={handleChange}
        onBlur={(e) => isInputOk(e, "password")}
        helperText={error.passwordError}
      />
      <TextField
        id="edad"
        error={error.ageError !== ""}
        label="Edad"
        variant="standard"
        type="int"
        name="edad"
        sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}
        onChange={handleChange}
        onBlur={(e) => isInputOk(e, "age")}
        helperText={error.ageError}
      />
      <FormControl variant="standard" sx={[input, matches ? { width: "20vw" } : { width: "70vw" }]}>
        <InputLabel>Restricciones</InputLabel>
        <Select
          multiple
          value={formData.restricciones}
          onChange={handleChange}
          label="Restricciones"
          name="restricciones"
        >
          {Object.entries(RestriccionesEnum).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{
          ...button,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: !areAllErrorsEmpty() ? "gray" : button.backgroundColor
        }}
        disabled={!areAllErrorsEmpty()}
        onClick={handleCreateUser}
      >
        Registrarme
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
}