AFRAME.registerComponent("tour", {
	schema: {
		state: { type: "string", default: "places-list" },
		selectedCard: { type: "string", default: "#card1" },
	},

		init: function () {
			this.placesContainer = this.el;
			this.createCards();
		},

	hideElement: function (elList) {
		elList.map((el) => {
			el.setAttribute("visible", false);
		});
	},

	showView: function () {
		const { selectedCard } = this.data;
		var sky = document.querySelector("#main-container");
		sky.setAttribute("material", {
			src: `assets/360_images/${selectedCard}/place-0.jpg`,
			color: "white",
		})

	},
	tick: function () {
		var { state } = this.data
		if (state === "view") {
			this.hideElement([this.placesContainer])
			this.showView()
} 
},
	createCards: function () {
		const thumbNailsRef = [
			{
				id: "taj-mahal",
				title: "Taj Mahal",
				url: "./assets/thumbnails/taj_mahal.png",
			},
			{
				id: "budapest",
				title: "Budapest",
				url: "./assets/thumbnails/budapest.jpg",
			},

			{
				id: "eiffel-tower",
				title: "Eiffel Tower",
				url: "./assets/thumbnails/eiffel_tower.png",
			},
			{
				id: "new-york-city",
				title: "New York City",
				url: "./assets/thumbnails/new_york_city.png",
			},
		];
		let prevoiusXPosition = -60;

		for (var item of thumbNailsRef) {
			const posX = prevoiusXPosition + 25;
			const posY = 10;
			const posZ = -40;
			const position = { x: posX, y: posY, z: posZ };
			prevoiusXPosition = posX;

			// Border Element
			const borderElement = this.createBorder(position, item.id);

			// Thumbnail Element
			const thumbnailElement = this.createThumdnail(item);
			borderElement.appendChild(thumbnailElement);

			// Title Text Element
			const titleElement = this.createTitle(position, item, item.id);

			// titleElement.setAttribute("position", titlepos)

			borderElement.appendChild(titleElement);

			this.placesContainer.appendChild(borderElement);
		}
	},
	createBorder: function (pos, id) {
		const entityElement = document.createElement("a-entity");
		entityElement.setAttribute("id", id);
		entityElement.setAttribute("visible", true);
		entityElement.setAttribute("geometry", {
			primitive: "ring",
			radiusInner: 9,
			radiusOuter: 10,
		});
		entityElement.setAttribute("position", pos);
		entityElement.setAttribute("material", { color: "blue", opacity: 1 });
		entityElement.setAttribute("cursor-listener", {});
		// entityElement.setAttribute({
		// 	"id": id,
		// 	"visible": true,
		// 	"geometry": { "primitive": "ring", "radiusInner": 9, "radiusOuter": 10 },
		// 	"position": pos,
		// 	"material": { "color": "blue", "opacity": 1 },
		// });

		return entityElement;
	},

	createThumdnail: function (item) {
		const thumbnailElement = document.createElement("a-entity");
		thumbnailElement.setAttribute("visible", true);
		thumbnailElement.setAttribute("geometry", {
			primitive: "circle",
			radius: 9,
		});
		thumbnailElement.setAttribute("material", { src: item.url });

		// thumbnailElement.setAttribute({
		// 	"visible": true,
		// 	"geometry": { primitive: "circle", radius: 9 },
		// 	"material": { src: item.url },
		// });

		return thumbnailElement;
	},

	createTitle: function (pos, item, id) {
		const titleElement = document.createElement("a-entity");
		var positions = pos;
		positions.y = -20;
		titleElement.setAttribute("visible", true);
		titleElement.setAttribute("position", positions);
		titleElement.setAttribute("text", {
			value: item.title,
			color: "black",
			width: 70,
			align: "center",
			font: "exo2bold",
		});
		titleElement.setAttribute("id", "title");

		titleElement.setAttribute("cursor-listener", {});

		// titleElement.setAttribute({
		// 	"visible": true,
		// 	"position": positions,
		// 	"text": {
		// 		value: item.title,
		// 		color: "black",
		// 		width: 70,
		// 		align: "centre",
		// 		font: "exo2bold",
		// 	},
		// });
		return titleElement;
	},
});
