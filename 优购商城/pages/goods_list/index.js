import {
    request
} from '../../request/index.js';
//使用ES7 的async 语法需要导入的代码
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    // 页面的初始数据
    data: {
        tabs: [
            {
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            }
        ], 
        goodsList:[]
    },
    //总页数
    totalPages: 1,
    // 接口要的参数
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1, //第几页
        pagesize: 10    //每页数量
    },
    // 生命周期函数--监听页面加载
    // 接收商品分类的传参 options
    onLoad: function (options) {
        this.QueryParams.cid = options.cid || '';
        this.QueryParams.query = options.query || '';
        this.getGoodsList()
    },
    //下拉触底生命周期函数  
    onReachBottom() {
        //判断下拉是否还有下一页
        if(this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
              title: '没有下一页数据了', //提示的内容,
            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },

    // 获取商品列表数据
    async getGoodsList() {
        const res = await request({url: 'https://api.zbztb.cn/api/public/v1/goods/search', data: this.QueryParams});
        //总页数
        this.totalPages = Math.ceil(res.data.message.total / this.QueryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })
    },

    handleTabsItemChange(e) {
        const index = e.detail.index;
        let tabs = this.data.tabs;
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    }
})