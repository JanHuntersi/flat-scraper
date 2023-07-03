import axios from "axios";
import Estate from "./estateInterface";

// fetchData is used to fetch all 500 estates from API

export const fetchData = async (): Promise<Estate[]> => {
    try {
        const res = await axios.get('http://localhost:8000/estates');
        return res.data;
    } catch (err) {
        console.log("Error fetching data from API: ", err);
        throw err;
    }
}
