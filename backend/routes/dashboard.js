const express = require("express");

const router = express.Router();

const db = require("../models/database");


router.get("/dashboard",(req,res)=>{

db.query(

`
SELECT

(SELECT IFNULL(SUM(subtotal),0)
FROM transaksi
WHERE DATE(tanggal)=CURDATE()) AS omzet,

(SELECT COUNT(DISTINCT no_transaksi)
FROM transaksi
WHERE DATE(tanggal)=CURDATE()) AS transaksi,

(SELECT COUNT(*)
FROM barang
WHERE stok < 5) AS stokMenipis,

(SELECT COUNT(*)
FROM barang) AS totalBarang
`,

(err,result)=>{

if(err){

console.log(err);

return res.json({

omzet:0,
transaksi:0,
stokMenipis:0,
totalBarang:0,
detailStokMenipis:[]

});

}


// ====================
// AMBIL DETAIL STOK MENIPIS
// ====================

db.query(

`
SELECT
nama_barang,
stok

FROM barang

WHERE stok < 5

ORDER BY stok ASC
`,

(err2,stokResult)=>{

if(err2){

console.log(err2);

return res.json({

omzet:result[0].omzet || 0,
transaksi:result[0].transaksi || 0,
stokMenipis:result[0].stokMenipis || 0,
totalBarang:result[0].totalBarang || 0,
detailStokMenipis:[]

});

}

res.json({

omzet:result[0].omzet || 0,
transaksi:result[0].transaksi || 0,
stokMenipis:result[0].stokMenipis || 0,
totalBarang:result[0].totalBarang || 0,

detailStokMenipis:
stokResult

});

}

);

}

);

});

// ====================
// GRAFIK HARIAN
// ====================

router.get("/dashboard/grafik/harian",(req,res)=>{

db.query(

`
SELECT

DATE_FORMAT(tanggal,'%d-%m') AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY DATE(tanggal)

ORDER BY DATE(tanggal)

LIMIT 7
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
// GRAFIK BULANAN
// ====================

router.get("/dashboard/grafik/bulanan",(req,res)=>{

db.query(

`
SELECT

DATE_FORMAT(
MIN(tanggal),
'%M'
) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY

YEAR(tanggal),
MONTH(tanggal)

ORDER BY

YEAR(tanggal),
MONTH(tanggal)

LIMIT 12
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
// GRAFIK TAHUNAN
// ====================

router.get("/dashboard/grafik/tahunan",(req,res)=>{

db.query(

`
SELECT

YEAR(tanggal) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY YEAR(tanggal)

ORDER BY YEAR(tanggal)

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
