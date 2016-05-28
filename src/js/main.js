import TweenMax from 'gsap'
import 'gsap/src/uncompressed/plugins/ScrollToPlugin'
import {$, $$} from './util'
import '../css/normalize.css'
import '../css/app.css'
import '../../build/css/sprite.css'


var noop = function() {}


var app = {
    init: function() {
        this.intervalBottle = undefined
        
        // this.writeTrueSize()
        this.quiverBottle($('.red-bottle:not(.glow)')[0])
        this.touchBottle($('.red-bottle'), this.redBottleToLeftTop.bind(this))
    },
    
    writeTrueSize: function() {
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
    },
    
    quiverBottle: function(el, ts) {
        ts = ts || 0.1
        var $elGlow = $('.red-bottle.glow')[0]
        function quiverOnce() {
            TweenMax.to([el, $elGlow], ts, {
                rotation: -2, 
                yoyo: true,
                repeat: 8,
                onComplete: function() {
                    TweenMax.to([el, $elGlow], ts, {rotation: 0,transformOrigin: "center bottom"});
                },
                transformOrigin: "center bottom"});
        }
        quiverOnce()
        this.intervalBottle = setInterval(quiverOnce, 2500)
    },
    
    touchBottle: function(el, callback) {
        var self = this
        
        // once handler        
        function handler() {
            clearInterval(self.intervalBottle)
            callback && callback()
            handler = noop
        }
        function handlerWrap() {
            handler()
        }
        el.on('touchstart', handlerWrap)
    },
    
    redBottleToLeftTop: function() {
        var delay = 0.5
        var $elGlow = $('.red-bottle.glow')[0]
        var $el = $('.red-bottle:not(.glow)')[0]
        var $lid = $('.red-bottle-lid')[0]
        
        // bottle move to lefttop
        var aniGlowProp = {
            opacity: 0, 
            onComplete: function() {
                // remove elGlow after animate
                $elGlow && ($elGlow.outerHTML = '')
            }
        }   
        var aniProp = {
            x: -564, y: -730,
            scale: 1.3,
            ease: 'Power4',
            rotation: 150,
            delay: delay,
            transformOrigin: "center bottom"}
        Object.assign(aniGlowProp, aniProp)     // merge prop
        TweenMax.to($el, 1, aniProp);
        TweenMax.to($elGlow, 1, aniGlowProp);
        
        // text fade
        TweenMax.staggerTo([$('.txt-3')[0], $('.txt-2')[0]], 1, {delay: 0.5,scale: .7,opacity: 0}, 0.5);
        
        // open lid 
        TweenMax.to($lid, 0.6, {delay: 1+delay,rotation: 150,
            transformOrigin: "right bottom", 
            onComplete: function() {
                TweenMax.to($$('.pipe-red'), 1, {opacity: 1})
                TweenMax.to($$('.txt-4'), 1, {delay: 0.5,opacity: 1})
                app.dropletMove($$('.droplet-red'), app.girlSmile)
            }
        });
        
    },
    
    dropletMove: function(el, callback) {
        $('body')[0].style.overflow = 'hidden'
        TweenMax.to(window, 2, {scrollTo:{y:300}, ease:Power2.easeOut});
        TweenMax.to(window, 2, {delay: 5,scrollTo:{y:800}, ease:Power2.easeOut});
        
        TweenMax.to(el, 0.5, {opacity: 1});
        TweenMax.to(el, 1.5, {delay: .5,x: -156, y: 550,ease: Linear.easeNone});
        TweenMax.to(el, 1.5, {delay: 2,x: 214, y: 350,ease: Linear.easeNone});
        TweenMax.to(el, 1.5, {delay: 3.5,x: 314, y: 650,ease: Linear.easeNone});
        TweenMax.to(el, 1.5, {delay: 5,x: 14, y: 910,ease: Linear.easeNone, onComplete: callback});
        
    },
    
    girlSmile: function() {
        // $('body')[0].style.overflow = 'auto'
        var $girlSad = $('.girl-sad')
        TweenMax.to([$('.girl-smile')[0], $('.txt-6')], 1, {opacity: 1});
        TweenMax.to($('.txt-1'), 1, {opacity: 0});
        TweenMax.to($girlSad[0], 1, {opacity: 0, onComplete: function() {
            $girlSad.remove()
            setTimeout(app.prepareSecondDroplet, 3*1000)
            }
        });
    },
    
    prepareSecondDroplet: function() {
        $('.red-bottle').remove()
        var $blueBottle = $('.blue-bottle')[0]
        TweenMax.to($('.pipe-red')[0], 1, {opacity: 0});
        
        TweenMax.to($blueBottle, 0, {scale: 1.5,transformOrigin: "center bottom"});
        $blueBottle.style.left = '511px'
        $blueBottle.style.top = '285px'

        // hide & show
        $('.droplet-red, .txt-1, .txt-2, .txt-3, .txt-4,.girl-sad, .red-bottle').remove()
        ;[]['forEach'].call($('.girl-smile, .txt-6, #scene-3 .bubble'), function (el) {
            el.style.opacity = 1
        });
        
        TweenMax.to(window, 2, {scrollTo:{y:0}, ease:Power2.easeOut});
        app.startBlueDroplet()
    },
    
    startBlueDroplet: function() {
        app.quiverBottle($$('.blue-bottle'))
        app.touchBottle($('.blue-bottle'), app.handleBlueBottleTouch)
    },
    
    handleBlueBottleTouch: function() {
        TweenMax.to($$('.blue-bottle'), 1, {opacity: 0})
        TweenMax.to($$('.blue-bottle-incling'), 1, {
            delay: 0.5,opacity: 1, 
            onComplete: function() {
                TweenMax.to($$('.pipe-blue'), 2, {delay: 0.5,opacity: 1})
                TweenMax.to($$('.txt-8'), 1, {opacity: 1})
                app.dropletMove($$('.droplet-blue'), app.girlBigSmile)
            }
        })
    },
    
    girlBigSmile: function() {
        TweenMax.to($$('.droplet-blue'), 1.5, {x: 126, y: 1090});
        TweenMax.to([$$('.girl-smile'), $$('.txt-6')], 1, {delay: 1,opacity: 0})
        TweenMax.to([$$('.girl-big-smile'), $$('.txt-7')], 1, {delay: 1,opacity: 1})
        setTimeout(app.gotoMall, 5*1000)
    },
    
    gotoMall: function() {
        location.href = 'product.html'
    }
}








$('body')[0].onload = function() {
    app.init()
}

