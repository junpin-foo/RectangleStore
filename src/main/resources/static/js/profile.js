window.addEventListener("load", function(){
    
    let colour = document.getElementById("colourIn").innerHTML;
    document.getElementById("colouredProfile").style.backgroundColor = colour;
    console.log(colour);

    if(colour == "#000000"){
        document.getElementById("nameOut").style.color="white";
        document.getElementById("messageOut").style.color= "white";
    }
    
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

    let m = document.getElementById("messageIn").innerHTML;
    console.log(m);
    if(m){
        document.getElementById("messageOut").textContent = "\"" + m + "\"";
    }
    
});