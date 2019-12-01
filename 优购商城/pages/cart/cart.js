import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync('address');
    this.setData({
      address
    })
    const cart = wx.getStorageSync('cart') || [];
    this.setCart(cart)
  },

  //点击 获取用户收货地址
  async handleChooseAdress() {
    const res1 = await getSetting();
    // 当属性名有小数点时，用 [] 代替 . 同时属性名加上引号
    const scopeAddress = res1.authSetting["scope.address"];
    if (scopeAddress === false) {
      await openSetting();
    }
    const address = await chooseAddress();
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    wx.setStorageSync('address', address)
  },
  // 点击进行是否选择
  handleItemChange(e) {
    let { goods_id } = e.currentTarget.dataset;
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },
  // 全选、反选
  handleItemAllCheck() {
    let { allChecked, cart } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart)
  },
  // 点击 增减商品数量
  async handleItemNumEdit(e) {
    let { goods_id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === goods_id);

    if (cart[index].num === 1 && operation === -1) {
      let res = await showModal({content: '是否要删除该商品'});
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 点击结算
  async handlePay() {
    let {address, totalNum} = this.data
    if (!address.userName) {
      await showToast({content: '请选择地址'});
      return
    }
    if (!totalNum) {
      await showToast({content: '请选择商品'});
      return
    }
    // 跳转到支付页面
    wx.navigateTo({ url: '/pages/pay/pay' });
  },

  setCart(cart) {
    let allChecked = true;
    // 总价格、总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false;
      }
    });
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  }
})
