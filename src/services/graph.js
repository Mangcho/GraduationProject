import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";
import { GetHash } from "../utils/crypt.js"; // utils

export class GraphService {

    /**
    * 지정한 Imei를 가진 라즈베리파이의 센서 데이터를 확인하여 사용시간이 어떻게 되는지 반환하는 서비스
    * 이때, 하루마다 사용한 시간을 분단위로 반환한다.
    * @param {JSON} sendStatusDto
    */
    async sendLiveStatus(sendStatusDto) {
        try {

        } catch (error) {
            console.log("sendLiveStatus Service", error);
        }
    }

    /**
    * 지정한 Imei를 가진 라즈베리파이의 센서 데이터를 확인하여 사용시간이 어떻게 되는지 반환하는 서비스
    * 이때, 하루마다 사용한 시간을 분단위로 반환한다.
    * @param {JSON} checkUsageDto
    */
    async checkUsage(checkUsageDto) {
        try {

        } catch (error) {
            console.log("checkUsage Service", error);
        }
    }
}