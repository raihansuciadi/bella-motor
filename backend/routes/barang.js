const express = require("express");

const router = express.Router();

const db = require("../models/database");


// ====================
// AMBIL SEMUA BARANG
// ====================

router.get("/barang",(req,res)=>{

db.query(

"SELECT * FROM barang",

(error,result)=>{

if(error){

console.log(error);

return res.json({

success:false,
message:"Gagal ambil data"

});

}

res.json(result);

}

);

});




// ====================
// TAMBAH BARANG
// ====================

router.post("/barang",(req,res)=>{

const{

kode_barang,
nama_barang,
kategori,
stok,
harga_beli,
harga_jual

}=req.body;


db.query(

`
INSERT INTO barang
(
kode_barang,
nama_barang,
kategori,
stok,
harga_beli,
harga_jual
)

VALUES
(?,?,?,?,?,?)
`,

[
kode_barang,
nama_barang,
kategori,
stok,
harga_beli,
harga_jual
],

(error,result)=>{

if(error){

console.log(error);

return res.json({

success:false

});

}

res.json({

success:true

});

}

);

});




// ====================
// EDIT BARANG
// ====================

router.put("/barang/:id",(req,res)=>{

const id = req.params.id;

const{

kode_barang,
nama_barang,
kategori,
stok,
harga_beli,
harga_jual

}=req.body;


db.query(

`
UPDATE barang
SET

kode_barang=?,
nama_barang=?,
kategori=?,
stok=?,
harga_beli=?,
harga_jual=?

WHERE id=?
`,

[
kode_barang,
nama_barang,
kategori,
stok,
harga_beli,
harga_jual,
id
],

(error,result)=>{

if(error){

console.log(error);

return res.json({

success:false

});

}

res.json({

success:true

});

}

);

});




// ====================
// HAPUS BARANG
// ====================

router.delete(

"/barang/:id",

(req,res)=>{

const id=req.params.id;

db.query(

"DELETE FROM barang WHERE id=?",

[id],

(error,result)=>{

if(error){

return res.json({

success:false

});

}

res.json({

success:true

});

}

);

});




// ====================
// STOK MASUK
// ====================

router.post("/stokmasuk",(req,res)=>{

const{

kode_barang,
nama_barang,
jumlah

}=req.body;


db.query(

`
UPDATE barang

SET stok = stok + ?

WHERE kode_barang = ?
`,

[
jumlah,
kode_barang
],

(error,result)=>{

if(error){

console.log(error);

return res.json({

success:false

});

}


db.query(

`
INSERT INTO stok_masuk
(

kode_barang,
nama_barang,
jumlah

)

VALUES
(
?,
?,
?
)
`,

[
kode_barang,
nama_barang,
jumlah
],

(error2,result2)=>{

if(error2){

console.log(error2);

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

});



module.exports = router;