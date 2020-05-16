const main = document.getElementById('main');
const addUsersBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//initialise an array
// this will be a array of objects with name and money value
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random users and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
};

//double the money
const doubleMoney = () => {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });
    updateDom();
};

// sort users by richest
const sortByRichest = () => {
    data = data.sort((a, b) => b.money - a.money);

    updateDom();
};

// filter users to show the richest
const showMillionaires = () => {
    data = data.filter(user => user.money > 1000000);

    updateDom();
};

//calculate the entire wealth
const calculateWealth = () => {
    const wealth = data.reduce((accumulator, user) => (accumulator + user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3> Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
};

//add new object to data array
const addData = (obj) => {
    data.push(obj);

    updateDom();
};

//update DOM 
const updateDom = (providedData = data) => {
    // clear the main div
    main.innerHTML = ' <h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element)
    });

};

//format number as money
const formatMoney = (number) => {
    return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//event Listeners
addUsersBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)