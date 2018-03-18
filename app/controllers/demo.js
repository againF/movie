exports.lazyload = function(req, res) {
    var imgs = [{
        temp: "/img/girl.png",
        url: "/img/135787-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/151142-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/177981-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182735-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182736-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182737-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188546-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188549-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188562-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188564-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188566-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188567-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188575-106.jpg"
    },{
        temp: "/img/girl.png",
        url: "/img/229006-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245521-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245525-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245546-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245548-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245555-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245560-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245660-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245666-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245669-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245675-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245676-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245684-106.jpg"
    }];
    res.render('demo_lazyload', {
        title: 'lazyload demo',
        imgs: imgs
    });
};

exports.nolazyload = function(req, res) {
    var imgs = [{
        temp: "/img/girl.png",
        url: "/img/135787-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/151142-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/177981-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182735-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182736-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/182737-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188546-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188549-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188562-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188564-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188566-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188567-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/188575-106.jpg"
    },{
        temp: "/img/girl.png",
        url: "/img/229006-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245521-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245525-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245546-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245548-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245555-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245560-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245660-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245666-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245669-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245675-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245676-106.jpg"
    },
    {
        temp: "/img/girl.png",
        url: "/img/245684-106.jpg"
    }];
    res.render('demo_nolazyload', {
        title: 'Nolazyload demo',
        imgs: imgs
    });
};