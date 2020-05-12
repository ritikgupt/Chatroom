var socket=io();
socket.on('connect',()=>{
    console.log('Connected to server');
})
socket.on('disconnect',()=>{
    console.log('disconnected to server');
})
socket.on('newMessage',(message)=>{
    const formattedTime=moment(message.createdAt).format('LT')
    const template=document.querySelector('#message-template').innerHTML;
    const html=Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt:formattedTime
    });
    const div=document.createElement('div');
    div.innerHTML=html
    document.querySelector('body').append(div)
})
//socket.on is used for listening to the event
socket.on('newLocationMessage',(message)=>{
    const formattedTime=moment(message.createdAt).format('LT')
    const template=document.querySelector('#location-message-template').innerHTML;
    const html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    })
    const div=document.createElement('div');
    div.innerHTML=html
    document.querySelector('body').append(div)
})
document.querySelector('#submit-btn').addEventListener('click',function(e){
    e.preventDefault();//this prevents the default reloding of page on clicking
    socket.emit("createMessage",{
        from:"User",
        text:document.querySelector('input[name="message"]').value
    },function(){

    })
})
document.querySelector('#send-location').addEventListener('click',function(e){
if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser.'); 
}
else{
navigator.geolocation.getCurrentPosition((position)=>{
socket.emit('createLocationMessage',{
    lat:position.coords.latitude,
    lng:position.coords.longitude

})
},()=>{
    alert('Unable to access your location');
})
}
});