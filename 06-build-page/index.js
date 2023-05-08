const fs = require('fs');
const path = require('path');


//создаем project-dist

fs.mkdir('./06-build-page/project-dist',{ recursive: true },()=>{
  const filePath = './06-build-page/project-dist/index.html';
  const fileHtml ='./06-build-page/template.html';

//импортируем данные из template.html и файлов дериктории components, в файл index.html который будет находится в директории project-dist;

  async function readFileWithPromises() {
    try {
      const data = await fs.promises.readFile(fileHtml, 'utf8');
      let inputIndex = data.split('\n');
      let result = inputIndex;
      const files = await fs.promises.readdir('./06-build-page/components');
      for (const file of files) {
        const fileName = path.parse(file).name;
        if (inputIndex.some(line => line.includes(`{{${fileName}}}`))) {
          const data = await fs.promises.readFile(`./06-build-page/components/${file}`, 'utf8');
          result = result.map(line => line.replace(`{{${fileName}}}`, data));
        }
      }
      const textIndex = result.join('\n');
      await fs.promises.writeFile(filePath, textIndex);
      console.log('Файл успешно создан');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }readFileWithPromises();


//импортируем данные из assets в assets который будет находится в  директории project-dist

  const fileInputAssets ='./06-build-page/assets'
  const fileOutputAssets = './06-build-page/project-dist/assets';

  function copyDirectory(source, destination) {
    fs.mkdir(destination, { recursive: true }, (error) => {
      if (error) {
      console.error('Ошибка при создании директории:', error);
      return;
    }
    fs.readdir(source, (error, files) => {
      if (error) {
        console.error('Ошибка при чтении директории:', error);
        return;
      }
      for (const file of files) {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);
        fs.stat(sourcePath, (error, stats) => {
          if (error) {
            console.error('Ошибка при получении информации о файле:', error);
            return;
          }
          if (stats.isFile()) {
            fs.copyFile(sourcePath, destinationPath, (error) => {
              if (error) {
                console.error('Ошибка при копировании файла:', error);
              } else {
                console.log(`Файл ${file} успешно скопирован`);
              }
            });
          } else if (stats.isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
          }
        });
      }
    });
  });
}
copyDirectory(fileInputAssets, fileOutputAssets); 

//импортируем данные из всех файлов стилей находящихся в styles в один файл со стилями который будет находится в  директории project-dist
const inputFiles =[];
const outputFiles = './06-build-page/project-dist/style.css';
const writeStream = fs.createWriteStream(outputFiles);

fs.readdir('./06-build-page/styles', (err,files)=>{
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
    fs.readFile(`./06-build-page/styles/${inputFiles[index]}`, 'utf8', (error, data) => {
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

});