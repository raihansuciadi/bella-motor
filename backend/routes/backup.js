const express = require("express");

const router = express.Router();

const { exec } = require("child_process");

router.get("/backup",(req,res)=>{

const namaFile =
`backup-bella-motor-${Date.now()}.sql`;

const command =

`"E:\\xampp\\mysql\\bin\\mysqldump.exe" -u root bella_motor > ${namaFile}`;

exec(command,(err)=>{

if(err){

console.log(err);

return res.json({

success:false,
error:err.message

});

}

res.download(namaFile);

});

});

module.exports = router;