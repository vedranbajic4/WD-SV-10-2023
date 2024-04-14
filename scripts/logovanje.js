//ovo je za logovanje
document.getElementById("zavrsiBTNLog").addEventListener('click', function(){
   document.getElementById('login').style.display = 'none';
});
document.getElementById("UlogujteSe").addEventListener('click', function(){
   document.getElementById('login').style.display = 'block';
   document.getElementById('registracija').style.display = 'none';
});
//ovo je za registraciju
document.getElementById("zavrsiBTNReg").addEventListener('click', function(){
   document.getElementById('registracija').style.display = 'none';
});
document.getElementById("RegistrujteSe").addEventListener('click', function(){
   document.getElementById('registracija').style.display = 'block';
   document.getElementById('login').style.display = 'none';
});