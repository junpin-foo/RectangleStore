class Grade{ //grade class store data per activity

    constructor(given, total, weight){
        this.Given = given;
        this.Total = total;
        this.Weight = weight;
    }

    get getGiven(){
        return this.Given;
    }

    get getTotal(){
        return this.Total;
    }

    get getWeight(){
        return this.weight;
    }

}
class Grades{ // grades array store all activity's grade
    constructor(){
        this.gradesArr = [];
    }

    newGrade(g, t, w){
        let p = new Grade(g, t, w);
        this.gradesArr.push(p);
        return p;
    }

    get allGrades(){
        return this.gradesArr;
    }

    get numberOfGrades(){
        return this.gradesArr.length;
    }
}

var retFlag = true; //whether to return a value base on input error
var typeFlag; // which button is pressed?
var weightFlagCount = 0; //how many weight inputed?
var gradeFlagCount = 0; //how many garde inputed?

document.getElementById("MeanBut").addEventListener('click', function(event){ // look for mean button click
    typeFlag = false;
    weightFlagCount = 0;
    gradeFlagCount = 0; //RESET
    collectData();
});

document.getElementById("WeightedBut").addEventListener('click', function(event){ // look for weighted button click
    typeFlag = true;
    weightFlagCount = 0; //how many weight inputed? RESET
    gradeFlagCount = 0; //how many garde inputed? RESET
    collectData();
});

document.getElementById("IncsRowBut").addEventListener('click', addRow); // look for increase row button click
    

function checker(inputG,inputT,inputW){ // this checks whether the input is complete or not
    if(isNaN(inputG) || isNaN(inputT) || isNaN(inputW)){  //check if all inputs are numbers
        alert("enter a valid number");
        retFlag = false;
        return false;
    }
    else if(inputG  == "" && inputT == "" && !(inputW =="") && typeFlag == true){ //grade slot empty acceptable, just don't count to total
        alert("Weighted activity has no grade")
        return false;
    }
    else if(inputG  == "" && inputT == ""){ //grade slot empty acceptable, just don't count to total
        return false;
    }
    else if(inputG == "" && !(inputT =="")){  //grade format incorrect
        window.alert("Given Grade not inserted properly");
        retFlag = false;
        return false;
    }
    else if(!(inputG == "") && inputT ==""){ //grade format incorrect
        window.alert("Total Grade not inserted properly");
        retFlag = false;
        return;
    }

    if(!(inputW =="")){ //use to make sure all weights are inputed
        if(inputW == 0 && typeFlag == true){
            alert("Are you sure weight = 0?") // if weight entered is 0, redundant
        }
        weightFlagCount++;
    }
    if(inputG > inputT){ //use to make sure user knows given > total
        alert("Are you sure your grade recieved is more than total?")
    }

    gradeFlagCount++; //use to make sure all weights are inputed
    return true;
}
let All = new Grades(); // new dataset

function collectData(){ // collect data from all field
    All.gradesArr = []; //reset flag & array
    retFlag = true;

    var table = document.getElementById("Table");
    var rowCount = table.rows.length;
    for(var i = 1; i < rowCount; i++){ 
        var inputG = document.getElementById("GradeGiven" + i).value;
        var inputT = document.getElementById("GradeTotal" + i).value;
        var inputW = document.getElementById("Weight" + i).value;

        if(checker(inputG, inputT,inputW)){
            All.newGrade(inputG, inputT, inputW);
        }
    }

    if(typeFlag == false) // T/F depends what the button clicked
        calcMean(); // once complete, calculate the mean
    else if(typeFlag == true){
        if(gradeFlagCount != weightFlagCount){ // check if all # weight given = # grade given
            window.alert("Not all Weighted activities are filled in correctly");
        }
        else{
            calcWeighted();
        }
    }
}

function calcMean(){

    var totalG = 0;
    var total = All.numberOfGrades;
    
    for(var i = 0; i < total; i++){
        totalG = totalG + (All.gradesArr[i].Given/All.gradesArr[i].Total);
    }
    var ret = totalG/total;

    var element = document.querySelector(".result")
    if (element && !(isNaN(ret)) && retFlag == true){ // when all are true then return;
        ret = ret * 100;
        element.textContent = ret.toFixed(2) + "%";
    }
}

function calcWeighted(){
    var totalG = 0;
    var totalW = 0;
    var total = All.numberOfGrades;
    
    for(var i = 0; i < total; i++){
        totalG = totalG + (All.gradesArr[i].Given/All.gradesArr[i].Total)*(All.gradesArr[i].Weight);
        
        totalW = totalW + parseFloat(All.gradesArr[i].Weight);
        
    }
    var ret = totalG/totalW;

    var element = document.querySelector(".result")
    if (element && !(isNaN(ret)) && retFlag == true){ // when all are true then return;
        ret = ret * 100;
        element.textContent = ret.toFixed(2) + "%";
    }
}

function perFunc(i){
    var row = i.replace(/[A-Za-z$-]/g, "");
    var row = parseInt(row);
    var targetIdGrade = "GradeGiven" + row; 
    var targetIdTotal = "GradeTotal" + row;
    
    var grade = document.getElementById(targetIdGrade).value;
    var total = document.getElementById(targetIdTotal).value;

    if(total == ""){ //assume total is 100 when only calling with given grade
        total = 100;
    }

    var ret = (grade/total) * 100;

    var targetIdPerc = "percentage" + row;

    document.getElementById(targetIdPerc).value = ret.toFixed(2) + "%";
}

function addRow(){
    var table = document.getElementById("Table");
    
    var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
    row.id = "row" + rowCount;
    var colCount = table.rows[0].cells.length;

    var newcell	= row.insertCell(0);
    newcell.innerHTML = "Activity" + rowCount;

    var newcell	= row.insertCell(1);
    newcell.innerHTML = "A" + rowCount;

    var newcell	= row.insertCell(2); //add cols and take formating from row 1
    newcell.innerHTML = table.rows[1].cells[2].innerHTML;

    var newcell	= row.insertCell(3);
    newcell.innerHTML = table.rows[1].cells[3].innerHTML;

    var newcell	= row.insertCell(4);
    newcell.innerHTML = table.rows[1].cells[4].innerHTML;
    
    //replace all the old id with new id
    var elm = replaceElementInsideContainer("row"+rowCount, rowCount);
}

function replaceElementInsideContainer(containerID, rowCount){
    
    var elms = document.getElementById(containerID).getElementsByTagName("*"); //finds the container and changes the id names below
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === "Weight1") {
            elms[i].id = "Weight" + rowCount;
        }
        if (elms[i].id === "GradeGiven1") {
            elms[i].id = "GradeGiven" + rowCount;
        }
        if (elms[i].id === "GradeTotal1") {
            elms[i].id = "GradeTotal" + rowCount;
        }
        if (elms[i].oninput === "perFunc(1)") {
            elms[i].oninput = "perFunc(" + rowCount + ")";
        }
        if (elms[i].id === "percentage1") {
            elms[i].id = "percentage" + rowCount;
        }
    }
}