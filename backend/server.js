require("dotenv").config();

const express = require("express");
const cors = require("cors");

const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const barang = require("./routes/barang");
const transaksi = require("./routes/transaksi");
const riwayat = require("./routes/riwayat");
const omzet = require("./routes/omzet");
const laporanRoutes = require("./routes/laporan");
const backupRoutes = require("./routes/backup");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", auth);
app.use("/api", dashboard);
app.use("/api", barang);
app.use("/api", transaksi);
app.use("/api", riwayat);
app.use("/api", omzet);
app.use("/api", laporanRoutes);
app.use("/api", backupRoutes);

app.get("/", (req, res) => {
    res.send("Bella Motor Server Jalan 🔥");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Bella Motor aktif di port ${PORT}`);
});