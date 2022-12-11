import RasbpiModel from "../models/rasbpi.js";
export class piDataService {
  constructor() {}
  /**
   * DB로 라즈베리파이의 센서 데이터를 저장하기 위해 사용
   * @param {Object} insertPiSensorDto - 라즈베리파이 센서 데이터값
   */
  async SaveData(insertPiSensorDto) {
    try {
      const isPiSensorAccepted = await RasbpiModel.create({
        whitelist_imei: insertPiSensorDto.imei,
        raw: insertPiSensorDto.raw,
        result: insertPiSensorDto.result,
        createdAt: insertPiSensorDto.createdAt,
      });
      return isPiSensorAccepted ? true : false;
    } catch (error) {
      console.log("SaveData Service", error);
    }
  }
}

/*
IMEI
raw :{}
top x, y, z, pitch, row
middle x, y, z
low x,y,z
result : {
    top 
    middle
    low
}


*/
