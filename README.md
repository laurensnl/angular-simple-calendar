# angular-simple-calendar

Simple customizable AngularJS calendar with no dependencies. Supports simple events (only date and title).


## Install

Install via bower:

```bash
bower install --save https://github.com/laurensnl/angular-simple-calendar
```

Add to index.html:

```html
<link rel="stylesheet" href="bower_components/angular-simple-calendar/dist/angular-simple-calendar.css">
<script type="text/javascript" src="bower_components/angular-simple-calendar/dist/angular-simple-calendar.js"></script>
```

Inject ``'simpleCalendar'`` into your main module:

```javascript
angular.module('App', [
  // ... other dependencies
  'simpleCalendar'
])
```

## Usage

Add ``<simple-calendar events="events" options="calendarOptions"></simple-calendar>`` directive to your html file.

Simple calendar takes a few options:

```javascript
app.controller('UsersIndexController', ['$scope', function($scope) {
  // ... code omitted ...
  // Dates can be passed as strings or Date objects 
  $scope.calendarOptions = {
    defaultDate: "2016-10-10",
    firstDayIsMonday: true,
    scope: modal.data.selectedDates,
    dayNamesLength: 1, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
    dateClick: function() { ... }
  };
}]);
```

The dateClick function will get an object with data about clicked date:

```javascript
{
  year: 2014,
  month: 0, // Regular JS month number, starts with 0 for January
  day: 23,
  event: { // event will only be added for dates that have an event.
    title: "Some event",
    date: [Date Object]
  }
}
```



## License

MIT Licensed

Copyright (c) 2014, [500Tech](http://500tech.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
