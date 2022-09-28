const UserModel = require('../models/user');
const Whitelist = require('../models/whitelist');
// utils
const crypto = require('../utils/crypt');

class AuthService {

    /**
    * Register Account
    * @param {JSON} newUserDto - User account info
    * @param {String} newUserDto.id - Email ID of userDto.
    * @param {String} newUserDto.password - Maximum 32 length password of userDto.
    */
    async SignUp(newUserDto) {

    }

    /**
     * Login
     * @param {JSON} userDto - User login info.
     * @param {String} userDto.id - Email ID of userDto.
     * @param {String} userDto.password - Maximum 32 length password of userDto.
     */
    async SignIn(userDto) { // log-in
        const hashedPW = crypto.GetHash(userDto.password);
        const test = await Whitelist.create({ imei: "1234567890" })
        const testFunc = await UserModel.create({ id: userDto.id, password: hashedPW, whitelist_imei: "1234567890" });
        const isUserExist = await UserModel.findOne({
            where: {
                id: userDto.id,
                password: hashedPW
            }
        })
            .then((result) => {
                console.log(result)
                return result ? true : false;
            })
            .catch()

    }
}

module.exports = { AuthService };