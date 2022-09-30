const UserModel = require('../models/user');
const Whitelist = require('../models/whitelist');
// utils
const GetHash = require('../utils/crypt');

class AuthService {

    /**
    * 계정 생성을 처리하는 서비스 (미정)
    * @param {JSON} newUserDto - User account info
    */
    async SignUp(newUserDto) {

    }

    /**
     * 로그인을 처리하는 서비스
     * @param {JSON} userDto - 사용자 계정 정보를 담고 있는 객체 id와 password를 가지고 있음
     */
    async SignIn(userDto) { // log-in
        try {
            const hashedPW = GetHash(userDto.password);
            //const test = await Whitelist.create({ imei: "1234567890" })
            //const testFunc = await UserModel.create({ id: userDto.id, password: hashedPW, whitelist_imei: "1234567890", name: "hal", age: 2 });
            const isUserExist = await UserModel.findOne({
                where: {
                    id: userDto.id,
                    password: hashedPW
                }
            })
            return isUserExist === null ? true : false
        } catch {
            // Something Error catch
        }
    }
}

module.exports = { AuthService };