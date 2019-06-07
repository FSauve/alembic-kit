var POURCENTAGE_JEUNE = 0.90;
var POURCENTAGE_AGEE = 0.70;
var CONSTANTE_DEUXIEME_RAPPEL = 0.35;
var CONSTANTE_ANNULATION = 0.05;
// var CONSTANTE_MOYENNE_COUT_RDV = 0.40;

var reservationTauxMoyen;
var premierRappelPourcentage;
var deuxiemeRappelPourcentage;
var relancePourcentage;

var nombreRDVAnnuel;
var profilJeune;
var profilAgee;
var tauxHoraire;

var nbsReservationVolume;
var nbsPremierRappelVolume;
var nbsDeuxiemeRappelVolume;
var nbsRelanceVolume;

var nbsReservationTemps;
var nbsPremierRappelTemps;
var nbsDeuxiemeRappelTemps;
var nbsRelanceVolumeTemps;

var total_heures_recuperees;
var frais_technologiques;
var totalUtilisation;
var gain_efficience;

var appointmentPrice;

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////ACTIONS GROUPÉES////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function autoFillPreselected() {
    fillVolumeRDV();
    fillProfilJeune();
    fillProfilAgee();
    fillTauxHoraire();
}

function calculer() {

    calculPremierRappel();
    calculDeuxiemeRappel();
    calculRelance();

    calculReservationVolume();
    calculPremierRappelVolume();
    calculDeuxiemeRappelVolume();
    calculRelancelVolume();

    calculReservationTemps();
    calculPremierRappelTemps();
    calculDeuxiemeRappelTemps();
    calculRelanceTemps();
}

function calculerTotaux() {
    calculTotalHeures();
    calculFraisUtilisation();
    calculGain();
    calculROI();
}

/////////////////////////////////////FIN///////////////////////////////////////////
///////////////////////////////ACTIONS GROUPÉES////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////
///////////////////INITIALISATION DES VARIABLES PRÉSELECTIONNÉES///////////////////
///////////////////////////////////////////////////////////////////////////////////
function fillVolumeRDV() {
    var e = document.getElementById("volume_rdv_annuel");
    nombreRDVAnnuel = e.options[e.selectedIndex].value;
    console.log("Volume de rendez-vous :    " + nombreRDVAnnuel);
    selecteurDeBanqueRDV();
}
function fillProfilJeune(){

    var e = document.getElementById("jeune");
    var j = e.options[e.selectedIndex].value;

    var e = document.getElementById("agee");
    var v = e.options[e.selectedIndex].value ;

    profilJeune = j;

    reservationTauxMoyen = j * POURCENTAGE_JEUNE+ v *POURCENTAGE_AGEE;

    console.log("taux jeune :   " + profilJeune);

    totalCentJeune();
}
function fillProfilAgee(){

    var e = document.getElementById("jeune");
    var j = e.options[e.selectedIndex].value;

    var e = document.getElementById("agee");
    var v = e.options[e.selectedIndex].value ;

    profilAgee = v;
    reservationTauxMoyen = j * POURCENTAGE_JEUNE+ v *POURCENTAGE_AGEE;

    console.log("taux agee :    " + profilAgee);
    totalCentAgee();


}

function totalCentJeune() {
        var selectedIndex = document.getElementById("jeune").selectedIndex;
        console.log("Index jeune = " + selectedIndex);

        switch (selectedIndex) {
            case 8:
                document.getElementById("agee").selectedIndex = "0";
                break;
            case 7:
                document.getElementById("agee").selectedIndex = "1";
                break;
            case 6:
                document.getElementById("agee").selectedIndex = "2";
                break;
            case 5:
                document.getElementById("agee").selectedIndex = "3";
                break;
            case 4:
                document.getElementById("agee").selectedIndex = "4";
                break;
            case 3:
                document.getElementById("agee").selectedIndex = "5";
                break;
            case 2:
                document.getElementById("agee").selectedIndex = "6";
                break;
            case 1:
                document.getElementById("agee").selectedIndex = "7";
                break;
            case 0:
                document.getElementById("agee").selectedIndex = "8";
                break;
            default:
        }
}

function totalCentAgee() {
    var selectedIndex = document.getElementById("agee").selectedIndex;
    console.log("Index agée = " + selectedIndex)

    switch (selectedIndex) {
        case 8:
            document.getElementById("jeune").selectedIndex = "0";
            break;
        case 7:
            document.getElementById("jeune").selectedIndex = "1";
            break;
        case 6:
            document.getElementById("jeune").selectedIndex = "2";
            break;
        case 5:
            document.getElementById("jeune").selectedIndex = "3";
            break;
        case 4:
            document.getElementById("jeune").selectedIndex = "4";
            break;
        case 3:
            document.getElementById("jeune").selectedIndex = "5";
            break;
        case 2:
            document.getElementById("jeune").selectedIndex = "6";
            break;
        case 1:
            document.getElementById("jeune").selectedIndex = "7";
            break;
        case 0:
            document.getElementById("jeune").selectedIndex = "8";
            break;
        default:
    }
}

//////////////////////////////////////FIN//////////////////////////////////////////
///////////////////INITIALISATION DES VARIABLES PRÉSELECTIONNÉES///////////////////
///////////////////////////////////////////////////////////////////////////////////

function fillTauxHoraire() {

    tauxHoraire = document.getElementById("taux_horaire").value;
    console.log("taux horaire :    " + tauxHoraire);
    console.log("tauxMoyen :    " + reservationTauxMoyen);

}

function calculPremierRappel(){
    var x = 1-reservationTauxMoyen;
    premierRappelPourcentage = x * 0.35 + reservationTauxMoyen;
    console.log("% Premier rappel"+premierRappelPourcentage);
    //  return premierRappelPourcentage;
}

function calculDeuxiemeRappel(){
    deuxiemeRappelPourcentage = premierRappelPourcentage * CONSTANTE_DEUXIEME_RAPPEL;
    console.log("% Deuxieme rappel"+deuxiemeRappelPourcentage);

    // return deuxiemeRappelPourcentage;
}

function calculRelance(){

    relancePourcentage = reservationTauxMoyen * CONSTANTE_ANNULATION;

   // relancePourcentage = premierRappelPourcentage * CONSTANTE_ANNULATION;
    console.log("% Relance" + relancePourcentage);

    // return relancePourcentage;
}

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////CALCULS GAINS ET DÉPENSES (TOTAUX)////////////////////////
///////////////////////////////////////////////////////////////////////////////////
function calculTotalHeures() {

    total_heures_recuperees = nbsReservationTemps+nbsPremierRappelTemps+nbsDeuxiemeRappelTemps+nbsRelanceVolumeTemps;
    total_heures_recuperees = Math.round(total_heures_recuperees);
    //var xformated = numeral(x).format('0,0');
    console.log("Total heures récupérées = "+ total_heures_recuperees);
    document.getElementById("heures_recuperees").innerHTML = ""+total_heures_recuperees+" heures";

}

function calculFraisUtilisation() {
    var x = nombreRDVAnnuel*appointmentPrice;
    //x =Math.round(x);
    //var xformated = numeral(x).format('0,0');
    frais_technologiques = x;
    console.log("Frais technologiques = " + frais_technologiques);
    document.getElementById("frais_technologiques").innerHTML =""+frais_technologiques+" $";

}

function calculGain() {

    var x = (tauxHoraire*total_heures_recuperees)-frais_technologiques;
    gain_efficience =x;
   // document.getElementById("gain_efficience").innerHTML =""+x;
    //var xformated = numeral(gain_efficience).format('0,0');
    document.getElementById("gain_efficience").innerHTML =""+gain_efficience+" $";
}

function calculROI(){
    var x = (gain_efficience-frais_technologiques)/frais_technologiques;
    ROI = Math.round(x);
    document.getElementById("roi").innerHTML =""+ROI;
}
/*function calculEconomieAuRDV() {

    var x = gain_efficience/nombreRDVAnnuel;
    x=x.toFixed(2);
    document.getElementById("valeur_rdv_1").innerHTML =""+x+" $";

   // document.getElementById("valeur_rdv").innerHTML =""+x;

}*/
/////////////////////////////////////FIN///////////////////////////////////////////
/////////////////////////CALCULS GAINS ET DÉPENSES (TOTAUX)////////////////////////
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
////////CALCULS DES QUANTITÉS (VOLUME & TEMPS) POUR CHAQUE COMMUNICATIONS//////////
///////////////////////////////////////////////////////////////////////////////////
function calculReservationVolume(){

    nbsReservationVolume = nombreRDVAnnuel * reservationTauxMoyen;
    var x = Math.round(nbsReservationVolume);

    nbsReservationVolume =x;
    console.log("Total temps pour une réservation = "+nbsReservationVolume);

    //document.getElementById("volume_reservation").innerHTML = ""+x;

}

function calculReservationTemps(){

    var e = document.getElementById("combo_temps_reservation");
    var v = e.options[e.selectedIndex].value;
    nbsReservationTemps = v * nombreRDVAnnuel / 60;
    var x = Math.round(nbsReservationTemps);
    nbsReservationTemps =x;

    console.log("Total temps pour une réservation = "+nbsReservationTemps);


    // document.getElementById("temps_reservation").innerHTML = ""+x;

}

function calculPremierRappelVolume(){
    nbsPremierRappelVolume = nombreRDVAnnuel * premierRappelPourcentage;
    var x = Math.round(nbsPremierRappelVolume);

    nbsPremierRappelVolume = x;

    console.log("Total volume premier rappel = " + nbsPremierRappelVolume);

    //document.getElementById("volume_premier").innerHTML = ""+x;

}

function calculPremierRappelTemps(){

    var e = document.getElementById("combo_temps_premier_rappel");
    var v = e.options[e.selectedIndex].value;

    nbsPremierRappelTemps = v * nbsReservationVolume / 60;

    var x = Math.round(nbsPremierRappelTemps);
    nbsPremierRappelTemps = x;

    console.log("Total temps premier rappel = "+nbsPremierRappelTemps);
    //document.getElementById("temps_premier").innerHTML = ""+x;
}

function calculDeuxiemeRappelVolume(){
    nbsDeuxiemeRappelVolume =nombreRDVAnnuel * deuxiemeRappelPourcentage;

    var x = Math.round(nbsDeuxiemeRappelVolume);

    nbsDeuxiemeRappelVolume = x;



    console.log("Total volume deuxième rappel = "+nbsDeuxiemeRappelVolume);

    //document.getElementById("volume_deuxieme").innerText = ""+x;

}

function calculDeuxiemeRappelTemps(){

    var e = document.getElementById("combo_temps_deuxieme_rappel");
    var v = e.options[e.selectedIndex].value ;
    nbsDeuxiemeRappelTemps = v * nbsDeuxiemeRappelVolume / 60;

    var x = Math.round(nbsDeuxiemeRappelTemps);
    nbsDeuxiemeRappelTemps = x;



    console.log("Total temps deuxième rappel = "+nbsDeuxiemeRappelTemps);
    //document.getElementById("temps_deuxieme").innerHTML = ""+x;
}

function calculRelancelVolume(){
    nbsRelanceVolume = nombreRDVAnnuel* relancePourcentage;

    var x = Math.round(nbsRelanceVolume);
    nbsRelanceVolume = x;

    console.log("Total volume de la relance = " + nbsRelanceVolume);



    //document.getElementById("volume_relance").innerHTML = ""+x;

}

function calculRelanceTemps(){
    var e = document.getElementById("combo_temps_relance");
    var v = e.options[e.selectedIndex].value;
    nbsRelanceVolumeTemps = v * nbsRelanceVolume / 60;

    var x = Math.round(nbsRelanceVolumeTemps);
    nbsRelanceRappelTemps = x;



    console.log("Total temps de la relance = " + nbsRelanceRappelTemps);


    //document.getElementById("temps_relance").innerHTML = ""+x;

}
//////////////////////////////////////FIN//////////////////////////////////////////
////////CALCULS DES QUANTITÉS (VOLUME & TEMPS) POUR CHAQUE COMMUNICATIONS//////////
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
/////////////////////SWITCH : ASSOCIER VOLUME ET PRIX UNITAIRE/////////////////////
///////////////////////////////////////////////////////////////////////////////////

function selecteurDeBanqueRDV() {

    var x = nombreRDVAnnuel;
    var y = parseInt(x);
    switch (y) {
/*        case 500:
            appointmentPrice = 0.90;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 1000:
            appointmentPrice = 0.85;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 2500:
            appointmentPrice = 0.76;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;*/
        case 5000:
            appointmentPrice = 0.68;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 10000:
            appointmentPrice = 0.59;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 20000:
            appointmentPrice = 0.52;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 40000:
            appointmentPrice = 0.46;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 60000:
            appointmentPrice = 0.42;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 80000:
            appointmentPrice = 0.39;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        case 100000:
            appointmentPrice = 0.36;
            console.log("Le prix du RDV ajusté " + appointmentPrice);
            break;
        default:
            console.log("Aucun prix!!!!!!!");
    }
}
///////////////////////////////////////FIN/////////////////////////////////////////
/////////////////////SWITCH : ASSOCIER VOLUME ET PRIX UNITAIRE/////////////////////
///////////////////////////////////////////////////////////////////////////////////