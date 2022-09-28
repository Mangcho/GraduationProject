const DataModel = require('../models/data');


class piDataService {


    constructor() {

    }
    /**
     * Save sensor data from rasberypi to DB
     * @param {Object} piDto - rasberypi Data Object
     * @param {JSON} userDto.result - Pi Data
     */
    async SaveData(piDto) { // log-in
        console.log(piDto);
    }
}

// module.exports.piDataService = piDataService;
module.exports = { piDataService }

