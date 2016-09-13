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
// This route will mach a url like: /stocks/AAPL
FoxyRouter.add(`/stocks/:stock_symbol`, (parameters) => {
	document.getElementById(`page-container`).innerHTML = `You're viewing data for stock symbol: ${parameters.stock_symbol}`;
})
```

## Basic Route Paths

Paths can be any string along with regular expression patterns.

Route to the website index

```javascript
FoxyRouter.add(`/`, () => {
	document.getElementById(`page-container`).innerHTML = `This is the index`;
});
```

Route to the about page

```javascript
FoxyRouter.add(`/about`, () => {
	document.getElementById(`page-container`).innerHTML = `This is the about page`;
});
```

## Regular Expression Route Paths


## Route Parameters

Routes can also have dynamic parameters. These follow the same rules as express routes.

```javascript
FoxyRouter.add(`/triathlon/:race_name`, (parameters) => {
	// :race_name is the triathlon specified
	// e.g. /triathlon/Dunedin

	document.getElementById(`page-container`).innerHTML = `You are viewing the ${parameters.race_name} triathlon`;
});
```

```javascript
FoxyRouter.add(`triathlon/:race_name/:athlete, () => {
	// :race_name is the triathlon specified
	// e.g. /triathlon/Dunedin
	// :athlete is that persons data for the triathlon
	// e.g. /triathlon/Dunendin/Will_Brock

	document.getElementById(`page-container`).innerHTML = `You are viewing the ${parameters.race_name} triathlon for ${parameters.athlete}`;
});
```

## Query Parameters

All query parameters are merged into the route parameters argument

```javascript
	// e.g /stocks/AAPL?timeframe=weekly
	FoxyRouter.add('/stocks/:stock_symbol', (parameters) => {
		// parameters.stock_symbol = AAPL
		// parameters.timeframe = weekly
	});
```


## Route chaining

Adding new routes can be chained

```javascript
FoxyRouter
	.add(`/`, (parameters) => {

	})
	.add(`/about`, (parameters) => {

	})
	.add(`/about_us`, (parameters) => {

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
