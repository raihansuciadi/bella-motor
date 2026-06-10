async function loadDashboard(){

try{

const response = await fetch(
"http://localhost:3000/api/dashboard"
);

const data = await response.json();

document.getElementById("omzet").innerText =
"Rp" +
Number(data.omzet || 0)
.toLocaleString("id-ID");

document.getElementById("transaksi").innerText =
data.transaksi || 0;

document.getElementById("stok").innerText =
data.stokMenipis || 0;

document.getElementById("barang").innerText =
data.totalBarang || 0;


// ====================
// DETAIL STOK MENIPIS
// ====================

let html = "";

if(
data.detailStokMenipis &&
data.detailStokMenipis.length > 0
){

data.detailStokMenipis.forEach(item=>{

html += `

<div style="padding:5px 0;">

⚠️ ${item.nama_barang}
- Sisa ${item.stok} pcs

</div>

`;

});

}
else{

html = `
Tidak ada stok menipis
`;

}

document
.getElementById(
"stokMenipisList"
)
.innerHTML = html;

}
catch(error){

console.log(error);

}

}



let grafik = null;

async function loadGrafik(
jenis="harian"
){

try{

const response = await fetch(
`http://localhost:3000/api/omzet/${jenis}`
);

const data = await response.json();

const labels = data.map(
item => item.label
);

const omzet = data.map(
item => Number(item.omzet)
);

const ctx =
document.getElementById(
"grafikOmzet"
);

if(grafik){

grafik.destroy();

}

grafik = new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Omzet",

data:omzet,

borderWidth:2,

tension:0.3

}]

},

options:{

responsive:true,

scales:{

y:{

beginAtZero:true

}

}

}

});

}
catch(error){

console.log(error);

}

}



document
.getElementById(
"filterGrafik"
)
.addEventListener(

"change",

function(){

loadGrafik(
this.value
);

}

);



loadDashboard();

loadGrafik(
"harian"
);