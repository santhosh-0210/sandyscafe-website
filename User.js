const loginsec = document.querySelector('.login-sec');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
registerlink.addEventListener('click' ,()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click' ,()=>{
    loginsec.classList.remove('active')
})

let signup = document.querySelector('.signup-form');
    signup.addEventListener('submit',(e)=>{
    e.preventDefault()
    let sname = document.getElementById("signup-username").value
    let spass = document.getElementById("signup-password").value
    let semail = document.getElementById("signup-email").value

    localStorage.setItem("sname", sname)
    localStorage.setItem("spass", spass)
    localStorage.setItem("semail", semail)

    alert("signup done successfully")
    loginsec.classList.remove('active')

})

let login=document.querySelector(".login-form")
    login.addEventListener("submit",(e)=>{
    e.preventDefault()
    let lemail=document.getElementById("login-email").value
    let lpass=document.getElementById("login-password").value

    let semail=localStorage.getItem("semail")
    let spass=localStorage.getItem("spass")

    if(lemail===semail && lpass===spass)
    {
        alert("login successfully done")
        window.location.href = "./Main.html";
    }
    else{
        alert("check the email and password")
    }
})
