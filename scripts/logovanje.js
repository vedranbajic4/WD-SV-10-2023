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
function popuni_poruku(i, str){
   document.getElementsByClassName("porukica")[i].style.display = "block";
   document.getElementsByClassName("porukica")[i].innerText = str;
}
function jelTelefon(str){
   for (let i = 0; i < str.length; i++){
       if (str[i] < '0' || str[i] > '9'){
           return false;
       }
   }
   return true;
}
korImena = [];
document.getElementsByTagName("form")[0].addEventListener("submit", function(e){ //REGISTRACIJA
   e.preventDefault();
   let inputs = document.getElementsByTagName("input");
   for(ime in korImena){
      if (korImena[ime] == inputs[0].value && inputs[0].value != ""){
         popuni_poruku(0, "Postojeci username");
         return;
      }
   }
   for (let i = 0; i < 9; i++){
       if (inputs[i].value == ""){
         popuni_poruku(i, "Polje ne sme biti prazno");
         return;
       }
   }
   if (jelTelefon(inputs[7].value) == false){
      popuni_poruku(7, "Neispravan broj telefona");
      return;
   }

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
function toggleMenu(){
   var navLinks = document.getElementsByClassName('nav-links')[0];
   navLinks.classList.toggle('active');
}
window.addEventListener('resize', function() {
   if (window.innerWidth > 800) {
      document.getElementsByClassName('nav-links')[0].classList.remove('active');
   }
});
document.addEventListener('click', function(event) {
   if (event.target.tagName.toLowerCase() === 'input') {
       for(var i = 0; i < 9; i++){
           document.getElementsByClassName("porukica")[i].style.display = "none";
       }
   }
});
window.addEventListener('load', function(){
   var request = new XMLHttpRequest();
   request.onreadystatechange = function () {
      if (this.readyState == 4) {
         if (this.status == 200) {
            sve = JSON.parse(request.responseText);
            for(kor in sve){
               korImena.push(sve[kor].korisnickoIme);
            }
            return false;
         }
      }
   }
   request.open('GET', firebaseUrl + '/korisnici.json');
   request.send();
});