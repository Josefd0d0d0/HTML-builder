const fs = require('fs');
const readline = require('readline');

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fileStream = fs.createWriteStream('./02-write-file/text.txt',{flag:'a'});

const Write = () => {
    read.question('Введите текст(или exit если хотите выйти): ', (text) => {
        if(text === 'exit'){
            console.log('До свидания.');
            fileStream.end();
            read.close();
        }else{
            fileStream.write(text + '\n');
            Write();
        }
    })
};
Write();

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('');
        console.log('До свидания.');
        fileStream.end();
        read.close();
    }
});

