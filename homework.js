const request = require('request');
const yargs = require('yargs');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const moment = require('moment');
const momentTimezone = require('moment-timezone');


const app = express();

const argv = yargs.argv;
const DarkSkyKey=; //Inserir key Dark Sky
const GoogleAPIKey=; //Inserir Key Google
var lat, lng, temp, apparentTemp, weatherStatus, summary, timeZone;
var erro=0;

app.set("view engine", "hbs");
app.get('/',(req,res)=>{
    res.render('index.hbs');
});

app.get('/local',(req,res)=>{
    var address = req.query.location;
    var encodedAddress = encodeURIComponent(address);

    var urlGoogle = `https://maps.googleapis.com/maps/api/geocode/json?key=${GoogleAPIKey}&address=${encodedAddress}`;


    request({url: urlGoogle, json: true}, (error, response, body) =>{
        if (error==null){
            console.log("Everything is fine!");
        }else{
            console.log("Uh Oh! There's been an error, and it seems like it's on your end. Look it up: ",error);
            erro=1;
        }

        if(response.STATUS_CODES<200||207>response.STATUS_CODES){
            console.log("Well, there seems to have been a mistake on our end. Sorry, try again later! If you want to read up on it, the error was #",response.STATUS_CODES);
            erro=2;
        }else{
            console.log("Still going well.");
        }

        if(body.results[0]==undefined){
            console.log("Please, input an actual place on Earth. (There was an Easter Egg here, but I removed it :( ).")
            error=3;
        }

        lat=body.results[0].geometry.location.lat;
        lng=body.results[0].geometry.location.lng;

        var urlDarkSky = `https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${lng}?units=si`;
        request({url: urlDarkSky, json: true}, (error, response, body)=>{
            temp=body.currently.temperature;
            apparentTemp=body.currently.apparentTemperature;
            weatherStatus=body.currently.icon;
            summary=body.hourly.summary;
            timeZone=body.timezone;
            localTime=moment().tz(timeZone).format('h:mm a');
            
            
            console.log(moment().tz(timeZone).format('YYYY-MM-DD-HH-mm'));
            

            console.log(summary);
            console.log('Na Rua '+address+' estão '+temp+'ºC, e aparenta estar '+apparentTemp+'ºC. Está '+weatherStatus);
            app.use(express.static(path.join(__dirname, '/public')));
            res.render('result.hbs', {err:erro, tmp:temp, atmp:apparentTemp, adrs:address, stat:weatherStatus, sum:summary, lcltm:localTime});
        });
    });
});
app.listen(3000);