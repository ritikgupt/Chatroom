

var socket=io();
socket.on('connect',()=>{
    console.log('Connected to server');
})
socket.on('disconnect',()=>{
    console.log('disconnected to server');
})
socket.on('newMessage',(message)=>{
    console.log('newMessage',message);
    let li=document.createElement('li');
    li.innerText=`${message.from}:${message.text}`
    document.querySelector('body').appendChild(li);
})
//socket.on is used for listening to the event
socket.on('newLocationMessage',(message)=>{
    console.log('newLocationMessage',message);
    let li=document.createElement('li');
    let a=document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerText="My Current Location";
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
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