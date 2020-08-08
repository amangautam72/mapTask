const { TOKEN } = require("./config");

function geturl(text, data){
  if (data) {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${TOKEN}&${data}`
  }
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${TOKEN}`
}

export const fetchPlaces = (long,lat) => {
    const url = geturl("school", `types=poi&proximity=${long},${lat}`);

    return fetch(url)
      .then(res => {
        return res.json()
      })
      .catch(error => {
        console.log(error);
      });

  }

export const queryPlaces = (text) => {
    const url = geturl(text);
    return fetch(url)
      .then(res => {
        return res.json()
      })
      .catch(error => {
        console.log(error);
      });

  }  

