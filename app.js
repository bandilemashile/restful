const express = require('express');

const app =  express();

const fs = require("fs")
const path = require("path")

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })
//get method
  app.get('/', (req,res) => {
    res.send(arrayOfFiles)

});
  return arrayOfFiles
}


const result = getAllFiles("./tests")
// [ "FILE_PATH" ]




app.listen(3000);
