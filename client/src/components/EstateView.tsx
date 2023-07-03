import { Box, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEstateService } from "../service/EstateServiceProvider";
import { useEffect,useState } from 'react';
import Estate from '../service/estateInterface';

export default function EstateView(){

    const { id } = useParams();

    const { estates } = useEstateService();
    const [estate,setEstate]= useState<Estate | null>(null);

    useEffect(() => {
            const filteredObjects = estates.filter((thisEstate:Estate) => thisEstate.id?.toString() === id);
            const object = filteredObjects.length > 0 ? filteredObjects[0] : null;
            setEstate(object);
    }, [id]);


    return(
        estate ? <>
        <Box sx={{ display: "flex", maxWidth: "100%", margin: "5em",marginTop:"2em" }}>
        <Box sx={{ minWidth:"50%",display:"flex",alignItems:"space-around", justifyContent:"center"}}>
            <img src={estate.url}></img>
        </Box>
        <Box sx={{ width:"100%", display: "flex", flexDirection: "column",alignItems:"center", justifyContent:"center",textAlign:"center" }}>
            <Typography  sx={{ margin: "none", fontSize:"2em" }} gutterBottom component="div">
                {estate.name}
            </Typography>
            <Typography  sx={{ margin: "none",fontSize:"1.5em" }} gutterBottom component="div">
                {estate.locality}
            </Typography>
           
        </Box>
    </Box>

        </>
         : <span>Loading...</span>)
}
