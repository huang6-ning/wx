import {
    request
} from '../../request/index.js';
//使用ES7 的async 语法需要导入的代码
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    data: {
        //接收请求回来的数据，部分数据
        goodsObj: {},
        isCollect: false

    },
    // 进行图片预览的数据,全部数据
    GoodsInfo: [],
    
    onShow: function () {
        var curPages =  getCurrentPages();
        let options = curPages[curPages.length - 1].options;
        this.getGoodsDetail(options.goods_id) 
    },

    async getGoodsDetail(goods_id) {
        const res = await request({ url: 'https://api.zbztb.cn/api/public/v1/goods/detail', data: { goods_id } });
        const goodsObj = res.data.message;
        this.GoodsInfo = goodsObj;    
        
        // 判断是否有收藏
        let collect = wx.getStorageSync('collect') || [];
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
       
        this.setData({
            isCollect,
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                // iphone部分手机 不识别 webp图片格式  
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            }
        });
        
    },

    //点击图片进行预览
    handlePrevewImage(e) {
        // 1 先构造要预览的图片数组 
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        
        // 2 接收传递过来的图片url
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls
        });
    },

    //点击加入购物车
    handleCartAdd() {
        let cart = wx.getStorageSync('cart') || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo)           
        } else {
            cart[index].num++;
        }
        wx.setStorageSync('cart',cart)
        wx.showToast({
          title: '加入成功', //提示的内容,
          icon: 'success', //图标,
          mask: true, //显示透明蒙层，防止触摸穿透,防止用户疯狂点击
        });
    },

    // 点击收藏
    handleCollect() {
        // 判断是否有收藏
        let collect = wx.getStorageSync('collect') || [];
        let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        
        if(index === -1) {
            // 没有收藏
            collect.push(this.GoodsInfo)
            wx.showToast({
              title: '收藏成功', //提示的内容,
              icon: 'success', //图标,
            })
        } else {
            // 有收藏
            collect.splice(index, 1)
            wx.showToast({
                title: '取消收藏', //提示的内容,
                icon: 'success', //图标,
            })
        }
        let isCollect = !this.data.isCollect;
        wx.setStorageSync('collect',collect)
        
        this.setData({
            isCollect
        })
    }
})
