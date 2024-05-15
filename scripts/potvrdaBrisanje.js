var organizatorId;
var festivalId;
function brisanje(){
    organizatorId = this.getAttribute("data-id");
    document.getElementById("deleteConfirmation").style.display = "block";
}
function brisanjeF(){
  organizatorId = this.getAttribute("data-idO");
  festivalId = this.getAttribute("data-idF");
  document.getElementById("deleteConfirmation").style.display = "block";
}
function kliknoDugme2() {
    document.getElementById("deleteConfirmation").style.display = "none";
}
function kliknoDugme1() {
    document.getElementById("deleteConfirmation").style.display = "none";
    document.getElementById("deleted").style.display = "block";
}
function obrisiOrganizatora(){
    document.getElementById("deleted").style.display = "none";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            location.reload();
          } else {
            alert("Greška prilikom brisanja organizatora.");
          }
        }
      };
    request.open("DELETE", firebaseUrl + "/organizatoriFestivala/" + organizatorId + ".json");
    request.send();
}
function obrisiFestival(){
  document.getElementById("deleted").style.display = "none";
 
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          location.reload();
        } else {
          alert("Greška prilikom brisanja festivala.");
        }
      }
    };
  request.open("DELETE", firebaseUrl + "/festivali/" + organizatorId + "/" + festivalId + ".json");
  request.send();
}
