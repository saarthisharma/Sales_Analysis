const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
    name = prompt('please enter your name')
}while(!name)

let authPayload = {
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI4NmE3YjkxY2Q4MjdjYTVlZTRkNmIiLCJpYXQiOjE2NDY5MDQ2MDB9.Ijv4zbNuuyNG1Hm4ck354H1P4yCREUGYed3pxm0hN_s"
}

socket.emit('userAuthentication' , authPayload)

textarea.addEventListener('keyup',(event)=>{
    if(event.key === 'Enter'){
        sendMessage(event.target.value)
    }
})
function sendMessage(msg){
    let userNameAndMessage = {
        user:name,
        message:msg.trim()
    }

    // append the typed message in the chatarea
    appendMessage(userNameAndMessage ,'outgoing')
    textarea.value = '';  
    scrollToBottom()
    
    // sending message to server via websocket and server will listen this event
    socket.emit('emittingMessage' , userNameAndMessage)
    
}

// attach message in the chatarea
function appendMessage(userNameAndMessage , type){
    let maindiv = document.createElement('div')

    // defining the msg type whether its incoming or outgoing
    let typeOfMessage = type
    maindiv.classList.add(typeOfMessage , 'message')

    // dynamically creating user name and message from front end
    let markup = `
    <h4>${userNameAndMessage.user}</h4>
    <p>${userNameAndMessage.message}</p>

    `
    maindiv.innerHTML = markup
    messageArea.appendChild(maindiv)
}

// messages which are coming on the server we have to show those msgs to the client
// client receiving the message
socket.on('emittingMessage' , (userNameAndMessage)=>{
    console.log("=================>console of client message")
    // we have to insert this message in the chat area again
    appendMessage(userNameAndMessage,'incoming')
    scrollToBottom()

    console.log("message presented to the client is",userNameAndMessage)
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}