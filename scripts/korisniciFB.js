let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";

function getContent(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                velikiDiv = document.getElementsByClassName("main");

                for(let korisnik in sve){
                    var karta = document.createElement("div");
                    karta.classList.add("row");
                    var tabla = document.createElement("table");
                    tabla.innerHTML="<tr><th>korisnicko ime</th><th>lozinka</th><th>Ime</th><th>Prezime</th><th>Email</th><th>Datum rodjenja</th><th>Adresa</th><th>Telefon</th<th>Zanimanje</th></tr>"
                    var red = document.createElement("tr");
                    var celija = document.createElement("td");
                    celija.innerText = sve[korisnik].korisnickoIme;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].lozinka;
                    red.appendChild(celija);
                    
                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].ime;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].prezime;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].email;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].datumRodjenja;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].adresa;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].telefon;
                    red.appendChild(celija);

                    celija = document.createElement("td");
                    celija.innerText = sve[korisnik].zanimanje;
                    red.appendChild(celija);

                    tabla.appendChild(red);
                    
                    karta.appendChild(tabla);

                    var dugmad = document.createElement("div");
                    dugmad.classList.add("dugmad");
                    dugmad.classList.add("dugmad-kor");

                    var btn = document.createElement("a");
                    btn.innerText = "Izmeni";
                    btn.href = "formaIzmeneKorisnika.html?idk="+korisnik;
                    dugmad.appendChild(btn);

                    btn = document.createElement("a");
                    btn.innerText = "Obrisi";
                    btn.setAttribute("idk", korisnik);
                    btn.onclick = brisanje;
                    
                    dugmad.appendChild(btn);
                    karta.appendChild(dugmad);
                    velikiDiv[0].appendChild(karta);
                }
            } else {
                alert('Greska pri ucitavanju korisnika.')
                window.location.href = "pages/error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
};

getContent();
let idk;
function brisanje(){
    idk = this.getAttribute("idk");
    document.getElementById("deleteConfirmation").style.display = "block";
}
function kliknoDugme2() {
    document.getElementById("deleteConfirmation").style.display = "none";
}
function kliknoDugme1() {
    document.getElementById("deleteConfirmation").style.display = "none";
    document.getElementById("deleted").style.display = "block";
}
function obrisiKorisnika(){
    document.getElementById("deleted").style.display = "none";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            location.reload();
          } else {
            alert("Greška prilikom brisanja korisnika.");
          }
        }
      };
    request.open("DELETE", firebaseUrl + "/korisnici/" + idk + ".json");
    request.send();
}