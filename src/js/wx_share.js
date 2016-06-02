import 'wx'
var config = require('../../config')
function wechatSetting(signature) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: signature.timestamp, // 必填，生成签名的时间戳
        nonceStr: signature.nonceStr, // 必填，生成签名的随机串
        signature: signature.signature,// 必填，签名，见附录1
    });


    wx.ready(function(){
        wx.onMenuShareAppMessage({
            title: 'bidoi', // 分享标题
            desc: 'miao shu', // 分享描述
            link: 'baidu.com', // 分享链接
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
            // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
            // 用户取消分享后执行的回调函数
            }
        });
    })
}

export default wechatSetting