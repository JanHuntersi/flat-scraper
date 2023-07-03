import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import Estate from '../service/estateInterface';
import { useTheme } from "@mui/system";

type Props = {
  estate: Estate;
};

export default function EstateCard({estate}:Props){

  const theme = useTheme();
   
  const MyLink = styled(Link)(({ theme }) => ({
		textDecoration: "none",
	}));

    return(
      <MyLink  to={'/estate/'+estate.id}>
        <Card sx={{ maxWidth: 345, backgroundColor:theme.palette.primary.main, color:"white" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={estate.url}
            alt="green iguana"
          />
           <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {estate.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </MyLink>
    );
}
