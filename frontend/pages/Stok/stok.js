let semuaBarang = [];

let editId = null;



// ====================
// AMBIL BARANG
// ====================

async function ambilBarang(){

const response = await fetch(

"http://localhost:3000/api/barang"

);

semuaBarang = await response.json();

tampilkanBarang(
semuaBarang
);

}



// ====================
// TAMPILKAN BARANG
// ====================

function tampilkanBarang(data){

let isi = "";

data.forEach((item)=>{

isi += `

<tr>

<td>${item.kode_barang}</td>

<td>${item.nama_barang}</td>

<td>${item.kategori}</td>

<td>${item.stok}</td>

<td>Rp${Number(item.harga_beli)
.toLocaleString("id-ID")}</td>

<td>Rp${Number(item.harga_jual)
.toLocaleString("id-ID")}</td>

<td>

<button
onclick="editBarang(${item.id})">

✏️ Edit

</button>

<button
onclick="hapusBarang(${item.id})">

🗑️ Hapus

</button>

</td>

</tr>

`;

});

document
.getElementById(
"dataBarang"
)
.innerHTML = isi;

}



// ====================
// EDIT BARANG
// ====================

function editBarang(id){

const barang = semuaBarang.find(

item => item.id == id

);

if(!barang){

return;

}

editId = id;

document
.getElementById(
"kode_barang"
)
.value = barang.kode_barang;

document
.getElementById(
"nama_barang"
)
.value = barang.nama_barang;

document
.getElementById(
"kategori"
)
.value = barang.kategori;

document
.getElementById(
"stok"
)
.value = barang.stok;

document
.getElementById(
"harga_beli"
)
.value = barang.harga_beli;

document
.getElementById(
"harga_jual"
)
.value = barang.harga_jual;

document.querySelector(
".form-box button"
).innerText =

"Update Barang";

window.scrollTo({

top:0,

behavior:"smooth"

});

}



// ====================
// TAMBAH / UPDATE
// ====================

async function tambahBarang(){

const data = {

kode_barang:
document.getElementById(
"kode_barang"
).value,

nama_barang:
document.getElementById(
"nama_barang"
).value,

kategori:
document.getElementById(
"kategori"
).value,

stok:
document.getElementById(
"stok"
).value,

harga_beli:
document.getElementById(
"harga_beli"
).value,

harga_jual:
document.getElementById(
"harga_jual"
).value

};


if(editId){

await fetch(

`http://localhost:3000/api/barang/${editId}`,

{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(data)

}

);

alert(
"Barang berhasil diupdate"
);

editId = null;

document.querySelector(
".form-box button"
).innerText =

"Tambah Barang";

}

else{

await fetch(

"http://localhost:3000/api/barang",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(data)

}

);

alert(
"Barang berhasil ditambahkan"
);

}


// reset form

document
.getElementById(
"kode_barang"
)
.value = "";

document
.getElementById(
"nama_barang"
)
.value = "";

document
.getElementById(
"kategori"
)
.value = "";

document
.getElementById(
"stok"
)
.value = "";

document
.getElementById(
"harga_beli"
)
.value = "";

document
.getElementById(
"harga_jual"
)
.value = "";

ambilBarang();

}



// ====================
// CARI BARANG
// ====================

function cariBarang(){

const keyword =

document
.getElementById(
"cari"
)
.value
.toLowerCase();


const hasil =

semuaBarang.filter(

item =>

item.kode_barang
.toLowerCase()
.includes(keyword)

||

item.nama_barang
.toLowerCase()
.includes(keyword)

);

tampilkanBarang(
hasil
);

}



// ====================
// HAPUS BARANG
// ====================

async function hapusBarang(id){

const yakin = confirm(

"Yakin ingin menghapus barang ini?"

);

if(!yakin){

return;

}

await fetch(

`http://localhost:3000/api/barang/${id}`,

{

method:"DELETE"

}

);

ambilBarang();

}



// ====================
// LOAD
// ====================

ambilBarang();

// ====================
// GANTI MODE
// ====================

function gantiMode(){

const mode = document
.getElementById(
"modeStok"
).value;

if(mode==="barang"){

document
.getElementById(
"formBarang"
)
.style.display = "grid";

document
.getElementById(
"formStok"
)
.style.display = "none";

}

else{

document
.getElementById(
"formBarang"
)
.style.display = "none";

document
.getElementById(
"formStok"
)
.style.display = "grid";

}

}

// ====================
// TAMBAH STOK
// ====================

async function tambahStokBarang(){

const data={

kode_barang:
document.getElementById("kodeStok").value,

nama_barang:
document.getElementById("namaStok").value,

jumlah:
document.getElementById("jumlahStok").value

};

await fetch(
"http://localhost:3000/api/stokmasuk",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
}
);

alert("Stok berhasil ditambahkan");

document.getElementById(
"kodeStok"
).value = "";

document.getElementById(
"namaStok"
).value = "";

document.getElementById(
"jumlahStok"
).value = "";

document.getElementById(
"kodeStok"
).focus();

ambilBarang();

}

// ====================
// AUTO ISI NAMA BARANG
// ====================

document
.getElementById(
"kodeStok"
)
.addEventListener(

"input",

function(){

const kode =

this.value
.trim()
.toLowerCase();

const barang =

semuaBarang.find(

item =>

item.kode_barang
.toLowerCase()

===

kode

);

if(barang){

document
.getElementById(
"namaStok"
)
.value = barang.nama_barang;

}
else{

document
.getElementById(
"namaStok"
)
.value = "";

}

}

);