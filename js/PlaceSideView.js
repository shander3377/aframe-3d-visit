AFRAME.registerComponent("side-view", {
	createPlaceThumbnail: function (pos, id) {
		const el = document.createElement("a-entity");
		el.setAttribute("visible", true);
		el.setAttribute("id", `place-${id}`);
		el.setAttribute("geometry", { primitive: "circle", radius: 2.5 });
		el.setAttribute("material", { src: `assets/helicopter.png`, opacity: 0.9 });
		el.setAttribute("position", pos);
		el.setAttribute("cursor-listener", {});
		return el;
	},

	createPlaces: function () {
		const side_view_container = document.querySelector("#side-view-container");
		let previousXposition = -150;
		let previousYposition = 10;

		for (var i = 1; i <= 4; i++) {
			var pos = {
				x: (previousXposition += 50),
				y: (previousYposition += 2),
				z: -40,
			};
			const el = this.createPlaceThumbnail(pos, i);
			side_view_container.appendChild(el);
		}
	},

	init: function () {
		this.createPlaces();
	},

	tick: function () {
		var places_container = document.querySelector("#places-container");
		var { state } = places_container.getAttribute("tour");
		if (state === "view" || state === "change_view") {
            this.el.setAttribute("visible", true);
		} else {
			this.el.setAttribute("visible", false);
		}
	},


});
