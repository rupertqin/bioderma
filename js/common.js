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
        var times = 5 * 2
        var angle = 1
        function quiverOnce(){
            for (var i=0;i<times;i++) {
                if (i < times-1) {
                    TweenMax.to($el, ts, {
                        delay: ts*i,
                        rotation: i%2==0 ? -angle : angle, 
                        transformOrigin: "left bottom"});
                } else {
                    TweenMax.to($el, ts, {delay: ts*i,rotation: 0, transformOrigin: "left bottom"});
                }
            }
        }
        quiverOnce()
        this.intervalRedBottle = setInterval(quiverOnce, 2000)
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

