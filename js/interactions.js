function hideDiv() {
    var x = document.getElementById("hideResults");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {onOpenStart:null});
});

/*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {exitDelay:5000},{enterDelay:5000});
});*/

/*function checkIfFilled(){

   var varAnnuel = document.getElementById("volume_rdv_annuel").selectedIndex;
    var varJeune = document.getElementById("jeune").selectedIndex;
        var varAgee = document.getElementById("agee").selectedIndex;

        if(varAnnuel==0 || varJeune=="Sélectionner" || varJeune=="Sélectionner"){
            alert("Un ou plusieurs champs sont invalide(s)");
        }else if(varAnnuel!=0 || varJeune!="Sélectionner" || varJeune!="Sélectionner"){
            autoFillPreselected();
            calculer();
            calculerTotaux();
        }
}*/

/*
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
