# Foxy Router

Lightweight javascript routing library for single page applications

## Features
	* Express style route matching
	* Bookmarking of links
	* Uses the history api instead of hashes

## Requirements

ES6. Use babel if you would like support prior to ES6.

## Quick Start

Registering a new route:

```javascript
// This route will match a url like: /stocks/AAPL
FoxyRouter.add(`/stocks/:stock_symbol`, (parameters) => {
	let text = `You're viewing data for stock symbol: ${parameters.stock_symbol}`;
	document.getElementById(`page-container`).innerHTML = text;
})
```

## Basic Route Paths

Paths can be any string along with regular expression patterns.

Route to the website index:

```javascript
FoxyRouter.add(`/`, () => {
	document.getElementById(`page-container`).innerHTML = `This is the index`;
});
```

Route to the about page:

```javascript
FoxyRouter.add(`/currency`, () => {
	document.getElementById(`page-container`).innerHTML = `This is the currency page`;
});
```

## Route Parameters

Routes can also have dynamic parameters prefixed with a semicolon(:).

```javascript
FoxyRouter.add(`/race_list/:race_id`, (parameters) => {
	// :race_id is the triathlon specified
	// e.g. /race_list/Dunedin

	let text = `You are viewing the ${parameters.race_id} triathlon`;
	document.getElementById(`page-container`).innerHTML = text;
});
```

```javascript
FoxyRouter.add(`race_list/:race_id/:athlete`, (parameters) => {
	// e.g. /race_list/Dunendin/Will_Brock

	let text = `You are viewing the ${parameters.race_id} triathlon for ${parameters.athlete}`;
	document.getElementById(`page-container`).innerHTML = text;
});
```

## Query Parameters

All query parameters are merged into the route parameters argument of the callback.

```javascript
	// e.g /stocks/AAPL?timeframe=weekly&chart_type=candlestick
	FoxyRouter.add('/stocks/:stock_symbol', (parameters) => {
		let text = `Viewing ${parameters.stock_symbol}, timeframe: ${parameters.timeframe}, chart type: ${parameters.chart_type}.`;
		document.getElementById(`page-container`).innerHTML = text;
	});
```


## Route chaining

Adding new routes can be chained.

```javascript
FoxyRouter
	.add(`/`, (parameters) => {

	})
	.add(`/stocks`, (parameters) => {

	})
	.add(`/bonds`, (parameters) => {

	});
```

## Callbacks

Multiple callbacks can be added for each route

```javascript
FoxyRouter
	.add('/stocks', (parameters) => {
		console.log(`Callback 1 for /stocks`);
	}, () => {
		console.log(`Callback 2 for /stocks`);
	});
```
