var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteer = require('puppeteer');
var _a = require('worker_threads'), workerParentPort = _a.parentPort, workerData = _a.workerData;
var web_url = 'https://www.sreality.cz/en/search/for-sale/apartments';
function scrapeDynamicWebsite(index) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, cookies, cookieToModify, i, new_url, _a, imgArray, titles, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, puppeteer.launch({
                            headless: "new",
                            args: ['--disable-features=site-per-process', '--no-sandbox', '--disable-web-security']
                        })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    return [4 /*yield*/, page.cookies()];
                case 3:
                    cookies = _b.sent();
                    cookieToModify = cookies.find(function (cookie) { return cookie.name === 'per_page'; });
                    if (!cookieToModify) return [3 /*break*/, 5];
                    cookieToModify.value = '60';
                    return [4 /*yield*/, page.setCookie(cookieToModify)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    console.log("Cookie was not found!");
                    _b.label = 6;
                case 6: 
                // Refresh the page to reflect the cookie changes
                return [4 /*yield*/, page.reload()];
                case 7:
                    // Refresh the page to reflect the cookie changes
                    _b.sent();
                    i = 0;
                    _b.label = 8;
                case 8:
                    if (!(i < 3)) return [3 /*break*/, 13];
                    new_url = web_url + '?page=' + (index + i);
                    console.log("lets go to " + new_url);
                    return [4 /*yield*/, page.goto(new_url)];
                case 9:
                    _b.sent();
                    // Wait for the parent div to be present
                    return [4 /*yield*/, page.waitForSelector('div.dir-property-list')];
                case 10:
                    // Wait for the parent div to be present
                    _b.sent();
                    return [4 /*yield*/, page.$$eval('div.dir-property-list > div', function (divs) {
                            //const imgUrlArray: String[][] = [];
                            var titles = [];
                            var imgArray = [];
                            for (var _i = 0, divs_1 = divs; _i < divs_1.length; _i++) {
                                var div = divs_1[_i];
                                //Finding title
                                var title = div.querySelector('h2 > a.title > span.name.ng-binding');
                                var titleText = title ? title.textContent : null;
                                //Finding img- url
                                var imgElement = div.querySelectorAll('div > div > a > img');
                                var imgSrcs = Array.from(imgElement).map(function (img) { return img.getAttribute('src'); });
                                if (imgSrcs.length > 0 && titleText) {
                                    imgArray.push(imgSrcs);
                                    titles.push(titleText);
                                }
                            }
                            return { imgArray: imgArray, titles: titles };
                        })];
                case 11:
                    _a = _b.sent(), imgArray = _a.imgArray, titles = _a.titles;
                    // Print the extracted data
                    //console.log(imgArray);
                    // console.log(titles);
                    console.log("length is " + imgArray.length + " " + titles.length);
                    _b.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 8];
                case 13: return [4 /*yield*/, browser.close()];
                case 14:
                    _b.sent();
                    console.log("ending of searching from " + index + " to " + (index + 2));
                    return [3 /*break*/, 16];
                case 15:
                    error_1 = _b.sent();
                    console.error('An error occurred:', error_1);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
console.log;
scrapeDynamicWebsite(workerData);
