
function randomStart(){
    document.getElementById("p").value = getRandomInt(1,1000000000);
    document.getElementById("q").value = getRandomInt(1,1000000000);
}
function getRandomInt(min,max) { /* getting a random between given max and min values */
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random()*(max-min))+min;
}

function getGCD(a,b) { /* getting the greatest common divisor */
    var tmp;
    while (b !== 0) {
        tmp = b;
        b = a%b;
        a = tmp;
    }
    return a;
}

function getKeys(){
    let p = document.getElementById("p").value;
    let q = document.getElementById("q").value;
    let x = (p-1)*(q-1);
    let i = 2;
    let e = -1;
    while(i!=1){
        e = getRandomInt(1,1000000000);
        i = getGCD(e,x);
    }
    if(e!=-1){
        let d = euclidAdvanced(e,x)[0];
        let n = p*q;
        document.getElementById("publicKey").value = d+",\n"+n;
        document.getElementById("privateKey").value = e+",\n"+n;
    }

    function euclidAdvanced(a,b){
        if (b == 0) {
            return [1, 0, a];
        }

        temp = euclidAdvanced(b, a % b);
        x = temp[0];
        y = temp[1];
        d = temp[2];
        return [y, x-y*Math.floor(a/b), d];
    }
}

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

function getKeysFromFile()
{

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            document.getElementById("downloadedPubKey").value  = response.publicKey;
            document.getElementById("downloadedPrivKey").value = response.privateKey;
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
            console.log(response);
            let text = response.fileContent;
            let publicKey = document.getElementById("downloadedPubKey").value;

            console.log(text);
            console.log(publicKey);
            let encryptedText = encrypt(text, publicKey);


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
            let encryptedText = response.fileContent;
            let privateKey = document.getElementById("downloadedPrivKey").value;

            console.log(encryptedText);
            console.log(privateKey);

            let decryptedText = decrypt(encryptedText, privateKey);

            document.getElementById("decryptedTextFromFileTextEnc").value = decryptedText;

            saveFile('text.dec', decryptedText);
        }
    };
    xhttp.open("GET", 'fileService.php?action=getFileContent&fileName=text.enc', true);
    xhttp.send();
}

function encrypt(textFileContent, publicKey){
    //TODO

    return 'zaszyfrowanyText';
}

function decrypt(encryptedText, privateKey){
    //TODO

    return 'odszyfrowanyText';
}
