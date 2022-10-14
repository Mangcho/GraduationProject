const UserModel = require('../models/user');
const Whitelist = require('../models/whitelist');
const GetHash = require('../utils/crypt');// utils

class AuthService {

    /**
    * 계정 생성을 처리하는 서비스
    * @param {JSON} newUserDto - User account info
    */
    async SignUp(newUserDto) {
        try {
            const hashedPW = GetHash(newUserDto.password);
            const newUser = await UserModel.create({
                id: newUserDto.id, password: hashedPW, whitelist_imei: newUserDto.imei,
                name: newUserDto.name, age: newUserDto.age
            });
            return newUser === null ? false : true
        } catch (error) {
            console.log("SignUp Service error", error);
        }

    }

    /**
     * 로그인을 처리하는 서비스
     * @param {Object} compareUserDto - 사용자 계정 정보를 담고 있는 객체 id와 password를 가지고 있음
     */
    async SignIn(compareUserDto) { // log-in
        try {
            const hashedPW = GetHash(compareUserDto.password);
            // test, testFunc는 로그인 테스트용 차후 삭제할 예정
            const test = await Whitelist.create({ imei: "1234567890" })
            const testFunc = await UserModel.create({ id: compareUserDto.id, password: hashedPW, whitelist_imei: "1234567890", name: "hal", age: 2 });
            const isUserExist = await UserModel.findOne({
                where: {
                    id: compareUserDto.id,
                    password: hashedPW
                }
            })
            console.log(isUserExist);
            return isUserExist === null ? false : true
        } catch {
            // Something Error catch
        }
    }
}

module.exports = { AuthService };