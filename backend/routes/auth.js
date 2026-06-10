const express = require("express");
const router = express.Router();

const db = require("../models/User");
const bcrypt = require("bcrypt");


// ================= REGISTER =================

router.post("/register", async (req,res)=>{

try{

const {

nama,
username,
password

}=req.body;


// cek username sudah ada atau belum

const cekUser=
`SELECT * FROM users WHERE username=?`;

db.query(

cekUser,

[username],

async(error,result)=>{

if(error){

return res.json({

success:false,
message:"Database error"

});

}


if(result.length>0){

return res.json({

success:false,
message:"Username sudah dipakai"

});

}


// hash password

const hashPassword=
await bcrypt.hash(password,10);


// simpan user

const query=`

INSERT INTO users
(nama,username,password,role)

VALUES
(?,?,?,'admin')

`;


db.query(

query,

[
nama,
username,
hashPassword
],

(error,result)=>{

if(error){

return res.json({

success:false,
message:"Gagal daftar"

});

}


res.json({

success:true,
message:"Berhasil daftar"

});

}

);

}

);

}catch(error){

res.json({

success:false,
message:"Server error"

});

}

});




// ================= LOGIN =================

router.post("/login",(req,res)=>{

const {

username,
password

}=req.body;


const query=`

SELECT *
FROM users

WHERE username=?

`;


db.query(

query,

[username],

async(error,result)=>{

if(error){

return res.json({

success:false,
message:"Database error"

});

}


if(result.length===0){

return res.json({

success:false,
message:"Username tidak ditemukan"

});

}


const user=result[0];

const cocok=
await bcrypt.compare(

password,
user.password

);


if(cocok){

res.json({

success:true,

token:"bella_token",

nama:user.nama,

role:user.role

});

}else{

res.json({

success:false,

message:"Password salah"

});

}

}

);

});

module.exports = router;