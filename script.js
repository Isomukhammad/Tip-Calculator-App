const bill = document.querySelector('#bill-input');
const tipBtn = document.querySelectorAll('.tip-btn');
const people = document.querySelector('#people-num');
const custom = document.querySelector('#input-custom');
const tipAmount = document.querySelector('#tip-amount');
const totalAmount = document.querySelector('#total-amount');
const reset = document.querySelector('#reset-btn');

let billValue = 0.0; //default value of bill
let peopleNum = 0.0; //default value of number of people
let percent = 0.0;
let customNum = 0.0; //default value of custom tip
let tipValue = 0.0; //defailt value of tip amount per person
let totalValue = 0.0; //defailt value of total 

bill.addEventListener('input', function () {
    getValue(bill);
    billValue = bill.value;
    getTipAmount();
    getTotalAmount();
});

for (e of tipBtn) {
    e.addEventListener('click', function () {
        for (x of tipBtn) {
            x.style.backgroundColor = 'hsl(183, 100%, 15%)';
        }

        custom.value = '';
        customNum = this.value;
        this.style.backgroundColor = 'hsl(172, 67%, 45%)';
        getTipAmount();
        getTotalAmount();
    })
}

people.addEventListener('input', function () {
    getValue(people);
    peopleNum = people.value;

    if (peopleNum == 0) {
        document.querySelector('#error').style.visibility = 'visible';
    } else {
        document.querySelector('#error').style.visibility = 'hidden';
    }

    getTipAmount();
    getTotalAmount();
});

custom.addEventListener('input', function (e) {
    getValue(custom);
    customNum = custom.value;
    getTipAmount();
    getTotalAmount();
})

reset.addEventListener('click', resetValue);

//function to prevent the input of letters and other characters
function validateFloat(str) {
    var rgx = /^[0-9]*?[0-9]*$/;
    return str.match(rgx);
}

function getValue(x) {
    if (x.value.includes(',')) {
        x.value = y.value.replace(',', '.');
    }

    if (!validateFloat(x.value)) {
        x.value = x.value.substring(0, x.value.length - 1);
    }

    if (x.value.charAt(0) == '.') {
        x.value = '0' + x.value;
    }
}

function getTipAmount() {
    tipValue = billValue / 100 * customNum;

    let tipValuePerson = (tipValue / peopleNum).toFixed(2);

    if(tipValuePerson == 'Infinity' || tipValuePerson == 'NaN'){
        tipAmount.innerHTML = '$0.00'
    } else {
        tipAmount.innerHTML = '$' + tipValuePerson;
    }
}

function getTotalAmount() {
    totalValue = ((Number(tipValue) + Number(billValue)) / Number(peopleNum)).toFixed(2);
    if(totalValue == 'Infinity' || totalValue == 'NaN'){
        totalAmount.innerHTML = '$0.00'
    } else {
        totalAmount.innerHTML = '$' + totalValue;
    }
}

//function to reset values of calculator
function resetValue() {
    tipValue = 0.0;
    totalValue = 0.0;
    bill.value = '';
    billValue = 0.0;
    people.value = '';
    peopleNum = 0.0;
    custom.value = '';
    customNum = 0;
    tipAmount.innerHTML = '$0.00';
    totalAmount.innerHTML = '$0.00';

    for (e of tipBtn) {
        x.style.backgroundColor = 'hsl(183, 100%, 15%)';
    }
}
