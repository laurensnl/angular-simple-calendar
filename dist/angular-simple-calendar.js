angular.module('simpleCalendar', []).directive('simpleCalendar', function () {
  return {
    restrict: 'E',
    scope: {
      options: '=?'
    },
    template: '<div class="calendar" ng-swipe-right="prevMonth()" ng-swipe-left="nextMonth()">' +
      '<div class="current-month">' +
      '<div class="move-month prev-month" ng-click="prevMonth()">' +
      '<span ng-show="allowedPrevMonth()" class="icon-arrow-left"></span>' +
      '</div>' +
      '<span>{{ selectedMonth }}</span>' +
      '&nbsp;' +
      '<span>{{ selectedYear }}</span>' +
      '<div class="move-month next-month" ng-click="nextMonth()">' +
      '<span ng-show="allowedNextMonth()" class="icon-arrow-right"></span>' +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div ng-repeat="day in weekDays(options.dayNamesLength) track by $index" class="weekday">{{ day }}</div>' +
      '</div>' +
      '<div>' +
      '<div ng-repeat="week in weeks track by $index" class="week">' +
      '<div class="day"' +
      'ng-class="{default: isDefaultDate(date), disabled: date.disabled || !date, active: date.active}"' +
      'ng-repeat="date in week  track by $index"' +
      'ng-click="onClick(date)">' +
      '<div class="day-number">{{ date.day || "&nbsp;" }}</div>' +
      ' </div>' +
      '</div>' +
      '</div>' +
      '</div>',
    controller: ['$scope', function ($scope) {
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      if($scope.options.firstDayIsMonday) { 
	      var WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; 
	      var offset = 1;
	  } else {
		  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		  var offset = 0;
	  }
	  
      var calculateSelectedDate, calculateWeeks, allowedDate;

      $scope.options = $scope.options || {};
      $scope.options.dayNamesLength = $scope.options.dayNamesLength || 1;
	  	  
	  minDate = new Date();
	  minDate.setDate(0); // don't know why, but this fixes the bug that the current date is disabled
	  
      $scope.onClick = function (date) {
        if (!date || date.disabled) { return; }
        date.active = !date.active;
		
		var clickedDate = date.year + '-' + date.month + '-' + date.day;
		var i = $scope.options.scope.indexOf(clickedDate);		
		if(i === -1) {
			$scope.options.scope.push(clickedDate);
		} else {
			$scope.options.scope.splice(i, 1);
		}
		
		$scope.options.dateClick(date);
      };

      allowedDate = function (date) {
        var currDate = new Date(date.year, date.month, date.day);
        if (currDate < minDate) { return false; }
        return true;
      };

      $scope.allowedPrevMonth = function () {
        var prevYear = null;
        var prevMonth = null;
        if (!minDate) { return true; }
        var currMonth = MONTHS.indexOf($scope.selectedMonth);
        if (currMonth === 0) {
          prevYear = ($scope.selectedYear - 1);
        } else {
          prevYear = $scope.selectedYear;
        }
        if (currMonth === 0) {
          prevMonth = 11;
        } else {
          prevMonth = (currMonth - 1);
        }
        if (prevYear < minDate.getFullYear()) { return false; }
        if (prevYear === minDate.getFullYear()) {
          if (prevMonth < minDate.getMonth()) { return false; }
        }
        return true;
      };

      $scope.allowedNextMonth = function () {
        return true;
      };

      calculateWeeks = function () {
        $scope.weeks = [];
        var week = null;
        var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();
        
        for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
          var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day - offset).getDay();
          week = week || [null, null, null, null, null, null, null];
          week[dayNumber] = {
            year: $scope.selectedYear,
            month: MONTHS.indexOf($scope.selectedMonth),
            day: day
          };

          if (!allowedDate(week[dayNumber])) {
            week[dayNumber].disabled = true;
          }
          
		  // highlight selected dates on month change
		  var currDay = week[dayNumber].year + '-' + week[dayNumber].month + '-' + week[dayNumber].day;
		  var i = $scope.options.scope.indexOf(currDay);
		  if(i != -1) {
		  	week[dayNumber].active = true;
		  }
			
          if (dayNumber === 6 || day === daysInCurrentMonth) {
            $scope.weeks.push(week);
            week = undefined;
          }
        }
      };

      calculateSelectedDate = function () {
        if ($scope.options.defaultDate) {
          $scope.options._defaultDate = new Date($scope.options.defaultDate);
        } else {
          $scope.options._defaultDate = new Date();
        }

        $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
        $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
        $scope.selectedDay   = $scope.options._defaultDate.getDate();
        calculateWeeks();
      };

      $scope.weekDays = function (size) {
        return WEEKDAYS.map(function(name) { return name.slice(0, size) });
      };

      $scope.isDefaultDate = function (date) {
        if (!date) { return; }
        return date.year === $scope.options._defaultDate.getFullYear() &&
          date.month === $scope.options._defaultDate.getMonth() &&
          date.day === $scope.options._defaultDate.getDate()
      };

      $scope.prevMonth = function () {
        if (!$scope.allowedPrevMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth);
        if (currIndex === 0) {
          $scope.selectedYear -= 1;
          $scope.selectedMonth = MONTHS[11];
        } else {
          $scope.selectedMonth = MONTHS[currIndex - 1];
        }
        calculateWeeks();
      };

      $scope.nextMonth = function () {
        if (!$scope.allowedNextMonth()) { return; }
        var currIndex = MONTHS.indexOf($scope.selectedMonth);
        if (currIndex === 11) {
          $scope.selectedYear += 1;
          $scope.selectedMonth = MONTHS[0];
        } else {
          $scope.selectedMonth = MONTHS[currIndex + 1];
        }
        calculateWeeks();
      };

      $scope.$watch('options.defaultDate', function() {
        calculateSelectedDate();
      });


    }]
  }
});
