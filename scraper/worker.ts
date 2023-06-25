const puppeteer = require('puppeteer');
const { parentPort: workerParentPort, workerData } = require('worker_threads');

const web_url = 'https://www.sreality.cz/en/search/for-sale/apartments';

async function scrapeDynamicWebsite(index) {

    try {
        // Launch browser instance
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--disable-features=site-per-process', '--no-sandbox', '--disable-web-security'],
        });

        // Create a new page
        const page = await browser.newPage();


        // Get cookies and modify cookie to set 60 listings per page 
        // then update page to take effect

        const cookies = await page.cookies();

        const cookieToModify = cookies.find(cookie => cookie.name === 'per_page')

        if (cookieToModify) {
            cookieToModify.value = '60';

            await page.setCookie(cookieToModify);
        } else {
            console.log("Cookie was not found!");
        }

        // Refresh the page to reflect the cookie changes
        await page.reload();

        // Navigate to the website
        //

        for (let i = 0; i < 3; i++) {

            let new_url = web_url + '?page=' + (index + i);
            console.log("lets go to " + new_url)
            await page.goto(new_url);

            // Wait for the parent div to be present
            await page.waitForSelector('div.dir-property-list');

            //Enumerate through each child div
            const { imgArray, titles } = await page.$$eval('div.dir-property-list > div', (divs) => {

                //const imgUrlArray: String[][] = [];
                let titles = [];
                let imgArray = [];

                for (const div of divs) {


                    //Finding title
                    const title = div.querySelector('h2 > a.title > span.name.ng-binding');
                    const titleText = title ? title.textContent : null;

                    //Finding img- url
                    const imgElement = div.querySelectorAll('div > div > a > img');
                    const imgSrcs = Array.from(imgElement).map(img => img.getAttribute('src'));


                    if (imgSrcs.length > 0 && titleText) {
                        imgArray.push(imgSrcs)
                        titles.push(titleText)
                    }
                }
                return { imgArray, titles };
            });

            // Print the extracted data
            //console.log(imgArray);
            // console.log(titles);
            console.log("length is " + imgArray.length + " " + titles.length)
            // Close the browser


        }
        await browser.close();
        console.log("ending of searching from " + index + " to " + (index + 2))

    } catch (error) {
        console.error('An error occurred:', error);
    }


}

console.log
scrapeDynamicWebsite(workerData);


