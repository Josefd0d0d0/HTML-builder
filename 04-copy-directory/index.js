const fs = require('fs');

const sourceDir = './04-copy-directory/files';
const destinationDir = './04-copy-directory/files-copy';

fs.readdir(sourceDir, (err, sourceFiles) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.mkdir(destinationDir, { recursive: true }, () => {
    fs.readdir(destinationDir, (err, destinationFiles) => {
      if (err) {
        console.error(err);
        return;
      }
      for (const file of destinationFiles) {
        if (!sourceFiles.includes(file)) {
          fs.unlink(`${destinationDir}/${file}`, (error) => {
            if (error) {
              console.error('Ошибка при удалении файла:', error);
            } else {
              console.log('Файл успешно удален');
            }
          });
        }
      }
      for (const file of sourceFiles) {
        const sourcePath = `${sourceDir}/${file}`;
        const destinationPath = `${destinationDir}/${file}`;
        fs.copyFile(sourcePath, destinationPath, (error) => {
          if (error) {
            console.error('Ошибка при копировании файла:', error);
          } else {
            console.log('Файл успешно скопирован');
          }
        });
      }
    });
  });
});