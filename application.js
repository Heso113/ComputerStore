//Document Variables
const workMoney = document.getElementById('pay');
const loanedMoney = document.getElementById('loan');
const balance = document.getElementById('balance');
const compImg = document.getElementById('compImg');
const compName = document.getElementById('compName');
const compDesc = document.getElementById('compDesc');
const compSelect = document.getElementById('computerSelect');
const features = document.getElementById('features');
const compPrice = document.getElementById('price');

//Document Buttons
const loanButton = document.getElementById('loanButton');
const bankButton = document.getElementById('bankButton');
const wrkButton = document.getElementById('workButton');
const buyButton = document.getElementById('buyButton');

//Button Listeners
loanButton.addEventListener('click', promptUser);
bankButton.addEventListener('click', bankTheMoney);
wrkButton.addEventListener('click', work);
compSelect.addEventListener('change', changeComputerInfo);
buyButton.addEventListener('click', buyComputer);
document.addEventListener("DOMContentLoaded", loadPage);

let pay = 0;
let bankValue = 0;
let currentLoan = 0;
let computers = [];
let newLoanAmount = 0;


function loadPage() {
    computers.push(new Computer('Dusty Laptop',
    'An old dusty laptop. At least you can play minesweeper and solitare.',
    ["Old", "Dusty", "Starts"],
    '/images/comp1.png',
    500));
computers.push(new Computer('Your brothers old computer',
    'Old and sometimes freezes, but now you can play 3D games.',
    ["Old", 'Loud', "Freezes"],
    '/images/comp2.png',
    1000));
computers.push(new Computer('Gamer 200',
    'Hey it can run minecraft! No mods though or the CPU will fry.',
    ["New", "Overpriced", "Weak CPU"],
    '/images/comp3.png',
    1500));
computers.push(new Computer('Gamer 400',
    'Better than Gamer 200. Moving on up to the big league. However people still call you noob online.',
    ["Factory new", "Okay price", "Skills not included (but it comes with aimbot installed)"],
    '/images/comp4.png',
    2000));
computers.push(new Computer('xXx_Noob_Slayer_xXx',
    'No one can stop you now. You are now allowed to call everyone else noob since you are the new apex predator, or atleast your computer is.',
    ["Pristine", "Top of the line graphic card and CPU", "Pwns noobs"],
    '/images/comp5.png',
    5000));

    for (let i = 0; i < computers.length; i++) {
        let option = document.createElement('option');
        option.appendChild(document.createTextNode(computers[i].getName())) 
        document.getElementById('computerSelect').appendChild(option);
    }

    changeComputerInfo();
    printMoneyInfo();
}

//Functions
function work() {
    pay += 100;
    printMoneyInfo();
}

function bankTheMoney() {
    if (currentLoan > 0) {
        payOfLoan();
    } else {
        bankValue += pay;
        pay = 0;
    }
    printMoneyInfo();
}

function payOfLoan() {
    currentLoan -= pay;
    if (currentLoan < 0) {
        bankValue += Math.abs(currentLoan);
        currentLoan = 0;
    }
    pay = 0;
}

function promptUser() {
    newLoanAmount = parseInt(prompt("Please enter loan amount: ", 0));
    if (!isNaN(newLoanAmount)) {
        applyForLoan();
    } else {
        alert('Must enter a number!');
    }
}

function applyForLoan() {
    if (currentLoan <= 0) {
        let amount = newLoanAmount;
        let maxLoanAmount = bankValue * 2;
        if (amount <= maxLoanAmount) {
            currentLoan = amount;
            bankValue += amount;
            printMoneyInfo();
        } else {
            alert('Loan amount too high.');
        }
    }
    else {
        alert('You already have a loan to pay off.')
    }

}

function printMoneyInfo() {
    workMoney.innerText = 'Pay: ' + pay + ' Kr';
    loanedMoney.innerText = 'Loan: ' + currentLoan + ' Kr';
    balance.innerText = 'Balance: ' + bankValue + ' Kr';
}

function changeComputerInfo() {
    document.getElementById('list').innerHTML = '';
    let index = computerSelect.selectedIndex;
    compImg.src = computers[index].getImg();
    compName.innerHTML = computers[index].getName();
    compDesc.innerHTML = computers[index].getDesc();
    price.innerHTML = 'Price: ' + computers[index].getPrice() + ' Kr';
    let list = document.createElement('ul');
    for (let i = 0; i < computers[index].getFeatures().length; i++) {
        let item = document.createElement('li');
        item.appendChild(document.createTextNode(computers[index].getFeatures()[i]));
        list.appendChild(item);
    }
    document.getElementById('list').appendChild(list);
}

function buyComputer() {
    let index = computerSelect.selectedIndex;
    let price = computers[index].getPrice();
    if (bankValue >= price) {
        bankValue -= price;
        printMoneyInfo();
        alert('You bought a new computer: ' + computers[index].getName());

    } else {
        alert('You do not have enough money to buy the selected computer.')
    }
}