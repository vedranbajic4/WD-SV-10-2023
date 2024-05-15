var firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
function randomString(){
    let ret = "-";
    for (let i = 0; i < 20; i++){
        ret += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return ret;
}
function posaljiFormu(idFestivala){
    let inputs = document.getElementsByTagName("input");
    let festival = {
      "cena": inputs[6].value,
      "maxOsoba": inputs[5].value,
      "naziv": inputs[0].value,
      "opis": inputs[1].value,
      "prevoz": inputs[4].value,
      "tip": inputs[3].value,
    }
    
    var nizSlika = inputs[2].value.split(' ');
    festival.slike = nizSlika;
    let noviId = randomString();

    var request = new XMLHttpRequest();
    request.open('PUT', firebaseUrl + '/festivali/' + idFestivala + '/' + noviId + '.json', true);
    request.send(JSON.stringify(festival));
};
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
document.getElementsByTagName("form")[0].addEventListener("submit", function(e){
    var request = new XMLHttpRequest();
    let idOrganizatora = getParamValue("id");
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                //console.log(sve[idOrganizatora].festivali);
                posaljiFormu(sve[idOrganizatora].festivali);
            }
            else{
                alert('Greska pri ucitavanju organizatora');
                window.location.href = "pages/error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
    e.preventDefault();
});