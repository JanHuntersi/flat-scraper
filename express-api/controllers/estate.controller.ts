import { Get, Route, Tags, Post, Body, Path, Delete } from "tsoa";
import { Estate } from "../models";
import { Response } from 'express';
import connectDB from "../config/ormconfig";
import { DeleteResult } from "typeorm";

interface IEstatePayload {
    name: string;
    locality: string;
    url: string;
}

@Route("estates")
@Tags("Estate")
export default class EstateController {
    @Post("/test")
    public async test(@Body() body: string): Promise<string> {
        return body;
    }

    @Get("/")
    public async getEstates(): Promise<Array<Estate>> {
        return connectDB.manager.find(Estate);
    }

    @Delete("/")
    public async deleteEstates(): Promise<DeleteResult> {
        return connectDB.manager.delete(Estate, {});
    }

    /**
     * Create a single estate.
     * @param body - Estate payload.
     * @returns Created estate.
     */
    @Post("/")
    public async createEstate(@Body() body: IEstatePayload): Promise<Estate> {
        const estate = connectDB.manager.getRepository(Estate).create(body);
        return connectDB.manager.getRepository(Estate).save(estate);
    }

    /**
     * Create multiple estates.
     * @param body - Array of estate payloads.
     * @returns Created estates.
     */
    @Post("/more")
    public async createEstates(@Body() body: Array<IEstatePayload>): Promise<Partial<Estate>[]> {
        try {
            const estatesPayload: IEstatePayload[] = body;
            // Transform the payload into an array of plain objects representing the estates
            const estates: Partial<Estate>[] = estatesPayload.map(
                ({ name, locality, url }) => ({
                    name,
                    locality,
                    url,
                })
            );

            // Get the result
            const result = await connectDB.manager.getRepository(Estate).insert(estates);

            // Get the inserted estates from the result
            const savedEstates: Partial<Estate>[] = result.generatedMaps.map((generatedMap) =>
                connectDB.manager.create(Estate, generatedMap)
            );
            return savedEstates;
        } catch (error) {
            console.log("Error saving estates:", error);
            throw new Error("Failed to save estates");
        }
    }
}
