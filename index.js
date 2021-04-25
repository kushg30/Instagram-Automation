const puppeteer =  require('puppeteer');
const data = require("./data.json");
let noOfPosts = process.argv[2];
(async function (){
    
    const browser = await puppeteer.launch({
                    headless : false, 
                    defaultViewport : null,
                    args : ["--start-maximized", "--icognito","--disable-notifications"]});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/' , {waitUntil : 'networkidle2'});
    await page.type("input[name='username']",data.user,{delay :100});
    await page.type("input[name='password']",data.pwd,{delay :100});
    
    
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.click("button[type='submit']"),
    ]);

    //searching and visiting a particular page
    await page.type("input[placeholder='Search']","pepcoding",{delay :100});
    await page.goto('https://www.instagram.com/pepcoding/' , {waitUntil : 'networkidle2'});

     //clicking first post
     await page.waitForSelector(".eLAPa",{visible : true});
     await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.click(".eLAPa"),
    ]);
    
    //like and next
    let i = 0;
    do{
        await page.waitForSelector(".fr66n button",{visible : true , delay: 15});
        await page.click(".fr66n button");
        await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.click("._65Bje.coreSpriteRightPaginationArrow"),
        
    ]);
    i++;
    }while (i < noOfPosts ){

    }
})();