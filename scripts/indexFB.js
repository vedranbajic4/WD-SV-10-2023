let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";

function getContent(){
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
            } else {
                alert('Greska pri ucitavanju podataka.')
                window.location.href = "pages/error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
};
function dodajFestivalUPutanju(){
    let clickedBtn = this;
    let id = clickedBtn.getAttribute("data-id");
    window.location.href = "pages/organizator.html?id="+id;
}
getContent();
let niz_vrednosti = [];
function pretrazi(){
    let input = document.getElementById("pretragaBox");
    let filter = input.value.toUpperCase();
    let cards = document.getElementsByClassName("card-organizator");
    if(niz_vrednosti.length == 0){
        for(let i = 0; i < cards.length; i++){
            niz_vrednosti.push(cards[i].getElementsByTagName("h3")[0].innerText);
        }
    }

    if(input.value == ""){
        for(let i = 0; i < cards.length; i++){
            cards[i].style.display = "block";
            cards[i].getElementsByTagName("h3")[0].innerHTML = niz_vrednosti[i];
        }
        return;
    }

    for(let i = 0; i < cards.length; i++){
        var h3 = cards[i].getElementsByTagName("h3")[0];
        var txtValue = h3.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            cards[i].style.display = "block";
            var index = txtValue.toUpperCase().indexOf(filter);
            var txtValue1 = txtValue.substring(0, index);
            var txtValue2 = txtValue.substring(index, index + filter.length);
            var txtValue3 = txtValue.substring(index + filter.length);
            cards[i].getElementsByTagName("h3")[0].innerHTML = txtValue1 + "<span class='highlight'>" + txtValue2 + "</span>" + txtValue3;
        }
        else{
            cards[i].style.display = "none";
        }
    }
}