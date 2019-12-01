import {
    request
} from '../../request/index.js';
//使用ES7 的async 语法需要导入的代码
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    // 页面的初始数据
    data: {
        // 左侧的菜单数据
        leftCategoryList: [],
        // 右侧的商品数据
        rightCategoryList: [],
        // 被点击的左侧的菜单
        currentIndex: 0,
        // 右侧内容的滚动条距离顶部的距离
        scrollTop: 0
    },
    // 接口的返回数据
    Cates: [],

    // 生命周期函数--监听页面加载
    onLoad: function(options) {
        //  1 获取本地存储中的数据  (小程序中也是存在本地存储 技术)
        const Cates = wx.getStorageSync("cates");
    // 2 判断
    if (!Cates) {
      // 不存在  发送请求获取数据
      this.getCates();
    } else {
      // 有旧的数据 定义过期时间  10s 改成 5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    },

    // async 获取分类商品的数据
    async getCates() {
        const res = await request({ url: 'https://api.zbztb.cn/api/public/v1/categories'});
        this.Cates = res.data.message;
        // 把接口的数据存入到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })

        let leftCategoryList = this.Cates.map(v => v.cat_name)
        let rightCategoryList = this.Cates[0].children
        this.setData({
            leftCategoryList,
            rightCategoryList
        })
    },
    // 左侧菜单的点击事件
    handleItemTap(e) {
        const index = e.currentTarget.dataset.index;
        let rightCategoryList = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightCategoryList,
            scrollTop: 0
        })
    }
})