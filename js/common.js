
function writeTrueSize() {
    var urlPat = /url\("?([^"]+)"?\)/
    ;[].slice.apply($('.thing')).forEach(function(el){
        console.log( window.getComputedStyle(el,null).getPropertyValue('background-image') )
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

writeTrueSize()

