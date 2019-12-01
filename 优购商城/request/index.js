//同时发送多个请求时，设置当最后一个请求成功时，关闭提示
let ajaxTime = 0;
export const request = (params) => {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }

    ajaxTime++;
    //发送请求前提示正在加载
    wx.showLoading({
      title: '正在加载中', //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
    });

    return new Promise((resolve,reject) => {
        wx.request({
          ...params, //开发者服务器接口地址",
          header: header,
          success: res => {
              resolve(res)
          },
          fail: err => {
              reject(err)
          },
          complete: () => {
            ajaxTime--;
            if (!ajaxTime) {
                wx.hideLoading()
            }
          }
        });
    })
}