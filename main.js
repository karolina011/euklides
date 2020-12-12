

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

function getKeys()
{

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            document.getElementById("publicKey").value  = response.publicKey;
            document.getElementById("privateKey").value = response.privateKey;
        }
    };
    xhttp.open("GET", "fileService.php?action=getKeys", true);
    xhttp.send();
}

function getFileContent(fileName) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            return response.fileContent
        }
    };
    xhttp.open("GET", 'fileService.php?action=getFileContent&' + 'fileName=' + fileName, true);
    xhttp.send();
}

function saveFile(fileName, fileContent)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "fileService.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=saveFile&fileName=" + fileName + "&fileContent=" + fileContent);
}

function encryptTextFileContent() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let response = JSON.parse(this.responseText);
            let textFileContent = response.fileContent;

            let encryptedText = encrypt(textFileContent);

            document.getElementById("encryptedTextFromFileText").value = encryptedText;

            saveFile('text.enc', encryptedText);
        }
    };
    xhttp.open("GET", 'fileService.php?action=getFileContent&fileName=text.txt', true);
    xhttp.send();
}

function decryptTextFileContent()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let response = JSON.parse(this.responseText);
            let textFileContent = response.fileContent;

            let decryptedText = decrypt(textFileContent);

            document.getElementById("decryptedTextFromFileTextEnc").value = decryptedText;

            saveFile('text.dec', decryptedText);
        }
    };
    xhttp.open("GET", 'fileService.php?action=getFileContent&fileName=text.enc', true);
    xhttp.send();
}

function encrypt(textFileContent){
    //TODO

    return 'zaszyfrowanyText';
}

function decrypt(encryptedText){
    //TODO

    return 'odszyfrowanyText';
}
