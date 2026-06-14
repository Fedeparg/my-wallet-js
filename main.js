import { Active, Wallet } from "./domain.js";
import { getPrices } from "./api.js";
import { render } from "./ui.js";
import { saveWallet, loadWallet } from "./storage.js";

let loadedWallet = loadWallet();
let wallet = new Wallet();

if (loadedWallet) {
    loadedWallet.forEach((asset) => wallet.addAsset(new
        Active(asset.name, asset.quantity, asset.buyPrice)));
} else {
    let bitcoin = new Active("bitcoin", 1, 50);
    let ethereum = new Active("ethereum", 1, 30);

    wallet.addAsset(bitcoin);
    wallet.addAsset(ethereum);
}
setInterval(refresh, 60000);
updateView();

const form = document.getElementById("form_new_asset")
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let quantity = Number(document.getElementById("quantity").value);
    let buyPrice = Number(document.getElementById("buyPrice").value);
    console.log(name);

    let errorPlacement = document.getElementById("error_message");
    errorPlacement.innerHTML = ""

    let newAsset = new Active(name, quantity, buyPrice);
    if (!wallet.addAsset(newAsset)) {
        errorPlacement.innerHTML = `Asset: ${newAsset.name} not added.`;
        console.log(`Asset: ${newAsset.name} not added.`); // Could be improved, but good enough
    } else {
        let prices = await updateView();
        if (!prices[newAsset.name]) {
            errorPlacement.innerHTML = `Asset ${newAsset.name} does not exist on CoinGecko.`;
            wallet.removeAsset(newAsset)
            updateView();
        }
    }
});

function onRemove(asset) {
    wallet.removeAsset(asset);
    updateView();
}

async function updateView() {
    let prices = await refresh();
    saveWallet(wallet);
    return prices;
}

async function refresh() {
    let newPrices = await getPrices(wallet.assets.map((asset) => asset.name));
    render(wallet, newPrices, onRemove);
    return newPrices;
}
