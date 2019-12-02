const friendData = require('../data/friends');

module.exports = app => {

   app.get('/api/friends', (req, res) => {
      res.json(friendData);
   });

   // POST - will be used to handle incoming survey results and compatibility logic
   app.post('/api/friends', (req, res) => {
      let newFriend = req.body;
      let newScores = newFriend.scores;
      let differenceArray = []; // to hold each friend's score difference for comparison purposes
      let matchIndex = 0; // for use as an index when we compare all scores, will hold index of best match

      // parsing through friendArray
      for (let i = 0; i < friendData.length; i++) {
         let friendScores = friendData[i].scores;
         let scoreDifference = 0; // resets the score difference for each friend it parses

         // parsing through friend scores specifically
         for (let j = 0; j < newScores.length; j++) {
            scoreDifference += Math.abs(parseInt(friendScores[j]) - parseInt(newScores[j])); // difference between user scores and already stored friend scores
         }
         differenceArray.push(scoreDifference);
      }
      // console.log(differenceArray);
      for (let k = 0; k < differenceArray.length; k++) {
         if (differenceArray[k] <= differenceArray[matchIndex]) {
            matchIndex = k;
         }
      }
      // console.log(friendData[matchIndex]);
      friendData.push(newFriend);
      res.json(friendData[matchIndex]);
   });

};