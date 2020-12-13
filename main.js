
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
            let text = response.fileContent;
            let publicKey = document.getElementById("downloadedPubKey").value;

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

            let decryptedText = decrypt(encryptedText, privateKey);

            document.getElementById("decryptedTextFromFileTextEnc").value = decryptedText;

            saveFile('text.dec', decryptedText);
        }
    };
    xhttp.open("GET", 'fileService.php?action=getFileContent&fileName=text.enc', true);
    xhttp.send();
}

function decrypt(txt,key){
    let result = [];
    let message = txt.split(",");
    let keyPair = key.split(",");
    let decodedArray = [];
    let separatedArray = [];
    message.forEach(m => {
        decodedArray.push(normalizeAscii(getPower(parseInt(m,10),parseInt(keyPair[0], 10),parseInt(keyPair[1],10))));
    });
    console.log("ascii decoded "+decodedArray)
    decodedArray.forEach(el => {
        separatedArray.push(el.substring(0, 3));
        separatedArray.push(el.substring(3));
    });
    if(separatedArray[separatedArray.length -1]==="000"){
        separatedArray.pop();
    }
    separatedArray.forEach(s => {
        result.push(String.fromCharCode(parseInt(s,10)));
    });
    return result.join("");
}

function converAscii(a) {
    if (a < 100) {
        return "0" + a;
    }
    return a + "";
}

function getPower(a,b,p) {
    if (b == 1)
     return a%p;
    else {
     x = getPower(a,Math.floor(b/2),p);
     if (b%2 == 0)
      return (x*x)%p;
     else
     {
         return (((x*x)%p)*a)%p;
     }
    }
}

function normalizeAscii(c) {
    if (c.length == 5) {
        c = "0" + c;
    }
    return c+"";
}
function encrypt(txt,key) {
    let result = [];
    let keyPair = key.split(",");
    let charArray = txt.split("");
    let asciiArray = [];
    charArray.forEach(char => {
        asciiArray.push(converAscii(char.charCodeAt(0)));
    });
    console.log("ascii "+ asciiArray)
    if (txt.length % 2 != 0) {
        asciiArray.push("000");
    }
    for (let i = 0; i < asciiArray.length; i += 2) {
       let merged = asciiArray[i] + asciiArray[i + 1];
       console.log(parseInt(merged,10)+" "+ parseInt(keyPair[0], 10)+" "+ parseInt(keyPair[1],10));
       result.push(getPower(parseInt(merged,10), parseInt(keyPair[0], 10), parseInt(keyPair[1],10)));
    }
    console.log("crypt "+result.join(","))
    return result.join(",");
}