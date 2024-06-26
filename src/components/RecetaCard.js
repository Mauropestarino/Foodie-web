import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const StyledCard = styled(Card)({
  width: '100%', // Ajusta la tarjeta para que ocupe el 100% del ancho del contenedor
  height: 'auto', // Ajusta la altura automáticamente
  position: 'relative', // Posiciona los elementos relativos a la tarjeta
  marginBottom: '20px', // Añade margen inferior para separación
  borderRadius: '10px', // Redondea las esquinas
  overflow: 'hidden', // Oculta cualquier desbordamiento
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Añade una sombra
});

const ImageContainer = styled(Box)({
  position: 'relative',
  //marginBottom: '5px', // Mismo margen que SectionContainer
  padding: '20px', // Mismo padding que SectionContainer
  borderRadius: '10px', // Bordes redondeados
  overflow: 'hidden', // Oculta cualquier desbordamiento
  backgroundColor: '#FFFFFF', // Fondo para igualar el padding
});

const StyledCardMedia = styled(CardMedia)({
  height: 200, // Altura fija para la imagen
  objectFit: 'cover', // Asegura que la imagen cubra la tarjeta sin distorsionarse
  borderRadius: '10px', // Bordes redondeados para la imagen
});

const TextOverlay = styled(Box)({
    position: 'absolute',
    top: '20px', // Mismo padding que el contenedor
    left: '20px', // Mismo padding que el contenedor
    right: '20px', // Mismo padding que el contenedor
    bottom: '20px', // Mismo padding que el contenedor
    background: 'rgba(0, 0, 0, 0.5)', // Fondo tenue (negro con opacidad)
    color: 'white', // Texto en blanco
    display: 'flex', // Para centrar el texto
    alignItems: 'center', // Para centrar el texto verticalmente
    justifyContent: 'center', // Para centrar el texto horizontalmente
    borderRadius: '10px', // Bordes redondeados para la superposición de texto
});

const SectionContainer = styled(Box)({
  backgroundColor: '#F1EDFF', // Fondo para las secciones de ingredientes y pasos
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '10px',
  marginTop:'0px', 
});

const SectionTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#333', // Color del título de la sección
  marginBottom: '10px', // Espaciado inferior debajo del título
});

const IngredientsList = styled(List)({
  padding: 0,
  '& .MuiListItem-root': {
    paddingLeft: 0,
    margin: '-10px 0',
  }
});

const StepsList = styled(List)({
  padding: 0,
  '& .MuiListItem-root': {
    paddingLeft: 0,
    margin: '-10px 0',
  }
});

function RecetaCard({ image, title, ingredients, steps }) {
  return (
    <StyledCard>
      <ImageContainer>
        <StyledCardMedia
          component="img"
          image={image}
          alt={title}
        />
        <TextOverlay>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </TextOverlay>
      </ImageContainer>
      <CardContent>
        <SectionContainer>
          <SectionTitle>Ingredientes</SectionTitle>
          <IngredientsList>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary=  {`${ingredient.description}: ${ingredient.quantity} ${ingredient.unit}`} />
              </ListItem>
            ))}
          </IngredientsList>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Preparación</SectionTitle>
          <StepsList>
            {steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </StepsList>
        </SectionContainer>
      </CardContent>
    </StyledCard>
  );
}

export default RecetaCard;
