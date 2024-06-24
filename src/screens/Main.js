import { useState } from "react";
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
import RecipeIcon from "../assets/recipe.svg";
import EditIcon from "../assets/edit.svg";
import HistoryIcon from "../assets/history.svg";

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
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
    width: `calc(${theme.spacing(7)} + 7px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 7px)`,
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawerOptions = [
    {
      text: "Recetas",
      icon: RecipeIcon,
      show: true,
    },
    {
      text: "Favoritas",
      icon: FavoriteIcon,
    },
    {
      text: "Creadas",
      icon: EditIcon,
    },
    {
      text: "Historial",
      icon: HistoryIcon,
    },
    {
      text: "Stock",
      icon: StockIcon,
      show: true,
    },
  ];

  const drawer = (
    <Box sx={containerDrawer}>
      <Toolbar />
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
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={option.icon}
                      width={40}
                      height={30}
                      alt={option.text}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={option.text}
                    disableTypography
                    sx={{
                      fontWeight: option.show ? "bold" : "normal",
                      color: "#7B5FF1",
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
          <ListItemButton>
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
          -00000000000000000000000000000000000000000000000000000000000
        </TabPanel>
        <TabPanel value={value} index={1}>
          -111111111111111111111111111111111111111111111111111111111111111
        </TabPanel>
        <TabPanel value={value} index={2}>
          -222222222222222222222222222222222222222222222222222222222222222222222222
        </TabPanel>
        <TabPanel value={value} index={3}>
          -33333333333333333333333333333333333333333333333333333
        </TabPanel>
        <TabPanel value={value} index={4}>
          -444444444444444444444444444444444444444444444444444444444444444444
        </TabPanel>
        <TabPanel value={value} index={5}>
          -55555
        </TabPanel>
        <TabPanel value={value} index={6}>
          -666666
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
