// Models in js/data.js
// It contains data for Lidl Stores in Luxembourg and custom Google Maps styles.


// Google Maps Custom Markers.
// Based on the Udacity Google Maps API course.
// Function makeMarkerIcon takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
// https://developers.google.com/maps/documentation/javascript/custom-markers
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
        markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


// Store has all the data for a store location.
var Store = function(data) {

    // Avoid the need to track this altogether, this is the current execution
    // context of a function. Our viewmodel’s constructor copies a reference
    // to this into variable self, we can then use self throughout our
    // viewmodel. self is always going to map to the ViewModel.
    var self = this;

    // The data comes from observable array storeLocationsList.
    this.title = ko.observable(data.title);
    // console.log('this.title: ' + this.title);  // returns a function
    // console.log('this.title: ' + this.title());  // returns the value
    this.lat = ko.observable(data.lat);
    // console.log('this.lat: ' + this.lat());
    this.lng = ko.observable(data.lng);
    // http://knockoutjs.com/documentation/computedObservables.html
    this.position = ko.computed(function() {
        return new google.maps.LatLng(this.lat(), this.lng());
    }, this);
    // console.log('this.postion: ' + this.position());
    this.place_id = ko.observable(data.place_id);
    // console.log('this.place_id: ' + this.place_id());
    this.address = ko.observable(data.address);
    // console.log('this.address: ' + this.address());
    this.country = ko.observable(data.country);
    // console.log('this.country: ' + this.country());
    this.currentWeather = ko.observable('problems retrieving data.');
    // console.log('currentWeather: ' + self.currentWeather());
    this.contentString = ko.computed(function() {
        return '<div id="content"><strong>' + self.title() + '</strong>' +
            // '<br>' +
            // '<br><strong>latitude:  </strong>' + self.lat() +
            // '<br><strong>longitude:  </strong>' + self.lng() +
            // '<br><strong>place_id:  </strong>' + self.place_id() +
            '<br>' +
            '<br><strong>Address: </strong>' + self.address() +
            '<br><strong>Country: </strong>' + self.country() +
            '<br>' +
            '<br><strong>Weather: </strong>' + self.currentWeather() +
            '<br>Powered by <a href="http://openweathermap.org/">OpenWeatherMap</a>' +
            '</div>';
    });
    // console.log('contentString: ' + self.contentString());

    // Create a Google Maps Marker, they will drop from the top of the map
    // to its final location when first placed on the map.
    // https://developers.google.com/maps/documentation/javascript/markers
    this.googleMapsMarker = new google.maps.Marker({
        // LatLng is a point in geographical coordinates: latitude and longitude.
        // https://developers.google.com/maps/documentation/javascript/reference#LatLng
        // position: new google.maps.LatLng(this.lat(), this.lng()),
        position: self.position(),
        map: googleMapsMap,
        animation: google.maps.Animation.DROP,
        icon: googleMapsDefaultIcon,
        title: self.title()  // The marker's title will appear as a tooltip.
    });

    // Animate a Marker
    // https://developers.google.com/maps/documentation/javascript/markers#animate
    this.animateMarker = function() {
        if (self.googleMapsMarker.getAnimation() !== null) {
            self.googleMapsMarker.setAnimation(null);
        } else {
            self.googleMapsMarker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.googleMapsMarker.setAnimation(null);
            }, 1400);
        }
    };

    // Create a Google Maps Info Window.
    // https://developers.google.com/maps/documentation/javascript/infowindows
    // https://developers.google.com/maps/documentation/javascript/reference#InfoWindow

    // Get current temperature using the OpenWeatherMap API.
    // API call: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    // Using units=metric for temperature in Celsius.
    this.urlOpenWeatherMapAPI =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        self.lat() + '&lon=' + self.lng() + '&units=metric' +
        '&APPID=' + OpenWeatherMapAPIKey;
    // console.log('urlOpenWeatherMapAPI: ' + self.urlOpenWeatherMapAPI);

    $.getJSON(self.urlOpenWeatherMapAPI, function(data) {
        // console.log(data);
        // console.log('data.main.temp: ' + data.main.temp);
        self.currentWeather(data.main.temp + ' °C');
        // console.log(self.currentWeather());
    }).done(function(data) {
        return self.currentWeather();
    }).fail(function(error) {
        self.currentWeather('problems retrieving data.');
        console.log(self.currentWeather());
        return self.currentWeather();
    });

    // Clicking the marker opens the Info Window and adds animation.
    // Position is defined from the marker and opening this one will also close
    // the other info windows.
    self.googleMapsMarker.addListener('click', function() {
        self.animateMarker();
        googleMapsInfowindow.setContent(self.contentString());
        googleMapsInfowindow.open(googleMapsMap, this);
    });

    // Show the Info Window on clicking a marker.
    this.openInfoWindow = function(storeLocation) {
        google.maps.event.trigger(self.googleMapsMarker, 'click');
    };

    // Event Listeners on the Icons.
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    self.googleMapsMarker.addListener('mouseover', function() {
        this.setIcon(googleMapsHighlightedIcon);
    });
    self.googleMapsMarker.addListener('mouseout', function() {
        this.setIcon(googleMapsDefaultIcon);
    });

    // Selecting a store toggles the click event which opens the Info Window
    // and adds marker animation.
    this.toggleStoreLocation = function() {
        google.maps.event.trigger(self.googleMapsMarker, 'click');
    };

};


// ViewModel
function NagastoMapsViewModel() {

    // Avoid the need to track this altogether. Our viewmodel’s constructor
    // copies a reference to this into variable self, we can then use self
    // throughout our viewmodel. self is always going to map to the ViewModel.
    // http://knockoutjs.com/documentation/computedObservables.html#managing-this
    var self = this;

    // An observableArray tracks which objects are in the array, not the state
    // of those objects. We're adding the store locations from file data.js
    this.storeLocationsList = ko.observableArray([]);

    // OpenWeatherMap API Key.
    OpenWeatherMapAPIKey = '023e5bb6bf1f5b3e0a591507bbb9ff69';

    // Google Maps JavaScript API - Create the Map.
    // Using country Luxembourg to center the map properly, it's position
    // is lat: 49.815273, lng: 6.129583
    googleMapsMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: new google.maps.LatLng(49.815273, 6.129583),
        styles: mapStyleLunarLandscape
    });

    // Google Maps Custom Icons.
    // Styling for our default icon.
    googleMapsDefaultIcon = makeMarkerIcon('E1F7E7');
    googleMapsHighlightedIcon = makeMarkerIcon('02BEC4');
    // googleMapsHighlightedIcon = makeMarkerIcon('212121');
    googleMapsStatusNotOKIcon = makeMarkerIcon('F24150');

    // Google Maps JavaScript API - Create the Info Window.
    // https://developers.google.com/maps/documentation/javascript/infowindows
    // We only need one Google Maps Info Window, so we create just one InfoWindow
    // object and open it at different locations or markers upon map events,
    // such as user clicks (best practices).
    googleMapsInfowindow = new google.maps.InfoWindow({
        maxWidth: 300
    });

    storeLocations.forEach(function(storeLocation){
        self.storeLocationsList.push(new Store(storeLocation));
    });

    // Filter to search stores.
    // Using data-bind="textInput: searchFieldText"
    // The observable array is this.storeLocationsList

    // Get the currently entered text in the search field.
    // Value '' to avoid undefined while processing the filter.
    this.searchFieldText = ko.observable('');  // empty string to avoid undefined

    this.filteredStores = ko.computed(function(storeLocation) {
        var searchFieldText = self.searchFieldText().toLowerCase();
        // console.log('this.searchFieldText: ' + self.searchFieldText());
        // Check for searchFieldText being an empty string, the markers would
        // not be restored using for example backspace.
        if (searchFieldText || searchFieldText === '') {
            return ko.utils.arrayFilter(self.storeLocationsList(), function(storeLocation) {
                var lowerTitle = storeLocation.title().toLowerCase();
                var filterStatus = lowerTitle.includes(searchFieldText);
                // console.log('filterStatus: ' + filterStatus);
                if (!filterStatus) {
                    // console.log('looks like filterStatus is ' + filterStatus);
                    storeLocation.googleMapsMarker.setMap(null);
                } else {
                    // console.log('looks like filterStatus is ' + filterStatus);
                    storeLocation.googleMapsMarker.setMap(googleMapsMap);
                }
                return filterStatus;
            });
        }
        return self.storeLocationsList();
    }, self);

}


// Initializes and adds the Google Maps map when the web page loads.
// We need a function for our callback in calling the Google Maps JavaScript API.
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
function nagastoMaps() {
    // Activate KnockoutJS, we are currently not restricting to a specific part
    // of the document.
    ko.applyBindings(new NagastoMapsViewModel());
}

// If the Google Maps API doesn’t load, there's a visible indication on the page.
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
function googleMapsError() {
    alert('An error occurred with Google Maps!');
}
