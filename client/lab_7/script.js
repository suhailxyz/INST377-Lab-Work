async function windowActions() {

    function loadLeafy(mymap) {
    const ACCESSTOKEN = 'pk.eyJ1IjoiZGllZ29hbW9yZXMiLCJhIjoiY2t1dXZ6OHZ0NjQ2MzMybnp2MGRpeWYwZSJ9.j2RBwFJGDI4AYqyhUPRJQQ';
  
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: ACCESSTOKEN
    }).addTo(mymap);
  }
  function findMatches(wordToMatch, rests) {
    return rests.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      // eslint-disable-next-line max-len
      return place.zip.match(regex)|| place.city.match(regex);
    });
  }
    const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(url);
    const restaurants = await request.json();
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
  
    const mymap = L.map('mapid').setView([38.9, -76.9], 10);
    loadLeafy(mymap);
    const markerGroup = L.layerGroup().addTo(mymap);
  
    function displayMatches(evt) {
      const matchArray = findMatches(evt.target.value, restaurants);
      const limitedList = matchArray.slice(0, 5);
  
      if (!evt.target.value) {
        document.querySelector('.suggestions').innerHTML = '';
        markerGroup.clearLayers();
      } else {
        markerGroup.clearLayers();
        const html = limitedList.map((place) => {
          RegExp(evt.target.value, 'gi');
          const point = place.geocoded_column_1;
          const latLong = point.coordinates;
          const marker = latLong.slice().reverse();
  
          L.marker(marker).addTo(markerGroup);
          return `
                  <li>
                      <span class = "name">${place.name}</span>
                      <br>
                      <span class = "category">${place.category}</span>
                      <br>
                      <span class = "address">${place.address_line_1}</span>
                      <br>
                      <span class = "city">${place.city}</span>
                      <br>
                      <span class = "zipcode">${place.zip}</span>
                  </li>
                  <br>
                  `;
        }).join('');
        suggestions.innerHTML = html;
      }
    }
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
  }
  
  window.onload = windowActions; 