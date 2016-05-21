var noop = function() {}


var app = {
    init: function() {
        this.intervalRedBottle = undefined
        
        this.writeTrueSize()
        this.quiverRedBottle(0.1)
        this.touchRedBottle()
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
    
    quiverRedBottle: function(ts) {
        var $elGlow = $('.red-bottle.glow')[0]
        var $el = $('.red-bottle:not(.glow)')[0]
        function quiverOnce() {
            TweenMax.to([$el, $elGlow], ts, {
                rotation: -2, 
                yoyo: true,
                repeat: 8,
                onComplete: function() {
                    TweenMax.to([$el, $elGlow], ts, {rotation: 0,transformOrigin: "center bottom"});
                },
                transformOrigin: "center bottom"});
        }
        quiverOnce()
        this.intervalRedBottle = setInterval(quiverOnce, 2500)
    },
    
    touchRedBottle: function() {
        var $el = $('.red-bottle')
        var self = this
        
        // once handler        
        function handler() {
            clearInterval(self.intervalRedBottle)
            self.redBottleToLeftTop()
            handler = noop
        }
        function handlerWrap() {
            handler()
        }
        $el.on('touchstart', handlerWrap)
    },
    
    redBottleToLeftTop: function() {
        var delay = 0.5
        var $elGlow = $('.red-bottle.glow')[0]
        var $el = $('.red-bottle:not(.glow)')[0]
        var $lid = $('.red-bottle .lid')[0]
        
        // bottle move to lefttop
        var aniGlowProp = {
            opacity: 0, 
            onComplete: function() {
                // remove elGlow after animate
                $elGlow.outerHTML = ''
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
        TweenMax.to($lid, 0.6, {delay: 1+delay,rotation: 150,transformOrigin: "right bottom", onComplete: this.dropletMove.bind(this)});
        
    },
    
    dropletMove: function() {
        var $dropletRed = $('.droplet-red')[0] 
        TweenMax.to($dropletRed, 1, {opacity: 1});
        TweenMax.to($dropletRed, 1.5, {delay: 0.5,x: -156, y: 550});
        TweenMax.to($dropletRed, 1.5, {delay: 2,x: 214, y: 350});
        TweenMax.to($dropletRed, 1.5, {delay: 3.5,x: 314, y: 650});
        TweenMax.to($dropletRed, 1.5, {delay: 5,x: 14, y: 910, onComplete: this.girlSmile.bind(this)});
    },
    
    girlSmile: function() {
        var $girlSad = $('.girl-sad')[0] 
        var $girlSmile = $('.girl-smile')[0] 
        TweenMax.to($girlSad, 1, {opacity: 0, onComplete: function() {$girlSad.outerHTML = ''}});
        TweenMax.to($girlSmile, 1, {opacity: 1});
        TweenMax.to($('.txt-1'), 1, {opacity: 0});
        TweenMax.to($('.txt-6'), 1, {opacity: 1});
    }
}








$('body')[0].onload = function() {
    app.init()
}

