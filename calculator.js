let display = document.querySelector('#textDisplay');
const buttons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('cls');
const back = document.getElementById('back');
const powerTwo = document.getElementById('powerTwo');
const factorial = document.getElementById('fact');
const mPlus = document.getElementById('mPlus');
const mMinus = document.getElementById('mMinus');
const mStore = document.getElementById('mStore');
let mText = document.getElementById('mText');
let memoryVariable;

//Event Listerner for each button to append it into Display
buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        if(display.value === "0"){
            display.value = "";
            display.value += `${e.target.textContent}`;
        }
        else{
            display.value += `${e.target.textContent}`;
        }
    })
})

//Window Event Listerner To listen when any key is Pressed From Keyboard
window.addEventListener('keypress',(e)=>{
    if(e.keyCode >= 48 && e.keyCode <=57)
    {
        if(display.value === "0"){
            display.value = "";
            display.value += `${e.key}`;
        }
        else{
            display.value += `${e.key}`;
        }
    }
})

//Event Listerner for Operators and append them based on conditions
operators.forEach((op)=>{
    op.addEventListener('click',(e)=>{
        if(display.value == "0" &&  e.target.innerHTML == "-" && !lastCheck()){
            display.value = ""; 
            display.value += `${e.target.id}`;
        }
        else if(display.value != "0" && e.target.innerHTML != "=" && !lastCheck()){
            display.value += `${e.target.id}`;
        }
        else if(e.target.innerHTML == "="){
            let tempValue = display.value;
            display.value = calculate(tempValue);
        }
    })
})

//Event Listerner to Clear Display
clear.addEventListener('click',(e)=>{
    display.value = "0";
})

//Events For Memory Operations
mStore.addEventListener('click', ()=>{
    memoryVariable = calculate(display.value)
    mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
});


mPlus.addEventListener('click', ()=>{
    if(memoryVariable){
        display.value = calculate(`${display.value} + ${memoryVariable}`)
        mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
    }
    else{
        memoryVariable = calculate(display.value)
        mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
    }
});


mMinus.addEventListener('click',()=>{
    if(memoryVariable){
        display.value = calculate(`${display.value} - ${memoryVariable}`)
        mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
    }
    else{
        memoryVariable = calculate(display.value)
        mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
    }
});


//Event for backSpace
const backSpace = function(e){
    if(display.value.length > 1){
        let tempDisplay = display.value;
        tempDisplay = tempDisplay.slice(0,-1);
        display.value = tempDisplay;
    }
    else{
        display.value = "0"
    }
    
}

back.addEventListener('click',backSpace)

//Event For x to the power Two Function
powerTwo.addEventListener('click',(e)=>{
    if(checkDigits()){
        display.value = calculate(`${display.value}*${display.value}`);
    }
    else{
        tempSolution = calculate(display.value);
        display.value = calculate(`${tempSolution}*${tempSolution}`);
    }
})

//Event For Factorial
factorial.addEventListener('click',()=>{
    console.log("Fact")
})




//Function to Solve Calculations

function calculate(string){
    if(display.value.length < 2 && display.value[0] == "-"){
        return display.value;
    }
    return eval(string);
}


//Function To Check Last Character in Display, will return true if last character is operator
function lastCheck(){
    console.log(display.value.at(-1))
    if(display.value.at(-1) == "*" || display.value.at(-1) == "/" || display.value.at(-1) == "-" || display.value.at(-1) == "+"){
        
        return true;
    }
    else{
        return false;
    }
}


//Function to Check Whether Display Contains all digits or not
function checkDigits(){
    let tempValue = display.value;
    for(let i=0; i<tempValue.length; i++){
        if(tempValue.charCodeAt(i) < 48 || tempValue.charCodeAt(i) >57){
            return false;
        }
    }
    return true;
}