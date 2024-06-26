import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  width: '200px', // Ancho fijo de la tarjeta
  height: '200px', // Altura fija de la tarjeta
  textAlign: 'center', // Centra el contenido
  borderRadius: '10px', // Redondea las esquinas
  overflow: 'hidden', // Oculta cualquier desbordamiento
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Añade una sombra
  padding: '10px', // Añade padding interno
  backgroundColor: '#EDEDED', // Color de fondo de la tarjeta
});

const StyledCardMedia = styled(CardMedia)({
  height: 100, // Altura fija para la imagen
  objectFit: 'contain', // Asegura que la imagen no se distorsione
  marginBottom: '10px', // Espaciado inferior
});

const QuantityBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px', // Espacio superior
});

function StockCard({ image, name, quantity, unit }) {
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom sx={{ color: '#676767' }}>
          {name}
        </Typography>
        <QuantityBox>
          <Typography variant="h5" component="div" sx={{ color: '#676767' }}>{quantity}</Typography> {/* Aumentar el tamaño del valor de la cantidad */}
          <Typography variant="body1" sx={{ marginLeft: '4px', color: '#676767' }}>{unit}</Typography> {/* Ajustar el tamaño de la unidad */}
        </QuantityBox>
      </CardContent>
    </StyledCard>
  );
}

export default StockCard;
