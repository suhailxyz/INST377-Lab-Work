async function windowActions() {
    const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(url);
    const restaurants = await request.json();
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
  
    function findMatches(wordToMatch, rests) {
      return rests.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex)|| place.city.match(regex);
      });
    } 
    function displayMatches(evt) {
      const matchArray = findMatches(evt.target.value, restaurants);
      if (!evt.target.value) {
        document.querySelector('.suggestions').innerHTML = '';
      } else {
        const html = matchArray.map((place) => {
          RegExp(evt.target.value, 'gi');
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