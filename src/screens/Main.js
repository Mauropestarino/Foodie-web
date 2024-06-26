import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { styled, useTheme } from "@mui/material/styles";
import logo from "../assets/foodie-logo.png";
import ortLogo from "../assets/ort-logo.jpeg";
import FavoriteIcon from "../assets/favorite.svg";
import StockIcon from "../assets/stock.svg";
import EditIcon from "../assets/edit.svg";
import HistoryIcon from "../assets/history.svg";
import LogoutIcon from "../assets/ic_logout.svg";
import { useState, useEffect } from "react";
import RecetaCard from '../components/RecetaCard';
import StockCard from '../components/StockCard';
import FoodieBackendApi from '../api/FoodieBackendApi';
import Masonry from 'react-masonry-css';

const api = new FoodieBackendApi();

const drawerWidth = 250;

const MainBox = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `calc(${theme.spacing(7)} + 10px)`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Main({ handleLogout }) {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(false);
  const [favoritas, setFavoritas] = useState([]);
  const [creadas, setCreadas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [stock, setStock] = useState([]);


  const matches = useMediaQuery("(min-width:600px)");

  const toggleDrawer = (open) => {
    console.log("estado drawer ", openDrawer);
    setOpenDrawer(open);
  };

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 10px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 10px)`,
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawerOptions = [
    {
      text: "Favoritas",
      icon: FavoriteIcon,
      show: true,
    },
    {
      text: "Creadas",
      icon: EditIcon,
      show: true,
    },
    {
      text: "Historial",
      icon: HistoryIcon,
      show: true,
    },
    {
      text: "Stock",
      icon: StockIcon,
      show: true,
    },
  ];

  const drawer = (
    <Box sx={containerDrawer}>
      <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <ListItemButton
          onClick={() => {
            localStorage.removeItem('loginToken');
            window.location.href = '/login';
          }}
          sx={{
            paddingLeft: '0px',
            justifyContent: 'flex-start'
           }}
        >
        <ListItemIcon>
          <img src={LogoutIcon} alt="CERRAR SESIÓN" width={55} height={55} />
        </ListItemIcon>
          <ListItemText
          primary="CERRAR SESIÓN"
          disableTypography
            sx={{
              fontWeight: "normal",
              color: "#7B5FF1",
              paddingLeft: "20px"
            }}         
          />
        </ListItemButton>
      </Toolbar>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        orientation="vertical"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#7B5FF1",
            left: 0,
            width: 4,
          },
        }}
        sx={{ width: "100%", padding: 0, margin: 0 }}
      >
        {drawerOptions.map((option, index) =>
          openDrawer || option.show ? (
            <Tab
              key={index}
              sx={
                value === index
                  ? {
                      backgroundColor: "#CAC3EB",
                      alignItems: "start",
                      padding: 0,
                      margin: 0,
                    }
                  : { alignItems: "start", padding: 0, margin: 0 }
              }
              label={
                <ListItemButton onClick={() => toggleDrawer(true)}>
                  <ListItemIcon>
                    <img
                      src={option.icon}
                      width={55}
                      height={55}
                      alt={option.text}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={option.text}
                    disableTypography
                    sx={{
                      fontWeight: option.show ? "bold" : "normal",
                      color: "#7B5FF1",
                      paddingLeft: "20px"
                    }}
                  />
                </ListItemButton>
              }
            />
          ) : null
        )}
      </Tabs>
      <Box sx={{ marginBottom: "1vh" }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          if (openDrawer) {
            toggleDrawer(false);
            setValue(false); // Cambia a la pantalla original del home
          } else {
            toggleDrawer(true);
          }
        }}>
          {openDrawer ? (
              <ListItemIcon onClick={() => toggleDrawer(false)}>
                <KeyboardDoubleArrowLeftIcon
                  sx={{ color: "#7B5FF1", paddingLeft: 1 }}
                />
              </ListItemIcon>
            ) : (
              <ListItemIcon onClick={() => toggleDrawer(true)}>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#7B5FF1", paddingLeft: 1 }}
                />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  useEffect(() => {
    const fetchData = async () => {
      try { 
        // Fetching favoritas recetas
        const favoritasResponse = await api.favoritasRecetas();
        const favoritasData = await favoritasResponse.json();
        setFavoritas(favoritasData.recetas || []);
        
        // Fetching creadas recetas
        const creadasResponse = await api.creadasRecetas();
        const creadasData = await creadasResponse.json();
        setCreadas(creadasData.recetas || []);
  
        // Fetching historial recetas
        const historialResponse = await api.historialRecetas();
        const historialData = await historialResponse.json();
        setHistorial(historialData.recetas || []);
  
        // Fetching ingredientes stock
        const stockResponse = await api.ingredientesStock();
        const stockData = await stockResponse.json();
        setStock(stockData || []);
      } catch (error) {
        console.error("Error cargando la informacion:", error);
      }
    };
  
    fetchData();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };


  return (
    <Grid container>
      <Drawer variant="permanent" open={openDrawer}>
        {drawer}
      </Drawer>
      <MainBox open={openDrawer}>
        <TabPanel value={value} index={false}>
          <Grid sx={container}>
            <img src={logo} height={matches ? "300vh" : "100vh"} />
            <Typography sx={title}>
              Encontrá tus recetas en un mismo lugar
            </Typography>
            <img src={ortLogo} height={matches ? "80vh" : "80vh"} />
            <Box sx={rotatedBox}></Box>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {favoritas.map((receta, index) => (
              <RecetaCard
                key={index}
                image={receta.imageUrl} 
                title={receta.name} 
                ingredients={receta.ingredients}
                steps={receta.steps}  
              />
            ))}
          </Masonry>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {creadas.map((receta, index) => (
              <RecetaCard
                key={index}
                image={receta.imageUrl} 
                title={receta.name} 
                ingredients={receta.ingredients}
                steps={receta.steps}  
              />
            ))}
          </Masonry>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {historial.map((receta, index) => (
              <RecetaCard
                key={index}
                image={receta.imageUrl} 
                title={receta.name} 
                ingredients={receta.ingredients}
                steps={receta.steps}  
              />
            ))}
          </Masonry>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid container spacing={2}>
            {stock.map((ingrediente, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* xs=12, sm=6, md=4, lg=3 asegura 4 tarjetas por fila */}
                <StockCard
                  image={ingrediente.imageUrl}
                  name={ingrediente.id}
                  quantity={ingrediente.cantidad} // Asegúrate de que el nombre de la propiedad coincida
                  unit={ingrediente.unidadMedida} // Asegúrate de que el nombre de la propiedad coincida
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </MainBox>
    </Grid>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  height: "100vh",
  marginLeft: 25,
};

const rotatedBox = {
  width: "80vw",
  height: "130vh",
  transform: "rotate(135deg)",
  boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)",
  marginLeft: "12vw",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
};

const title = {
  color: "#A28FF0",
  fontSize: "4vh",
  fontWeight: "bold",
  textAlign: "left",
  marginTop: "3vh",
  marginBottom: "3vh",
};

const button = {
  zIndex: 2,
};

const containerDrawer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: "100vh",
  backgroundColor: "#EBEBEB",
};
