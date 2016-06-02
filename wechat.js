'use strict'

var wx = require('wechat-jssdk')
var config = require('./config')
wx.initialize({
    "wechatRedirectHost": "http://127.0.0.1",
    "wechatToken": config.wechatToken,
    "appId": config.appId,
    "appSecret": config.appSecret
})

module.exports = function(app, router) {
    router.use((req, res, next)=> {
        console.log('Time: ', Date.now())
        next()
    })
    
    router.get('/api/wechat', function(req, res){
        if(wx.jssdk.verifySignature(req.query)) {
            res.send(req.query.echostr);
            return;
        }
        res.send("error");
    });
    
    router.get('/get-signature', function(req, res) {
        wx.jssdk.getSignatureByURL(req.query.url, function(signatureDate) {
            res.json(signatureDate);
        });
    });

    app.use('/', router)
}