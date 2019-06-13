function hideDiv() {
    var x = document.getElementById("hideResults");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function envoyerEmail2Trimoz(){
    var selectedIndex = document.getElementById("agee").selectedIndex;

    Email.send({
        SecureToken :"1b45d8f3-9bff-4a3a-abaf-48901692c70c",
        To : 'fsauve@trimoz.com',
        From : "fsauve@trimoz.com",
        Subject : "This is the subject",
        Body : "Index agée selectionné = "+selectedIndex
    }).then(
        message => alert(message)
);
}