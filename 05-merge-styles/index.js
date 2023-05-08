const fs = require('fs');
const path = require('path');

const inputFiles =[];
const outputFiles = './05-merge-styles/project-dist/bundle.css';
const writeStream = fs.createWriteStream(outputFiles);

fs.readdir('./05-merge-styles/styles', (err,files)=>{
  if (err) {
    console.error(err)
    return
  } 
  for (const file of files){
    if((path.extname(file)) === '.css'){
        inputFiles.push(file);
    }
  }
  function processFile(index){
    if(index >= inputFiles.length){
      writeStream.end();
      return;
    }
    fs.readFile(`./05-merge-styles/styles/${inputFiles[index]}`, 'utf8', (error, data) => {
      if (error) {
        console.error('Ошибка при чтении файла:', error);
        return;
      }
      writeStream.write(data + '\n');
      processFile(index + 1);
    })   
  }
  processFile(0);
});