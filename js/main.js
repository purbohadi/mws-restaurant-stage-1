let restaurants;
var map;
var markers = [];

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    DBHelper.initServiceWorker();
    init();
    // generateStaticMapHTML();
    // loadMap();
});

init = async() => {

    var response =  await APIHelper.fetchRestaurants();
    var restaurants = await response.json();

    const restaurantsPromises = [];
    const neighborhoods = new Set();
    const cuisines = new Set();

    restaurants.forEach(restaurant => {
        neighborhoods.add(restaurant.neighborhood);
        cuisines.add(restaurant.cuisine_type);
        restaurantsPromises.push(DBHelper.addRestaurant(restaurant));
    });

    fillNeighborhoodsHTML(neighborhoods);
    fillCuisinesHTML(cuisines);

    Promise.all(restaurantsPromises)
        .then(() => {
            updateRestaurants()
        })
        .catch(error => {
            console.log(error)
        });
};

showMap = () => {
    const map = document.getElementById('map');
    if (map.style.display === 'none') {
        map.style.display = 'block'
        window.initMap();
    } else {
        map.style.display = 'none'
    }
};

/**
 * Initialize Google map
 */
window.initMap = () => {
    let loc = {
        lat: 40.722216,
        lng: -73.987501
    };
    self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: loc,
        scrollwheel: false
    });
    addMarkersToMap();
};


// loadMap = () => {
//     const showMapBtn = document.getElementById('restaurant-map-btn');
//     showMapBtn.addEventListener('click', () => {
//         document.getElementById('map-container').style.display = 'block';
//         window.initMap();
//         showMapBtn.style.display = 'none';
//     });
// }


/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
    const select = document.getElementById('neighborhoods-select');
    neighborhoods.forEach(neighborhood => {
        const option = document.createElement('option');
        option.innerHTML = neighborhood;
        option.value = neighborhood;
        option.tabIndex = 0;
        select.append(option);
    });
}


/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
    const select = document.getElementById('cuisines-select');

    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.innerHTML = cuisine;
        option.value = cuisine;
        option.tabIndex = 0;
        select.append(option);
    });
}


/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');

    const cIndex = cSelect.selectedIndex;
    const nIndex = nSelect.selectedIndex;

    const cuisine = cSelect[cIndex].value;
    const neighborhood = nSelect[nIndex].value;

    APIHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood)
        .then(restaurants => {
            resetRestaurants(restaurants);
            fillRestaurantsHTML(restaurants);
        })
        .catch(error => console.error(error));


}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
    // Remove all restaurants
    self.restaurants = [];
    const ul = document.getElementById('restaurants-list');
    ul.innerHTML = '';

    // Remove all map markers
    self.markers.forEach(m => m.setMap(null));
    self.markers = [];
    self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
    const ul = document.getElementById('restaurants-list');
    restaurants.forEach(restaurant => {
        ul.append(createRestaurantHTML(restaurant));
    });
    // addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {

    // add required review suggestion: aria-label to View Details Button to provide a better description of the button
    const template = `
  <li>
  <picture>
    <source srcset="img/${restaurant.id}.webp" type="image/webp">
    <img class="restaurant-img" src="img/${restaurant.id}.png" type="image/png" alt="Picture of the restaurant ${restaurant.name}">
  </picture>
    <div class="restaurant-infos">
      <div class="row-title">
        <h1 tabindex="0">${restaurant.name}</h1>
      </div>
      <p>${restaurant.neighborhood}</p>
      <p>${restaurant.address}</p>
      <a href="./restaurant.html?id=${restaurant.id}" aria-label="View Details of ${restaurant.name}">View Details</a>
    </div>
  </li>
  `;

    const range = document.createRange();
    const fragment = range.createContextualFragment(template);

    // isRestaurantFavorited(fragment, restaurant);

    return fragment;

}

isRestaurantFavorited = (fragment, restaurant) => {
    const restaurantName = fragment.getElementById('restaurantName');
    let isFavorited = restaurant.is_favorite;
    restaurantName.innerHTML = isFavorited ? restaurant.name + ' ' + '&starf;' : restaurant.name;
}

generateStaticMapHTML = () => {
    const staticMapContainer = document.getElementById('static-map-container');
    const mapContainer = document.getElementById('map-container');
    const staticMap = document.createElement('div');
    staticMap.className = 'static-map';

    const picture = document.createElement('picture');
    picture.style.display = 'flex';
    picture.style.flexGrow = 1;
    picture.style.justifySelf = 'center';
    picture.style.position = 'absolute';
    picture.style.maxWidth = '100%';

    const source600 = document.createElement('source');
    source600.media = '(min-width: 600px) and (max-width: 799px)';
    source600.dataset.srcset = 'img/static-map/staticmap_600.jpg';

    const image = document.createElement('img');
    image.dataset.src = 'img/static-map/staticmap_400.jpg';
    image.alt = 'Map with restaurants';
    image.style.width = '100%';

    picture.append(source1200);
    picture.append(source800);
    picture.append(source600);
    picture.append(image);
    staticMap.append(picture);

    // Backdrop to highlight button better
    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';

    // button on top of static map to denote interactivity
    const button = document.createElement('button');
    button.className = 'button';
    button.innerText = 'Show on map';

    // Click event listener to load map on demand
    button.addEventListener('click', () => {
        // window.initMap();
        // addMarkersToMap();
        staticMapContainer.style.display = 'none';
        mapContainer.style.display = 'block';
    });

    staticMap.append(button);
    staticMapContainer.append(backdrop);
    staticMapContainer.append(staticMap);
};



/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {

    if (typeof google === "undefined") return self.markers;

    restaurants.forEach(restaurant => {
        // Add marker to the map
        const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
        google.maps.event.addListener(marker, 'click', () => {
            window.location.href = marker.url
        });
        self.markers.push(marker);
    });
}