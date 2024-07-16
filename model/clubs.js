const mongoose = require('mongoose');
const puppeteer = require('puppeteer');

const clubsSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    image: {
        type : String,
    },
    rating : {
        type : Number,
    },
    description : {
        type : String,
    },
    address : {
        type : Object,
        require : true,
    },
})

const clubModel = mongoose.model('Clubs',clubsSchema);

const clubScrapper = async (place  = 'india') => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=clubs&oq=nearby+clubs+of'+place);
    const client = await page.target().createCDPSession();
    await client.send('Browser.grantPermissions', {
      permissions: ['geolocation'],
      origin: 'https://www.google.com',
    });
  
    page.waitForSelector('g-more-link a');
    page.click('g-more-link a')
    const delay = (time)=>new Promise(res=>setTimeout(res,time));
    await delay(5000);
    
    const data = await page.evaluate((place)=>{
      const deatils = Array.from(document.querySelectorAll('.rllt__details')).map(el=>el?.innerText.split('\n'));
      const images = Array.from(document.querySelectorAll('.gTrj3e img')).map(el=>el?.src);
      return deatils.map((el,idx)=>({
        name : el[0],
        image : images[idx],
        rating : el[1],
        description : el[2],
        address : {
          locality : el[3],
          place: place,
        },
      }))
    },place)
    console.log(data);
    await browser.close();
    return data;
  };

const clubsModel = {
  clubModel,
  clubScrapper
}

module.exports = clubsModel;