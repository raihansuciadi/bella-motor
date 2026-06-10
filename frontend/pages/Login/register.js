async function register(){

const nama=
document.getElementById(
"nama"
).value

const username=
document.getElementById(
"username"
).value

const password=
document.getElementById(
"password"
).value

const konfirmasi=
document.getElementById(
"konfirmasi"
).value


if(password!==konfirmasi){

document.getElementById(
"error"
).innerHTML=
"Password tidak sama"

return

}

try{

const response=
await fetch(
"https://bella-motor-production.up.railway.app/api/register",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

nama,
username,
password

})

}

)

const data=
await response.json()

if(data.success){

window.location.href=
"login.html"

}

}catch(error){

console.log(error)

}

}