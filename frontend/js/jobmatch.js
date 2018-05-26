function populateRes(){
    var str = document.getElementById("inputsection").value;
    var sr = str.split(" ");
    console.log('check0')
    var file = new File(sr, "hi.txt", {type: "text/plain"});
}