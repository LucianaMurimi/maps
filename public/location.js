// 1. LOCATION
const map = {};
 
function getCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 10
            });
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, 'bottom-right')
        });
    } else { 
        let err = "Geolocation is not supported by this browser.";
    }
}
function animateMarker() {
    const marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);
    
    marker.addTo(map);
}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showLocation);
    } else { 
        let err = "Geolocation is not supported by this browser.";
    }
}

function showLocation(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    timestamp = position.timestamp;
  
    console.log("Lat: ", lat, "Long: ", long, "Timestamp: ", timestamp);
    
    requestAnimationFrame(animateMarker)
    
    let div = document.getElementById('location-div');
    div.removeChild(p)
    let p = document.createElement('p');
    p.innerHTML = (`
        Latitude: ${lat} Longitude: ${long}
    `);
    div.append(p);
    
    // SEND DATA TO API
    const data = { lat, long, timestamp };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/api', options)
    .then(res => res.json())
    .then(data => console.log(data));

}


getCurrentLocation();
getLocation();
// ============================================================================