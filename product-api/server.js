const express = require('express');
const app = express();
const cors = require('cors');
const {serverLogger} = require('./utils/logger')

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

app.use(cors());

// routes
require('./routes/product.routes')(app);
require('./routes/category.routes')(app);


const port = 5000;
app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
  serverLogger.info(`Server is running on port ${port}`);
})