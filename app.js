const fs = require('fs');
const http = require('http');

// this check to see if the directory exists, if not, it creates one
const resultDir = 'result';
if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
  console.log(`The '${resultDir}' directory has been successfully created.`);
}
else {
  console.log(`The '${resultDir}' directory has been successfully updated.`);
}

// Create a Readable Stream
const readDataStream = fs.createReadStream('arrOfUsers.json', 'utf8');

// this check to see if the path is assessible if not, it creates one
fs.access('./result/textFile.txt', (err) =>{
  if(err) {
    console.log('Path created.');
  } 
  else {
    console.log('Path exists.');
  }

  // After we've had access to the path created or seen that it exists, we can now Create a Writeable Stream
  const writeDataStream = fs.createWriteStream(`${__dirname}/result/textFile.txt`);

  // We need to read the data and then write the streamed data thats read
  readDataStream.pipe(writeDataStream)
    
  // The on end readable stream check for errors
  readDataStream.on('end', (err) => {
    if(err) throw err;
    console.log('data streamed successfully!');
  });
})


// CREATE SERVER
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-Type': 'application/json' });

  const readDataStream = fs.createReadStream('arrOfUsers.json', 'utf8');
  readDataStream.pipe(res);
})

// Listen to the Response
server.listen(5000, 'localhost', () => {
  console.log('Now listening too port 5000!');
});
