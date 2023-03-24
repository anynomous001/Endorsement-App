// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL : "https://realtime-database-45050-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const messageListIndb = ref(database,"messagesList")

const publishBtn = document.getElementById("publish-btn")
const messageDiv = document.getElementById("message-div")
const input = document.getElementById("input")
const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")

publishBtn.addEventListener("click",function(){
    let sender = fromInput.value
    let receiver = toInput.value
    let message = input.value
    
   const messageObj = {
        message: message,
        sender: sender,
        receiver: receiver
    };
    
    push(messageListIndb,messageObj)
    
    clearInput()
})

onValue(messageListIndb,function(snapshot){
    
   if(snapshot.exists()){
   let messageArray = Object.entries(snapshot.val())
   console.log(messageArray)
   
   messageDiv.innerHTML=""
    
        for(let i = 0; i< messageArray.length; i++){
            let currentMessage = messageArray[i]
            appendingMessages(currentMessage)
        }
   }else{
       messageDiv.innerHTML=`<div class="message-para">
                    <p>It's nothing here</p>
                </div>`
   }
    
})

function clearInput(){
    input.value=""
    fromInput.value=""
    toInput.value=""
}


function appendingMessages(messages){
    let messageid = messages[0]
    let message = messages[1].message
    let sender = messages[1].sender
    let receiver = messages[1].receiver
     
     
    let newMessageDiv = document.createElement("div")
     
     
    newMessageDiv.classList.add("message-para")
     
    newMessageDiv.innerHTML = `<p><strong>From - ${sender}</strong></p>${message}<p><strong>To - ${receiver}</strong></p>`
     
    messageDiv.append(newMessageDiv)
    
    newMessageDiv.addEventListener("dblclick",function(){
        let exactLocationofMessage = ref(database,`messagesList/${messageid}`)
        remove(exactLocationofMessage)
    })
}