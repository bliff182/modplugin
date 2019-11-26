const express = require('express');
// var path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(require);

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

app.listen(PORT, () => {
   console.log('App listening on PORT: ' + PORT);
});