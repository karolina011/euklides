function saveKeys()
{
    let publicKey = document.getElementById("publicKey").value;
    let privateKey = document.getElementById("privateKey").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "fileService.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=saveKeys&privateKey=" + privateKey + "&publicKey=" + publicKey);

}
