const {Pool} = require('pg')

const pool = new Pool({
  user: 'db-user',
  host: 'db-host',
  database: 'db-name',
  password: 'db-pass',
  port: 5432,
})

module.exports=pool;