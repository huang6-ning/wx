import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login, getUserInfo } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo() {
    
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = await getUserInfo();
    // 2 获取小程序登录成功后的code
    const { code } = await login();
    const loginParams={ encryptedData, rawData, iv, signature ,code};
    //  3 发送请求 获取用户的token
    const {token}= await request({url: "https://api.zbztb.cn/api/public/v1/users/wxlogin", data: loginParams, method: "post"});
    // 4 把token存入缓存中 同时跳转回上一个页面
    
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });   
  }
})