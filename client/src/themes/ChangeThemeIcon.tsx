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
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    right: "1em",
    bottom: "5%",
    textAlign: "center",
    borderRadius: "100%",
    padding: "1.1em",
    "&:hover": {
      cursor: "pointer",
      color:  theme.palette.text.primary,
    },
    zIndex: 2000,
  });

  return (
    <ChangeColor theme={theme} onClick={changeTheme} sx={{}}>
      {!isDarkTheme ? (
        <DarkModeIcon sx={{ fontSize: "1.8em", color:"white" }} />
      ) : (
        <LightModeIcon sx={{ fontSize: "1.8em", color:"white" }} />
      )}
    </ChangeColor>
  );
};

export default ChangeThemeIcon;
