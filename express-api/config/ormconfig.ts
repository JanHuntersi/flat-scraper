import { DataSource } from "typeorm";
import { Estate } from "../models";

const connectDB = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [Estate],
    synchronize: true,
})


connectDB
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Data Source initialization error ", err);
    })

export default connectDB;
