var friendData = require('../data/friends');

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // POST - will be used to handle incoming survey results and compatibility logic
    app.post('/api/friends', function(req, res) {
        friendData.push(req.body);
        // console.log(req.body);
    });

};