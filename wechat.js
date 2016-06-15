'use strict'
var http = require('http')
var wx = require('wechat-jssdk')
var moment = require('moment')
var querystring = require('querystring')
var config = require('./config')

wx.initialize({
    // "wechatRedirectHost": "http://127.0.0.1",
    "wechatToken": config.wechatToken,
    "appId": config.appId,
    "appSecret": config.appSecret
})

module.exports = function(app, router) {
    // router.use((req, res, next)=> {
    //     console.log('Time: ', Date.now())
    //     next()
    // })
    
    router.get('/api/wechat', function(req, res){
        if (wx.jssdk.verifySignature(req.query)) {
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
    
    router.get('/track', function(req, response) {
        // console.log('======= req: ', req.query)
        var postData = querystring.stringify({
            campaign_id : 'zgkj-bdma',
            token: 'imtravelzoo',
            fromkol: req.query.fromkol
        });
        var options = {
            hostname: '218.244.145.245',
            port: 80,
            path: '/api/contact/form',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        
        var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                response.json(chunk);
            });
            res.on('end', () => {
                console.log('No more data in response.')
            })
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(postData);
        req.end();
    });

    app.use('/', router)
}