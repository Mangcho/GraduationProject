import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";
import SessionModel from "../models/session.js";
import RasbpiModel from "../models/rasbpi.js";
import {Sequelize, Op} from "sequelize";

export class Test {
  constructor() {}
  async syncData() {
    await WhitelistModel.create({ imei: "73ff34fce1" });
    // 비밀번호 = password
    await UserModel.create({
      email: "bnb1324@naver.com",
      password:
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      whitelist_imei: "73ff34fce1",
      name: "홍길동",
      age: 29,
    });
  }

  async joinQuery() {
    const a = await SessionModel.findOne({
      attributes:['data'],
      where: 
      {
        [Op.and] : [
          Sequelize.where(
            Sequelize.fn("JSON_EXTRACT", 
            Sequelize.col("data"), 
            Sequelize.literal((`'$.eid'`)),
            "bnb1324@naver.com"
          )),
          Sequelize.where(Sequelize.col("sid"),"1")
        ]
      }
        ,    
      // eid가 bnb1324@naver.com인 세션을 찾는다 -> 하나만
      // SELECT `data` FROM `sessions` AS `sessions` WHERE (JSON_EXTRACT(`data`, '$.eid', 'bnb1324@naver.com') IS NULL AND `sid` = '1') LIMIT 1;
      raw: true, // 이전 밸류 검색 사라짐
    });
    const b = JSON.parse(a.data);
    console.log(b.imei);
  }

  async selectPi() {
    const tta = new Date();
    const ttb = tta - 1000;
    console.log("aasadasd", tta.toISOString());
    const abc = await RasbpiModel.findAndCountAll({
      attributes:['result'],
      where: {
        [Op.and]:[
          {whitelist_imei : "73ff34fce1"},
          {createdAt:{[Op.between]:[ttb, tta]}}
        ]
      },
      limit:10,
      raw:true
  })
  console.log(abc.rows[0].result.backforth);
  
  }
}
