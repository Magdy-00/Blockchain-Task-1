# Blockchain-Task-1

## Currency Converter

### Student Information
**الاسم:** مجدي ياسر محمود خليل <br>
**كزد:** 220100403  
**سكشن:** 3  

---

## Overview
This Task is a cryptocurrency converter that allows conversion between different cryptocurrencies based on their exchange rates against USD. The conversion rates are dynamically updated, and event handling is used for operations like showing conversion rates and updating prices.

---

## Features
- Reads cryptocurrency exchange rates from a JSON file.
- Calculates direct conversion rates between cryptocurrencies.
- Uses event-driven programming to handle price updates and conversion requests.
- Supports dynamic updates of USD-based cryptocurrency prices.

---

## Installation & Setup
1. Ensure you have **Node.js** installed on your system.
2. Clone or download the project files.
3. Place the `rates.json` file in the project directory.
4. Install necessary dependencies if required (though this project primarily uses built-in Node.js modules).

---

## Usage
### Running the Script
Execute the script using Node.js:
```sh
node Lab1.js
```

### Events
The project uses the `EventEmitter` class to handle events:
- **SHOW_PRICE**: Displays the conversion rate between two cryptocurrencies.
- **UPDATE_USD_PRICE**: Updates the USD price of a specific cryptocurrency.

Example usage:
```js
cnv.emit(SHOW, { from: "ETH", to: "BTC" });
cnv.emit(UPDATE, { sym: "BTC", usdPrice: 50000 });
```

---

## JSON File Structure
The `rates.json` file should be structured as follows:
```json
{
  "rates": [
    { "asset_id_quote": "BTC", "rate": 45000 },
    { "asset_id_quote": "ETH", "rate": 3000 },
    { "asset_id_quote": "LTC", "rate": 150 }
  ]
}
```

---

## Functions
### `readJsonFromFile(fileName)`
Reads and parses a JSON file.

### `CurrencyConverter.calculateRates(usdPrices)`
Calculates conversion rates between all supported cryptocurrencies.

### `CurrencyConverter.convert(amount, fromUnits, toUnits)`
Converts an amount from one cryptocurrency to another.

---
