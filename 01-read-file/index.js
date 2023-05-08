const fs = require('fs');

const stream = new fs.createReadStream("./01-read-file/text.txt");

stream.on('data', (chunk)=>{
  console.log(chunk.toString());  
})




// const stream = new fs.ReadStream("./01-read-file/text.txt");

// stream.on("readable", ()=>{
//     let data = stream.read();
//     while (data !== null) {
//         console.log(data.toString());
//         data = stream.read();
//     }
// })