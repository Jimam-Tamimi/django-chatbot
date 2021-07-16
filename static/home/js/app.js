let allMessageSection = document.getElementById('all-message')
allMessageSection.scrollTop = allMessageSection.scrollHeight;

let msgSectionOpener = document.getElementById('msg-section-opener')
let msgSection = document.getElementById('msg-section')
let msgSectionClose = document.getElementById('msg-section-close')
let msgSectionExpand = document.getElementById('msg-section-expand')
let sendMessageBtn = document.getElementById('send-message')
let message = document.getElementById('message')
let btnModeToggler = document.getElementsByClassName('btn-mode-toggler')
let listeninInfo = document.getElementById('listening-info')


let TEXT_MODE = true
let COMMAND_MODE  = false


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
msg.lang = 'es-US';


// for speach recognition 

let speechRecognition = new webkitSpeechRecognition() || SpeechRecognition() ;
// String for the Final Transcript
let final_transcript = "";
// Set the properties for the Speech Recognition object
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = 'en-US'
speechRecognition.onstart = () => {
    // Show the Status Element
    listeninInfo.classList.add('active')
};

speechRecognition.onend = () => {
    // Hide the Status Element
    listeninInfo.classList.remove('active')
    if(COMMAND_MODE){
        speechRecognition.start()
    }

};

speechRecognition.onresult = (event) => {
    // Create the interim transcript string locally because we don't want it to persist like final transcript
    let interim_transcript = "";

    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;

      } else {
        message.value = event.results[i][0].transcript;
      }
    }

    message.value = final_transcript
    final_transcript = ""
};







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
        // console.error('Error:', error);
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



let modeOptionsToggler = document.getElementById('mode-options-toggler')
modeOptionsToggler.addEventListener('click', (e)=>{
    let modeOptionsDivId = e.currentTarget.getAttribute('data-toggle')
    let modeOptionsDiv = document.getElementById(modeOptionsDivId)
    modeOptionsDiv.classList.toggle('show')
    Array.from(btnModeToggler).forEach(element => {
        element.addEventListener('click', (e) =>{
            handleMode(element.getAttribute('mode'))
            Array.from(btnModeToggler).forEach(element2 => {
                if(element2 == element){
                    element2.classList.add('active')
                }
                else{
                    element2.classList.remove('active')
                }
            });
            modeOptionsToggler.click()
            return " "
        })
    });

})

function handleMode(mode) {
    if(TEXT_MODE && mode == 'command'){
        activateCommandMode()

    }
    else if (COMMAND_MODE && mode == 'text'){
        activateTextMode()   

    }
}

function activateCommandMode() {
    speechRecognition.start()
    TEXT_MODE = false
    COMMAND_MODE = true
}

function activateTextMode() {
    TEXT_MODE = true
    COMMAND_MODE = false
    speechRecognition.stop()
}