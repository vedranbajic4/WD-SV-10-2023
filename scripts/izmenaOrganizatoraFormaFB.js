var firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
var mojIdOrganizatora = getParamValue("id");
var mojIdFestivala;
function ucitajOrganizatora(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);
                mojIdOrganizatora = getParamValue("id");
                let inputs = document.getElementsByTagName("input");

                inputs[0].value = sve[mojIdOrganizatora].naziv;
                inputs[1].value = sve[mojIdOrganizatora].adresa;
                inputs[2].value = sve[mojIdOrganizatora].godinaOsnivanja;
                inputs[3].value = sve[mojIdOrganizatora].logo;
                inputs[4].value = sve[mojIdOrganizatora].kontaktTelefon;
                inputs[5].value = sve[mojIdOrganizatora].email;
                mojIdFestivala = sve[mojIdOrganizatora].festivali;
                document.getElementsByTagName("h2")[0].setAttribute("idFestivala", sve[mojIdOrganizatora].festivali);
                document.getElementsByTagName("img")[0].src = sve[mojIdOrganizatora].logo; //stavljanje slike u img tag
            } else {
                alert('Greska pri ucitavanju forme za izmenu festivala')
                window.location.href = "pages/error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
}
function ucitajFestivale(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                sve = JSON.parse(request.responseText);

                let sviFestivali = sve[mojIdFestivala];
                
                let velikiDiv = document.getElementById("festivali");
                
                for(let fest in sviFestivali){
                    let podelem = document.createElement("div");
                    podelem.classList.add("card-festival");
                    let pd2 = document.createElement("h4");
                    pd2.innerText = sviFestivali[fest].naziv;
                    podelem.appendChild(pd2);
                    pd2 = document.createElement("img");
                    pd2.src = sviFestivali[fest].slike[0];
                    pd2.alt = "Logo festivala";
                    podelem.appendChild(pd2);
                    pd2 = document.createElement("button");
                    pd2.innerText = "Obrisi";
                    pd2.setAttribute("data-idF", fest);
                    pd2.setAttribute("data-idO", mojIdFestivala);
                    pd2.onclick = brisanjeF;
                    pd2.classList.add("btn");
                    
                    podelem.appendChild(pd2);

                    velikiDiv.appendChild(podelem);
                }
            } else {
                alert('Greska pri ucitavanju forme za izmenu festivala')
                window.location.href = "pages/error.html";
            }
        }
    }
    request.open('GET', firebaseUrl + '/festivali.json');
    request.send();
}
document.getElementsByTagName("form")[0].addEventListener("submit", function(e){
    let inputs = document.getElementsByTagName("input");
    let organizator = {
      "adresa": inputs[1].value,
      "email": inputs[5].value,
      "festivali": document.getElementsByTagName("h2")[0].getAttribute("idFestivala"),
      "godinaOsnivanja": inputs[2].value,
      "kontaktTelefon": inputs[4].value,
      "logo": inputs[3].value,
      "naziv": inputs[0].value
    }

    var request = new XMLHttpRequest();
    request.open('PUT', firebaseUrl + '/organizatoriFestivala/' + getParamValue("id") + '.json', true);
    request.send(JSON.stringify(organizator));
    
    e.preventDefault();
    document.getElementById("edited").style.display="block";
    //ucitajOrganizatora();
    ucitajFestivale();
});
ucitajFestivale();
ucitajOrganizatora();
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
function closeOk(){
    document.getElementById("edited").style.display="none";
}
