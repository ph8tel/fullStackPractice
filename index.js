const http = require('http')
const express = require('express')
const path = require('path')
const port = 4000;

const app = new express()

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, (req, res) => console.log('Runnin on ', port))