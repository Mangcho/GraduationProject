const User = require('../models/user');
const Whitelist = require('../models/whitelist');

export default class Test {
    constructor() {
    }
    static init() {
        Whitelist.create({ imei: "1234567890" })
        // 비밀번호 = password
        User.create({ id: "bnb1324@naver.com", password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", whitelist_imei: "1234567890", name: "hal", age: 2 });
    }

}
