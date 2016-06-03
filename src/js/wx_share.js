import 'wx'
var config = require('../../config')

const shareConf = {
    title: config.title || '贝德玛轻松两步曲邀您体验，肌肤立即“如愉得水”', // 分享标题
    desc: config.desc || '拯救肌肤，贝德玛来了！清洁+补水，只需简单两步。立即享受惊喜优惠，让你的肌肤“如愉得水”', // 分享描述
    link: config.link || window.location.origin, // 分享链接
    imgUrl: config.imgUrl || window.location.origin + '/img/pic.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
}

function wechatSetting(signature) {
    console.log('====== signature: ', signature)
    wx.config({
        debug: config.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: signature.timestamp, // 必填，生成签名的时间戳
        nonceStr: signature.nonceStr, // 必填，生成签名的随机串
        signature: signature.signature,// 必填，签名，见附录1
        success: function() {
            console.log('success');
        },
        error: function(err) {
            console.error(err)
        },
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(function(){
        wx.onMenuShareAppMessage(shareConf);
        wx.onMenuShareTimeline(shareConf);
    })
}

export default wechatSetting