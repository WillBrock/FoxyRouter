/*
 * FoxyRouter
 * Lightweight javascript routing library for single page applications
 * https://github.com/WillBrock/FoxyRouter
 *
 * Copyright 2016 Will Brock
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 */
((context) => {
	`use strict`;

	class FoxyRouter {
		constructor() {
			// Stores all the routes for the application
			this.routes = [];
		}

		// Add new routes
		add(route, ...callbacks) {
			this.routes.push({
				path      : route,
				callbacks : callbacks || []
			});

			return this;
		}

		// Main function to rendor the route data
		render(active_route, search) {
			// Store any route parameters, if any
			let parameters = {};

			// Regex that will match values like :id, :user_id
			let route_regex   = /:[^\s(/|\-|\.)]+/g;
			let replace_regex = `[\\w-]+`;

			if(active_route.lastIndexOf(`/`) === active_route.length -1) {
				active_route = active_route.slice(0, -1);
			}

			// Find a matching route
			for(let route of this.routes) {
				let path      = route.path;
				let callbacks = route.callbacks;

				// Replace any parameters with regex to match the path
				let path_test     = path.replace(route_regex, replace_regex);
				let absolute_path = path.substring(0, active_route.length) === active_route;
				let match         = active_route.match(path_test) || absolute_path;

				// If there is no match for the current route
				if(!match) {
					continue;
				}

				if(!absolute_path) {
					// Get any keys and values that are in the route, e.g :id, :user_id, etc.
					let active_offset = 0;
					path.replace(route_regex, (match, offset) => {
						let index     = match.substr(1);
						active_offset = active_offset === 0 ? offset : active_offset;

						let route_match   = active_route.substr(active_offset - 1).match(replace_regex)[0];
						parameters[index] = route_match;

						active_offset = active_offset === 0 ? offset + route_match.length : active_offset + route_match.length + 2;
					});
				}

				// Check for any query parameters
				search.replace(/([^?=&]+)(=([^&]*))?/g, (match, key, foo, value) => {
					parameters[key] = decodeURIComponent(value);
				});

				// Trigger the callbacks
				for(let callback of callbacks) {
					callback(parameters);
				}

				return true;
			}

			// If we get here then no route was found
			return false;
		}
	}

	let Router = new FoxyRouter();

	if(typeof module != `undefined` && module.exports) {
		module.exports = Router;
	}
	else if(typeof define === `function` && define.amd) {
		define(Router);
	}
	else {
		context.FoxyRouter = Router;
	}

	// Handle history
	window.addEventListener(`popstate`, (e) => {
		render(window.location.pathname, window.location.search);
	});

	// Render the route on page load
	// This will also handle bookmarked links
	window.addEventListener(`load`, (e) => {
		let route  = window.location.pathname;
		let search = window.location.search;

		render(route, search);
		e.preventDefault();
	});

	// Route all clicks on link tags except for external links
	document.querySelector(`body`).addEventListener(`click`, (e) => {
		let target = e.target;

		// Only route on link tags
		if(target.tagName.toLowerCase() !== `a`) {
			return;
		}

		// Don't continue if it's an external link
		if(target.host !== window.location.host) {
			return;
		}

		// Render the route
		let rendered = render(target.pathname, target.search);

		// Don't refresh on internal links that have a route defined
		if(rendered) {
			e.preventDefault();
		}
	});

	/**
	 * Helper function to render routes
	 * @param  {String} Path of the route
	 * @param  {String} Query parameters
	 * @return {Boolean}
	 */
	function render(route, search = ``) {
		// Set the new path and search
		window.history.pushState({}, ``, `${route}${search}`);

		// Render the new route
		return Router.render(route, search);
	}

})(this);
