import { Box, useTheme, styled } from "@mui/system";
import { Theme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface ThemeProp {
  theme: Theme;
}

interface ChangeThemeIconProps {
  changeTheme: () => void;
  isDarkTheme: boolean;
}


const ChangeThemeIcon = ({ changeTheme, isDarkTheme }: ChangeThemeIconProps) => {
  const theme = useTheme();
  const ChangeColor = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    position: "fixed",
    right: "1em",
    bottom: "5%",
    textAlign: "center",
    borderRadius: "100%",
    padding: "1.1em",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "blue",
      color: "white",
    },
    zIndex: 2000,
  });

  return (
    <ChangeColor theme={theme} onClick={changeTheme} sx={{}}>
      {!isDarkTheme ? (
        <DarkModeIcon sx={{ fontSize: "1.8em" }} />
      ) : (
        <LightModeIcon sx={{ fontSize: "1.8em" }} />
      )}
    </ChangeColor>
  );
};

export default ChangeThemeIcon;
