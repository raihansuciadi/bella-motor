const express = require("express");

const router = express.Router();

const db = require("../models/database");


// ====================
// RIWAYAT TRANSAKSI
// ====================

router.get("/riwayat",(req,res)=>{

db.query(

`
SELECT

IFNULL(no_transaksi,id) AS no_transaksi,

DATE_FORMAT(
MAX(tanggal),
'%d-%m-%Y'
) AS tanggal,

DATE_FORMAT(
MAX(tanggal),
'%H:%i:%s'
) AS jam,

MAX(metode_bayar) AS metode,

SUM(subtotal) AS total

FROM transaksi

GROUP BY IFNULL(no_transaksi,id)

ORDER BY MAX(tanggal) DESC

`,

(err,result)=>{

if(err){

console.log(err);

return res.json([]);

}

res.json(result);

}

);

});




// ====================
// DETAIL TRANSAKSI
// ====================

router.get("/riwayat/:no",(req,res)=>{

const no=req.params.no;

db.query(

`
SELECT

kode_barang,
nama_barang,
jumlah,
harga,
subtotal,
metode_bayar

FROM transaksi

WHERE CAST(no_transaksi AS CHAR)=?

`,

[no],

(err,result)=>{

if(err){

console.log(err);

return res.json([]);

}

res.json(result);

}

);

});



console.log("RIWAYAT ROUTE LOADED");

module.exports = router;