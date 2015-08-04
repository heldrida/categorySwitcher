(function () {

	function CategorySwitcher() {

		this.init();

	}

	CategorySwitcher.prototype = {

		showIndex: function (targetIndex) {

			var moveWidth = targetIndex * this.sliceWidth;

			window.TweenLite.to(this.layers['bottom'], 0, {
				backgroundPosition: moveWidth + "px 0px",
				onComplete: function () {

					window.TweenLite.to(this.layers['top'], 1, {
						opacity: 0,
						onComplete: function () {

							window.TweenLite.to(this.layers['top'], 0, {
								opacity: 1,
								backgroundPosition: moveWidth + "px 0px"
							});

						}.bind(this)
					});

				}.bind(this)
			});

		},

		attachEventListeners: function () {

			this.nav['previous'].addEventListener('click', function (e) {

				this.currentIndex = this.currentIndex - 1;

				this.showIndex(this.currentIndex);

			}.bind(this));

			this.nav['next'].addEventListener('click', function (e) {

				this.currentIndex = this.currentIndex + 1;

				this.showIndex(this.currentIndex);

			}.bind(this));

		},

		setVars: function () {

			this.module = document.querySelector('#category-switcher');

			this.container = this.module.querySelector('.container');

			this.layers = {
				'top': this.module.querySelector('.layer-2'),
				'bottom': this.module.querySelector('.layer-1')
			};

			this.nav = {
				'previous': this.module.querySelector('button.prev'),
				'next': this.module.querySelector('button.next')
			};

			this.currentIndex = 1;

			this.sliceWidth = 100;

			this.total = 6;

		},

		init: function () {

			this.setVars();

			this.attachEventListeners();

		}

	};


	// create instance
	var categorySwitcher = new CategorySwitcher();

	window.categorySwitcher = categorySwitcher;

})();