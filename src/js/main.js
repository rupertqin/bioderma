import 'gsap'
import 'gsap/src/uncompressed/plugins/ScrollToPlugin'
import {$, $$, get, post, getParameterByName} from './util'
import wechatSetting from './wx_share'
import '../css/normalize.css'
import '../css/app.css'
import '../../build/css/sprite.css'


const noop = function() {}


class AnimatePage {
    constructor() {
        this.tl = new TimelineLite()
        this.intervalBottle = undefined
        
        // this.writeTrueSize()
        this.bottlePosture()
        this.scan()
            .then(() => {
                TweenMax.staggerTo([$$('.txt-step1')], 0.5, {opacity: 1});
                this.showStepTyping($$('.txt-step1'))
                TweenMax.staggerTo([$$('.txt-3')], 1, {delay: 0.5,opacity: 1}, 0.5);
                this.quiverBottle($$('.red-bottle'))
                return this.bindBottleAction($('.red-bottle'), this.redBottleToLeftTop.bind(this))
            })
            .then(()=> {
                TweenMax.to($$('.pipe-red'), 1, {opacity: 1})
                TweenMax.to($$('.txt-4'), 1, {delay: 0.5,opacity: 1})
                return this.dropletMove($('.droplet-red-img'))
            })
            .then(()=> {
                return this.girlSmile()
            })
            .then(()=> {
                return this.prepareSecondDroplet()
            })
            .then(()=> {
                TweenMax.to($$('.pipe-red'), 3, {opacity: 0});
                TweenMax.to($$('.pipe-blue'), 3, {delay: 0.5,opacity: 1})
                TweenMax.to($$('.txt-8'), 1, {opacity: 1})
                return this.dropletMove($('.droplet-blue-img'))
            })
            .then(()=> {
                return this.girlBigSmile()
            })
    }
    
    scan() {
        const diff = $$('body').clientHeight - window.innerHeight
        this.tl.to(window, 0, {delay: 1,scrollTo:{y:0}});
        this.tl.to(window, 1.5, {scrollTo:{y: diff}, ease: Linear.easeNone, onComplete: ()=> {
            TweenMax.to($$('.red-bottle'), 0, {scale: 1, y: 30,transformOrigin: "center bottom"});
        }});
        return new Promise((resolve, reject) => {
            this.tl.to(window, 1.5, {scrollTo:{y:0}, ease: Linear.easeNone, onComplete: ()=> {
                resolve(1)
            }});
        })
    }
    
    writeTrueSize() {
        var urlPat = /url\("?([^"]+)"?\)/
        ;[].slice.apply($('.thing')).forEach(function(el){
            var rawUrlStr = window.getComputedStyle(el,null).getPropertyValue('background-image')
            var url = rawUrlStr.match(urlPat)[1]
            var image = new Image()
            image.src = url
            image.onload = function(e) {
                el.style.width = e.target.width + 'px'
                el.style.height = e.target.height + 'px'
            }
        })
    }
    
    showStepTyping($step) {
        var $h4 = $step.querySelector('h4')
        var $txt = $step.querySelector('div')
        TweenMax.to($txt, 0, {opacity: 1, transformOrigin: "center bottom"});
        var tl = new TimelineMax()
        var pat = /([\u4e00-\u9fa5\!])/g
        var splitText = $txt.innerHTML.replace(pat, '<span style="opacity:0;">$1</span>')
        $txt.innerHTML = splitText
        tl.staggerTo($txt.querySelectorAll('span'), 1, {opacity:1, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.2, "+=0");
    }
    
    bottlePosture() {
        TweenMax.to($$('.red-bottle'), 0, {scale: 0.6, transformOrigin: "center bottom"});
        TweenMax.to($$('.blue-bottle'), 0, {scale: 0.6, transformOrigin: "center bottom"});
    }
    
    quiverBottle(el, ts) {
        var self = this
        ts = ts || 0.1
        function quiverOnce() {
            TweenMax.to(el, ts, {
                rotation: '-=5', 
                yoyo: true,
                repeat: 8,
                onComplete: function() {
                    TweenMax.to(el, ts, {rotation: '+=5',transformOrigin: "center bottom"});
                },
                transformOrigin: "center bottom"});
        }
        quiverOnce()
        this.intervalBottle = setInterval(quiverOnce, 2500)
    }
    
    bindBottleAction(el, callback) {
        var self = this
        return new Promise((resolve, reject) => {
            // once handler        
            function handler() {
                clearInterval(self.intervalBottle)
                callback && callback(resolve)
                handler = noop
            }
            function handlerWrap() {
                handler()
            }
            el.on('touchstart', handlerWrap)
        })
    }
    
    redBottleToLeftTop(resolve) {
        var self = this
        var $el = $$('.red-bottle')
        var $lid = $$('.red-bottle-lid')
        _paq.push(['trackEvent', '水珠页面', '点击红瓶子','点击蓝瓶子']);
        this.tl.to($el, 1, {
            x: -504, y: -570,
            scale: 1.3,
            ease: 'Power4',
            rotation: 150,
            transformOrigin: "center bottom"});
        
        // text fade
        TweenMax.staggerTo([$$('.txt-step1'), $('.txt-3')], 1, {delay: 0.5,scale: .7,opacity: 0,onComplete: function() {
            // scale to origin size
            TweenMax.to($('.txt-3'), 0, {delay: 1.5, scale: 1})    
        }}, 0.5);
        
        // open lid 
        this.tl.to($lid, 0.6, {rotation: 150,
            transformOrigin: "right bottom", 
            onComplete: resolve
        });
        
    }
    
    dropletMove(elArr) {
        elArr = [].slice.call(elArr)
        $('body')[0].style.overflow = 'hidden'
        TweenMax.to(window, 2, {scrollTo:{y:300}, ease:Power2.easeOut});
        TweenMax.to(window, 2, {delay: 5,scrollTo:{y:800}, ease:Power2.easeOut});

        function moveOne(el, resolve) {
            var tl = new TimelineMax()
            tl.to(el, 0.5, {opacity: 1}, 1);
            tl.to(el, 2.5, {x: -156, y: 640,ease: Linear.easeNone});
            tl.to(el, 2, {x: 254, y: 430,ease: Linear.easeNone});
            tl.to(el, 1.5, {x: 314, y: 720,ease: Linear.easeNone});
            tl.to(el, 1.5, {x: 14, y: 1050,ease: Linear.easeNone, onComplete: resolve});
        }
        return Promise.all(elArr.map((el, i)=> {
            return new Promise((resolve, reject)=> {
                setTimeout(moveOne.bind(this, el, resolve), i*2000)
            })
        }))
    }
    
    girlSmile() {
        var self = this
        // $('body')[0].style.overflow = 'auto'
        var $girlSad = $('.girl-sad')
        TweenMax.to([$$('.girl-smile'), $$('.txt-6')], 1, {opacity: 1});
        TweenMax.to($$('.txt-1'), 1, {opacity: 0});
        return new Promise((resolve, reject)=> {
            TweenMax.to($girlSad[0], 1, {opacity: 0, onComplete: function() {
                    $girlSad.remove()
                    setTimeout(resolve, 0*1000)
                }
            });
        });
    }
    
    prepareSecondDroplet() {
        $('.red-bottle').remove()
        var $blueBottle = $('.blue-bottle')[0]
        
        TweenMax.to($blueBottle, 0, {scale: 1,transformOrigin: "center bottom"});
        $blueBottle.style.left = '431px'
        $blueBottle.style.top = '165px'

        // hide & show
        $('.droplet-red, .txt-1, .txt-step1, .txt-4,.girl-sad, .red-bottle').remove()
        ;[]['forEach'].call($('.girl-smile, .pipe-red, .txt-3, .txt-6, #scene-3 .bubble'), function (el) {
            el.style.opacity = 1
        });
        TweenMax.to(window, 2, {scrollTo:{y:0}, ease:Power2.easeOut, onComplete: ()=> {
            TweenMax.to($$('.txt-step2'), 0.5, {opacity: 1,transformOrigin: "center bottom"});
            this.showStepTyping($$('.txt-step2'))
            this.quiverBottle($$('.blue-bottle'))
        }});
        return this.bindBottleAction($('.blue-bottle'), this.blueBottleToLeftTop.bind(this))
    }
    
    blueBottleToLeftTop(resolve) {
        var self = this
        var delay = 0.5
        var $el = $$('.blue-bottle')
        var $lid = $$('.blue-bottle-lid')
        
        _paq.push(['trackEvent', '水珠页面', '点击蓝瓶子']);
        var aniProp = {
            x: -504, y: -570,
            scale: 1.3,
            ease: 'Power4',
            rotation: 150,
            delay: delay,
            transformOrigin: "center bottom"}
        this.tl.to($el, 1, aniProp);
        
        // text fade
        TweenMax.staggerTo([$$('.txt-3'), $$('.txt-step2')], 1, {scale: .7,opacity: 0}, 0.5);
        
        // open lid 
        this.tl.to($lid, 0.6, {rotation: 150,
            transformOrigin: "right bottom", 
            onComplete: resolve
        });
        
    }
    
    girlBigSmile() {
        TweenMax.to([$$('.girl-smile'), $$('.txt-6')], 1, {opacity: 0})
        TweenMax.to([$$('.girl-big-smile'), $$('.txt-7')], 1, {opacity: 1})
        setTimeout(this.gotoMall, 5*1000)
    }
    
    gotoMall() {
        var search = location.search
        location.href = 'product.html' + location.search
    }
}

class IndexAnimate {
    constructor() {
        var self = this
        this.addLink()
        this.intervalBottle = undefined
        this.bottlePosture()
        this.quiverBottle($$('.blue-bottle'))
        this.goAni()
        
        setTimeout(function(){
            self.quiverBottle($$('.red-bottle'))
        }, 100)
    }
    
    addLink() {
        var search = location.search
        $$('.go').href = 'animate.html' + search
    }
    
    bottlePosture() {
        TweenMax.to($$('.blue-bottle'), 0, {rotation: -15,transformOrigin: "center bottom", scale: 1.35});
        TweenMax.to($$('.red-bottle'), 0, {rotation: 15,transformOrigin: "center bottom", scale: 1.35});
    }
    
    goAni() {
        TweenMax.to($$('.go'), 1, {yoyo: true, scale: 1.15, repeat: -1});
    }
    
    quiverBottle(el, ts) {
        ts = ts || 0.1
        function quiverOnce() {
            TweenMax.to(el, ts, {
                rotation: '-=1', 
                yoyo: true,
                repeat: 8,
                onComplete: function() {
                    TweenMax.to(el, ts, {rotation: '+=1',transformOrigin: "center bottom"});
                },
                transformOrigin: "center bottom"});
        }
        quiverOnce()
        this.intervalBottle = setInterval(quiverOnce, 3500)
    }
}


class ProductPage {
    constructor() {
        this.goAni()
    }
    
    goAni() {
        const from = getParameterByName('from', window.location.href)
        TweenMax.to($$('.tmall-link'), 1, {yoyo: true, scale: 1.05, repeat: -1});
        function cb(e) {
            const linkUrl = e.target.href
            e.preventDefault()
            _paq.push(['trackEvent', '优惠券页面', '链接淘宝','购买']);
            get('/track', (data)=> {
                location.href = linkUrl + location.search
            })
        }
        $('.tmall-link').on('touchstart', cb)
        // $('.tmall-link').on('click', cb)
    }
}

function jsonpGet(url, callbackName) {
    var scriptEl = document.createElement('script')
    var tail = ~url.indexOf('?') ? '&' : '?' 
    scriptEl.setAttribute('src', encodeURI(url) + tail + 'callback=' + callbackName)
    scriptEl.setAttribute('type', 'text')
    document.body.appendChild(scriptEl)
}

function getSignature(callback) {
    
    get('/get-signature?url=' + encodeURIComponent(location.href), callback)
}

function trackImg() {
    var from = getParameterByName('from', window.location.href)
    var url = `http://218.244.145.245/mlog.php?campaign_id=zgkj-bdma&fromkol=${from}`
    $$('body').insertAdjacentHTML('beforeend', `<img style="display:none;" src="http://218.244.145.245/mlog.php?campaign_id=zgkj-bdma&fromkol=${from}"/>`)
}

getSignature((data)=> {
    wechatSetting(data )
})

trackImg()



$('body')[0].onload = function() {
    
    if ($$('body#index-page')) {
        var indexAnimate = new IndexAnimate()
    } else if($$('body#animate-page')) {
        window.animatePage = new AnimatePage()
    } else if($$('body#product-page')) {
        window.productPage = new ProductPage()
    }
}

