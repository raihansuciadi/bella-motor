const express = require("express");

const router = express.Router();

const db = require("../models/database");


// ====================
// LAPORAN PENJUALAN
// ====================

router.get("/laporan/:jenis",(req,res)=>{

const jenis = req.params.jenis;

let sql = "";

if(jenis==="harian"){

sql=`

SELECT

DATE_FORMAT(
tanggal,
'%d-%m-%Y'
) AS periode,

COUNT(
DISTINCT no_transaksi
) AS transaksi,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY DATE(tanggal)

ORDER BY DATE(tanggal) DESC

`;

}

else if(jenis==="mingguan"){

sql=`

SELECT

CONCAT(
'Minggu ',
WEEK(tanggal)
) AS periode,

COUNT(
DISTINCT no_transaksi
) AS transaksi,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY
YEAR(tanggal),
WEEK(tanggal)

ORDER BY
YEAR(tanggal) DESC,
WEEK(tanggal) DESC

`;

}

else if(jenis==="bulanan"){

sql=`

SELECT

DATE_FORMAT(
tanggal,
'%M %Y'
) AS periode,

COUNT(
DISTINCT no_transaksi
) AS transaksi,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY
YEAR(tanggal),
MONTH(tanggal)

ORDER BY
YEAR(tanggal) DESC,
MONTH(tanggal) DESC

`;

}

else{

sql=`

SELECT

YEAR(tanggal) AS periode,

COUNT(
DISTINCT no_transaksi
) AS transaksi,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY YEAR(tanggal)

ORDER BY YEAR(tanggal) DESC

`;

}

db.query(sql,(err,result)=>{

if(err){

console.log(err);

return res.json([]);

}

res.json(result);

});

});



// ====================
// LAPORAN BARANG
// ====================

router.get("/laporan-barang/:jenis",(req,res)=>{

const jenis = req.params.jenis;

let where = "";

if(jenis==="harian"){

where =
"WHERE DATE(t.tanggal)=CURDATE()";

}

else if(jenis==="mingguan"){

where =
"WHERE YEARWEEK(t.tanggal)=YEARWEEK(NOW())";

}

else if(jenis==="bulanan"){

where =
"WHERE MONTH(t.tanggal)=MONTH(NOW()) AND YEAR(t.tanggal)=YEAR(NOW())";

}

else{

where =
"WHERE YEAR(t.tanggal)=YEAR(NOW())";

}

db.query(

`
SELECT

t.nama_barang,

SUM(t.jumlah) AS terjual,

b.stok

FROM transaksi t

JOIN barang b
ON t.kode_barang=b.kode_barang

${where}

GROUP BY
t.kode_barang,
t.nama_barang,
b.stok

ORDER BY terjual DESC

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
// LAPORAN BARANG MASUK
// ====================

router.get("/laporan-masuk/:jenis",(req,res)=>{

const jenis = req.params.jenis;

let where = "";

if(jenis==="harian"){

where =
"WHERE DATE(tanggal)=CURDATE()";

}

else if(jenis==="mingguan"){

where =
"WHERE YEARWEEK(tanggal)=YEARWEEK(NOW())";

}

else if(jenis==="bulanan"){

where =
"WHERE MONTH(tanggal)=MONTH(NOW()) AND YEAR(tanggal)=YEAR(NOW())";

}

else{

where =
"WHERE YEAR(tanggal)=YEAR(NOW())";

}

db.query(

`
SELECT

nama_barang,

SUM(jumlah) AS masuk

FROM stok_masuk

${where}

GROUP BY nama_barang

ORDER BY masuk DESC

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

module.exports = router;

