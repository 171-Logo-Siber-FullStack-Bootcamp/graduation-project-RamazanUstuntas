const pool = require("../db-config/postgre_config.js");
// require for ElasticSearch
const elasticClient = require('../db-config/elastic_config');
// require for logging
const {transactionLogger, serverLogger} = require('../utils/logger');

exports.getProducts = async (req, res) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    res.status(200).json(results.rows);
  })
}
exports.getProductById = async (req, res) => {
  pool.query('SELECT * FROM products WHERE $1=product_id', [req.params.id], (error, results) => {
    if (error) {
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    res.status(200).send(results.rows);
  })
}
exports.getProductsByCategoryId = async (req, res) => {
  pool.query('SELECT * FROM products WHERE $1=category_id', [req.params.id], (error, results) => {
    if (error) {
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    res.status(200).send(results.rows);
  })
}

// add it to both the product database and elasticsearch
exports.createProduct = async (req, res) => {
  if(!isNaN(parseFloat(req.body.price)) && !isNaN(req.body.price - 0)
    && !isNaN(parseFloat(req.body.warranty)) && !isNaN(req.body.warranty - 0) ){
    const {name, description, price, category_id, warranty, img_url} = req.body;
    pool.query('INSERT INTO products(name, description, price, category_id, warranty, img_url) VALUES ($1, $2, $3, $4, $5, $6)', [name, description, price, category_id, warranty, img_url], (error, results) => {
      if (error) {
        serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
        throw error;
      }
      pool.query('SELECT MAX(product_id) FROM products', (error, results) => {
        if (error) {
          serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
          throw error;
        }
        const product_id = JSON.parse(results.rows[0].max);
        transactionLogger.info(`Client İp: ${req.ip}: Product added on Postgre => Name: ${name} , Product_id: ${product_id} Category_id: ${category_id}`)
        //elasticsearch index section
        elasticClient.index({
          index: "logo-products",
          type: "products_list",
          id: product_id,
          body: req.body
        }).then(() => {
          transactionLogger.info(`Client İp: ${req.ip}: Product added on ElasticSearch => Name: ${name} , Product_id: ${product_id} Category_id: ${category_id}`)
          res.status(201).send(`Product added on postgresql and elastic with name: ${name}`);
        }).catch((err) => {
          serverLogger.error(`Client İp: ${req.ip}: Elastic-Error => ${err.message}`)
          res.status(400).send(`Error: ${err.message}`)
        })
      })
    })
  }else{
  transactionLogger.error(`Client İp: ${req.ip}: Product can not add on Postgre-ElasticSearch => Name: ${req.body.name} , Category_id: ${req.body.category_id}, Price: ${req.body.price}, Warranty: ${req.body.warranty} Message: 'price and warranty must be number'`)
  res.status(200).send('OOPSSS : price and warranty must be number!!!!!!!!!')
  }
}

// delete it to both the product database and elasticsearch
exports.deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM products WHERE product_id = $1', [id], (error, results) => {
    if(error){
      serverLogger.error(`Client İp: ${req.ip}: DB-Error => ${error.message}`)
      throw error;
    }
    transactionLogger.info(`Client İp: ${req.ip}: Product deleted on Postgre = Product_id: ${id}`)
    // elasticsearch delete section
    elasticClient.delete({
      index:"logo-products",
      type: "products_list",
      id: id
    }).then(() => {
      transactionLogger.info(`Client İp: ${req.ip}: Product deleted on ElasticSearch = Product_id: ${id}`)
      res.status(200).send(`Product deleted with ID : ${id}`)
    }).catch((err) => {
      serverLogger.error(`Client İp: ${req.ip}: Elastic-Error => ${err.message}`)
      res.status(400).send(`Error: ${err.message}`)
    })
  })
}
// elasticsearch search section
exports.searchElastic =  async (req, res) =>{
    
  let body = {
    size: 100,
    from: 0,
    query: {
      match: {
        name:{
          query: req.query['q'],
          fuzziness: 2
        }     
      }
    }
  }
 
  esClient.search({index:'logo-products', body:body})
  .then(results => {
          res.send(results.hits.hits);
          /* console.log(results.hits.hits) */
      
  })
  .catch(err=>{
    serverLogger.error(`Client İp: ${req.ip}: Search-Error => ${err.message}`)
    res.send([]);
  });

}
