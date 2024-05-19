//let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";
let ulogovanUsername = "";
document.getElementById("zavrsiBTNLog").addEventListener('click', function(){
   document.getElementById('login').style.display = 'none';
});
document.getElementById("zavrsiBTNReg").addEventListener('click', function(){
   document.getElementById('registracija').style.display = 'none';
});
document.getElementById("UlogujteSe").addEventListener('click', function(){
   document.getElementById('login').style.display = 'block';
   document.getElementById('registracija').style.display = 'none';
});
document.getElementById("RegistrujteSe").addEventListener('click', function(){
   document.getElementById('registracija').style.display = 'block';
   document.getElementById('login').style.display = 'none';
});
document.getElementById("logOut").addEventListener('click', function(){
   document.getElementById('registrujteSe').style.display = 'block';
   document.getElementById('ulogujteSe').style.display = 'block';
   document.getElementById('liDugme').style.display = 'none';
   document.getElementById('liKorisnik').style.display = 'none';
   ulogovanUsername = "";
});
function randomString(){
   let ret = "-";
   for (let i = 0; i < 20; i++){
       ret += String.fromCharCode(65 + Math.floor(Math.random() * 26));
   }
   return ret;
}
document.getElementsByTagName("form")[0].addEventListener("submit", function(e){ //REGISTRACIJA
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
   request.open('PUT', firebaseUrl + '/korisnici/' + randomString() + '.json', true);
   request.send(JSON.stringify(korisnik));
   document.getElementById('registracija').style.display = 'none';
   document.getElementById("potvrda").style.display = "block";
   ulogovanUsername = korisnik.korisnickoIme;
   e.preventDefault();
});
document.getElementsByTagName("form")[1].addEventListener("submit", function(e){ //LOGOVANJE
   e.preventDefault();
   var form = e.target;
   let korIme = form.elements['korisnickoIme'].value;
   let lozinka = form.elements['lozinka'].value;
   
   var request = new XMLHttpRequest();
   request.onreadystatechange = function () {
      if (this.readyState == 4) {
         if (this.status == 200) {
            sve = JSON.parse(request.responseText);
            for(kor in sve){
               if (sve[kor].korisnickoIme == korIme && sve[kor].lozinka == lozinka){
                  ulogovanUsername = sve[kor].korisnickoIme;
                  document.getElementById('login').style.display = 'none';
                  prebaciNaKorisnika();
                  break;
               }
            }
            if(ulogovanUsername == ""){
               alert('Ne postoji korisnik sa unetim podacima');
               form.elements['korisnickoIme'].value = "";
               form.elements['lozinka'].value = "";
            }
         }
         else {
            alert('Greska pri ucitavanju korisnika')
            window.location.href = "pages/error.html";
         }
      }
   }
   request.open('GET', firebaseUrl + '/korisnici.json');
   request.send();
});
function closeOk(){
   document.getElementById("potvrda").style.display="none";
   prebaciNaKorisnika();
}
function prebaciNaKorisnika(){
   document.getElementById('registrujteSe').style.display = 'none';
   document.getElementById('ulogujteSe').style.display = 'none';

   document.getElementById('liDugme').style.display = 'block';
   document.getElementById('liKorisnik').style.display = 'block';

   document.getElementById('korisnikIme').innerText = ulogovanUsername;
}