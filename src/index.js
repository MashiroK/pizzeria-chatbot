const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:true } ));

const router = require('./routes')
app.use('/bot', router)
const port = process.env.PORT || 3001

app.listen(port, () => console.log('API running!'));

