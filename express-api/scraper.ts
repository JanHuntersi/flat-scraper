
import axios, { AxiosResponse } from 'axios';

const url = 'https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&page=2&per_page=500&tms=1687730224465';
class Estate {
    public name: string;
    public locality: string;
    public url: string;

    constructor(name: string, locality: string, url: string) {
        this.name = name;
        this.locality = locality;
        this.url = url;
    }

    public toString(): string {
        return `Estate name: ${this.name}, locality: ${this.locality}, url: ${this.url}`;
    }
}

const estates: Estate[] = [];

async function fetchJsonData(url: string): Promise<any> {
    try {
        const response: AxiosResponse = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}

export default async function startScraping() {

    //Delete all entries in db

    fetchJsonData(url)
        .then(async data => {
            //get locality name and url
            data._embedded.estates.forEach((obj: { name: string; locality: string; _links: { images: { href: string; }[]; }; }) => {
                const estate = new Estate(obj.name, obj.locality, obj._links.images[0].href);
                estates.push(estate);
                //console.log("new estate is ", estate.toString())
            });
            console.log(`Now we have ${estates.length} estates!`);

            //Call POST endpoint on API
            const response = await axios.post("http://localhost:8000/estates", estates);
            console.log('Post was succesfull:');

        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            console.log("Scraper is finished")
        });

}

