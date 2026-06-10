let semuaBarang = [];
let keranjang = [];


// ====================
// LOAD BARANG
// ====================

async function loadBarang(){

try{

const response = await fetch(
"http://localhost:3000/api/barang"
);

semuaBarang = await response.json();

isiListBarang();

}catch(error){

console.log(error);

}

}

loadBarang();




// ====================
// NOMOR TRANSAKSI
// ====================

let nomor = localStorage.getItem(
"nomorTransaksi"
) || 1;

document
.getElementById(
"notransaksi"
)
.value = nomor;




// ====================
// TANGGAL
// ====================

document
.getElementById(
"tanggal"
)
.value = new Date()
.toISOString()
.split("T")[0];




// ====================
// SUGGEST BARANG
// ====================

function isiListBarang(){

let html="";

semuaBarang.forEach(item=>{

html += `

<option value="${item.nama_barang}">

`;

});

document
.getElementById(
"listBarang"
)
.innerHTML=html;

}




// ====================
// ENTER TAMBAH
// ====================

["kodeBarang","namaBarang"]

.forEach(id=>{

document
.getElementById(id)

.addEventListener(

"keypress",

function(e){

if(e.key==="Enter"){

tambahKeranjang();

}

}

);

});




// ====================
// TAMBAH KERANJANG
// ====================

function tambahKeranjang(){

const kode =

document
.getElementById(
"kodeBarang"
)
.value.trim();


const nama =

document
.getElementById(
"namaBarang"
)
.value.trim();


let barang;


// cari kode

if(kode){

barang=

semuaBarang.find(

item=>

item.kode_barang
.toLowerCase()

===

kode.toLowerCase()

);

}


// cari nama

if(!barang && nama){

barang=

semuaBarang.find(

item=>

item.nama_barang
.toLowerCase()

===

nama.toLowerCase()

);

}


if(!barang){

alert(
"Barang tidak ditemukan"
);

return;

}



// kalau barang sudah ada

const index=

keranjang.findIndex(

item=>

item.kode_barang===barang.kode_barang

);


if(index!==-1){

keranjang[index].jumlah++;

keranjang[index].total=

keranjang[index].jumlah*
keranjang[index].harga;

}else{

keranjang.push({

kode_barang:
barang.kode_barang,

nama_barang:
barang.nama_barang,

jumlah:1,

harga:
barang.harga_jual,

total:
barang.harga_jual

});

}


renderKeranjang();


// reset

document
.getElementById(
"kodeBarang"
)
.value="";

document
.getElementById(
"namaBarang"
)
.value="";

}





// ====================
// TAMPIL KERANJANG
// ====================

function renderKeranjang(){

let html="";
let subtotal=0;

keranjang.forEach(

(item,index)=>{

subtotal+=item.total;

html+=`

<tr>

<td>${item.kode_barang}</td>

<td>${item.nama_barang}</td>

<td>

<button onclick="kurangQty(${index})">

-

</button>

${item.jumlah}

<button onclick="tambahQty(${index})">

+

</button>

</td>

<td>

Rp${item.harga.toLocaleString("id-ID")}

</td>

<td>

Rp${item.total.toLocaleString("id-ID")}

</td>

<td>

<button onclick="hapusItem(${index})">

🗑️

</button>

</td>

</tr>

`;

});


document
.getElementById(
"keranjang"
)
.innerHTML=html;


document
.getElementById(
"subtotal"
)
.innerText=

"Rp"+

subtotal.toLocaleString(
"id-ID");


document
.getElementById(
"grandTotal"
)
.innerText=

"Rp"+

subtotal.toLocaleString(
"id-ID");

hitungKembalian();

}




// ====================
// TAMBAH QTY
// ====================

function tambahQty(index){

keranjang[index].jumlah++;

keranjang[index].total=

keranjang[index].jumlah*
keranjang[index].harga;

renderKeranjang();

}



// ====================
// KURANG QTY
// ====================

function kurangQty(index){

if(
keranjang[index].jumlah>1
){

keranjang[index].jumlah--;

keranjang[index].total=

keranjang[index].jumlah*
keranjang[index].harga;

}

renderKeranjang();

}



// ====================
// HAPUS ITEM
// ====================

function hapusItem(index){

keranjang.splice(
index,
1
);

renderKeranjang();

}




// ====================
// FORMAT BAYAR
// ====================

document
.getElementById(
"bayar"
)
.addEventListener(

"input",

function(){

let angka=

this.value
.replace(/\D/g,"");


if(!angka){

this.value="";

hitungKembalian();

return;

}


this.value=

"Rp"+

parseInt(
angka
)
.toLocaleString(
"id-ID"
);

hitungKembalian();

}

);




// ====================
// HITUNG KEMBALIAN
// ====================

function hitungKembalian(){

let subtotal=0;

keranjang.forEach(item=>{

subtotal+=item.total;

});


const bayar=

Number(

document
.getElementById(
"bayar"
)
.value
.replace(/\D/g,"")

);


const kembali=

bayar-subtotal;


document
.getElementById(
"kembalian"
)
.innerText=

kembali>0

?

"Rp"+
kembali.toLocaleString(
"id-ID"
)

:

"Rp0";

}





// ====================
// PROSES BAYAR
// ====================

async function prosesBayar(){

// ====================
// KERANJANG KOSONG
// ====================

if(keranjang.length===0){

alert(
"Keranjang kosong"
);

return;

}


// ====================
// HITUNG TOTAL
// ====================

let total = 0;

keranjang.forEach(item=>{

total += item.total;

});


// ====================
// CEK PEMBAYARAN
// ====================

const metode =

document
.getElementById(
"metodeBayar"
)
.value;

if(metode==="Tunai"){

const bayar = Number(

document
.getElementById(
"bayar"
)
.value
.replace(/\D/g,"")

);

if(bayar < total){

alert(
"Uang pembayaran kurang"
);

return;

}

}


// ====================
// SIMPAN TRANSAKSI
// ====================

for(let item of keranjang){

const response = await fetch(

"http://localhost:3000/api/transaksi",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

no_transaksi:

document
.getElementById(
"notransaksi"
)
.value,

tanggal:

document
.getElementById(
"tanggal"
)
.value,

metode_bayar:

document
.getElementById(
"metodeBayar"
)
.value,

kode_barang:
item.kode_barang,

nama_barang:
item.nama_barang,

jumlah:
item.jumlah,

harga:
item.harga,

subtotal:
item.total

})

}

);

const hasil =
await response.json();

if(!hasil.success){

alert(
hasil.message
);

return;

}

}


// ====================
// POPUP BERHASIL
// ====================

const tanggalCetak =
new Date().toLocaleString("id-ID");

document
.querySelector(
".popup-box"
)
.innerHTML=

`

<h2>

✅ Transaksi Berhasil

</h2>

<p>

No :
${document.getElementById("notransaksi").value}

</p>

<p>

Tanggal :
${tanggalCetak}

</p>

<p>

Total :
${document.getElementById("subtotal").innerText}

</p>

<p>

Kembalian :
${document.getElementById("kembalian").innerText}

</p>

<br>

<button onclick="cetakStruk()">

🖨️ Cetak Struk

</button>

<button onclick="tutupPopup()">

OK

</button>

`;

document
.getElementById(
"popup"
)
.style.display="flex";

}

function cetakStruk(){

let daftarBarang = "";

keranjang.forEach(item=>{

daftarBarang += `

<tr>

<td colspan="3">

${item.nama_barang}

</td>

</tr>

<tr>

<td>

${item.jumlah} x

</td>

<td>

Rp${item.harga.toLocaleString("id-ID")}

</td>

<td align="right">

Rp${item.total.toLocaleString("id-ID")}

</td>

</tr>

`;

});


const win = window.open(
"",
"",
"width=350,height=700"
);

win.document.write(`

<html>

<head>

<title>Struk Bella Motor</title>

<style>

body{

font-family:"Courier New", monospace;
font-size:12px;
width:250px;
margin:auto;
padding:10px;

}

h2{

margin:0;

}

table{

width:100%;
border-collapse:collapse;

}

td{

padding:2px 0;

}

hr{

border:none;
border-top:1px dashed black;

}

.center{

text-align:center;

}

.right{

text-align:right;

}

</style>

</head>

<body>

<div class="center">

<h2>BELLA MOTOR</h2>
Toko Sparepart & Oli
<br>

Jl. Raya Bella Motor

<br>

Telp : 08xxxxxxxxxx

</div>

<hr>

No Transaksi :
${document.getElementById("notransaksi").value}

<br>

Tanggal :
${new Date().toLocaleString("id-ID")}

<hr>

<table>

${daftarBarang}

</table>

<hr>

<table>

<tr>

<td>TOTAL</td>

<td class="right">

${document.getElementById("subtotal").innerText}

</td>

</tr>

<tr>

<td>BAYAR</td>

<td class="right">

${document.getElementById("bayar").value}

</td>

</tr>

<tr>

<td>KEMBALI</td>

<td class="right">

${document.getElementById("kembalian").innerText}

</td>

</tr>

</table>

<hr>

<div class="center">

Terima Kasih Atas Kunjungan Anda


</div>

<script>

window.onload = function(){

window.print();

setTimeout(()=>{

window.close();

},500);

}

</script>

</body>

</html>

`);

win.document.close();

}

function tutupPopup(){

nomor++;

localStorage.setItem(
"nomorTransaksi",
nomor
);

location.reload();

}

document
.getElementById(
"metodeBayar"
)
.addEventListener(

"change",

function(){

const metode = this.value;

if(
metode==="Transfer"
||
metode==="QRIS"
){

document
.getElementById(
"bayarBox"
)
.style.display="none";

document
.getElementById(
"kembalianBox"
)
.style.display="none";

}
else{

document
.getElementById(
"bayarBox"
)
.style.display="block";

document
.getElementById(
"kembalianBox"
)
.style.display="block";

}

}

);