(function () {

	function CategorySwitcher() {

		this.init();

	}

	CategorySwitcher.prototype = {

		setCategory: function (name) {

			this.category = name;

		},

		normaliseIndex: function (index) {

			if (index > 0) {

				this.categoryList[this.category].currentIndex = index - this.categoryList[this.category].total;

			} else if (index <= (this.categoryList[this.category].total * -1)) {

				this.categoryList[this.category].currentIndex = 0;

			}

		},

		showIndex: function (targetIndex) {

			var moveWidth = targetIndex * this.sliceWidth;

			window.TweenLite.to(this.layers['bottom'], 0, {
				backgroundPosition: moveWidth + "px " + this.categoryList[this.category].posY + "px",
				onComplete: function () {

					window.TweenLite.to(this.layers['top'], 1, {
						opacity: 0,
						onComplete: function () {

							window.TweenLite.to(this.layers['top'], 0, {
								opacity: 1,
								backgroundPosition: moveWidth + "px " + this.categoryList[this.category].posY + "px"
							});

						}.bind(this)
					});

				}.bind(this)
			});

		},

		attachEventListeners: function () {

			this.nav['previous'].addEventListener('click', function (e) {

				this.categoryList[this.category].currentIndex = this.categoryList[this.category].currentIndex + 1;

				this.normaliseIndex(this.categoryList[this.category].currentIndex);

				this.showIndex(this.categoryList[this.category].currentIndex);

			}.bind(this));

			this.nav['next'].addEventListener('click', function (e) {

				this.categoryList[this.category].currentIndex = this.categoryList[this.category].currentIndex - 1;

				this.normaliseIndex(this.categoryList[this.category].currentIndex);

				this.showIndex(this.categoryList[this.category].currentIndex);

			}.bind(this));

			this.btnToggleCategory.addEventListener('click', function (e) {

				this.category = this.category.toLowerCase() === 'cat_a' ? 'Cat_B' : 'Cat_A';

				this.infoCategory.value = this.category;

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

			this.sliceWidth = 100;
			this.sliceHeight = 330;

			this.categoryList = {
				'Cat_A': {
					currentIndex: 0,
					total: 6,
					posY: 0
				},
				'Cat_B': {
					currentIndex: 0,
					total: 4,
					posY: -this.sliceHeight
				}
			};

			this.setCategory('Cat_A');

			this.infoCategory = document.querySelector('.info-category');

			this.btnToggleCategory = document.querySelector('button.toggle-category');

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