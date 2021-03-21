// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA3KhR1FinBo8B4OpodE9yMfavCGbONZ24",
  authDomain: "chatapp-95626.firebaseapp.com",
  databaseURL: "https://chatapp-95626-default-rtdb.firebaseio.com/",
  projectId: "chatapp-95626",
  storageBucket: "chatapp-95626.appspot.com",
  messagingSenderId: "1089057318237",
  appId: "1:1089057318237:web:ff691345c6cf932bcc34b4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const newPostRef = firebase.database();
let room = "room1";

// const send = document.getElementById("send");
const username = document.getElementById("username");
// const text = document.getElementById("text");
const output = document.getElementById("output");

// send.addEventListener('click', function() {
//   newPostRef.ref(room).push({
//     username: username.value,
//     text: text.value,
//     time: time()
//   });

//   text.value = "";
// })

function text() {
  newPostRef.ref(room).on("child_added", function(data) {
    const v = data.val();
    const k = data.key;
    let str = "";
    str += '<div id="' + k + '" class="msg_main">';
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/icon_person.png" alt="" class="icon '+ v.username +'" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';
    // str += '<div class="name">' + v.username + '</div>';
    // str += '<div class="text">' + v.text + '</div>';
    output.innerHTML += str;

    $("#output").scrollTop($("#output")[0].scrollHeight);
  })
}

function time() {
  var date = new Date();
  var hh = ("0" + date.getHours()).slice(-2);
  var min = ("0" + date.getMinutes()).slice(-2);
  var sec = ("0" + date.getSeconds()).slice(-2);
  var time = hh + ":" + min + ":" + sec;

  return time;
}

const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';
const join = document.getElementById('js-call-trigger');
const content = document.getElementById('content');

join.addEventListener('click', function() {
  speech.start();
  text();
});

const endcall = document.getElementById('js-close-trigger');
endcall.addEventListener('click', function() {
  location.reload();
})

speech.onresult = function(e) {
  speech.stop();
  if(e.results[0].isFinal) {
    var autotext = e.results[0][0].transcript
    console.log(e);
    console.log(autotext);
    newPostRef.ref(room).push({
      username: username.value,
      text: autotext,
      time: time()
    })
    // content.innerHTML += '<div>' + autotext + '</div>';
  }
}

speech.onend = () => {
  speech.start();
}