async function register() {

    console.log("REGISTER DIKLIK");

    const nama = document.getElementById("nama").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const konfirmasi = document.getElementById("konfirmasi").value;

    console.log("DATA INPUT:");
    console.log({
        nama,
        username,
        password,
        konfirmasi
    });

    if (password !== konfirmasi) {

        document.getElementById("error").innerHTML =
            "Password tidak sama";

        return;
    }

    try {

        console.log("SEBELUM FETCH");

        const response = await fetch(
            "https://bella-motor-production.up.railway.app/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nama,
                    username,
                    password
                })
            }
        );

        console.log("SETELAH FETCH");
        console.log(response);

        const data = await response.json();

        console.log("DATA DARI SERVER:");
        console.log(data);

        if (data.success) {

            alert("Registrasi berhasil");

            window.location.href = "login.html";

        } else {

            document.getElementById("error").innerHTML =
                data.message;

        }

    } catch (error) {

        console.log("ERROR:");
        console.log(error);

        document.getElementById("error").innerHTML =
            "Server tidak terhubung";
    }

}