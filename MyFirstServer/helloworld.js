const http = require('http');
const port = 3000;
const requestHandler = (request,response) => {
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('<html><body><h1>Hello from the Node.js Server!</h1></body></html>');
    response.end();
}
const listenHandler = (err) => {
    if(err){
        return console.log('An error happened:',err);
    }
    console.log(`Node.js Server is listening on port ${port}`);
}
const server = http.createServer(requestHandler);
//init server
server.listen(port,listenHandler);