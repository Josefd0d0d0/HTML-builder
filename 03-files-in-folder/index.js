const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', { withFileTypes: true }, (err,files)=>{
  if (err) {
    console.error(err)
    return
  } 
  for (const file of files){
    if(!file.isDirectory()){
      const filePath = path.join('./03-files-in-folder/secret-folder', file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${path.parse(file.name).name} - ${(path.extname(file.name)).slice(1)} - ${((stats.size)/1024).toFixed(3)} kb`);
        }) 
    }
  }
});
