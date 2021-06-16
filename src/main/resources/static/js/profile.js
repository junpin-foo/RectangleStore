window.addEventListener("load", function(){
    
    let colour = document.getElementById("colourIn").innerHTML;
    document.getElementById("colouredProfile").style.backgroundColor = colour;
    console.log(colour);
    
    let w = document.getElementById("widthIn").innerHTML;
    document.getElementById("colouredProfile").style.width = w + "cm"; 
    console.log(w);
    
    
    let h = document.getElementById("heightIn").innerHTML;
    document.getElementById("colouredProfile").style.height = h + "cm";
    console.log(h);

    let n = document.getElementById("nameIn").innerHTML;
    console.log(n);
    if(n){
        document.getElementById("nameOut").textContent = "" + n;
    }
    /*
    var content = document.querySelector(".nameOut")
    content.textContent = "" + n;
    */

    let m = document.getElementById("messageIn").innerHTML;
    console.log(m);
    if(m){
        document.getElementById("messageOut").textContent = "\"" + m + "\"";
    }
    
    /*
    var content = document.querySelector(".messageOut")
    content.textContent = "\"" + m + "\"";
    */

});