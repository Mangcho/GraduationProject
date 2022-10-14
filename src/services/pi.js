import  RasbpiModel from "../models/rasbpi.js";
export default class piDataService {
  constructor() { }
  /**
   * DB로 라즈베리파이의 센서 데이터를 저장하기 위해 사용
   * @param {Object} insertPiSensorDto - 라즈베리파이 센서 데이터값
   */
  async SaveData(insertPiSensorDto) {
    try {
      const isPiSensorAccepted = await RasbpiModel.create({
        whitelist_imei: insertPiSensorDto.imei,
        timestamp: insertPiSensorDto.timestamp,
        raw: insertPiSensorDto.raw,
      });
      console.log(typeof (isPiSensorAccepted))
      return isPiSensorAccepted === null ? false : true
    } catch (error) {
      console.log(error)
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
