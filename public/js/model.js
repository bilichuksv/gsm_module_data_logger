'use strict';
(function(){
	var model = function () { 
		function getData (){
			 return $.get( "js/data.json", function(data) {
				 console.log("Initial data is loaded");
				 return data;
			 })
		}
		
		
		function getDateFormat (date) {
			var tmpDate = new Date(date);
			var tmpDateMonth = ((tmpDate.getMonth() > 9)? (tmpDate.getMonth() + 1):('0'+(tmpDate.getMonth() + 1)));
			return tmpDate.getFullYear() + "/" +
			   tmpDateMonth + "/" +
			   tmpDate.getDate();
		};

		function modifyData (data) {
			var modifiedData = data.map(function (item, index) {
				return {
					name : item.name,
					price : `Цена: ${item.price}грн`,
					popular : (item.popular)? `пользуется популярностью`: `не пользуется популярностью`,
					date : getDateFormat(item.date),
					id : index + 1
				 };
			});
			return modifiedData;
		};
	
		function saveData(item) {
			console.log("Data successfuly saved: ");
			console.log(item);
		}
		
		function updateData(data) {
			let flag = 1;
			data[0].forEach(function(item,index){
				if (item.id == data[1].id) {
					flag = 0;
					data[0][index]=data[1];
				} 
			});
			if (flag) {
				data[1].id = data[0].length-1;
				data[0].push(data[1]);
			};
			
			console.log("Data successfuly updated: " + data.counter);
			console.log(items);
			//this.eventHolder.trigger( updatedEventName, [{counter: this.counter++}]);
			return data[0];
		}
		
		//let updatedEventName = "updated";
		
		return {
			getData : getData,
			saveData: saveData,
			updateData: updateData,
			modifyData: modifyData,
			//updatedEventName: updatedEventName;
		}
	}
	
	window.app = window.app || {};
	window.app.model = model();
}())