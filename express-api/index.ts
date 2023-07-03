import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import startScraping from "./scraper";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(Router);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);

    //Run the scraper
    startScraping();

});
