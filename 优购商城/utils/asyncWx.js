/**
 * promise 形式  getSetting
 */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({ 
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        });
    })
};
/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
          success: res => {
              resolve(res)
          },
          fail: err => {
                reject(err)
          }
        });
    })
};
/**
 * promise 形式  openSetting
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({ 
            success: res => {
                resolve(res)
            },
            fail: err => {
                  reject(err)
            }
         });
    })
}
/**
 *  promise 形式  showModal
 * @param {object} param0 参数
 */
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}
/**
 *  promise 形式  showModal
 */
export const showToast = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: content, //提示的内容,
            icon: 'success', //图标,
          })
    })
}
/**
 *  promise 形式  getUserInfo
 */
export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            },
          })
    })
}
/**
 *  promise 形式  login
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                resolve(res)
            },
            fail: () => {
                reject(err)
            },
          })
    })
}
/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
     wx.requestPayment({
        ...pay,
       success: (result) => {
        resolve(result)
       },
       fail: (err) => {
         reject(err);
       }
     });
       
    })
  }