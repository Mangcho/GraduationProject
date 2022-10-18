import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";
import GetHash from "../utils/crypt.js"; // utils

export default class AuthService {

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
            return newUser; // 생성이 불가능한 경우에는 error
        } catch (error) {
            console.log("SignUp Service", error);
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
            const test = await WhitelistModel.create({ imei: "1234567890" })
            const testFunc = await UserModel.create({ id: compareUserDto.id, password: hashedPW, whitelist_imei: "1234567890", name: "hal", age: 2 });

            const isUserExist = await UserModel.findOne({
                where: {
                    id: compareUserDto.id,
                    password: hashedPW
                }
            })
            return isUserExist === null ? false : true // select 문에서 없을경우 null
        } catch (error) {
            console.log("SignIn Service", error);
        }
    }

    /**
     * 사용자가 입력한 Imei값을 검증하는 서비스
     * @param {Object} checkImeiDto - 사용자가 회원가입을 위해 입력한 Imei값이 저장되어 있음
     */
    async CheckImei(checkImeiDto) { // log-in
        try {
            const isImeiExist = await WhitelistModel.findOne({
                where: {
                    imei: checkImeiDto.imei
                }
            })
            return isImeiExist === null ? false : true
        } catch (error) {
            console.log("CheckImei Service", error);
        }
    }
}