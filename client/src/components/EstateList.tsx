import { Box } from "@mui/material";
import { useEstateService } from "../service/EstateServiceProvider";
import Grid from "@mui/material/Grid";
import EstateCard from "./EstateCard";
import { Pagination } from '@mui/material';
import { useState } from "react";
import Button from '@mui/material/Button';
import Estate from "../service/estateInterface";
import { useTheme } from "@mui/system";

export default function EstateList(){

    const { estates, fetchData } = useEstateService();
    const theme = useTheme();
    const [itemsPerPage, setItemsPerPage] = useState(20); // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    
    //Function to get number of estates for current page
    const getDisplayedEstates = ():Estate[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return estates.slice(startIndex, endIndex);
      };


      console.log("estates",estates);

    return(
        estates.length > 0 ? <>

        <Box sx={{ backgroundColor:theme.palette.background.default, width:"100%",marginTop:"4em"}}>
             <Grid sx={{display:"flex",alignItems:"center",justifyContent:"center",paddingBottom:"2em" }} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
            
			{getDisplayedEstates().map((estate) => (
                 <Grid item xs="auto">
				<EstateCard estate={estate} />
                </Grid>
			))}
            </Grid>
           <Box sx={{width:"100%",paddingBottom:"2em", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Pagination
                    page={currentPage}
                    count={Math.ceil(estates.length / itemsPerPage)}
                    onChange={(event, value) => setCurrentPage(value)}
                />
            </Box> 
        </Box>   
        </>
         : <Box sx={{ width:"100%", marginTop:"2em",display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Button variant="contained" onClick={()=>{fetchData()}}>Fetch data</Button>
         </Box>
    );
}
