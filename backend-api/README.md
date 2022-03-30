<div id="top"></div>

<!-- ABOUT THE PROJECT -->

<div align="center">
    <h1 id="about-the-project">About The Project</h1><br/><br/>
    <br/><br/>
    <h2>It is the back-end api of the application that I have prepared as the final project of the bootcamp program. It performs user registration and login, moderator and admin role control.</h2>
    <br/>
</div>

<br/><br/>

<hr>
<h1 align="center"><a target="_blank" href="https://logo-ecommerce.herokuapp.com" >--> Try This Application Live <--</a></h1>
<br/><br/>

<h1>Links</h1>

<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/" >--> BASE URL</a></h2>
<hr>
<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/api/test/all" >--> Get Public Content</a></h2>
<hr>
<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/api/test/mod" >--> Get Moderator Content</a> (Requires an account with a moderator role)</h2>
<hr>
<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/api/test/admin" >--> Get Admin Content</a> (Requires an account with a admin role)</h2>
<hr>

<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/api/auth/signup" >--> For Register Verifier</a> (POST METHOD)</h2>

<h3>request body</h3>

```sh

  {

    "username":"test",
    "email":"test@test.com",
    "password":"pass"

  }

```
<br>

<h2><a target="_blank" href="https://vast-harbor-19934.herokuapp.com/api/auth/signin" >--> For Login Verifier</a> (POST METHOD)</h2>

<h3>request body</h3>

```sh

  {
    
    "username":"test",
    "password":"pass"

  }

```
<br>


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
   <td><a href="https://github.com/auth0/node-jsonwebtoken#readme" target="_blank" rel="noreferrer">
   <img src="https://jwt.io/img/logo-asset.svg" width="175" height="75">
   </a> 
   <td><a href="https://github.com/winstonjs/winston#readme" target="_blank" rel="noreferrer">
   <img src="https://avatars1.githubusercontent.com/u/9682013?v=4" width="175" height="75">
   </a>
   <td><a href="https://sequelize.org/" target="_blank" rel="noreferrer">
   <img src="https://crodrigues.com/wp-content/uploads/2021/03/sequelize-2.png" width="175" height="75">
   </a>
   <td><a href="https://www.postgresql.org/docs/" target="_blank" rel="noreferrer">
   <img src="https://wiki.calculate-linux.org/download_images/original/xpostgresql.jpg.pagespeed.ic.82ZZ05AnGg.jpg" width="175" height="75">
   </a>
   </tr>
   </table>
</div>
<br>
<h3 align="center">ERD DIAGRAM FOR USERS-ROLES DATABASE</H3>
<br>
<p align="center"><img src="https://i.hizliresim.com/8itnz2l.png" width="60%" height="400"></p>

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
4. Change "config/db.config" on your case
   ```sh
   module.exports = {
      HOST: "db-host",
      USER: "db-user",
      PASSWORD: "db-pass",
      DB: "db-name",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
   };

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

