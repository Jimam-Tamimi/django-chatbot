let allMessageSection = document.getElementById('all-message')
allMessageSection.scrollTop = allMessageSection.scrollHeight;

let msgSectionOpener = document.getElementById('msg-section-opener')
let msgSection = document.getElementById('msg-section')
let msgSectionClose = document.getElementById('msg-section-close')
let msgSectionExpand = document.getElementById('msg-section-expand')
let sendMessageBtn = document.getElementById('send-message')
let message = document.getElementById('message')

msgSectionOpener.addEventListener('click', (e)=>{
    // hide the msg section openner
    e.currentTarget.classList.add('hide')
    // show the msg section 
    msgSection.classList.remove('hide')
})

msgSectionClose.addEventListener('click', (e)=>{
    // show the msg section openner
    msgSectionOpener.classList.remove("hide")
    // hide the msg section 
    msgSection.classList.add("hide")
    

})

msgSectionExpand.addEventListener('click', (e)=>{
    msgSection.classList.toggle('expand')

    let actionIcon = e.currentTarget.innerHTML
    if(e.currentTarget.children[0].classList.contains('fa-compress')){
        e.currentTarget.children[0].classList.replace('fa-compress', "fa-expand")
    }
    else{
        e.currentTarget.children[0].classList.replace('fa-expand', "fa-compress")

    }
})


// running sendMsg function onclick of send  message button
sendMessageBtn.addEventListener('click', (e)=>{
    let msg = message.value
    sendMessage(msg)    
})

// sending message on enter key press
message.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let msg = message.value
        sendMessage(msg)
    }
})


// function for showing message to frontend
function sendMessage(msg) {
    if(msg.replaceAll(' ', '') == ''){
        return
    }
    allMessageSection.innerHTML += `
    <div class="message">
        <div class="sent message-status">
            <p>${msg}</p>
        </div>
    </div>
    `
    message.value = ''
    allMessageSection.scrollTop = allMessageSection.scrollHeight;
}



