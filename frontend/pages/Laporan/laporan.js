// ====================
// LAPORAN PENJUALAN
// ====================

async function loadLaporan(
jenis="harian"
){

try{

const response = await fetch(
`http://localhost:3000/api/laporan/${jenis}`
);

const data = await response.json();

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>${item.periode}</td>

<td>${item.transaksi}</td>

<td>
Rp${Number(item.omzet)
.toLocaleString("id-ID")}
</td>

</tr>

`;

});

document
.getElementById(
"laporan"
)
.innerHTML = html;

}
catch(error){

console.log(error);

}

}



// ====================
// LAPORAN BARANG
// ====================

async function loadLaporanBarang(
jenis="harian"
){

try{

const response = await fetch(
`http://localhost:3000/api/laporan-barang/${jenis}`
);

const data = await response.json();

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>${item.nama_barang}</td>

<td>${item.terjual}</td>

<td>${item.stok}</td>

</tr>

`;

});

document
.getElementById(
"laporanBarang"
)
.innerHTML = html;

}
catch(error){

console.log(error);

}

}



// ====================
// LAPORAN BARANG MASUK
// ====================

async function loadLaporanMasuk(
jenis="harian"
){

try{

const response = await fetch(
`http://localhost:3000/api/laporan-masuk/${jenis}`
);

const data = await response.json();

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>${item.nama_barang}</td>

<td>${item.masuk}</td>

</tr>

`;

});

document
.getElementById(
"laporanMasuk"
)
.innerHTML = html;

}
catch(error){

console.log(error);

}

}



// ====================
// DOWNLOAD PDF
// ====================

async function downloadLaporan(){

try{

const jenis =
document.getElementById(
"filterLaporan"
).value;

const { jsPDF } =
window.jspdf;

const doc =
new jsPDF();

let y = 20;


// HEADER

doc.setFontSize(18);

doc.text(
"BELLA MOTOR",
20,
y
);

y += 10;

doc.setFontSize(12);

doc.text(
`Laporan ${jenis}`,
20,
y
);

y += 15;


// ====================
// PENJUALAN
// ====================

doc.setFontSize(14);

doc.text(
"LAPORAN PENJUALAN",
20,
y
);

y += 10;

const penjualan =
await fetch(
`http://localhost:3000/api/laporan/${jenis}`
);

const dataPenjualan =
await penjualan.json();

dataPenjualan.forEach(item=>{

doc.text(

`${item.periode} | ${item.transaksi} transaksi | Rp${Number(item.omzet).toLocaleString("id-ID")}`,

20,
y

);

y += 8;

});

y += 10;


// ====================
// BARANG TERJUAL
// ====================

doc.setFontSize(14);

doc.text(
"LAPORAN BARANG TERJUAL",
20,
y
);

y += 10;

const barang =
await fetch(
`http://localhost:3000/api/laporan-barang/${jenis}`
);

const dataBarang =
await barang.json();

dataBarang.forEach(item=>{

doc.text(

`${item.nama_barang} | Terjual : ${item.terjual} | Stok : ${item.stok}`,

20,
y

);

y += 8;

});

y += 10;


// ====================
// BARANG MASUK
// ====================

doc.setFontSize(14);

doc.text(
"LAPORAN BARANG MASUK",
20,
y
);

y += 10;

const masuk =
await fetch(
`http://localhost:3000/api/laporan-masuk/${jenis}`
);

const dataMasuk =
await masuk.json();

dataMasuk.forEach(item=>{

doc.text(

`${item.nama_barang} | Masuk : ${item.masuk}`,

20,
y

);

y += 8;

});

y += 15;

doc.setFontSize(10);

doc.text(

`Dicetak : ${new Date().toLocaleString("id-ID")}`,

20,
y

);

doc.save(
`Laporan-BellaMotor-${jenis}.pdf`
);

}
catch(error){

console.log(error);

}

}



// ====================
// FILTER LAPORAN
// ====================

document
.getElementById(
"filterLaporan"
)
.addEventListener(

"change",

function(){

loadLaporan(
this.value
);

}

);



// ====================
// FILTER BARANG
// ====================

document
.getElementById(
"filterBarang"
)
.addEventListener(

"change",

function(){

loadLaporanBarang(
this.value
);

}

);



// ====================
// FILTER BARANG MASUK
// ====================

document
.getElementById(
"filterMasuk"
)
.addEventListener(

"change",

function(){

loadLaporanMasuk(
this.value
);

}

);



// ====================
// LOAD AWAL
// ====================

loadLaporan(
"harian"
);

loadLaporanBarang(
"harian"
);

loadLaporanMasuk(
"harian"
);