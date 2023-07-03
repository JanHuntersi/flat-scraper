import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles"; // Import from "@mui/styles" instead of "@mui/material/styles"
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./Theme";
import ChangeThemeIcon from "./ChangeThemeIcon";

type Prop = {
    children: JSX.Element,
  };

export default function ChangeTheme({children}:Prop) {
    // Sets dark theme from localstorage, if not found creates default White theme
    const [isDarkTheme, SetDarkTheme] = useState(false);
    const changeTheme = () => {
        SetDarkTheme(!isDarkTheme);
        if (!isDarkTheme) {
            localStorage.setItem("chosenTheme", "dark");
        } else {
            localStorage.setItem("chosenTheme", "light");
        }
    };

    useEffect(() => {
        const theme = localStorage.getItem("chosenTheme");
        if (theme) {
            if (theme === "dark") {
                SetDarkTheme(true);
            } else {
                SetDarkTheme(false);
            }
        } else {
            localStorage.setItem("chosenTheme", "light");
            SetDarkTheme(false);
        }
    }, []);

    return (
        <ThemeProvider theme={isDarkTheme ? lightTheme : darkTheme}>
            <CssBaseline />
            <ChangeThemeIcon  changeTheme={changeTheme} isDarkTheme={isDarkTheme}/>
            {children}
        </ThemeProvider>
    );
}
