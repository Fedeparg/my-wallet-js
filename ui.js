export function render(wallet, prices, onRemove) {
    const tbody = document.getElementById("assets_table");
    tbody.innerHTML = "";

    let distribution = wallet.distribution(prices);
    let table = wallet.assets.map(a => {
        let earnings = a.earnLose(prices[a.name]);

        return `<tr><td>${a.name}</td>
        <td>${a.quantity}</td>
        <td>${formatEur(a.buyPrice)}</td>
        <td>${formatEur(prices[a.name])}</td>
        <td class='${(earnings >= 0) ? "positive" : "negative"}'>${formatEur(earnings)}</td>
        <td>${formatPct(distribution[a.name])}</td>
        <td><button type="button" data-name=${a.name}>Remove</button></td>
        </tr>`
    });
    tbody.innerHTML = table.join("");
    let delButtons = tbody.querySelectorAll('button');

    delButtons.forEach((button) => {
        button.addEventListener("click",
            (event) => {
                // Get the name
                let name = button.dataset.name;
                // Find the element with that name in the wallet
                let asset = wallet.assets.find((asset) => asset.name == name);
                // Remove that element from the wallet
                onRemove(asset);
            })
    });


    const totalValue = document.getElementById("total_value");
    totalValue.innerHTML = `<p>Total assets: ${formatEur(wallet.totalValue(prices))}</p>`
}

function formatEur(value) {
    return Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function formatPct(value) {
    return Intl.NumberFormat("es-ES", { style: "percent", minimumFractionDigits: 2 }).format(value);
}
