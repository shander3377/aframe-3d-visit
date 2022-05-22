AFRAME.registerComponent("cursor-listener", {
	schema: {
		selectedItemId: { default: "", type: "string" },
	},
	init: function () {
		this.handleMouseEnterEvents();
		this.handleMouseLeaveEvents();
		this.handleMouseClick();
	},

	handlePlacesListState: function () {
		console.log(this.el)
		const id = this.el.getAttribute("id");
		console.log(id)
		const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
		if (placesId.includes(id)) {
			const placeContainer = document.querySelector("#places-container");
			placeContainer.setAttribute("cursor-listener", {
				selectedItemId: id,
			});
			this.el.setAttribute("material", {
				color: "#D76B30",
				opacity: 1,
			});
			var title = this.el.querySelector("#title");
			title.setAttribute("text", {
				color: "orange",
			});
		}
	},
	handleMouseEnterEvents: function () {
		// Mouse Enter Events
		this.el.addEventListener("mouseenter", () => {

			this.handlePlacesListState();
		});
	},
	handleMouseLeaveEvents: function () {
		// Mouse Leave Events
		this.el.addEventListener("mouseleave", () => {
			const selectedItemId = this.data.selectedItemId;
			if (selectedItemId) {
				const el = document.querySelector(`#${selectedItemId}`);
				var id = el.getAttribute("id");
				if (id === selectedItemId) {
					el.setAttribute("material", {
						color: "blue",
						opacity: 1,
					});
					var title = el.querySelector("#title");
					title.setAttribute("text", {
						color: "black",
					});
				}
			}
		});
	},

	handleMouseClick: function () {
		this.el.addEventListener("click", (e) => {
			console.log("mouse clcik")
			var placesContainer = document.querySelector("#places-container");
			var { state } = placesContainer.getAttribute("tour");
			if (state === "places-list") {
				var id = this.el.getAttribute("id");
				const placesId = [
					"taj-mahal",
					"budapest",
					"new-york-city",
					"eiffel-tower",
				];
				if (placesId.includes(id)) {
					placesContainer.setAttribute("tour", {
						state: "view",
						selectedCard: id,
					});
				}
			}
			if (state === "view" || state === "change_view") {
				this.handleViewState()
			}
		});
	},

	handleViewState: function () {
		const el = this.el;
	console.log(el)
		const id = el.getAttribute("id");
		console.log(id)
		var places_container = document.querySelector("#places-container");
		const { selectedItemId } = places_container.getAttribute("cursor-listener");
		const places_views_list = ["place-1", "place-2", "place-3", "place-4"];
		if (places_views_list.includes(id)) {
			places_container.setAttribute("tour", { state: "change_view" });
		}
		const sky = document.querySelector("#main-container");
		sky.setAttribute("material", {
            src: `assets/360_images/${selectedItemId}/${id}.jpg`,
            color: "white"
		});
	},


});
