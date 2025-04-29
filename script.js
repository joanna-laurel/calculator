//remaining stuff
//deal with larger numbers?
//make mobile compatible aka it shrinks




const display = document.getElementById("displayDiv");

let firstNumber = [];
let operator = "";
let secondNumber = [];
let equalsSign = "";
let solution = []; 

addEventListeners(); 

function addEventListeners() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      handleClick(this.textContent, this.className, this.id);
    })
  })
}

function handleClick(buttonText, buttonClass, buttonId) {
  buttonId === "zeroButton" ? addDigit("0") :
  buttonClass === "number" ? addDigit(buttonText) :
  buttonText === "." ? addDecimal() :
  buttonId === "plusButton" ? selectOperator("+") :
  buttonId === "minusButton" ? selectOperator("-") :
  buttonId === "timesButton" ? selectOperator("*") :
  buttonId === "dividedByButton" ? selectOperator("/") :
  buttonId === "backspaceButton" ? backspaceOnce() :
  buttonId === "plusMinusButton" ? togglePositivity() :
  buttonText === "AC" ? clearEverything() :
  buttonText === "=" ? canWeOperate() : "cats"
}

function updateDisplay() { 
  let multiply = "\u00d7";
  let divide = "\u00f7";
  let subtract = "\u2013";
  
  const displayOperator = 
    operator == "*" ? multiply
    : operator == "/" ? divide
    : operator == "-" ? subtract
    : operator;

  const num1 = firstNumber.length < 1 ? 
    "" : firstNumber.slice().join("");
  
  const num2 = secondNumber.length < 1 ?
    "" : secondNumber.slice().join("");
  
  const answer = solution.length < 1 ?
    "" : solution.slice().join("");
  
  display.textContent = 
    firstNumber.length + secondNumber.length + solution.length > 16 &&
    solution.length > 0 ?
    (`${answer}`) : 
    (`${num1} ${displayOperator} ${num2} ${equalsSign} ${answer}`);
  }

function addDigit(userDigit) { 
  if (operator == "" 
    && firstNumber.length < 15 
    && solution == "") {
    firstNumber.push(userDigit);
  }

  if (operator !== "" 
    && secondNumber.length < 15 
    && solution == ""
    && (firstNumber.length + secondNumber.length < 40)) {
    secondNumber.push(userDigit);
  }

  if (solution.length > 0) {
    clearEverything();
    firstNumber.push(userDigit);
  }
  updateDisplay();
}

function addDecimal() { 
  if (operator == "" 
    && firstNumber.length < 15 
    && solution.length < 1
    && !firstNumber.includes(".")) {
        firstNumber.push(".");
  }

  if (operator !== "" 
    && secondNumber.length < 15 
    && solution.length < 1
    && !secondNumber.includes(".")) {
        secondNumber.push(".");
  }
  updateDisplay();
}

function togglePositivity() {
  if (firstNumber.length > 0 
    && secondNumber.length < 1 
    && !firstNumber.includes("e")) {
      changeSigns()
    }
  
  function changeSigns() {
    if (firstNumber[0] !== "-") {
      firstNumber.unshift("-");
    } else {firstNumber.shift()}
    updateDisplay();
  }
}

function selectOperator(userOperator) { 
  if (operator == "" 
    && firstNumber.length > 0 
    && !(firstNumber[0] === "." && firstNumber.length === 1)) {
    operator = userOperator;
    updateDisplay();
  }

  if (solution.length > 0 && !solution.includes("e")) {
    firstNumber = solution.slice();
    console.log(firstNumber);
    operator = userOperator;
    secondNumber = [];
    equalsSign = ""
    solution = [];
    updateDisplay();
  }

  if (display.textContent == "(maybe start over)") {
    display.textContent = "lol for real tho";
  }
  
  if (display.textContent == "can't divide by cat!") {
    display.textContent = "(maybe start over)";
  }
}

function backspaceOnce() { 
  if (solution.length < 1) {
    secondNumber.length > 0 && equalsSign == "" ? 
    secondNumber.pop() :
    operator !== "" ? 
    operator = "" :
    firstNumber.pop();
    updateDisplay();
  }
}

function clearEverything() { 
  firstNumber = [];
  operator = "";
  secondNumber = [];
  equalsSign = "";
  solution = [];
  display.textContent = ""; 
}

function canWeOperate() { 
  if (secondNumber.length > 0 && 
    !(secondNumber[0] === "." && secondNumber.length === 1)) {
    operate();
  }
}

function operate() { 
  let num1 = parseFloat(firstNumber.slice().join(""));
  let num2 = parseFloat(secondNumber.slice().join(""));
  
  answer = calculate(num1, operator, num2);

  adjustedAnswer = answer == "can't divide by cat!" ? "can't divide by cat!"
    : Math.round(answer * 10000000) / 10000000;
  
  solution = adjustedAnswer.toString().split("");
  equalsSign = "=";
  updateDisplay();
}

function calculate(num1, operator, num2) { 
  return operator == "+" ? add(num1, num2) 
       : operator == "-" ? subtract(num1, num2) 
       : operator == "*" ? multiply(num1, num2) 
       : operator == "/" ? divide(num1, num2) 
       : "";
};

function add(addend1, addend2) {
  return addend1 + addend2;
}

function subtract(minuend, subtrahend) {
  return minuend - subtrahend;
}

function multiply(multiplier1, multiplier2) {
  return multiplier1 * multiplier2;
}

function divide(dividend, divisor) {
  return divisor === 0 ? "can't divide by cat!"
    : dividend / divisor;
}