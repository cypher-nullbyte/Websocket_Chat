const express=require('express');
const socket=require('socket.io');


const app=express();
const server=app.listen(4000,()=>{
    console.log("Listening to Req. on 4000...");
});

app.get('/api',(req,res)=>{
    res.send("Success API");
});

app.use(express.static('public'));


//socket setup

const io=socket(server);


io.on('connection',(socket)=>{
    console.log('Made Socket Connection '+socket.id);
    socket.on('chat',function(data){
        if(data.handle && data.message)
            io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data)
    {
        // let x=setInterval(() => {
        //     socket.broadcast.emit('typing',data);
        // }, 1000);
        // setTimeout(()=>{
        //     clearInterval(x);
        // },1200);
        if(data) socket.broadcast.emit('typing',data);
    });
});


// Listen for events
