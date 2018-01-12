// Models: Observables, Computed Observables, Observable Arrays

// Data for Lidl Stores in Luxembourg
// https://developers.google.com/maps/documentation/geocoding/intro#place-id
// https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJHyLKJIvK6kcRCxz42DcYORo&key=AIzaSyB8hGFiBTaARIrbWpkbwzlL8riBBoZ6sBg

var storeLocations = [
    {
        // Address: 170 Rue de Soleuvre, 4670 Differdange, Luxembourg
        // Location: 49.520914,5.909324 (type: ROOFTOP)
        // Place ID: ChIJHyLKJIvK6kcRCxz42DcYORo
        title: "Lidl Differdange",
        lat: 49.520914,
        lng: 5.909324,
        place_id: "ChIJHyLKJIvK6kcRCxz42DcYORo",
        address: "170 Rue de Soleuvre, 4670 Differdange, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 28a Route d'Ettelbruck, 9160 Ingeldorf, Luxembourg
        // Location: 49.853383,6.132072 (type: ROOFTOP)
        // Place ID: ChIJnWOZ2ANWlUcRCm4hKBp1d_w
        title: "Lidl Ingeldorf",
        lat: 49.853383,
        lng: 6.132072,
        place_id: "ChIJnWOZ2ANWlUcRCm4hKBp1d_w",
        address: "28a Route d'Ettelbruck, 9160 Ingeldorf, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 4 Rue Pierre Grégoire, 4702 Pétange, Luxembourg
        // Location: 49.556742,5.867879 (type: ROOFTOP)
        // Place ID: ChIJTTrEwOO16kcRE2yNttf1NSo
        title: "Lidl Pétange",
        lat: 49.556742,
        lng: 5.867879,
        place_id: "ChIJTTrEwOO16kcRE2yNttf1NSo",
        address: "4 Rue Pierre Grégoire, 4702 Pétange, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 28 Rue de l'Industrie, 8069 Bertrange, Luxembourg
        // Location: 49.61081,6.07214 (type: ROOFTOP)
        // Place ID: ChIJhZXfMP5LlUcRbP9coNXBhAI
        title: "Lidl Bertrange",
        lat: 49.61081,
        lng: 6.07214,
        place_id: "ChIJhZXfMP5LlUcRbP9coNXBhAI",
        address: "28 Rue de l'Industrie, 8069 Bertrange, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 7 Um Mierscherbierg, 7526 Mersch, Luxembourg
        // Location: 49.75989,6.100358 (type: RANGE_INTERPOLATED)
        // Place ID: Eis3IFVtIE1pZXJzY2hlcmJpZXJnLCA3NTI2IE1lcnNjaCwgTHV4ZW1idXJn
        title: "Lidl Mersch",
        lat: 49.75989,
        lng: 6.100358,
        place_id: "Eis3IFVtIE1pZXJzY2hlcmJpZXJnLCA3NTI2IE1lcnNjaCwgTHV4ZW1idXJn",
        address: "7 Um Mierscherbierg, 7526 Mersch, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 71 Route de Wasserbillig, 6686 Mertert, Luxembourg
        // Location: 49.710568,6.49094 (type: ROOFTOP)
        // Place ID: ChIJHRWm7n5mlUcRaem8Vk9OgNQ
        title: "Lidl Wasserbillig",
        lat: 49.710568,
        lng: 6.49094,
        place_id: "ChIJHRWm7n5mlUcRaem8Vk9OgNQ",
        address: "71 Route de Wasserbillig, 6686 Mertert, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 14 Bastnicherstrooss, 9638 Pommerlach, Luxembourg
        // Location: 49.962223,5.860143 (type: ROOFTOP)
        // Place ID: ChIJnWxD7a8EwEcRGUYin09mar8
        title: "Lidl Pommerloch",
        lat: 49.962223,
        lng: 5.860143,
        place_id: "ChIJnWxD7a8EwEcRGUYin09mar8",
        address: "14 Bastnicherstrooss, 9638 Pommerlach, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 9 Route d'Arlon, 8009 Strassen, Luxembourg
        // Location: 49.616881,6.093548 (type: RANGE_INTERPOLATED)
        // Place ID: Eio5IFJvdXRlIGQnQXJsb24sIDgwMDkgU3RyYXNzZW4sIEx1eGVtYm91cmc
        title: "Lidl Strassen",
        lat: 49.616881,
        lng: 6.093548,
        place_id: "Eio5IFJvdXRlIGQnQXJsb24sIDgwMDkgU3RyYXNzZW4sIEx1eGVtYm91cmc",
        address: "9 Route d'Arlon, 8009 Strassen, Luxembourg",
        country: "Luxembourg"
    },
    {
        // Address: 182 Rue de Beggen, 1220 Beggen, Luxembourg
        // Location: 49.646551,6.128333 (type: ROOFTOP)
        // Place ID: ChIJh1d41_1OlUcR0GMjr8yNNis
        title: "Lidl Beggen",
        lat: 49.646551,
        lng: 6.128333,
        place_id: "ChIJh1d41_1OlUcR0GMjr8yNNis",
        address: "182 Rue de Beggen, 1220 Beggen, Luxembourg",
        country: "Luxembourg"
    },
];

// Custom Google Maps styles.
// https://snazzymaps.com/style/37/lunar-landscape
var mapStyleLunarLandscape = [
    {
        "stylers": [
            {
                "hue": "#ff1a00"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": -100
            },
            {
                "lightness": 33
            },
            {
                "gamma": 0.5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2D333C"
            }
        ]
    }
];
