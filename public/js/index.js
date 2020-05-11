var socket=io();
socket.on('connect',()=>{
    console.log('Connected to server');
})
socket.on('disconnect',()=>{
    console.log('disconnected to server');
})
socket.on('newMessage',(message)=>{
    console.log('newMessage',message);
})
//socket.on is used for listening to the event
