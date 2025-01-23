let display = document.querySelector('#textDisplay');
const buttons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('cls');
const back = document.getElementById('back');
const powerTwo = document.getElementById('powerTwo');
const oneByX = document.getElementById('oneX');
const factorial = document.getElementById('fact');
const memClear = document.getElementById('memClear')
const memRecall = document.getElementById('memRecall')
const mPlus = document.getElementById('mPlus');
const mMinus = document.getElementById('mMinus');
const mStore = document.getElementById('mStore');
let mText = document.getElementById('mText');
const dotOp = document.getElementById('dot');
const openBr = document.getElementById('openBr');
const closeBr = document.getElementById('closeBr')
let memoryVariable;
let dotAppend = true;
if(memoryVariable){
    memClear.removeAttribute('disabled');
    memRecall.removeAttribute('disabled');
}


//Event Listerner for each button to append it into Display
buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        if(display.value === "0"){
            display.value = "";
            display.value += `${e.target.textContent}`;
        }
        else if(display.value != "0" && !lastCheck() && (display.value.at(-1) === ")")){
            display.value += `*${e.target.textContent}`;
        }
        else{
            display.value += `${e.target.textContent}`;
        }
    })
})

//Event for backSpace
const backSpace = function (e) {
    if (display.value.length > 1) {
        let tempDisplay = display.value;
        tempDisplay = tempDisplay.slice(0, -1);
        display.value = tempDisplay;
    } else if (display.value.length === 1 || display.value === "0") {
        display.value = "0";
    }
};

back.addEventListener('click',backSpace)

//Window Event Listerner To listen when any key is Pressed From Keyboard
window.addEventListener('keydown',(e)=>{
    if((e.keyCode >= 48 && e.keyCode <= 57) || 
            // For numeric keypad keys (0-9)
            (e.keyCode >= 96 && e.keyCode <= 105) || 
            // For the key values (also works for both number rows and numpad)
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key))
    {
        if(display.value === "0"){
            display.value = "";
            display.value += `${e.key}`;
        }
        else{
            display.value += `${e.key}`;
        }
    }
    else if(['/','*','-','+','Enter'].includes(e.key)){
        e.preventDefault();
        if(display.value == "0" &&  e.key == "-" && !lastCheck()){
            display.value = ""; 
            display.value += `${e.key}`;
        }
        else if(display.value != "0" && (e.key == "-" || e.key == "+") && !lastCheck() && (display.value.at(-1) === "(")){
            display.value += `${e.key}`;
    }
        else if(display.value != "0" && e.key != "Enter" && !lastCheck() && !(display.value.at(-1) === "(")){
            display.value += `${e.key}`;
            dotAppend = true;
        }
        else if(e.key == 'Enter'){
            let tempValue = display.value;
            display.value = calculate(tempValue);
        }
    }
    else if(e.key == 'Backspace'){
        backSpace(e);
    }
})

//Event Listerner for Operators and append them based on conditions
operators.forEach((op)=>{
    op.addEventListener('click',(e)=>{
        if(display.value == "0" &&  e.target.innerHTML == "-" && !lastCheck()){
            display.value = ""; 
            display.value += `${e.target.id}`;
        }
        else if(display.value != "0" && (e.target.innerHTML == "-" || e.target.innerHTML == "+") && !lastCheck() && (display.value.at(-1) === "(")){
                display.value += `${e.target.id}`;
        }
        else if(display.value != "0" && e.target.innerHTML != "=" && !lastCheck() && !(display.value.at(-1) === "(")){
            display.value += `${e.target.id}`;
            dotAppend = true;
        }
        else if(e.target.innerHTML == "="){
            let tempValue = display.value;
            display.value = calculate(tempValue);
        }
    })
})

//Event Listerner for Dot 
dotOp.addEventListener('click',(e)=>{
    if(display.value == "0" && dotAppend){
        display.value = "0.";
        dotAppend = false;
    }
    else if(display.value != "0" && dotAppend){
        if(lastCheck()){
            display.value += '0.';
            dotAppend = false;
        }
        else{
            display.value += '.';
            dotAppend = false;
        }
        
    }
})


//Event For Open and Close Bracket
openBr.addEventListener('click',()=>{
    if(display.value === "0" || display.value.at(-1) === ")" || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(display.value.at(-1))){
        display.value += `*(`;
    }
    else{
        if(!(display.value.at(-1) === ".")){
            display.value += `(`;
        }
        
    }
})

closeBr.addEventListener('click',()=>{
    if(display.value !== "0" && checkBracket()){
        display.value += `)`;
    }
    // else if(checkBracket){
    //     display.value += `)`;
    // }
    
})



//Event Listerner to Clear Display
clear.addEventListener('click',(e)=>{
    display.value = "0";
})

//Events For Memory Operations
memClear.addEventListener('click',(e)=>{
    memoryVariable = null;
    memClear.disabled = true
    memRecall.disabled = true
    display.value = `0`;
    mText.innerHTML = `<i>memory:</i>`;
})

memRecall.addEventListener('click',(e)=>{
    display.value = `${memoryVariable}`;
})



mStore.addEventListener('click', ()=>{
    if(checkDigits()){
        // memoryVariable = calculate(display.value)
        memoryVariable = display.value;
        mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
        memClear.removeAttribute('disabled')
        memRecall.removeAttribute('disabled')
    }
    else{
        alert('Evaluate First')
    }
    
});


mPlus.addEventListener('click', () => {
    if (memoryVariable !== undefined || memoryVariable !== none) {
        if(checkDigits()){
            memoryVariable = calculate(`${display.value} + ${memoryVariable}`);
        }
    } else {
        alert('Evaluate First')
    }
    mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
});


mMinus.addEventListener('click', () => {
    if (memoryVariable !== undefined || memoryVariable !== none) {
        if(checkDigits()){
            memoryVariable = calculate(`${memoryVariable} - ${display.value}`);
        }
    } else {
        alert("Evaluate First")
    }
    mText.innerHTML = `<i>memory:</i> ${memoryVariable}`;
});


//Event For x to the power Two Function
powerTwo.addEventListener('click',(e)=>{
    if(display.value === "0"){
        display.value = `(0^2`;
    }
    else if(['1','2','3','4','5','6','7','8','9','0'].includes(display.value.at(-1))){
        tempString = "";
        if(display.value.length <= 1){
            tempString = `(${display.value}^2)`;
            display.value = tempString;
        }
        else{
        for(let i = ((display.value.length) -1); i > 0 ; i--){
            if(['-','+','*','/'].includes(display.value[i])){
                console.log("Success Ocured")
                tempString = `${display.value.slice(0,i+1)}(${display.value.slice(i+1,display.value.length)}`
            }
            else{
                console.log("Error Occured")
                tempString = `(${display.value}`;
            }
        }
        display.value = `${tempString}^2)`;
    }
    }
    // else{
    //     if(checkDigits()){
    //         display.value = calculate(`${display.value}*${display.value}`);
    //     }
    //     else{
    //         tempSolution = calculate(display.value);
    //         display.value = calculate(`${tempSolution}*${tempSolution}`);
    //     }
    // }
    
})

//Event for One By X function
oneByX.addEventListener('click',(e)=>{
    if(checkDigits()){
        display.value = calculate(`1/${display.value}`);
    }
    else{
        tempSolution = calculate(display.value);
        display.value = calculate(`1/${tempSolution}`);
    }
})

//Event For Factorial
factorial.addEventListener('click',()=>{
    console.log("Fact")
})




//Function to Solve Calculations

function calculate(string) {
    string = string.replaceAll('^','**');
    if (string.includes('/') && string.split('/')[1] === '0') {
        alert('Error: Division by 0')
        // return 'Error: Division by 0';
        return "0";
    }
    if (display.value.length < 2 && display.value[0] == "-") {
        return display.value;
    }
    if (`${eval(string)}`.indexOf('.') !== -1) {
        return Number(eval(string)).toFixed(3);
    }
    return eval(string);
}



//Function To Check Last Character in Display, will return true if last character is operator
function lastCheck() {
    const lastChar = display.value.at(-1);
    return (lastChar === "*" || lastChar === "/" || lastChar === "-" || lastChar === "+");
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


//Function to check Brackets
function checkBracket(){
    let openBracket = 0;
    let closeBracket = 0;
    for(let i = 0; i<(display.value.length); i++){
        if(display.value[i] == "("){
            openBracket++;
        }
        else if(display.value[i] == ")"){
            closeBracket++;
        }
    }
    if(openBracket > closeBracket){
        return true;
    }
    else{
        false;
    }
}



//Edge Cases 3.(2)
//Invalid Case 3+(3)*(
