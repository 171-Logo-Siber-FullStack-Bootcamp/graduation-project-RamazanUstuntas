<div id="top"></div>

<!-- ABOUT THE PROJECT -->

<div align="center">
    <h1 id="about-the-project">About The Project</h1><br/><br/>
    <br/><br/>
    <h2>The product api where the application I prepared as the final project of the Bootcamp program receives its products</h2>
    <br/>
</div>

<br/><br/>

<hr>
<h1 align="center"><a target="_blank" href="https://logo-ecommerce.herokuapp.com" >--> Try This Application Live <--</a></h1>
<br/><br/>

<h1>Links</h1>

<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com" >--> BASE URL</a></h2>
<hr>
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/getAllProduct" >--> Get All Products</a></h2>
<hr>
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/getProduct/2" >--> Get Product By Id</a></h2>
<hr>
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/createProduct" >--> Create Product (POST METHOD)</a>  (Adds product to both Postgres and ElasticSearch)</h2>

<h3>request body</h3>

```sh
{
    "name":"Product Name",
    "description":"lorem ipsum",
    "price":"277",
    "category_id":"4",
    "warranty":"24",
    "img_url":"image url"
}
```
<br>

<hr>
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com" >--> Delete Product By Id</a>  (Deletes product from both Postgres and ElasticSearch)</h2>


```sh
BASE_URL/:id
```
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/search?q=" >--> Search Products From ElasticSearch</a></h2>

```sh
BASE_URL/search?q=
```
<hr>

<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/getCategories" >--> Get All Categories</a></h2>
<hr>
<h2><a target="_blank" href="https://sleepy-escarpment-87702.herokuapp.com/getCategory/1" >--> Get Category By Id</a></h2>
<hr>

<br/><br/>
<br/><br/>

<div align="center">
   <h1 id="built-with">Built With<h1>
   <table class="center" target="_blank" rel="noreferrer">
   <tr>
   <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="175" height="75">
   </a> 
   <td><a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="175" height="125">
   </a>
   <td><a href="http://expressjs.com/" target="_blank" rel="noreferrer">
   <img src="https://camo.githubusercontent.com/0566752248b4b31b2c4bdc583404e41066bd0b6726f310b73e1140deefcc31ac/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" width="175" height="75">
   </a>
   <td><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html" target="_blank" rel="noreferrer">
   <img src="https://miro.medium.com/max/558/1*Co95dG0NmGfL-vGMSBtLWQ.png" width="175" height="75">
   </a> 
   <td><a href="https://github.com/winstonjs/winston#readme" target="_blank" rel="noreferrer">
   <img src="https://avatars1.githubusercontent.com/u/9682013?v=4" width="175" height="75">
   <td><a href="https://www.postgresql.org/docs/" target="_blank" rel="noreferrer">
   <img src="https://wiki.calculate-linux.org/download_images/original/xpostgresql.jpg.pagespeed.ic.82ZZ05AnGg.jpg" width="175" height="75">
   </a>
   </a>
   </tr>
   </table>
</div>

<br>
<h3 align="center">ERD DIAGRAM FOR PRODUCT-CATEGORY DATABASE</H3>
<br>
<p align="center"><img src="https://i.hizliresim.com/iaxref2.png" width="80%" height="400"></p>

<br>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Check the node package manager, install it.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
2. Go to the directory
3. Install NPM packages
   ```sh
   npm install
   ```
4. Change "db-config" and "config/default.json" on your case
   ```sh
   {
    "elastic": {
      "cloudID": "CLOUD-ID",
      "username": "USERNAME",
      "password": "PASS",
      "apiKey": "API_KEY_DETAILS"
    }
   }

   ```
5. Run
   ```sh
   npm start
   ```



<!-- CONTACT -->
## Contact

Ramazan Ustuntas - [![LinkedIn][linkedin-shield]][linkedin-url]


<p align="right">(<a href="#top">back to top</a>)</p>



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ramazan-ustuntas/

