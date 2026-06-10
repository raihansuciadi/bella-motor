let noTransaksiAktif = "";

async function loadRiwayat(){

try{

const response = await fetch(
"http://localhost:3000/api/riwayat"
);

const data = await response.json();

console.log(data);
console.log(data[0]);
console.log(data[0].jam);

let html = "";

data.forEach(item=>{

html += `

<tr>

<td>

<a href="#"
onclick="lihatDetail('${item.no_transaksi}')">

${item.no_transaksi}

</a>

</td>

<td>
${item.tanggal}
</td>

<td>
${item.jam}
</td>

<td>
${item.metode}
</td>

<td>
Rp${Number(item.total)
.toLocaleString("id-ID")}
</td>


</tr>

`;

});

document
.getElementById(
"dataRiwayat"
)
.innerHTML = html;

}
catch(error){

console.log("ERROR RIWAYAT:");
console.log(error);

}

}




async function lihatDetail(no){

try{

noTransaksiAktif = no;

const response = await fetch(

`http://localhost:3000/api/riwayat/${no}`

);

const data = await response.json();

console.log("DETAIL:");
console.log(data);

let total = 0;

let html = `

<table>

<tr>

<th>Barang</th>
<th>Qty</th>
<th>Harga</th>
<th>Subtotal</th>

</tr>

`;


data.forEach(item=>{

total += Number(item.subtotal);

html += `

<tr>

<td>${item.nama_barang}</td>

<td>${item.jumlah}</td>

<td>

Rp${Number(item.harga)
.toLocaleString("id-ID")}

</td>

<td>

Rp${Number(item.subtotal)
.toLocaleString("id-ID")}

</td>

</tr>

`;

});


html += `

<tr>

<td colspan="3">

<b>Total</b>

</td>

<td>

<b>

Rp${total.toLocaleString("id-ID")}

</b>

</td>

</tr>

</table>

`;

document
.getElementById(
"detailIsi"
)
.innerHTML = html;

document
.getElementById(
"popup"
)
.style.display = "block";

}
catch(error){

console.log(error);

}

}



function tutupPopup(){

document
.getElementById(
"popup"
)
.style.display = "none";

}




async function cetakStruk(){

const response = await fetch(

`http://localhost:3000/api/riwayat/${noTransaksiAktif}`

);

const data = await response.json();

let total = 0;

let isi = "";

data.forEach(item=>{

total += Number(item.subtotal);

isi += `

<tr>

<td>${item.nama_barang}</td>

<td>${item.jumlah}</td>

<td>

Rp${Number(item.subtotal)
.toLocaleString("id-ID")}

</td>

</tr>

`;

});


const win = window.open(
"",
"",
"width=400,height=600"
);

win.document.write(`

<html>

<head>

<title>

Struk Bella Motor

</title>

<style>

body{

font-family:monospace;
padding:20px;

}

table{

width:100%;

}

</style>

</head>

<body>

<h2 align="center">

BELLA MOTOR

</h2>

<hr>

No Transaksi :
${noTransaksiAktif}

<br><br>

<table>

${isi}

</table>

<hr>

<b>

TOTAL :

Rp${total.toLocaleString("id-ID")}

</b>

<br><br>

<center>

Terima Kasih 🙏

</center>

</body>

</html>

`);

win.document.close();

win.print();

}



loadRiwayat();