const puppeteer = require('puppeteer');

const url = 'https://www.sreality.cz/en/search/for-sale/apartments';

async function scrapeDynamicWebsite(url) {
    try {
        // Launch browser instance
        const browser = await puppeteer.launch({ headless: true });

        // Create a new page
        const page = await browser.newPage();

        // Navigate to the website
        await page.goto(url);

        // Wait for the parent div to be present
        await page.waitForSelector('div.dir-property-list');

        //Enumerate through each child div
        const data = await page.$$eval('div.dir-property-list > div', divs => {

            //const imgUrlArray: String[][] = [];
            let titles = [];

            for (const div of divs) {


                //Finding title
                const title = div.querySelector('h2 > a.title > span.name.ng-binding');
                const titleText = title ? title.textContent : null;

                //Finding img- url
                const imgElement = div.querySelectorAll('div div a img');
                const imgSrcs = Array.from(imgElement).map(img => (img as HTMLImageElement).getAttribute('src'));
                console.log("image url");
                console.log(imgSrcs)

                if (titleText) {
                    titles.push(titleText)
                }

            }


            return titles;
        });

        // Print the extracted data
        console.log(data);

        console.log("Number of elements is " + data.length);

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

scrapeDynamicWebsite(url);
