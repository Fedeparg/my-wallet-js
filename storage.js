export function saveWallet(wallet) {
    localStorage.setItem("wallet", JSON.stringify(wallet.assets));
}

export function loadWallet() {
    return JSON.parse(localStorage.getItem("wallet"));
}
