
// const one = document.getElementById("oneButton");
// const two = document.getElementById("twoButton");
// const three = document.getElementById("threeButton");
// const four = document.getElementById("fourButton");
// const five = document.getElementById("fiveButton");
// const six = document.getElementById("sixButton");
// const seven = document.getElementById("sevenButton");
// const eight = document.getElementById("eightButton");
// const nine = document.getElementById("nineButton");
// const zero = document.getElementById("zeroButton");


// const plus = document.getElementById("plusButton");
// const minus = document.getElementById("minusButton");
// const times = document.getElementById("timesButton");
// const dividedBy = document.getElementById("dividedByButton");
const display = document.getElementById("displayDiv");
const decimal = document.getElementById("decimalButton");
const clear = document.getElementById("clearButton");
const backspace = document.getElementById("backspaceButton");
const equals = document.getElementById("equalsButton");

let firstNumber = [5];
let operator = [""];
let secondNumber = [];
let equalsSign = "";
let solution = [];

const num1 = firstNumber.length < 1 ? 
  "" : parseFloat(firstNumber.slice().join(""));
const num2 = secondNumber.length < 1 ?
  "" : parseFloat(secondNumber.slice().join(""));
const answer = solution.length < 1 ?
  "" : parseFloat(solution.slice().join(""));

display.textContent = (`${num1} ${operator[0]} ${num2} ${equalsSign} ${answer}`);

function getUserInput() {

  document.querySelectorAll(".number").forEach(item => {
    item.addEventListener("click", addDigit(item.textContent));
  })

  document.querySelectorAll(".operator").forEach(item => {
    item.addEventListener("click", selectOperator(item.textContent));
  })

  decimal.addEventListener("click", addDecimal());
  clear.addEventListener("click", clearEverything()); 
  backspace.addEventListener("click", backspaceOnce()); 
  equals.addEventListener("click", canWeOperate());
    //update the display dynamically
    //store the first number, operator, second number
    //call the operate function operate( , , )
  
  
}

function addDigit(userDigit) {
  if (operator[0] === "" && firstNumber.length < 8) {
    firstNumber.push(userDigit);
  }
  if (operator[0] !== "" && secondNumber.length < 8) {
    secondNumber.push(userDigit);
  }
}

function addDecimal() {
  if (operator[0] === "" && firstNumber.length < 8 
    && !firstNumber.includes(".")) {
        firstNumber.push(".")};

  if (operator[0] !== "" && secondNumber.length < 8 
    && !secondNumber.includes(".")) {
        secondNumber.push(".")}; 
}

function selectOperator(userOperator) {
  if (operator[0] === "") {
    operator[0] = userOperator;
  }

  if (solution.length > 0) {
    firstNumber = solution.slice;
    operator = [];
    secondNumber = [];
    equalsSign = ""
  }
}

function backspaceOnce() {
  secondNumber.length > 0 && solution.length == 0 ? 
  secondNumber.pop() :
  operator !== "" && solution.length == 0 ? 
  operator.pop() :
  firstNumber.length > 0 && solution.length == 0 ?
  firstNumber.pop : null;
}

function clearEverything() {
  firstNumber = [];
  operator = [];
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
  solution = calculate(num1, operator[0], num2).split("");
  equalsSign = "=";
  display.textContent = (`${num1} ${operator[0]} ${num2} ${equalsSign} ${solution.join}`);
}

function calculate(num1, operator, num2) { //tested, works
  return operator == "+" ? add(num1, num2) 
       : operator == "-" ? subtract(num1, num2) 
       : operator == "*" ? multiply(num1, num2) 
       : operator == "/" ? divide(num1, num2) 
       : "";
};

function infinityError() {
  display.textContent = "N000000000" //something to not reset right away
}

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
  return divisor === 0 ? infinityError()
    : dividend / divisor;
}


// console.log(operate(45, "*", 29)) works!!!


