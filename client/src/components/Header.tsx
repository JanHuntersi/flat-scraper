import { styled, useTheme } from "@mui/system";
import { Box } from "@mui/material";
import React from "react";

export default function Header(){

    const theme = useTheme();

    const HeaderBar = styled(Box)(({ theme }) => ({
		padding: "0",
		position: "static",
		margin: "0",
		minHeight: "3em",
		backgroundColor: "green",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}));

    return(
        <HeaderBar>
            <p>Czech Flat Scraper Made by Jan Sernec</p>
        </HeaderBar>
    )
}
