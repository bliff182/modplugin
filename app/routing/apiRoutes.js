var friendData = require('../data/friends');

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // POST - will be used to handle incoming survey results and compatibility logic
    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        var newScores = newFriend.scores;
        var differenceArray = []; // to hold each friend's score difference for comparison purposes
        var matchIndex = 0; // for use as an index when we compare all scores, will hold index of best match

        // parsing through friendArray
        for (var i = 0; i < friendData.length; i++) {
            var friendScores = friendData[i].scores;
            var scoreDifference = 0; // resets the score difference for each friend it parses

            // parsing through friend scores specifically
            for (var j = 0; j < newScores.length; j++) {
                scoreDifference += Math.abs(friendScores[j] - newScores[j]); // difference between user scores and already stored friend scores
            }
            differenceArray.push(scoreDifference);
        }
        // console.log(differenceArray);
        for (var k = 0; k < differenceArray.length; k++) {
            if (differenceArray[k] <= differenceArray[matchIndex]) {
                matchIndex = k;
            }
        }
        // console.log(friendData[matchIndex]);
        res.json(friendData[matchIndex]);
        friendData.push(req.body);
    });

};