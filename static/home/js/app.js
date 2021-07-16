let allMessageSection = document.getElementById('all-message')
allMessageSection.scrollTop = allMessageSection.scrollHeight;

let msgSectionOpener = document.getElementById('msg-section-opener')
let msgSection = document.getElementById('msg-section')
let msgSectionClose = document.getElementById('msg-section-close')
let msgSectionExpand = document.getElementById('msg-section-expand')
let sendMessageBtn = document.getElementById('send-message')
let message = document.getElementById('message')


// for voice 
var msg = new SpeechSynthesisUtterance();
let voices;
function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}
let s = setSpeech();

s.then((voicesVar) => {voices = voicesVar; msg.voice =  voices[1]; });  
msg.volume = 1; // From 0 to 1
msg.rate = .95; // From 0.1 to 10
msg.pitch = 0; // From 0 to 2
msg.lang = 'es';





setTimeout(() => {
    voices = window.speechSynthesis.getVoices();
}, 1000);

setTimeout(() => {
    console.log(window.speechSynthesis.getVoices());
}, 50);


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
    sendMessageToApi(msg)
    message.value = ''
    allMessageSection.scrollTop = allMessageSection.scrollHeight;

}

function speak(text) {
    text = text.replaceAll(':', '')
    text = text.replaceAll(';', '')
    text = text.replaceAll('(', '')
    text = text.replaceAll(')', '')
    msg.text = `${text}`;
    speechSynthesis.speak(msg);
}

function sendMessageToApi(msg) {
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
        showReply(data.reply)
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showReply(msg) {
    allMessageSection.innerHTML += `
        <div class="message">
            <div class="got message-status">
                <p>${msg}</p>
            </div>
        </div>
    `
    speak(msg)
    allMessageSection.scrollTop = allMessageSection.scrollHeight;
}