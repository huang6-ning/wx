import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        // 输入框的值
        inpValue: ''
    },
    TimeId: -1,

    // 输入框输入发送请求
    handleInput(e) { 
        const query = e.detail.value;
        if (!query.trim()) {
            this.setData({
                isFocus: false,
                goods: []
            })
        }

        this.setData({
            isFocus: true
        })
        clearInterval(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qsearch(query)
        }, 1000)
    },

    async qsearch(query) {
        let res = await request({url:"https://api.zbztb.cn/api/public/v1/goods/qsearch",data:{query}});
        let goods = res.data.message;
        this.setData({
            goods
        })
    },
    // 点击取消按钮
    handleCancel() {
        this.setData({
            isFocus: false,
            goods: [],
            inpValue: ''
        })
    }
})