//adapted from https://github.com/visionmedia/node-basic-auth

module.exports = {
    beforePhantomRequest: function(req, res, next) {

        var auth = req.headers['x-prerender-token'];
        if (!auth) return this.fail(req, res, next);

        if (!this.isAuthorized(auth)) return this.fail(req, res, next);

        req.prerender.authentication = { token: auth  };

        return next();
    },

    fail: function(req, res, next) {
        res.send(401);
    },

    isAuthorized: function(token) {
        console.log("Token:" + token + ":" + process.env.PRERENDER_TOKEN)
        if(token === process.env.PRERENDER_TOKEN) return true;
    }
}