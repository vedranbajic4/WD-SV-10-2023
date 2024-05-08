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
                alert('Error occurred. Cars could not be loaded.')
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
                let main2 = document.getElementsByClassName('main2')[0];

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
