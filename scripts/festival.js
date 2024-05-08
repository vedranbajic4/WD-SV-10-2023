var firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
var maxSlika = 4;
var nizSlika = [];
var idSlike = 0;

window.addEventListener('load', function (e) {
    let mojIdFestivala = getParamValue("idf");
    let mojIdOrganizatora = getParamValue("id");

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                for(let idOrganizatora in sve){
                    if(idOrganizatora == mojIdOrganizatora){
                        for(let idFestivala in sve[idOrganizatora]){
                            if(idFestivala == mojIdFestivala){
                                let festival = sve[idOrganizatora][idFestivala];
                                document.getElementById("tip").innerText = festival.tip;
                                document.getElementById("cena").innerText = festival.cena;
                                document.getElementById("maxOsoba").innerText = festival.maxOsoba;
                                document.getElementById("prevoz").innerText = festival.prevoz;
                                document.getElementById("naziv").innerText = festival.naziv;
                                document.getElementById("opis").innerText = festival.opis;
                                for(slika in festival.slike){
                                    nizSlika.push(festival.slike[slika]);
                                    console.log(festival.slike[slika]);
                                }
                                document.getElementById("slikaUGaleriji").src = nizSlika[0];
                                document.getElementById("slikaUGaleriji").style.opacity = 1;
                            }
                        }
                    }
                }
            } else {
                alert('Greska pri ucitavanju festivala.')
                window.location.href = "pages/error.html";
            }
        }
    }

    request.open('GET', firebaseUrl + '/festivali.json');
    request.send();
    
});

function getParamValue(name) {
    var location = decodeURI(window.location.toString());
    var index = location.indexOf("?") + 1;
    var subs = location.substring(index, location.length);
    var splitted = subs.split("&");

    for (i = 0; i < splitted.length; i++) {
        var s = splitted[i].split("=");
        var pName = s[0];
        var pValue = s[1];
        if (pName == name) {
            return pValue;
        }
    }
}

document.getElementById("pret").addEventListener("click", function () {
    idSlike--;
    if (idSlike < 0) {
        idSlike = nizSlika.length - 1;
    }
    promeniSliku();
});
document.getElementById("sled").addEventListener("click", function () {
    idSlike++;
    if (idSlike >= nizSlika.length) {
        idSlike = 0;
    }
    promeniSliku();
});
function promeniSliku() {
    document.getElementById("slikaUGaleriji").src = nizSlika[idSlike];
}