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
        var $el = $('.red-bottle.glow')[0]
        function quiverOnce() {
            TweenMax.to($el, ts, {
                rotation: -2, 
                yoyo: true,
                repeat: 8,
                onComplete: function() {
                    TweenMax.to($el, ts, {rotation: 0,transformOrigin: "center bottom"});
                },
                transformOrigin: "center bottom"});
        }
        quiverOnce()
        this.intervalRedBottle = setInterval(quiverOnce, 2500)
    },
    
    touchRedBottle: function() {
        var $el = $('.red-bottle.glow')
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
        var firstStepGlowProp = {opacity: 0}
        var firstStepProp = {
            x: -564, y: -730,
            scale: 1.3,
            ease: 'Power4',
            rotation: 150,
            delay: delay,
            transformOrigin: "center bottom"}
        setTimeout(function() {$el.style.display = ''}, delay*1000)
        TweenMax.to($el, 1, firstStepProp);
        Object.assign(firstStepGlowProp, firstStepProp)
        TweenMax.to($elGlow, 1, firstStepGlowProp);
        TweenMax.staggerTo([$('.txt-3')[0], $('.txt-2')[0]], 1, {delay: 0.5,scale: .7,opacity: 0}, 0.5);
        
        
                
    }
}








$('body')[0].onload = function() {
    app.init()
}

