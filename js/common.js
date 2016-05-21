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
        var $elGlow = $('.red-bottle.glow')[0]
        var $el = $('.red-bottle:not(.glow)')[0]
        $el.style.display = ''
        TweenMax.to($elGlow, 1, {delay: 0.5,opacity: 0,rotation: -180, transformOrigin: "left bottom"});
        TweenMax.to($el, 1, {delay: 0.5,rotation: -180, transformOrigin: "left bottom"}).yoyo(true);
        
    }
}








$('body')[0].onload = function() {
    app.init()
}

