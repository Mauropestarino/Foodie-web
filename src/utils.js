function isValidEmail(email) {
  // Expresión regular para validar un formato de email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Prueba el email con la expresión regular
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Verifica si la longitud de la contraseña es al menos 8 caracteres
  return password.length >= 3;
}

function isNotEmptyString(value) {
  // Verifica que el valor no sea null, undefined ni una cadena vacía
  return value != null && value !== "";
}

export { isValidEmail, isValidPassword, isNotEmptyString };
