import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";
import RasbpiModel from "../models/rasbpi.js";
import { Sequelize, Op } from "sequelize";
import moment from "moment";

export class GraphService {
  /**
   * 지정한 Imei를 가진 라즈베리파이에서의 현재 사용자 허리 상태를 반환받는 서비스
   * 라즈베리파이에서는 0.1초 단위로 자체적으로 저장하고, 서버에서는 1초마다 10개의 데이터를 반환받는다.
   * @param {JSON} getStatusDto - 인증된 사용자의 세션에서 수신한 imei 데이터가 저장되어 있다.
   */
  async sendLiveStatus(getStatusDto) {
    try {
      const currentTime = new Date();
      const pastTime = currentTime - 2000;
      const getSecondSensorResult = await RasbpiModel.findAndCountAll({
        attributes: ["result"],
        where: {
          [Op.and]: [
            { whitelist_imei: getStatusDto.imei },
            { createdAt: { [Op.between]: [pastTime, currentTime] } },
          ],
        },
        limit: 10,
        raw: true,
      });
      if (getSecondSensorResult.count === 0) {
        return null;
      }

      let sumBackforth = 0;
      let sumRight = 0;
      let sumLeft = 0;
      let sumAccuracy = 0;

      /* 
      backforth = 허리가 앞뒤를 기준으로 정상범위 이내인가? 0: 정상, 1: 약간 이상, 2: 매우 이상
      right, left = 허리가 좌우를 기준으로 정상범위 이내인가? -2: 왼쪽 치우침, -1: 왼쪽 조금 치우침, 0: 정상, 1: 오른쪽 약간 치우침, 2: 오른쪽 치우침 
      accuracy = 현재 움직이는 중인가? 0: 움직임 없음, 1: 움직임 조금 있음 2: 매우 움직임
      */
      getSecondSensorResult.rows.forEach((element) => {
        // 실제로  1 ~ 10개중 몇개가 들어올지 모르므로 forEach 사용
        sumBackforth += element.result.backforth;
        element.result.both < 0
          ? (sumLeft += element.result.both)
          : (sumRight += element.result.both);
        sumAccuracy += element.result.accuracy;
      });

      // 부동소수점이 아닌 고정소수점으로 반환
      const avgSensorResult = {
        count: getSecondSensorResult.count,
        avgBackforth: (sumBackforth / getSecondSensorResult.count).toFixed(1),
        avgLeft: (sumLeft / getSecondSensorResult.count).toFixed(1),
        avgRight: (sumRight / getSecondSensorResult.count).toFixed(1),
        avgAccuracy: (sumAccuracy / getSecondSensorResult.count).toFixed(1),
        original: getSecondSensorResult.rows,
      };

      return avgSensorResult;
    } catch (error) {
      console.log("sendLiveStatus Service", error);
    }
  }

  /**
   * 지정한 Imei를 가진 라즈베리파이의 센서 데이터를 확인하여 사용시간이 어떻게 되는지 반환하는 서비스
   * 이때, 하루마다 사용한 시간을 분단위로 반환한다.
   * @param {JSON} getUsageDto - 인증된 사용자의 세션에서 수신한 imei 데이터가 저장되어 있다.
   */
  async getUsage(getUsageDto) {
    try {
      const usage = [];
      const axisX = [];

      for (let i = 0; i < 7; i++) {
        const currentTime = moment().startOf("day").subtract(i, "days");
        const endOfTime = moment().endOf("day").subtract(i, "days");

        const getUsageResult = await RasbpiModel.findAndCountAll({
          attributes: [Sequelize.fn("DISTINCT", Sequelize.col("createdAt"))],
          where: {
            [Op.and]: [
              { whitelist_imei: getUsageDto.imei },
              { createdAt: { [Op.between]: [currentTime, endOfTime] } },
            ],
          },
          raw: true,
        });
        usage.unshift((getUsageResult.count / 60).toFixed(2));
        axisX.unshift(currentTime.format("YYYY-MM-DD"));
      }
      const usageGraph = { usage, axisX };
      return usageGraph;
    } catch (error) {
      console.log("checkUsage Service", error);
    }
  }

  /**
   * 지정한 Imei를 가진 라즈베리파이의 센서 데이터를 확인하여 사용시간이 어떻게 되는지 반환하는 서비스
   * 이때, 하루마다 사용한 시간을 분단위로 반환한다.
   * @param {JSON} getUsageDto - 인증된 사용자의 세션에서 수신한 imei 데이터가 저장되어 있다.
   */
   async getOriginal(getUsageDto) {
    try {
      
      const usageGraph = { usage, axisX };
      return usageGraph;
    } catch (error) {
      console.log("checkUsage Service", error);
    }
  }
}
