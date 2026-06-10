const mysql = require("mysql2");

const db = mysql.createConnection({

host:"localhost",

user:"root",

password:"",

database:"bella_motor"

});

db.connect((error)=>{

if(error){

console.log(
"Koneksi database gagal"
);

}else{

console.log(
"Database Bella Motor terhubung"
);

}

});

module.exports = db;