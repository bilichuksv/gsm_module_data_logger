'use strict';
(function() {

	function Gallery (items) {
		this.DOMElements = {
		headText : document.querySelector("#headText"),
		mainBtn : document.querySelector("#mainBtn"),
		itemsContainer : document.querySelector("#itemsContainer"),
		nameInput : document.querySelector("#nameInput"),
		priceInput : document.querySelector("#priceInput"),
		popularInput : document.querySelector("#popularInput"),
		dateInput : document.querySelector("#dateInput"),
		errMsg : document.querySelector("#errMsg")
	};
		
	this.saveDefer = $.Deferred();
	this.items = items;
	this.itemChanges = {};
	this.itemContainer;
	this.counter = 0;
	this.data = [];
	this.eventHolder = $({});
	this.updateEventName = "update";
	this.init();
	//this.formStatus = "ADD";
	this.add = {
		head: "Добавить телефон",
		btn: "Добавить"
	}, this.change = {
		head: "Редактировать телефон",
		btn: "Сохранить изменения"
	};
	}
	
	Gallery.prototype = {
		init : function () {
			this.buildGallery();
			this.initListeners();
		},
		
		
		getItemTemplate : function (item) {
			return `<div class="itemContainer col-md-6 radius">\
                                <div class="info-wrapper col-md-6">\
                                    <div class="text-muted text-center">${item.name}</div>\
									<div class="text-muted text-center">${item.price}</div>\
                                    <div class="text-muted text-center">${item.popular}</div>\
                                    <div class="text-muted text-center">${item.date}</div>\
                                </div>\
								<div class="text-muted text-center col-md-6" align="center"><button  class="btn btn-default " type="button" id="${item.id}">Редактировать</button></div>\
                           </div>`;
		},
		
		getChangedTempl : function (item) {
			return `<div class="info-wrapper col-md-6">\
                                    <div class="text-muted text-center">${item.name}</div>\
									<div class="text-muted text-center">${item.price}</div>\
                                    <div class="text-muted text-center">${item.popular}</div>\
                                    <div class="text-muted text-center">${item.date}</div>\
                                </div>\
								<div class="text-muted text-center col-md-6" align="center"><button  class="btn btn-default " type="button" id="${item.id}">Редактировать</button></div>`
		},
		
		buildGallery : function () {
			this.clearForm();
			console.log("Gallery is ready");
			//console.log(this.items);
			this.DOMElements.itemsContainer.innerHTML ='';
			this.items.forEach(function(item) {
			var itemTemplate = this.getItemTemplate(item);
			this.DOMElements.itemsContainer.innerHTML += itemTemplate;
			}.bind(this));
		},
		
		readForm : function (event) {
			return {
				   name : this.DOMElements.nameInput.value,
				  price : this.DOMElements.priceInput.value,
				popular : this.DOMElements.popularInput.value,
				   date : this.DOMElements.dateInput.value,
					  id: event.target.id
			};
		},
		
		fillForm : function (item) {
			//console.log("fillForm");
			 this.DOMElements.nameInput.value = item.name;
			 this.DOMElements.priceInput.value = item.price;
			 this.DOMElements.popularInput.value = item.popular;
			 this.DOMElements.dateInput.value = item.date
		},
		
		setFormStatus : function(status) {
			console.log("setFormStatus");
			this.DOMElements.headText.innerHTML = status.head;
			this.DOMElements.mainBtn.innerHTML = status.btn;
		},
		
		showErrorMsg : function (status, text) {
			this.DOMElements.errMsg.style.display = status;
			this.DOMElements.errMsg.innerHTML = text;
		},
		
		clearForm : function() {
			this.DOMElements.nameInput.value = "";
			 this.DOMElements.priceInput.value = "";
			 this.DOMElements.popularInput.value = "";
			 this.DOMElements.dateInput.value = ""
		},

		findChangedItem : function (event) {
			this.itemContainer = event.target.closest(".itemContainer");
			if(event.target.type == "button") {
				//console.log("itemButton");
				return this.items.filter(function(item) {
					return item.id == event.target.id;
				});
			}
		},
		
		makeChangesItem : function (readData) {
			let replacedItem = this.getChangedTempl(readData);
			//this.itemContainer.innerHTML = replacedItem;
			return [this.items, replacedItem];
		}.bind(this),
		
		validateEmpty : function () {
			this.showErrorMsg("none")
			if(this.DOMElements.nameInput.value 
				&& this.DOMElements.priceInput.value 
				&& this.DOMElements.popularInput.value 
				&& this.DOMElements.dateInput.value) {
				return true;
			} else {
				this.showErrorMsg("block","Заполните все поля пожалуйста");
				return false;
			}
		},
			
		initListeners : function () {
			
			this.DOMElements.itemsContainer.addEventListener("click", (event) => {
				//console.log("clicked itemsConteiner");
				let itemToChange = this.findChangedItem(event);
				//console.log(itemToChange);
				this.fillForm(itemToChange[0]);
				this.setFormStatus(this.change);
				
			});
			
			this.DOMElements.mainBtn.addEventListener("click", (event) => {
				//this.validateEmpty();
				//console.log("mainBtn has pressed");
				this.data[0] = this.items;
				this.data[1] = this.readForm(event);
				//let data = this.makeChangesItem(this.readForm(event));
				this.eventHolder.trigger( this.updateEventName, this.data);
				this.setFormStatus(this.add);
				this.clearForm();
			});
		}
	}
			
	window.app = window.app || {};
	window.app.Gallery = Gallery;
			
}());