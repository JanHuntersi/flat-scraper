import { styled, useTheme } from "@mui/system";
import { Box } from "@mui/material";

export default function Header(){

    const theme = useTheme();

    const HeaderBar = styled(Box)(({ theme }) => ({
		padding: "0",
		position: "static",
		margin: "0",
		minHeight: "3em",
		backgroundColor: theme.palette.primary.main,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "white",
		fontSize:"1.5em"
	}));

    return(
        <HeaderBar>
           Czech Flat Scraper Made by Jan Sernec
        </HeaderBar>
    )
}
