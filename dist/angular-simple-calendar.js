/**=========================================================
 * Module: new-requests.controller.js
 * http://onehungrymind.com/build-angularjs-wizard-redux/
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.requests')
        .controller('NewRequestsController', NewRequestsController);

    NewRequestsController.$inject = ['$timeout', 'Autocomplete'];
    
    function NewRequestsController($timeout, Autocomplete) {
 		var modal = this;
 		
        activate();	

        ////////////////        

        function activate() {
	        modal.autocompleteAirports	= function(q) { return Autocomplete.Airports(q); };
	        
	        // Modal definition functions
			modal.steps = ['flight', 'date', 'confirm', 'pay', 'success'];
			modal.step = 1;  ////////// TEMP
			modal.data = {};
			
			// Modal functions
			modal.isCurrentStep = function(step) {
			    return modal.step === step;
			};
			
			modal.setCurrentStep = function(step) {
			    modal.step = step;
			};
			
			modal.getCurrentStep = function() {
			    return modal.steps[modal.step];
			};			
			
			modal.isFirstStep = function() {
			    return modal.step === 0;
			};
			
			modal.isLastStep = function() {
			    return modal.step === (modal.steps.length - 1);
			};
			
			modal.getNextLabel = function() {
				if (modal.isCurrentStep(0)) return 'Pick date';
				if (modal.isCurrentStep(1)) return 'Next';
				if (modal.isCurrentStep(2)) return 'Confirm';
				if (modal.isCurrentStep(3)) return 'Next';
				if (modal.isCurrentStep(4)) return 'Close';
			};
			
			modal.handlePrevious = function() {
			    modal.direction = 'previous';
				$timeout(function() {
					modal.step -= (modal.isFirstStep()) ? 0 : 1;
				}, 1);
			    
			};
			
			modal.handleNext = function() {
			    if (modal.isLastStep()) {
			        $modalInstance.close(modal.wizard);
			    } else {
			        modal.direction = 'next';
					$timeout(function() {
						 modal.step += 1;
					}, 1);			        
			    }
			};
			
			modal.selectAirport = function(airport) {
				Autocomplete.AirportsHistory.Push(airport.icao);
				modal.focus = 'to';
			};
			
			
			// Validation
			
			// step 0 - flight
			modal.isValid = function () {
				if (modal.isCurrentStep(0)) {
					if (modal.data.flightnr || (modal.data.from && modal.data.to)) return true;
				}
			}
			
			
			// Calendar
			var today = new Date();
			var yesterday = new Date();
			yesterday.setDate(-1);
			
			modal.calendarOptions = {
				firstDayIsMonday: true,
				defaultDate: today,
				minDate: yesterday,
				dayNamesLength: 1, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
				dateClick: function(date) { console.log(date) }
			};
			
			modal.dateClick = function(date) {
				console.log(date);
			};
			

						
        };
    }  
    
})();
