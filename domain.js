export class Active {
    constructor(name, quantity, buyPrice) {
        this.name = String(name);
        this.quantity = Number(quantity);
        this.buyPrice = Number(buyPrice);
    }

    currentValue(marketValue) {
        return marketValue * this.quantity;
    }

    earnLose(marketValue) {
        return (Number(marketValue) - this.buyPrice) * this.quantity
    }
}

export class Wallet {
    constructor() {
        this.assets = []
    }

    addAsset(asset) { // Returns True if the asset is inserted. False if asset with same name already in array
        let alreadyInsertedAsset = this.assets.find((insertedAsset) => insertedAsset.name == asset.name);
        if (alreadyInsertedAsset != undefined) {
            return false;
        }
        this.assets.push(asset);
        return true;
    }

    removeAsset(asset) {
        let indexToRemove = this.assets.findIndex((walletAsset => asset == walletAsset))
        this.assets.splice(indexToRemove, 1);
    }

    totalValue(prices) { // Assume dict with Active.name - Active.marketValue
        const sumTotal = this.assets.reduce((accumulator, currentValue) => accumulator + currentValue.currentValue(prices[currentValue.name]), 0);
        return sumTotal;
    }

    distribution(prices) {
        const sumTotal = this.totalValue(prices);
        if (sumTotal == 0) {
            return;
        }
        const mapping = this.assets.map(p => [p.name, p.currentValue(prices[p.name]) / sumTotal]);

        const distribution = Object.fromEntries(mapping);
        return distribution;
    }
}
