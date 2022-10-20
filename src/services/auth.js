import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";
import { GetHash } from "../utils/crypt.js"; // utils

export class AuthService {

    /**
    * 계정 생성을 처리하는 서비스
    * @param {JSON} createUserDto - User account info
    */
    async SignUp(createUserDto) {
        try {
            const hashedPW = GetHash(createUserDto.password);
            const newUser = await UserModel.create({
                email: createUserDto.email, password: hashedPW, whitelist_imei: createUserDto.imei,
                name: createUserDto.name, age: createUserDto.age
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
    async SignIn(compareUserDto) {
        try {
            const hashedPW = GetHash(compareUserDto.password);
            const isUserExist = await UserModel.findOne({
                where: {
                    email: compareUserDto.email,
                    password: hashedPW
                }
            })
            return isUserExist === null ? false : true // select 문에서 없을경우 null
        } catch (error) {
            console.log("SignIn Service", error);
        }
    }

    /**
     * 로그인을 처리하는 서비스
     * @param {Object} logoutUserDto - 사용자 계정 정보를 담고 있는 객체 id와 password를 가지고 있음
     */
    async SignOut(logoutUserDto) {
        try {
            const hashedPW = GetHash(logoutUserDto.password);
            const isUserExist = await UserModel.findOne({
                where: {
                    email: logoutUserDto.email,
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

    /**
     * 사용자에게 비밀번호를 입력받아 사용자 계정의 비밀번호를 변경하는 서비스
     * @param {Object} changePasswordDto - 사용자가 입력한 비밀번호 값이 저장되어 있음
     */
    async ChangePassword(changePasswordDto) { // log-in
        try {
            const hashedPW = GetHash(changePasswordDto.password);
            const changePassword = await UserModel.update({ password: hashedPW }, {
                where: {
                    email: changePasswordDto.email
                }
            })
            return changePassword === null ? false : true
        } catch (error) {
            console.log("changePassword Service", error);
        }
    }
}