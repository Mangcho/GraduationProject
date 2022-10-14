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
        try {

        } catch {

        }

    }

    /**
     * 로그인을 처리하는 서비스
     * @param {JSON} userDto - 사용자 계정 정보를 담고 있는 객체 id와 password를 가지고 있음
     */
    async SignIn(userDto) { // log-in
        try {
            const hashedPW = GetHash(userDto.password);
            const isUserExist = await UserModel.findOne({
                where: {
                    id: userDto.id,
                    password: hashedPW
                }
            })
            return isUserExist === null ? false : true
        } catch {
            // Something Error catch
        }
    }
}

module.exports = { AuthService };