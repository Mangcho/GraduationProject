const UserModel = require('../models/user');

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

        const isUserExist = await UserModel.findOne({
            where: {
                id: userDto.id,
                password: hashedPW
            }
        })
        if (isUserExist == null) {
            return false
        } else {
            return true
        }
    }
}

module.exports = AuthService;