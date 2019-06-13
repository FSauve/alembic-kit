var TAUX_RESERVATION_JEUNE = 0.90;
var TAUX_RESERVATION_AGEE = 0.70;
var TAUX_ANNULATION_MODIFICATION =0.10;
var TAUX_DEUXIEME_RAPPEL = 0.35;
var TAUX_RAPPEL_ADMINISTRATIF = 0.35;
var TAUX_RELANCE = 1;

var INDICATEUR_RESERVATION;
var INDICATEUR_ANNULATION_MODIFICATION;
var INDICATEUR_RAPPEL;
var INDICATEUR_RELANCE;

var appointmentPrice;

var CONSTANTE_BANQUE_5000 = 0.53;
var CONSTANTE_BANQUE_10000 = 0.48;
var CONSTANTE_BANQUE_20000 = 0.43;
var CONSTANTE_BANQUE_30000 = 0.39;
var CONSTANTE_BANQUE_40000 = 0.37;
var CONSTANTE_BANQUE_50000 = 0.35;
var CONSTANTE_BANQUE_60000 = 0.34;
var CONSTANTE_BANQUE_70000 = 0.32;
var CONSTANTE_BANQUE_80000 = 0.31;
var CONSTANTE_BANQUE_90000 = 0.30;
var CONSTANTE_BANQUE_100000 = 0.29;

var volumeAnnuel;
var profilJeune;
var profilAgee;
var tauxHoraire;

var nbsVolumeRappels;
var nbsAnnulationModificationVolume;

var nbsReservationVolume;
var nbsPremierRappelVolume;
var nbsDeuxiemeRappelVolume;
var nbsRelanceVolume;

var nbsReservationTemps;
var nbsAnnulationModificationTemps;
var nbsPremierRappelTemps;
var nbsDeuxiemeRappelTemps;
var nbsRelanceTemps;
var nbsRappelsTemps;

var totalHeuresEnCommunicationRecuperees;
var frais_technologiques;
var valeurMonetaireGain;

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
    calculIndicateurReservation();
    calculIndicateurAnnulationEtModification();
    calculIndicateurRappel();
    calculIndicateurRelance();
    calculDesDurees();
    //calculDesVolumes();
}

function calculerTotaux() {
    calculGainTempsAdministratif();
    calculFraisUtilisation();
    calculGain();
    calculEconomieAuRDV();
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
    volumeAnnuel = e.options[e.selectedIndex].value;

    console.log("Volume [ENREGISTRÉ]= " + volumeAnnuel);
    selecteurDeBanqueRDV();
}

function fillProfilJeune(){

    totalCentJeune();

    var e = document.getElementById("jeune");
    var j = e.options[e.selectedIndex].value;

    var e = document.getElementById("agee");
    var v = e.options[e.selectedIndex].value ;

    profilJeune = j;

    INDICATEUR_RESERVATION = j * TAUX_RESERVATION_JEUNE+ v *TAUX_RESERVATION_AGEE;
    console.log("Profil jeune  [ENREGISTRÉ]= " + profilJeune);
}
function fillProfilAgee(){

    totalCentAgee();

    var e = document.getElementById("jeune");
    var j = e.options[e.selectedIndex].value;

    var e = document.getElementById("agee");
    var v = e.options[e.selectedIndex].value ;

    profilAgee = v;

    INDICATEUR_RESERVATION = j * TAUX_RESERVATION_JEUNE+ v *TAUX_RESERVATION_AGEE;
    console.log("Profil agé  [ENREGISTRÉ]= " + profilAgee);
}

function fillTauxHoraire() {
    tauxHoraire = document.getElementById("taux_horaire").value;
    console.log("taux horaire [ENREGISTRÉ]= " + tauxHoraire);
}

function totalCentJeune() {
        var selectedIndex = document.getElementById("jeune").selectedIndex;

        switch (selectedIndex) {
            case 11:
                document.getElementById("agee").selectedIndex = "1";
                break;
            case 10:
                document.getElementById("agee").selectedIndex = "2";
                break;
            case 9:
                document.getElementById("agee").selectedIndex = "3";
                break;
            case 8:
                document.getElementById("agee").selectedIndex = "4";
                break;
            case 7:
                document.getElementById("agee").selectedIndex = "5";
                break;
            case 6:
                document.getElementById("agee").selectedIndex = "6";
                break;
            case 5:
                document.getElementById("agee").selectedIndex = "7";
                break;
            case 4:
                document.getElementById("agee").selectedIndex = "8";
                break;
            case 3:
                document.getElementById("agee").selectedIndex = "9";
                break;
            case 2:
                document.getElementById("agee").selectedIndex = "10";
                break;
            case 1:
                document.getElementById("agee").selectedIndex = "11";
                break;
            case 0:
                document.getElementById("agee").selectedIndex = "0";
                break;
            default:
        }
}

function totalCentAgee() {
    var selectedIndex = document.getElementById("agee").selectedIndex;

    switch (selectedIndex) {
        case 11:
            document.getElementById("jeune").selectedIndex = "1";
            break;
        case 10:
            document.getElementById("jeune").selectedIndex = "2";
            break;
        case 9:
            document.getElementById("jeune").selectedIndex = "3";
        case 8:
            document.getElementById("jeune").selectedIndex = "4";
            break;
        case 7:
            document.getElementById("jeune").selectedIndex = "5";
            break;
        case 6:
            document.getElementById("jeune").selectedIndex = "6";
            break;
        case 5:
            document.getElementById("jeune").selectedIndex = "7";
            break;
        case 4:
            document.getElementById("jeune").selectedIndex = "8";
            break;
        case 3:
            document.getElementById("jeune").selectedIndex = "9";
            break;
        case 2:
            document.getElementById("jeune").selectedIndex = "10";
            break;
        case 1:
            document.getElementById("jeune").selectedIndex = "11";
            break;
        case 0:
            document.getElementById("jeune").selectedIndex = "0";
            break;
        default:
    }
}

//////////////////////////////////////FIN//////////////////////////////////////////
///////////////////INITIALISATION DES VARIABLES PRÉSELECTIONNÉES///////////////////
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////CALCULS DES INDICATEURS//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function calculIndicateurReservation(){
    INDICATEUR_RESERVATION = ((profilJeune*TAUX_RESERVATION_JEUNE)+(profilAgee*TAUX_RESERVATION_AGEE));
    console.log("INDICATEUR RESERVATION = "+ INDICATEUR_RESERVATION);
}

function calculIndicateurAnnulationEtModification() {
    INDICATEUR_ANNULATION_MODIFICATION = TAUX_ANNULATION_MODIFICATION*INDICATEUR_RESERVATION;
    console.log("INDICATEUR ANNULATION/MODIFICATION = "+ INDICATEUR_ANNULATION_MODIFICATION);
}

function calculIndicateurRappel(){
    INDICATEUR_RAPPEL = ((1-INDICATEUR_RESERVATION)*TAUX_RAPPEL_ADMINISTRATIF)+TAUX_DEUXIEME_RAPPEL;
    console.log("INDICATEUR RAPPEL = "+ INDICATEUR_RAPPEL);
}

function calculIndicateurRelance() {
    INDICATEUR_RELANCE = (INDICATEUR_RESERVATION*TAUX_RELANCE);
}
//////////////////////////////////////FIN//////////////////////////////////////////
//////////////////////////////CALCULS DES INDICATEURS//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////CALCULS GAINS ET DÉPENSES (TOTAUX)////////////////////////
///////////////////////////////////////////////////////////////////////////////////
function calculGainTempsAdministratif() {

    totalHeuresEnCommunicationRecuperees = nbsReservationTemps+nbsRappelsTemps+nbsAnnulationModificationTemps+nbsRelanceTemps;

    totalHeuresEnCommunicationRecuperees = Math.round(totalHeuresEnCommunicationRecuperees);
    //var xformated = numeral(x).format('0,0');
    console.log("Total heures récupérées = "+ totalHeuresEnCommunicationRecuperees);
    document.getElementById("gain_temps_administratif").innerHTML = ""+totalHeuresEnCommunicationRecuperees+" heures";
}

function calculFraisUtilisation() {
    frais_technologiques = volumeAnnuel*appointmentPrice;
    //x =Math.round(x);
    //var xformated = numeral(x).format('0,0');
    frais_technologiques = frais_technologiques.toFixed(2);
    console.log("Frais d'utilisation de la platforme = " + frais_technologiques);
    document.getElementById("frais_utilisation_plateforme").innerHTML =""+frais_technologiques+" $";
}

function calculGain() {

    valeurMonetaireGain = (tauxHoraire*totalHeuresEnCommunicationRecuperees);

   // document.getElementById("valeurMonetaireGain").innerHTML =""+x;
    //var xformated = numeral(valeurMonetaireGain).format('0,0');
    valeurMonetaireGain = valeurMonetaireGain.toFixed(2);
    document.getElementById("valeur_monetaire_gain").innerHTML =""+valeurMonetaireGain+" $";
}

function calculROI(){
    ROI = (valeurMonetaireGain-frais_technologiques)/frais_technologiques;
    //var xformated = numeral(valeurMonetaireGain).format('0,0');

   // ROI = Math.round(x);

    ROI = ROI.toFixed(2);
    document.getElementById("roi").innerHTML =""+ROI;
}
function calculEconomieAuRDV() {

    var x = (valeurMonetaireGain-frais_technologiques)/volumeAnnuel;
    //x = parseInt(x);
    x=x.toFixed(2);
    document.getElementById("gain_rdv_unitaire").innerHTML =""+x+" $";

    // document.getElementById("valeur_rdv").innerHTML =""+x;

}
/////////////////////////////////////FIN///////////////////////////////////////////
/////////////////////////CALCULS GAINS ET DÉPENSES (TOTAUX)////////////////////////
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
////////CALCULS DES QUANTITÉS (VOLUME & TEMPS) POUR CHAQUE COMMUNICATIONS//////////
///////////////////////////////////////////////////////////////////////////////////

function calculDesVolumes() {
    calculReservationVolume();
    calculRappelsVolume();
    calculRelancelVolume();
    calculAnnulationEtModificationVolume();

}

function calculDesDurees(){
    calculReservationTemps();
    calculRappelsTemps();
    calculRelanceTemps();
    calculAnnulationEtModificationTemps();
}

function calculReservationVolume(){

    nbsReservationVolume = volumeAnnuel * INDICATEUR_RESERVATION;
    nbsReservationVolume = Math.round(nbsReservationVolume);

    console.log("Volume pour une réservation = "+nbsReservationVolume);
}

function calculReservationTemps(){

    var e = document.getElementById("combo_temps_reservation");
    nbsReservationTemps = e.options[e.selectedIndex].value;

    nbsReservationTemps = ((nbsReservationTemps*volumeAnnuel)*INDICATEUR_RESERVATION)/60;
    //nbsReservationTemps = Math.round(nbsReservationTemps);

    console.log("Temps pour une réservation [ENREGISTRÉ]= "+nbsReservationTemps);
}

function calculRappelsTemps(){

    calculPremierRappelTemps();
    calculDeuxiemeRappelTemps();

    nbsRappelsTemps = nbsPremierRappelTemps+nbsDeuxiemeRappelTemps;
    console.log("Temps pour les rappels [ENREGISTRÉ]= "+nbsRappelsTemps);

}

function calculRappelsVolume(){
    calculPremierRappelVolume();
    calculDeuxiemeRappelVolume();

    nbsVolumeRappels = nbsPremierRappelVolume+nbsDeuxiemeRappelVolume;
}

function calculPremierRappelVolume(){

    nbsPremierRappelVolume = volumeAnnuel*INDICATEUR_ANNULATION_MODIFICATION;
    //nbsPremierRappelVolume = Math.round(nbsPremierRappelVolume);

    console.log("Total volume premier rappel = " + nbsPremierRappelVolume);
}


function calculPremierRappelTemps(){

    var e = document.getElementById("combo_temps_annulation_modification");
    nbsPremierRappelTemps = e.options[e.selectedIndex].value;
    nbsPremierRappelTemps = parseInt(nbsPremierRappelTemps);
    nbsPremierRappelTemps = ((nbsPremierRappelTemps*volumeAnnuel)*INDICATEUR_RAPPEL)/60;
    //nbsPremierRappelTemps = Math.round(nbsPremierRappelTemps);

    //console.log("Total temps du premier rappel [ENREGISTRÉ]= " + nbsPremierRappelTemps);
}

function calculDeuxiemeRappelVolume(){

    nbsDeuxiemeRappelVolume = volumeAnnuel * TAUX_DEUXIEME_RAPPEL;
    nbsDeuxiemeRappelVolume = Math.round(nbsDeuxiemeRappelVolume);

    console.log("Total volume deuxième rappel = "+nbsDeuxiemeRappelVolume);
}

function calculDeuxiemeRappelTemps(){

    var e = document.getElementById("combo_temps_rappel_telephonique");
    nbsDeuxiemeRappelTemps = e.options[e.selectedIndex].value ;
    nbsPremierRappelTemps = parseInt(nbsPremierRappelTemps);
    nbsDeuxiemeRappelTemps = ((nbsDeuxiemeRappelTemps*volumeAnnuel)*INDICATEUR_RAPPEL)/60;
    //nbsDeuxiemeRappelTemps = Math.round(nbsDeuxiemeRappelTemps);

    //console.log("Temps deuxième rappel [ENREGISTRÉ]= "+nbsDeuxiemeRappelTemps);
}

function calculRelancelVolume(){

    nbsRelanceVolume = volumeAnnuel* INDICATEUR_RELANCE;
    nbsRelanceVolume = Math.round(nbsRelanceVolume);

    console.log("Volume de la relance [ENREGISTRÉ]= " + nbsRelanceVolume);
}

function calculRelanceTemps(){
    var e = document.getElementById("combo_temps_relance");
    nbsRelanceTemps = e.options[e.selectedIndex].value;
    nbsRelanceTemps - parseInt(nbsRelanceTemps);

    nbsRelanceTemps = ((nbsRelanceTemps*volumeAnnuel)*INDICATEUR_RELANCE)/60;
    //nbsRelanceTemps = Math.round(nbsRelanceTemps);

    console.log("Temps de la relance [ENREGISTRÉ]= " + nbsRelanceTemps);
}

function calculAnnulationEtModificationVolume() {
    nbsAnnulationModificationVolume = volumeAnnuel*INDICATEUR_ANNULATION_MODIFICATION;
    console.log("Volume de l'annulation et modifications [ENREGISTRÉ]= " + nbsRelanceTemps);
}

function calculAnnulationEtModificationTemps() {
    var e = document.getElementById("combo_temps_annulation_modification");
    nbsAnnulationModificationTemps = e.options[e.selectedIndex].value;

    nbsAnnulationModificationTemps = ((volumeAnnuel*nbsAnnulationModificationTemps)*INDICATEUR_ANNULATION_MODIFICATION)/60;
    console.log("Temps de l'annulation et modifications [ENREGISTRÉ]= " + nbsAnnulationModificationTemps);

}
//////////////////////////////////////FIN//////////////////////////////////////////
////////CALCULS DES QUANTITÉS (VOLUME & TEMPS) POUR CHAQUE COMMUNICATIONS//////////
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
/////////////////////SWITCH : ASSOCIER VOLUME ET PRIX UNITAIRE/////////////////////
///////////////////////////////////////////////////////////////////////////////////

function selecteurDeBanqueRDV() {

    var rdvSwitcher = parseInt(volumeAnnuel);

switch (rdvSwitcher) {
        case 5000:
            appointmentPrice = CONSTANTE_BANQUE_5000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_5000);
            break;
        case 10000:
            appointmentPrice = CONSTANTE_BANQUE_10000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_10000);
            break;
        case 20000:
            appointmentPrice = CONSTANTE_BANQUE_20000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_20000);
            break;
        case 30000:
            appointmentPrice = CONSTANTE_BANQUE_30000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_30000);
            break;
        case 40000:
            appointmentPrice = CONSTANTE_BANQUE_40000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_40000);
            break;
        case 50000:
            appointmentPrice = CONSTANTE_BANQUE_50000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_50000);
            break;
        case 60000:
            appointmentPrice = CONSTANTE_BANQUE_60000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_60000);
            break;
        case 70000:
            appointmentPrice = CONSTANTE_BANQUE_70000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_70000);
            break;
        case 80000:
            appointmentPrice = CONSTANTE_BANQUE_80000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_80000);
            break;
        case 90000:
            appointmentPrice = CONSTANTE_BANQUE_90000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_90000);
            break;
        case 100000:
            appointmentPrice = CONSTANTE_BANQUE_100000;
            console.log("Le prix du RDV ajusté " + CONSTANTE_BANQUE_100000);
            break;
        default:
            console.log("Utilisateur à sélectionné CHOISIR");
    }
}
///////////////////////////////////////FIN/////////////////////////////////////////
/////////////////////SWITCH : ASSOCIER VOLUME ET PRIX UNITAIRE/////////////////////
///////////////////////////////////////////////////////////////////////////////////