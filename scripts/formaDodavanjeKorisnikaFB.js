let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
function randomString(){
    let ret = "-";
    for (let i = 0; i < 20; i++){
        ret += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return ret;
}
document.getElementsByTagName("form")[0].addEventListener("submit", function(e){
    console.log("submitanje");
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
    console.log(korisnik);
    var request = new XMLHttpRequest();
    request.open('PUT', firebaseUrl + '/korisnici/' + randomString() + '.json', true);
    request.send(JSON.stringify(korisnik));
    e.preventDefault();
    document.getElementById("potvrda").style.display = "block";
});
function closeOk(){
    document.getElementById("potvrda").style.display="none";
    window.location.reload();
}