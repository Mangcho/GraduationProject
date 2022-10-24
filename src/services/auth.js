import { HasOne } from "sequelize";
import UserModel from "../models/user.js";
import SessionModel from "../models/session.js";
import WhitelistModel from "../models/whitelist.js";
import { GetHash } from "../utils/crypt.js"; // utils

export class AuthService {

    /**
    * 계정 생성을 처리하는 서비스
    * @param {JSON} createUserDto - 사용자가 생성할 계정의 정보를 담고 있는 객체
    */
    async SignUp(createUserDto) {
        try {
            const hashedPW = GetHash(createUserDto.password);
            const newUser = await UserModel.create({
                email: createUserDto.email, password: hashedPW, whitelist_imei: createUserDto.imei,
                name: createUserDto.name, age: createUserDto.age
            });
            return newUser == null ? false : true; // 생성이 불가능한 경우에는 error 
            // 객체를 보내주기에는 내용이 너무 많으므로 그냥 걸러주기
        } catch (error) {
            console.log("dafdas", error.errors);
            console.log("SignUp Service", error);
        }
    }

    /**
     * 로그인을 처리하는 서비스
     * @param {Object} compareUserDto - 사용자 계정 정보를 담고 있는 객체 id와 password 및 세션 정보를 가지고 있음
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
            if (isUserExist === null) { // select 문에서 없을경우 null
                return false;
            } else { // 세션 저장 및 결과값 리턴
                compareUserDto.session.save();
                compareUserDto.session.eid = compareUserDto.email;
                return true;
            }
        } catch (error) {
            console.log("SignIn Service", error);
        }
    }

    /**
     * 사용자의 로그아웃 요청에 따라 사용자의 세션을 삭제하는 서비스
     * @param {Object} logoutUserDto - req.session이 있음
     */
    async SignOut(logoutUserDto) {
        try {
            logoutUserDto.session.destroy(logoutUserDto.session.id);
        } catch (error) {
            console.log("SignOut Service", error);
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
            console.log("hi", changePasswordDto.sid)
            const hashedPW = GetHash(changePasswordDto.newPassword);
            const changePassword = await UserModel.update({ password: hashedPW }, {
                include: [{
                    model: "sessions",
                }],
                where: {
                    sid: changePasswordDto.sid
                }
            })
            return changePassword === null ? false : true
        } catch (error) {
            console.log("changePassword Service", error);
        }
    }
}