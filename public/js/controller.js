(function(){

	var model = app.model;
	var Gallery = app.Gallery;
	var gallery = null;

	function bindSave() {
		gallery.saveDefer.then((item) => {
			model.saveData(item);
		});
	}
	
	function bindUpdate() {
		gallery.eventHolder.on(gallery.updateEventName, (event, data) => {
			gallery.items = model.updateData(data);
			gallery.buildGallery();
		});
	}

	function bindEvents(){
		bindSave();
		bindUpdate();
	}
	
	function initGallery(newData){
		gallery = new Gallery(newData);
	}

	function init() {
		model.getData().then((data) => {
			var newData = model.modifyData(data);
			initGallery(newData);
			bindEvents();
		});
	}
	init();

}())	