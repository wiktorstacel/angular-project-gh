/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res){
  res.send('Hello from server');
});

app.post('/enroll', function(req, res){
  console.log(req.body);
  res.status(200).send({"message": "Data received"});//401 was for example in one TUT
});

app.listen(PORT, function(){
  console.log("Server running on localhost: "+PORT);
});