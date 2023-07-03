import { Box } from "@mui/material";
import { useEstateService } from "../service/EstateServiceProvider";
import Grid from "@mui/material/Grid";
import EstateCard from "./EstateCard";
import { Pagination } from '@mui/material';
import { useState } from "react";
import Estate from "../service/estateInterface";

export default function EstateList(){

    const { estates } = useEstateService();

    const [itemsPerPage, setItemsPerPage] = useState(20); // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    
    //Function to get number of estates for current page
    const getDisplayedEstates = ():Estate[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return estates.slice(startIndex, endIndex);
      };


    return(
        <Box sx={{ backgroundColor:"green", width:"100%",marginTop:"4em"}}>
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
    )
}
