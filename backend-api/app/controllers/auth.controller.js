const db = require("../models");
const config = require("../config/auth.config");

// Require logger.js
const {usersLogger, serverLogger} = require('../utils/logger');

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const salt = bcrypt.genSaltSync(8);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
            usersLogger.info(`Client İp: ${req.ip} User name : ${req.body.username} roles: ${req.body.roles} email: ${req.body.email} registered successfully!`) // for detect admin and moderator account
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      serverLogger.error(`Client İp: ${req.ip} User name : ${req.body.username} email: ${req.body.email} => ${err.message}!`)
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        usersLogger.error(`Client İp: ${req.ip} User name : ${req.body.username} => "User Not Found."`)
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        usersLogger.error(`Client İp: ${req.ip} User name : ${req.body.username} => "Invalid Password!"`)
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      serverLogger.error(`Client İp: ${req.ip}  User name : ${req.body.username} => ${err.message}`)
    });
};