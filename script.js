let expenses = [];

const form = document.getElementById("expenseForm");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const expenseContainer = document.getElementById("expenseContainer");
const amountError = document.getElementById("amountError");
const totalAmountDisplay = document.getElementById("totalAmount");
const totalCountDisplay = document.getElementById("totalCount");
const foodTotalDisplay = document.getElementById("foodTotal");
const travelTotalDisplay = document.getElementById("travelTotal");
const billsTotalDisplay = document.getElementById("billsTotal");
//const clearAllBtn = document.getElementById("clearAll");




function updateSummary() {

    let total = 0;
    let foodTotal = 0;
    let travelTotal = 0;
    let billsTotal = 0;

    for (let i = 0; i < expenses.length; i++) {

        total = total + Number(expenses[i].amount);

        if (expenses[i].category === "Food") {
            foodTotal = foodTotal + Number(expenses[i].amount);
        }

        if (expenses[i].category === "Travel") {
            travelTotal = travelTotal + Number(expenses[i].amount);
        }

        if (expenses[i].category === "Bills") {
            billsTotal = billsTotal + Number(expenses[i].amount);
        }
    }

    totalAmountDisplay.textContent = `Total Amount: ₹${total}`;
    totalCountDisplay.textContent = `Total Transactions: ${expenses.length}`;

    foodTotalDisplay.textContent = `Food Total: ₹${foodTotal}`;
    travelTotalDisplay.textContent = `Travel Total: ₹${travelTotal}`;
    billsTotalDisplay.textContent = `Bills Total: ₹${billsTotal}`;
}


function createExpenseCard(expense) {

    const card = document.createElement("div");
    card.classList.add("border", "p-3", "rounded", "shadow");

    const amountPara = document.createElement("p");
    amountPara.textContent = `Amount: ₹${expense.amount}`;

    const categoryPara = document.createElement("p");
    categoryPara.textContent = `Category: ${expense.category}`;

    const datePara = document.createElement("p");
    datePara.textContent = `Date: ${expense.date}`;

    const paymentPara = document.createElement("p");
    paymentPara.textContent = `Payment: ${expense.payment}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(
        "bg-red-500",
        "text-white",
        "px-3",
        "py-1",
        "rounded",
        "mt-2"
    );

    deleteBtn.addEventListener("click", function() {

        expenseContainer.removeChild(card);

        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === expense.id) {
                expenses.splice(i, 1);
                break;
            }
        }

        updateSummary();
    });

    card.appendChild(amountPara);
    card.appendChild(categoryPara);
    card.appendChild(datePara);
    card.appendChild(paymentPara);
    card.appendChild(deleteBtn);
    expenseContainer.appendChild(card);
}


form.addEventListener("submit", function(e) {

    e.preventDefault();

    amountError.textContent = "";

    const amount = amountInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    const paymentElements = document.getElementsByName("payment");
    let payment = "";

    for (let i = 0; i < paymentElements.length; i++) {
        if (paymentElements[i].checked) {
            payment = paymentElements[i].value;
        }
    }

    if (amount === "") {
        amountError.textContent = "Amount is required";
        return;
    }

    if (isNaN(amount)) {
        amountError.textContent = "Invalid amount. Only numbers allowed";
        return;
    }

    if (category === "" || date === "" || payment === "") {
        return;
    }

    const expense = {
        id: Date.now(),
        amount: amount,
        category: category,
        date: date,
        payment: payment
    };

    expenses.push(expense);

    createExpenseCard(expense);
    updateSummary();

    amountInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";

    for (let i = 0; i < paymentElements.length; i++) {
        paymentElements[i].checked = false;
    }

});