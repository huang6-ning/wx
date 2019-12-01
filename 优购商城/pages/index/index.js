// 完整路径
import {
    request
} from '../../request/index.js';

Page({
    data: {
        swiperList: [],
        cateList: [],
        floorList: []
    },
    // 页面开始加载触发
    onLoad: function(options) {
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },

    getSwiperList() {
        request({
                url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata'
            })
            .then(res => {
                this.setData({
                    swiperList: res.data.message
                })
            })
    },

    // 获取分类导航数据
    getCateList() {
        request({
                url: 'https://api.zbztb.cn/api/public/v1/home/catitems'
            })
            .then(res => {
                this.setData({
                    cateList: res.data.message
                })
            })
    },

    // 获取楼层数据
    getFloorList() {
        request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata'
            })
            .then(res => {
                this.setData({
                    floorList: res.data.message
                })
            })
    }
})