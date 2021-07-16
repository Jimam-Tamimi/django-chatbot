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
        msg = msg.replace(/[^a-zA-Z ]/g, "") // removing all spacol charecter
        msg = msg.replace(/\s+/g, ' ').trim() // removing extra spaces
        console.log(msg);
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
    aendMessageToApi(msg)
    message.value = ''
    allMessageSection.scrollTop = allMessageSection.scrollHeight;

}



function aendMessageToApi(msg) {
    const data = { message: msg };

    fetch(`${BASE_URL}api/message/get-response/`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
             "X-CSRFToken": csrftoken 
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log(data.reply);
        allMessageSection.innerHTML += `
            <div class="message">
                <div class="got message-status">
                    <p>${data.reply}</p>
                </div>
            </div>
        `
        allMessageSection.scrollTop = allMessageSection.scrollHeight;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    
}