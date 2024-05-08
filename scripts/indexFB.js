let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";

window.addEventListener('load', function (e) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                velikiDiv = document.getElementsByClassName("cards");

                for(let of in sve){
                    karta = document.createElement("div");
                    karta.classList.add("card");
                    karta.classList.add("card-organizator");

                    podelem = document.createElement("img");
                    podelem.src = sve[of].logo;
                    podelem.alt = "Slika organizatora";
                    karta.appendChild(podelem);
                    //dodao sam sliku
                    podelem = document.createElement("h3");
                    podelem.innerHTML = sve[of].naziv;
                    karta.appendChild(podelem);
                    //dodao sam naziv
                    podelem = document.createElement("p");
                    podelem.innerHTML = "Kontakt telefon: ";

                    podelem2 = document.createElement("b");
                    podelem2.innerHTML = sve[of].kontaktTelefon;
                    podelem.appendChild(podelem2);
                    //dodao sam <b> 06165887845 </b>
                    karta.appendChild(podelem);
                    //dodao sam paragraf

                    podelem = document.createElement("p");
                    podelem.innerHTML = "Email: ";

                    podelem2 = document.createElement("b");
                    podelem2.innerHTML = sve[of].email;
                    podelem.appendChild(podelem2);
                    //dodao sam <b> kontakt@email.com </b>
                    karta.appendChild(podelem);
                    //dodao sam paragraf
                    podelem = document.createElement("a");
                    //podelem.href = "organizator.html";
                    podelem.setAttribute("data-id", of);
                    podelem.innerHTML = "Vise o organizatoru";
                    podelem.onclick = dodajFestivalUPutanju;
                    karta.appendChild(podelem);
                    //dodao sam link
                    velikiDiv[0].appendChild(karta);
                }
                // Izvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
                
            } else {
                alert('Greska pri ucitavanju podataka.')
                window.location.href = "pages/error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
});
function dodajFestivalUPutanju(){
    let clickedBtn = this;
    let id = clickedBtn.getAttribute("data-id");
    window.location.href = "pages/organizator.html?id="+id;
}