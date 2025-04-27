//TO DO
//make sure dividing by 0 doesnt crash, have good message
//add a +/- toggle button
//add a percent button that makes it into a decimal
//exponent button?
//allow successive evaluations
//figure out how to batch process event listeners 
//fix screen overflow -- don't show whole problem or something trickier...





const display = document.getElementById("displayDiv");

const one = document.getElementById("oneButton");
const two = document.getElementById("twoButton");
const three = document.getElementById("threeButton");
const four = document.getElementById("fourButton");
const five = document.getElementById("fiveButton");
const six = document.getElementById("sixButton");
const seven = document.getElementById("sevenButton");
const eight = document.getElementById("eightButton");
const nine = document.getElementById("nineButton");
const zero = document.getElementById("zeroButton");

const plus = document.getElementById("plusButton");
const minus = document.getElementById("minusButton");
const times = document.getElementById("timesButton");
const dividedBy = document.getElementById("dividedByButton");

const decimal = document.getElementById("decimalButton");
const clear = document.getElementById("clearButton");
const backspace = document.getElementById("backspaceButton");
const equals = document.getElementById("equalsButton");

let firstNumber = [];
let operator = "";
let secondNumber = [];
let equalsSign = "";
let solution = [];



getUserInput(); //RIDICULOUS BUT FUNCTIONAL
function getUserInput() {
  console.log("getting input");
  function chooseOne() {addDigit("1")};
  function chooseTwo() {addDigit("2")};
  function chooseThree() {addDigit("3")};
  function chooseFour() {addDigit("4")};
  function chooseFive() {addDigit("5")};
  function chooseSix() {addDigit("6")};
  function chooseSeven() {addDigit("7")};
  function chooseEight() {addDigit("8")};
  function chooseNine() {addDigit("9")};
  function chooseZero() {addDigit("0")};

  one.addEventListener("click", chooseOne);
  two.addEventListener("click", chooseTwo);
  three.addEventListener("click", chooseThree);
  four.addEventListener("click", chooseFour);
  five.addEventListener("click", chooseFive);
  six.addEventListener("click", chooseSix);
  seven.addEventListener("click", chooseSeven);
  eight.addEventListener("click", chooseEight);
  nine.addEventListener("click", chooseNine);
  zero.addEventListener("click", chooseZero);

  console.log("hello")

  function chooseAddition() {selectOperator("+")};
  function chooseSubtraction() {selectOperator("-")};
  function chooseMultiplication() {selectOperator("*")};
  function chooseDivision() {selectOperator("/")};
  
  plus.addEventListener("click", chooseAddition);
  minus.addEventListener("click", chooseSubtraction);
  times.addEventListener("click", chooseMultiplication);
  dividedBy.addEventListener("click", chooseDivision);

  function chooseDecimal() {addDecimal()}; 
  function chooseClear() {clearEverything()};
  function chooseBackspace() {backspaceOnce()};
  function chooseEquals() {canWeOperate()}

  decimal.addEventListener("click", chooseDecimal);
  clear.addEventListener("click", chooseClear); 
  backspace.addEventListener("click", chooseBackspace); 
  equals.addEventListener("click", chooseEquals);
}

function updateDisplay() { //WORKS break up display though?
  const num1 = firstNumber.length < 1 ? 
    "" : firstNumber.slice().join("");
  
  const num2 = secondNumber.length < 1 ?
    "" : secondNumber.slice().join("");
  
  const answer = solution.length < 1 ?
    "" : solution.slice().join("");
  
  display.textContent = (`${num1} ${operator} ${num2} ${equalsSign} ${answer}`);
    console.log("updating content")
  }

function addDigit(userDigit) { //WORKS
  if (operator == "" && firstNumber.length < 8 && solution == "") {
    firstNumber.push(userDigit);
    console.log(firstNumber);
  }
  if (operator !== "" && secondNumber.length < 8 && solution == "") {
    secondNumber.push(userDigit);
  }
  updateDisplay();
}

function addDecimal() { //WORKS
  console.log("adding decimal")
  if (operator == "" && firstNumber.length < 8 && solution == ""
    && !firstNumber.includes(".")) {
        firstNumber.push(".");
  }

  if (operator !== "" && secondNumber.length < 8 && solution == ""
    && !secondNumber.includes(".")) {
        secondNumber.push(".");
  }
  updateDisplay();
}

function selectOperator(userOperator) { //WORKS
  if (operator == "") {
    operator = userOperator;
  }

  if (solution.length > 0) {
    firstNumber = solution.slice();
    console.log(firstNumber);
    operator = userOperator;
    secondNumber = [];
    equalsSign = ""
    solution = [];
  }
  updateDisplay();
}

function backspaceOnce() { //WORKS
  if (solution.length < 1) {
    secondNumber.length > 0 && equalsSign == "" ? 
    secondNumber.pop() :
    operator !== "" ? 
    operator = "" :
    firstNumber.pop();
    updateDisplay();
  }
}

function clearEverything() { //WORKS
  firstNumber = [];
  operator = "";
  secondNumber = [];
  equalsSign = "";
  solution = [];
  display.textContent = "more math please!";
}

function canWeOperate() { //WORKS
  if (secondNumber.length > 0 && 
    !(secondNumber[0] === "." && secondNumber.length === 1)) {
    operate();
  }
}

function operate() { //WORKS
  console.log("operating")
  let num1 = parseFloat(firstNumber.slice().join(""));
  let num2 = parseFloat(secondNumber.slice().join(""));
  console.log(num1, num2);
  answer = calculate(num1, operator, num2);
  answerRounded = Math.round(answer * 10000000) / 10000000;
  solution = answerRounded.toString().split("");
  console.log(solution);
  equalsSign = "=";
  updateDisplay();
}

function calculate(num1, operator, num2) { //WORKS
  return operator == "+" ? add(num1, num2) 
       : operator == "-" ? subtract(num1, num2) 
       : operator == "*" ? multiply(num1, num2) 
       : operator == "/" ? divide(num1, num2) 
       : "";
};

function cantChooseZero() {
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
  return divisor === 0 ? cantChooseZero()
    : dividend / divisor;
}