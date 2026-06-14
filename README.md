# My Wallet JS

A simple crypto portfolio tracker built as a first hands-on practice with JavaScript.

Built from scratch in 24 hours, without LLMs. No frameworks, no libraries — just vanilla JS, HTML, and the CoinGecko public API.

## What it does

- Displays your crypto holdings in a table with live prices (fetched from CoinGecko)
- Shows current value, gain/loss per asset, and portfolio distribution
- Lets you add and remove assets
- Persists your portfolio in `localStorage`

## How to run

Open `index.html` in a browser. Due to CORS restrictions, you may need to serve it via a local server:

```bash
npx serve .
```
