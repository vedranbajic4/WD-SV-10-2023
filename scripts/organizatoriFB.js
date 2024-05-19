var firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
var idFestivala;

function napraviKartice(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let sve = JSON.parse(request.responseText);
                let cards = document.getElementsByClassName("cards")[0];
                let podelem = document.createElement("p");
                let pd2 = document.createElement("p");
                let pd3;
                for(id in sve){
                    if(id == idFestivala){
                        for(idp in sve[id]){
                            podelem = document.createElement("div");
                            podelem.classList.add("card");
                            podelem.classList.add("card-festival");

                            pd2 = document.createElement("h3");
                            pd2.innerText = sve[id][idp].naziv;
                            podelem.appendChild(pd2);

                            pd2 = document.createElement("p");
                            pd2.innerHTML = "Tip: <b>";
                            pd3 = document.createElement("b");
                            pd3.innerText = sve[id][idp].tip;
                            pd2.appendChild(pd3);
                            podelem.appendChild(pd2);

                            pd2 = document.createElement("p");
                            pd2.innerHTML = "Cena: <b>";
                            pd3 = document.createElement("b");
                            pd3.innerText = sve[id][idp].cena;
                            pd2.appendChild(pd3);
                            podelem.appendChild(pd2);

                            /*pd2 = document.createElement("p");
                            pd2.innerHTML = "Adresa: <b>";
                            pd3 = document.createElement("b");
                            pd3.innerText = sve[id][idp].adresa;
                            pd2.appendChild(pd3);
                            podelem.appendChild(pd2);*/
                            
                            pd2 = document.createElement("a");
                            pd2.innerText = "Vise o festivalu";
                            
                            putanja = "festival.html?id=" + id + "&idf=" + idp;
                            pd2.setAttribute("href", putanja);

                            podelem.appendChild(pd2);
                            
                            cards.appendChild(podelem);
                        }
                    }
                }

            } else {
                alert('Greska pri ucitavanju festivala')
            }
        }
    }
    request.open('GET', firebaseUrl + '/festivali.json');
    request.send();
};

function nabaviIdOrganizatora(){
    let url = window.location.href;
    let index = url.indexOf("?");
    let id = url.substring(index+4);
    return id;
}

function napraviStranicu(){ //pravi i pocetan deo za organizatora
    let idOrganizatora = nabaviIdOrganizatora();
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let sve = JSON.parse(request.responseText);

                let naslov = document.createElement('h1');
                let main = document.getElementsByClassName('main')[0];
                let main2 = document.getElementsByClassName('searchBar')[0];

                naslov.innerHTML = sve[idOrganizatora].naziv;
                main.insertBefore(naslov, main2);
                
                let main1 = document.createElement('div');
                main1.className = "main1";

                let podelem = document.createElement('img');
                podelem.alt = "Organizator";
                podelem.src = sve[idOrganizatora].logo;
                podelem.style = "max-width: 60%;";
                main1.appendChild(podelem); //stavljam sliku
                
                podelem = document.createElement('img');
                podelem.alt = "Slika u pozadini";
                podelem.src = sve[idOrganizatora].logo;
                podelem.id = "pozadina";
                
                main1.appendChild(podelem); //stavljam sliku pozadine
                
                podelem = document.createElement('div');
                podelem.className = "right-content";
                let podelem2 = document.createElement('div');
                podelem2.className = "welcome-text";
                let podelem3 = document.createElement('h4');
                podelem3.innerHTML = "Podaci o nama";
                podelem2.appendChild(podelem3); //stavljam naslov
                podelem.appendChild(podelem2);
                podelem2 = document.createElement('p');
                podelem2.innerHTML = "Dobro dosli na nasu stranicu. Mi smo " + sve[idOrganizatora].naziv + ", osnovani smo " + sve[idOrganizatora].godinaOsnivanja
                 + " godine.<br>";
                podelem2.innerHTML += "Adresa gde nas mozete naci je " + sve[idOrganizatora].adresa + "<br>";
                podelem2.innerHTML += "A ako zelite da nas kontaktirate mozete preko telefona: <b>" + sve[idOrganizatora].kontaktTelefon 
                + "</b>, ili preko emaila: <b>" + sve[idOrganizatora].email + "</b>.";
                
                podelem.appendChild(podelem2);
                main1.appendChild(podelem); //stavljam ceo donji div
                document.getElementsByClassName('main')[0].appendChild(main1);
                
                main.insertBefore(main1, main2);
                idFestivala = sve[idOrganizatora].festivali;
                napraviKartice();
            } else {
                alert('Greska pri ucitavanju organizatora.')
                window.location.href = "pages/error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
}
napraviStranicu();

let niz_vrednosti1 = [];
function pretrazi1(){
    let input = document.getElementById("i1");
    let filter = input.value.toUpperCase();
    let cards = document.getElementsByClassName("card-festival");
    if(niz_vrednosti1.length == 0){
        for(let i = 0; i < cards.length; i++){
            niz_vrednosti1.push(cards[i].getElementsByTagName("h3")[0].innerText);
        }
    }

    if(input.value == ""){
        for(let i = 0; i < cards.length; i++){
            cards[i].style.display = "block";
            cards[i].getElementsByTagName("h3")[0].innerHTML = niz_vrednosti1[i];
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

let niz_vrednosti3 = [];
function pretrazi3(){
    let input = document.getElementById("i3");
    let filter = input.value.toUpperCase();
    let cards = document.getElementsByClassName("card-festival");
    if(niz_vrednosti3.length == 0){
        for(let i = 0; i < cards.length; i++){
            niz_vrednosti3.push(cards[i].getElementsByTagName("b")[1].innerText);
        }
    }

    if(input.value == ""){
        for(let i = 0; i < cards.length; i++){
            cards[i].style.display = "block";
            cards[i].getElementsByTagName("b")[1].innerHTML = niz_vrednosti3[i];
        }
        return;
    }

    for(let i = 0; i < cards.length; i++){
        var bold = cards[i].getElementsByTagName("b")[1];
        var txtValue = bold.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            cards[i].style.display = "block";
            var index = txtValue.toUpperCase().indexOf(filter);
            var txtValue1 = txtValue.substring(0, index);
            var txtValue2 = txtValue.substring(index, index + filter.length);
            var txtValue3 = txtValue.substring(index + filter.length);
            cards[i].getElementsByTagName("b")[1].innerHTML = txtValue1 + "<span class='highlight2'>" + txtValue2 + "</span>" + txtValue3;
        }
        else{
            cards[i].style.display = "none";
        }
    }
}