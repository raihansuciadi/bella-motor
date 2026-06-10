const express = require("express");

const router = express.Router();

const db = require("../models/database");

router.get("/omzet/:jenis",(req,res)=>{

const jenis = req.params.jenis;

let sql = "";

if(jenis==="harian"){

sql=`

SELECT

DATE_FORMAT(
tanggal,
'%d-%m-%Y'
) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY DATE(tanggal)

ORDER BY DATE(tanggal) ASC

LIMIT 7

`;

}

else if(jenis==="mingguan"){

sql=`

SELECT

CONCAT(
'Mg ',
WEEK(tanggal)
) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY YEAR(tanggal),WEEK(tanggal)

ORDER BY YEAR(tanggal),WEEK(tanggal)

`;

}

else if(jenis==="bulanan"){

sql=`

SELECT

DATE_FORMAT(
tanggal,
'%m-%Y'
) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY YEAR(tanggal),MONTH(tanggal)

ORDER BY YEAR(tanggal),MONTH(tanggal)

`;

}

else{

sql=`

SELECT

YEAR(tanggal) AS label,

SUM(subtotal) AS omzet

FROM transaksi

GROUP BY YEAR(tanggal)

ORDER BY YEAR(tanggal)

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

module.exports = router;