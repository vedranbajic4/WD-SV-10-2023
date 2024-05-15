let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com/";

function getAllOrganizatori(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                velikiDiv = document.getElementsByClassName("content");
                
                for(let of in sve){
                    var karta = document.createElement("div");
                    karta.classList.add("row");

                    var podelem = document.createElement("img");
                    podelem.src = sve[of].logo;
                    podelem.alt = "Slika organizatora";
                    karta.appendChild(podelem); //dodao sam sliku

                    podelem = document.createElement("h3");
                    podelem.innerHTML = sve[of].naziv;
                    karta.appendChild(podelem); //dodao sam naslov

                    var podelem2 = document.createElement("div");
                    podelem2.classList.add("dugmad");
                    
                    var dugme = document.createElement("a");
                    dugme.setAttribute("data-id", of);
                    dugme.innerHTML = "Izmeni organizatora";
                    dugme.onclick = dodajPutanjuIzmena;
                    podelem2.appendChild(dugme);     //prvo dugme za izmenu
                    
                    var dugme = document.createElement("a");
                    dugme.setAttribute("data-id", of);
                    dugme.onclick = brisanje;
                    dugme.innerHTML = "Obrisi organizatora";
                    podelem2.appendChild(dugme);     //drugo dugme za brisanje
                    
                    var dugme = document.createElement("a");
                    dugme.setAttribute("data-id", of);
                    dugme.innerHTML = "Dodaj festival";
                    dugme.onclick = dodajPutanjuDodavanje;
                    podelem2.appendChild(dugme);     //trece dugme za dodavanje festivala
                    
                    karta.appendChild(podelem2);     //dodao sam dugmad

                    velikiDiv[0].appendChild(karta);
                }
                
            } else {
                alert('Greska pri ucitavanju podataka.')
                window.location.href = "pages/error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
}
function dodajPutanjuIzmena(){
    let clickedBtn = this;
    let id = clickedBtn.getAttribute("data-id");
    window.location.href = "formaIzmeneOrganizatora.html?id="+id;
}
function dodajPutanjuDodavanje(){
    let clickedBtn = this;
    let id = clickedBtn.getAttribute("data-id");
    window.location.href = "formaDodavanjaFestivala.html?id="+id;
}
getAllOrganizatori();
