// 1. LOCATION
function getLocation(){
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(showLocation);
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

    function animateMarker() {
        const marker = new mapboxgl.Marker()
            .setLngLat([long, lat])
            .addTo(map);
        
        marker.addTo(map);
           
        // requestAnimationFrame(animateMarker());
    }
    
    // // start the animation.
    // requestAnimationFrame(animateMarker(long, lat));

    // sending the data to api
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

getLocation();
// ============================================================================