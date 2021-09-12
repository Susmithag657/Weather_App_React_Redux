import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class userApi {
  static async getAllUsers() {
    const res = await axios.get(
      "https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67"
    );
    return res.data;
  }

  static async register(user) {
    user.id = uuidv4();
    const res = await axios.post(
      "https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67",
      user,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("in User Api:");
    console.log(res.data);
    return res.data;
  }

  static async login(user) {
    const { name, password } = user;
    const encodedPassword = encodeURIComponent(password);
    const res = await axios.get(
      `https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67/search?name=*${name}*&password=${encodedPassword}`
    );
    if (res.data.length > 0) {
      return res.data[0];
    } else {
      return "user not found";
    }
  }

  static async getUser(email) {
    const res = await axios.get(
      `https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67/search?email=*${email}`
    );
    return res.data;
  }
}
