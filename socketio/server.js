const express = require('express');
const path = require('path');

//definindo a app como express
const app = express();

//conectando uma porta a ser acessada pelo websocket
//criando o server com a variavel app  - PROTOCOLO HTTP
const server = require('http').createServer(app);

//PROTOCOLO WSS  -- passando o server como parametro
const io = require('socket.io')(server);

//definindo onde serão usados os arquivos publicos da aplicação
//definindo que será a pasta atual
app.use(express.static(path.join(__dirname, 'public')));

//configurando as views como html, por padrao node é usado o EJS
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//configurando que o endereço padrão ira renderizar a index.html
app.use('/', (req, res) => {
    res.render('index.html');
});

//criando array para armazenar as mensagens
let messages = [];

//Forma de conexao com o servidor
//Recebendo o socket
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    //assim que o socket é conectado ele rece o array com as mensagens antigas
    socket.emit('previousMessages', messages);

    //o mesmo evento nomeado no frontend
    socket.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
        // socket :  .emit-envia para o socket atual
        //.broadcast.emit- envia para todos os sockets
        //.on-utilizado para ouvir uma mensagem
        socket.broadcast.emit('receivedMessage', data);
    })
});

//para que seja ouvda a orta 300
server.listen(3000);
