import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from "@mui/icons-material/Settings";
import OpticsLogo from "../assets/images/Optic_Logo.png";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "../../Styles/App.css"

// Define the styled component with hover underline effect
const UnderlineTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  fontFamily: "'Source Sans Pro', sans-serif", // Set the font family
  fontWeight: "550", // Set the font weight to bold (you can adjust this value to make it heavier)
  lineHeight: "1.25", // Adjust the line-height for spacing
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    transform: "scaleX(0)",
    height: "2px",
    bottom: "-2px", // Adjust this value to add space between text and underline
    left: 0,
    transformOrigin: "bottom right",
    transition: "transform 0.25s ease-out",
  },
  "&:hover:after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
}));

const TopIcons = ({ toggleDarkMode, darkMode }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Box className="top-icons-container">
      <Box className="logo-container">
        <img
          src={OpticsLogo}
          alt="Optics Logo"
          className="logo-image"
        />
        <UnderlineTypography
          variant="h1"
          sx={{
            margin: 0,
            color: darkMode ? "#FFF" : "#000",
            letterSpacing: "3px",
            fontSize: "28px",
            marginTop: "4px",
            "&:after": {
              backgroundColor: darkMode ? "#00ff08" : "#00ff08",
            },
          }}>
          OPTICS
        </UnderlineTypography>
      </Box>
      <Box className="icons-container">
        <IconButton className="settings-icon" sx={{ color: darkMode ? "#FFF" : "#000" }}>
          <SettingsIcon />
        </IconButton>

        <IconButton onClick={toggleDarkMode} className="settings-icon" sx={{ color: darkMode ? "#FFF" : "#000" }}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton
          className="fullscreen-icon"
          onClick={toggleFullScreen}
          sx={{ color: darkMode ? "#FFF" : "#000" }}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopIcons;
