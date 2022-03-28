const pool = require("../db-config/postgre_config.js");
const {serverLogger} = require('../utils/logger')

getCategories = async(req, res) => {
  await pool.query("SELECT * FROM categories", (error, results) => {
    if(error){
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    res.status(200).send(results.rows);
  })
}

getCategoryById = async(req, res) => {
  await pool.query("SELECT * FROM categories WHERE $1=category_id",[req.params.id], (error, results) => {
    if(error){
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    res.status(200).send(results.rows);
  })
}

module.exports = {getCategories, getCategoryById}