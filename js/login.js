var title = document.getElementById("Title")
var button = document.getElementById("buttonIn")
var text1 = document.getElementById("text1")
var link = document.getElementById("link")
var massage = document.getElementById("massage")
var usersArr = []


function change() {
    if (title.innerText == "Log In") {
        ChangeToSignIn()
    }
    else { ChangeToLogIn() }
}


function ChangeToSignIn() {
    button.onclick = SignIn;
    title.innerText = "Sign In"
    button.innerText = "Sign In"
    text1.innerText = ""
    link.innerText = "To Log In"
    link.onclik = ChangeToLogIn
}
function ChangeToLogIn() {
    button.onclick = LogIn;
    title.innerText = "Log In"
    button.innerText = "LOg In"
    text1.innerText = "new member?"
    link.innerText = "To Sign In"
    link.onclik = ChangeToSignIn
}

function SignIn(addEvent) {
    addEvent.preventDefault();

    var inputmail = document.getElementById("email").value
    var inputpass = document.getElementById("pass").value
    if (inputmail == "" || inputpass == "") {
        alert("you left a empty field");
        return;
    }
    let usersArr = JSON.parse(localStorage.getItem('users')) || [];
    for (let useri in usersArr) {
        if (usersArr[useri]["email"] == inputmail) {
            text1.innerText = "you are a member, please log in";
            return;
        }
    }
    let newUser = {
        "email": inputmail,
        "pass": inputpass
    }

    PushIntoArr(newUser);
    var massage = document.getElementById("massage");
    massage.innerText = "Sign In succeded";
    location.href = "http://127.0.0.1:5500/html/data.html"
    massage.innerText = "";

}

function LogIn(addEvent) {
    addEvent.preventDefault();

    var inputmail = document.getElementById("email").value
    var inputpass = document.getElementById("pass").value
    if (inputmail == "" || inputpass == "") {
        alert("you left a empty field");
        return;
    }
    let usersArr = JSON.parse(localStorage.getItem('users')) || [];
    for (let useri in usersArr) {
        if (usersArr[useri]["email"] == inputmail) {
            if (usersArr[useri]["pass"] == inputpass) {
                window.open("../html/data.html","_self")
                return;
            }
            else {
                massage.innerText = "Wrong password"
                return;
            }
        }
    }
    massage.innerText = "We have no member with this email, plaese sign in"
}



function PushIntoArr(newUser) {
    let usersArr = JSON.parse(localStorage.getItem('users')) || [];
    usersArr.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersArr));
}