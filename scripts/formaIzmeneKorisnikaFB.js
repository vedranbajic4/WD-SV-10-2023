let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";

function ucitajKorisnika(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                mojKorisnik = getParamValue("idk");
                let inputs = document.getElementsByTagName("input");

                inputs[0].value = sve[mojKorisnik].korisnickoIme;
                inputs[1].value = sve[mojKorisnik].lozinka;
                inputs[2].value = sve[mojKorisnik].ime;
                inputs[3].value = sve[mojKorisnik].prezime;
                inputs[4].value = sve[mojKorisnik].email;
                inputs[5].value = sve[mojKorisnik].datumRodjenja;
                inputs[6].value = sve[mojKorisnik].adresa;
                inputs[7].value = sve[mojKorisnik].telefon;
                inputs[8].value = sve[mojKorisnik].zanimanje;
            } else {
                alert('Greska pri ucitavanju forme za izmenu korisnika')
                window.location.href = "pages/error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
}

document.getElementsByTagName("form")[0].addEventListener("submit", function(e){
    let inputs = document.getElementsByTagName("input");
    let korisnik = {
        "korisnickoIme": inputs[0].value,
        "lozinka": inputs[1].value,
        "ime": inputs[2].value,
        "prezime": inputs[3].value,
        "email": inputs[4].value,
        "datumRodjenja": inputs[5].value,
        "adresa": inputs[6].value,
        "telefon": inputs[7].value,
        "zanimanje": inputs[8].value
    }

    var request = new XMLHttpRequest();
    request.open('PUT', firebaseUrl + '/korisnici/' + getParamValue("idk") + '.json', true);
    request.send(JSON.stringify(korisnik));
    
    e.preventDefault();
    document.getElementById("potvrda").style.display="block";
    ucitajKorisnika();
});
function closeOk(){
    document.getElementById("potvrda").style.display="none";
    window.location.reload();
}
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
ucitajKorisnika();