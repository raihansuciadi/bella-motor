const express = require("express");

const router = express.Router();

const db = require("../models/database");


// ====================
// SIMPAN TRANSAKSI
// ====================

router.post("/transaksi",(req,res)=>{

const {

no_transaksi,
kode_barang,
nama_barang,
jumlah,
harga,
subtotal,
metode_bayar

}=req.body;


// ====================
// CEK STOK DULU
// ====================

db.query(

`
SELECT stok
FROM barang
WHERE kode_barang=?
`,

[kode_barang],

(error,result)=>{

if(error){

console.log(error);

return res.json({
success:false
});

}

if(result.length===0){

return res.json({

success:false,
message:"Barang tidak ditemukan"

});

}

const stok = Number(
result[0].stok
);


// ====================
// STOK TIDAK CUKUP
// ====================

if(stok < Number(jumlah)){

return res.json({

success:false,
message:"Stok tidak mencukupi"

});

}


// ====================
// SIMPAN TRANSAKSI
// ====================

db.query(

`

INSERT INTO transaksi
(

no_transaksi,
tanggal,
kode_barang,
nama_barang,
jumlah,
harga,
subtotal,
metode_bayar

)

VALUES
(

?,
NOW(),
?,
?,
?,
?,
?,
?

)

`,

[
no_transaksi,
kode_barang,
nama_barang,
jumlah,
harga,
subtotal,
metode_bayar
],

(error,result)=>{

if(error){

console.log(error);

return res.json({

success:false

});

}


// ====================
// KURANGI STOK
// ====================

db.query(

`

UPDATE barang

SET stok = stok - ?

WHERE kode_barang = ?

`,

[
jumlah,
kode_barang
],

(err)=>{

if(err){

console.log(err);

return res.json({

success:false

});

}

res.json({

success:true

});

}

);

}

);

}

);

});

module.exports = router;