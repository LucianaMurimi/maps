// 1. LOCATION
 
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 10
            });
            var marker = new mapboxgl.Marker()
                    .setLngLat([position.coords.longitude, position.coords.latitude])
                    .addTo(map);
            
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, 'bottom-right')

            navigator.geolocation.watchPosition(showLocation);

            function showLocation(position){
                lat = position.coords.latitude;
                long = position.coords.longitude;
                timestamp = position.timestamp;

                marker.remove();
                var marker = new mapboxgl.Marker()
                    .setLngLat([long, lat])
                    .addTo(map);
              
                console.log("Lat: ", lat, "Long: ", long, "Timestamp: ", timestamp);

                let div = document.getElementById('location-div');
                if(div.hasChildNodes()){
                    div.innerHTML = '';
                }
                let p = document.createElement('p');
                p.innerHTML = (`
                    Latitude: ${lat} | Longitude: ${long}
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
            
        });
    } else { 
        let err = "Geolocation is not supported by this browser.";
    }
}


getLocation();
// ============================================================================