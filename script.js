// DATA

// Saldo awal
let startingBalance = 100000;


// Data pengeluaran
let expenses = [];


// Data pemasukan
let incomes = [];


// Mode saat ini
let currentMode = "expense";


// ELEMENT

const expenseBtn =
    document.getElementById("expenseBtn");

const incomeBtn =
    document.getElementById("incomeBtn");


const heroTitle =
    document.getElementById("heroTitle");

const heroAmount =
    document.getElementById("heroAmount");

const heroDescription =
    document.getElementById("heroDescription");


const chartTotal =
    document.getElementById("chartTotal");

const pieChart =
    document.getElementById("pieChart");

const lineChart =
    document.getElementById("lineChart");


const inputTitle =
    document.getElementById("inputTitle");

const addTransaction =
    document.getElementById("addTransaction");

const amountInput =
    document.getElementById("amount");


const expenseCategory =
    document.getElementById(
        "expenseCategory"
    );

const incomeCategory =
    document.getElementById(
        "incomeCategory"
    );

const expenseInput =
    document.getElementById("expenseInput");

const incomeInput =
    document.getElementById("incomeInput");

const historyTitle =
    document.getElementById("historyTitle");

const historyList =
    document.getElementById(
        "historyList"
    );

const transactionCount =
    document.getElementById(
        "transactionCount"
    );


const miniBalance =
    document.getElementById(
        "miniBalance"
    );

const balanceImage =
    document.getElementById("balanceImage");

// FORMAT RUPIAH

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


// HITUNG TOTAL PENGELUARAN

function getTotalExpense() {

    let total = 0;

    expenses.forEach(function (expense) {

        total += expense.amount;

    });

    return total;

}


// HITUNG TOTAL PEMASUKAN

function getTotalIncome() {

    let total = 0;

    incomes.forEach(function (income) {

        total += income.amount;

    });

    return total;

}


// HITUNG SALDO

function getBalance() {

    return (
        startingBalance
        + getTotalIncome()
        - getTotalExpense()
    );

}

function updateBalanceImage() {

    const balance = getBalance();

    let newImage;


    if (balance >= 100000) {

        newImage =
            "asset/happy.jpg";

    }

    else if (balance >= 50000) {

        newImage =
            "asset/50.jpg";

    }

    else if (balance >= 10000) {

        newImage =
            "asset/huohuo.jpg";

    }

    else {

        newImage =
            "asset/10.jpg";

    }


    // Kalau fotonya memang sudah sama,
    // tidak perlu dianimasikan lagi

    if (balanceImage.getAttribute("src") === newImage) {
        return;
    }


    balanceImage.style.opacity = "0";
    balanceImage.style.transform = "scale(0.97)";


    setTimeout(function () {

        balanceImage.src = newImage;

        balanceImage.onload = function () {

            balanceImage.style.opacity = "1";
            balanceImage.style.transform = "scale(1)";

        };

    }, 200);

}

// MODE PENGELUARAN

function showExpenseMode() {

    currentMode = "expense";


    // Navbar

    expenseBtn.classList.add("active");

    incomeBtn.classList.remove("active");


    // Hero

    heroTitle.textContent =
        "TOTAL PENGELUARAN";

    heroAmount.textContent =
        formatRupiah(
            getTotalExpense()
        );

    heroDescription.textContent =
        "Pantau penggunaan uangmu berdasarkan kategori pengeluaran.";


    // Diagram

    pieChart.style.display =
        "flex";

    lineChart.style.display =
        "none";


    // Kategori

    document.getElementById(
        "expenseLegend"
    ).style.display = "flex";

    document.getElementById(
        "incomeLegend"
    ).style.display = "none";


    // Input

    inputTitle.textContent =
        "Tambah Pengeluaran";

    addTransaction.textContent =
        "+ Tambah Pengeluaran";


    expenseInput.style.display =
        "block";

    incomeInput.style.display =
        "none";


    // Riwayat

    historyTitle.textContent =
        "Riwayat Pengeluaran";


    // Update

    updateExpenseChart();

    updateExpenseHistory();

    updateBalance();

}


// MODE PEMASUKAN

function showIncomeMode() {

    currentMode = "income";


    // Navbar

    incomeBtn.classList.add("active");

    expenseBtn.classList.remove("active");


    // Hero

    heroTitle.textContent =
        "SALDO";

    heroAmount.textContent =
        formatRupiah(
            getBalance()
        );

    heroDescription.textContent =
        "Saldo saat ini berdasarkan pemasukan dan pengeluaranmu.";


    // Diagram

    pieChart.style.display =
        "none";

    lineChart.style.display =
        "block";


    // Kategori

    document.getElementById(
        "expenseLegend"
    ).style.display = "none";

    document.getElementById(
        "incomeLegend"
    ).style.display = "flex";


    // Input

    inputTitle.textContent =
        "Tambah Pemasukan";

    addTransaction.textContent =
        "+ Tambah Pemasukan";


    expenseInput.style.display =
        "none";

    incomeInput.style.display =
        "block";

    // Riwayat

    historyTitle.textContent =
        "Riwayat Pemasukan";


    // Update

    updateIncomeChart();

    updateIncomeHistory();

    updateBalance();

}


// TOMBOL NAVBAR

expenseBtn.addEventListener(
    "click",
    showExpenseMode
);

incomeBtn.addEventListener(
    "click",
    showIncomeMode
);


// TAMBAH TRANSAKSI

addTransaction.addEventListener(
    "click",
    function () {

        const amount = Number(
            amountInput.value.replace(/[.,]/g, "")
        );

        // Validasi

        if (amount <= 0) {

            alert(
                "Masukkan jumlah yang valid."
            );

            return;
        }


        // PENGELUARAN

        if (
            currentMode === "expense"
        ) {

            const category =
                expenseCategory.value;


            expenses.push({

                category: category,

                amount: amount

            });

        }


        // PEMASUKAN

        else {

            const category =
                incomeCategory.value;


            incomes.push({

                category: category,

                amount: amount

            });

        }


        // Bersihkan input

        amountInput.value = "";


        // Update

        if (
            currentMode === "expense"
        ) {

            showExpenseMode();

        }

        else {

            showIncomeMode();

        }

    }
);


// DIAGRAM PENGELUARAN

function updateExpenseChart() {

    const total =
        getTotalExpense();


    let food = 0;

    let entertainment = 0;

    let goods = 0;


    // HITUNG PER KATEGORI

    expenses.forEach(
        function (expense) {

            if (
                expense.category === "food"
            ) {

                food += expense.amount;

            }

            else if (
                expense.category ===
                "entertainment"
            ) {

                entertainment +=
                    expense.amount;

            }

            else if (
                expense.category === "goods"
            ) {

                goods += expense.amount;

            }

        }
    );


    // HITUNG PERSENTASE

    let foodPercent = 0;

    let entertainmentPercent = 0;

    let goodsPercent = 0;


    if (total > 0) {

        foodPercent =
            (food / total) * 100;

        entertainmentPercent =
            (entertainment / total) * 100;

        goodsPercent =
            (goods / total) * 100;

    }


    // UPDATE TEKS PERSENTASE

    document.getElementById(
        "foodPercentage"
    ).textContent =
        Math.round(foodPercent) + "%";


    document.getElementById(
        "entertainmentPercentage"
    ).textContent =
        Math.round(entertainmentPercent) + "%";


    document.getElementById(
        "goodsPercentage"
    ).textContent =
        Math.round(goodsPercent) + "%";


    // UBAH DERAJAT DIAGRAM

    const foodDegree =
        foodPercent * 3.6;

    const entertainmentDegree =
        entertainmentPercent * 3.6;


    const entertainmentEnd =
        foodDegree +
        entertainmentDegree;


    pieChart.style.background = `

        conic-gradient(

            #60c9c8
            0deg
            ${foodDegree}deg,

            #8c82d9
            ${foodDegree}deg
            ${entertainmentEnd}deg,

            #f1bd66
            ${entertainmentEnd}deg
            360deg

        )

    `;


    // TOTAL DIAGRAM

    chartTotal.textContent =
        formatRupiah(total);

}

// DIAGRAM PEMASUKAN

function updateIncomeChart() {

    const svg =
        document.getElementById(
            "lineSvg"
        );

    const line =
        document.getElementById(
            "incomeLine"
        );

    const pointsGroup =
        document.getElementById(
            "incomePoints"
        );

    let salary = 0;
    let tip = 0;
    let allowance = 0;

    incomes.forEach(function (income) {
        if (income.category === "salary") {
            salary += income.amount;
        } else if (income.category === "tip") {
            tip += income.amount;
        } else if (income.category === "allowance") {
            allowance += income.amount;
        }
    });

    const total = getTotalIncome();

    let salaryPercent = 0;
    let tipPercent = 0;
    let allowancePercent = 0;

    if (total > 0) {
        salaryPercent = (salary / total) * 100;
        tipPercent = (tip / total) * 100;
        allowancePercent = (allowance / total) * 100;
    }

    document.getElementById("salaryPercentage").textContent =
        Math.round(salaryPercent) + "%";

    document.getElementById("tipPercentage").textContent =
        Math.round(tipPercent) + "%";

    document.getElementById("allowancePercentage").textContent =
        Math.round(allowancePercent) + "%";


    // Bersihkan titik lama

    pointsGroup.innerHTML = "";


    // Kalau belum ada data

    if (incomes.length === 0) {

        line.setAttribute(
            "points",
            ""
        );

        return;

    }


    // Cari nilai maksimum

    let maxValue = 0;

    incomes.forEach(
        function (income) {

            if (
                income.amount >
                maxValue
            ) {

                maxValue =
                    income.amount;

            }

        }
    );


    // Supaya chart tidak terlalu mepet

    maxValue *= 1.2;


    const chartWidth = 400;

    const chartHeight = 220;


    let points = "";


    incomes.forEach(
        function (income, index) {

            let x;

            let y;


            if (incomes.length === 1) {

                x = chartWidth / 2;

            }

            else {

                x =
                    (index /
                    (incomes.length - 1))
                    * chartWidth;

            }


            y =
                chartHeight -
                (
                    income.amount /
                    maxValue
                )
                * chartHeight;


            points +=
                `${x},${y} `;


            // Buat titik

            const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 5);

            if (income.category === "salary") {
                circle.classList.add("income-point", "salary-point");
            } else if (income.category === "tip") {
                circle.classList.add("income-point", "tip-point");
            } else if (income.category === "allowance") {
                circle.classList.add("income-point", "allowance-point");
            }

            pointsGroup.appendChild(circle);
        }
    );


    line.setAttribute(
        "points",
        points
    );

}


// RIWAYAT PENGELUARAN

function updateExpenseHistory() {

    historyList.innerHTML = "";


    if (
        expenses.length === 0
    ) {

        historyList.innerHTML = `
            <p class="empty">
                Belum ada pengeluaran.
            </p>
        `;

        transactionCount.textContent =
            "0 transaksi";

        return;

    }


    expenses.forEach(
        function (expense, index) {

            let categoryName;


            if (
                expense.category ===
                "food"
            ) {

                categoryName =
                    "Makanan & Minuman";

            }

            else if (
                expense.category ===
                "entertainment"
            ) {

                categoryName =
                    "Hiburan";

            }

            else {

                categoryName =
                    "Barang";

            }


            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "history-item"
            );


            item.innerHTML = `

                <div>

                    <span
                        class="history-category"
                    >
                        ${categoryName}
                    </span>

                    <br>

                    <small>
                        Transaksi #${index + 1}
                    </small>

                </div>


                <span
                    class="history-price"
                >
                    - ${formatRupiah(
                        expense.amount
                    )}
                </span>

            `;


            historyList.appendChild(
                item
            );

        }
    );


    transactionCount.textContent =
        expenses.length +
        " transaksi";

}


// RIWAYAT PEMASUKAN

function updateIncomeHistory() {

    historyList.innerHTML = "";


    if (
        incomes.length === 0
    ) {

        historyList.innerHTML = `
            <p class="empty">
                Belum ada pemasukan.
            </p>
        `;

        transactionCount.textContent =
            "0 transaksi";

        return;

    }


    incomes.forEach(
        function (income, index) {

            let categoryName;


            if (
                income.category ===
                "salary"
            ) {

                categoryName =
                    "Gaji";

            }

            else if (
                income.category ===
                "tip"
            ) {

                categoryName =
                    "Slip / Tip";

            }

            else {

                categoryName =
                    "Uang Jajan";

            }


            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "history-item"
            );


            item.innerHTML = `

                <div>

                    <span
                        class="history-category"
                    >
                        ${categoryName}
                    </span>

                    <br>

                    <small>
                        Transaksi #${index + 1}
                    </small>

                </div>


                <span
                    class="history-price income-price"
                >
                    + ${formatRupiah(
                        income.amount
                    )}
                </span>

            `;


            historyList.appendChild(
                item
            );

        }
    );


    transactionCount.textContent =
        incomes.length +
        " transaksi";

}


// UPDATE SALDO

function updateBalance() {

    const balance =
        getBalance();


    miniBalance.textContent =
        formatRupiah(balance);


    updateBalanceImage();

}

// START

showExpenseMode();

updateBalance();