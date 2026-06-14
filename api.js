export async function getPrices(ids) {
    const idsPlain = ids.join(",");
    let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${idsPlain}&vs_currencies=eur`);
    if (!response.ok) {
        throw new Error(`API fetch failed with status: ${response.status} - ${response.statusText}`);
    }
    let prices = Object.entries(await response.json());

    prices = Object.fromEntries(prices.map(p => [p[0], p[1].eur]))
    return prices
}
