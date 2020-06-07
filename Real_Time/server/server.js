//facilita o tratamento com as requisições
const Koa = require('koa');
//vai subir o servidor e koa ira trabalhar juntos
const http = require('http');
const socket = require('socket.io')

const app = new Koa();
// o callback do koa que sabe lidar com requisições
const server = http.createServer(app.callback());
//integração do socket com o servidor
const io = socket(server);
const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

//a conexao recebe o parametro como parametro
io.on('connection', socket => {
    console.log('new server connection');
    //o socket assina o evento chat.message que vem do front
    socket.on('chat.message', data => {
        console.log('Chat.message => ', data)
        io.emit('chat.message',data)
    })
    socket.on('disconection', data => {
        console.log('user desconected')
    })
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running http://${SERVER_HOST}:${SERVER_PORT}`);
});

