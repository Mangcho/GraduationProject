const RasbpiModel = require('../models/rasbpi');


class piDataService {


    constructor() {

    }
    /**
     * Save sensor data from rasberypi to DB
     * @param {Object} piDto - rasberypi Data Object
     */
    async SaveData(piDto) { // log-in
        console.log(piDto);
    }
}

// module.exports.piDataService = piDataService;
module.exports = { piDataService }

