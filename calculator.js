let display = document.querySelector('#textDisplay');
const buttons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator')
const clear = document.getElementById('cls')
const back = document.getElementById('back')

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
            console.log(display.value)
            let tempValue = display.value;
            display.value = calculate(tempValue);
        }
    })
})

//Event Listerner to Clear Display
clear.addEventListener('click',(e)=>{
    display.value = "0";
})


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



//Function to Solve Calculations

function calculate(string){
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
