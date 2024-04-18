let firebaseUrl = "https://wdfestivali-default-rtdb.firebaseio.com";

var getButton = document.getElementById('getButton');
window.addEventListener('load', function (e) {
    console.log('load');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                carIds = [];
                sve = JSON.parse(request.responseText);
                velikiDiv = document.getElementsByClassName("cards");

                for(let of in sve){
                }
                // Izvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
                
            } else {
                alert('Error occurred. Cars could not be loaded.')
            }
        }
    }

    request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
    request.send();
});