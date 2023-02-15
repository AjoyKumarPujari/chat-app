 const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config.js');
const ejs =require('ejs');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

//on connection
io.on('connection', (socket) => {
 // console.log('a user connected', socket.id);

    socket.on('join_room',(data) =>{
        console.log("joining a room", data.roomid);
        socket.join(data.roomid, function() {
            console.log("joined a room", data);
        });
    });



    socket.on('msg_send', (data)=>{
        console.log(data);
        io.to(data.roomid).emit('msg_rcvd', data);
        //socket.emit('msg_rcvd', data);
        //socket.broadcast.emit('msg_rcvd', data);
    });



//  socket.on('from_client', () => {
//         console.log("Event coming from client");
//     })

    // setInterval(()=>{
    //      socket.emit("from_server")
    // }, 2000);



});

app.set('view engine', 'ejs');

//to connect with a statc HTML page in express
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', (req, res)=>{
    res.render('index',{
        name:'Sanket',
        id:req.params.roomid
    });
})

server.listen(3000, async () => {
    console.log('Server started');
    await connect();
    console.log('MongoDB Connected');
});