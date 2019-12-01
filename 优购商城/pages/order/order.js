// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '全部',
                isActive: true
            },
            {
                id: 1,
                value: '待付款',
                isActive: false
            },
            {
                id: 2,
                value: '待发货',
                isActive: false
            },
            {
                id: 3,
                value: '退款/退货',
                isActive: false
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setIsActive(options.type - 1);
    },

    handleTabsItemChange(e) {
        this.setIsActive(e.detail.index)
    },

    setIsActive(i) {
        const index = i;
        let tabs = this.data.tabs;
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    }
})