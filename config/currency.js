const axiosCur = require('axios');

class Currency {
    constructor() {
        this.axiosCall = axiosCur.create({});
    }

    getBRL(){
        return this.axiosCall.get(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=BRL`, {headers:{'X-RapidAPI-Host': process.env.CURRENCY_API_HOST, 'X-RapidAPI-Key': process.env.RAPID_API_KEY}})
        .then(result => {
            return result.data.rates.BRL.rate;
        })
        .catch(e => {
            console.log(e);
        });
    }
}

module.exports = Currency;