import UserModel from "../models/user.js";
import WhitelistModel from "../models/whitelist.js";

export class Test {
  constructor() { }
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
}
