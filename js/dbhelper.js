let reviewStore;
let restaurantStore;
let offlineStore;

/**
 * Common database helper functions.
 */
class DBHelper {


    static getReviewStore() {
        if (!reviewStore) {
            reviewStore = localforage.createInstance({
                name: "Reviews"
            });
        }

        return reviewStore;
    }

    static getRestaurantStore() {
        if (!restaurantStore) {
            restaurantStore = localforage.createInstance({
                name: "Restaurants"
            });
        }

        return restaurantStore;
    }

    static getOfflineStore() {
        if (!offlineStore) {
            offlineStore = localforage.createInstance({
                name: "Offline"
            });
        }

        return offlineStore;
    }

    /**
     * Database URL.
     * Change this to restaurants.json file location on your server.
     */
    static get DATABASE_URL() {
        const port = 8001 // Change this to your server port
        return `http://localhost:${port}/data/restaurants.json`;

        // var BASE_DOMAIN="https://www.vlogz.win";
        // we use static domain name without port
        //     return `${BASE_DOMAIN}/data/restaurants.json`;
    }


    /**
     * Fetch reviews
     */
    static fetchReviews(callback) {
        const url = `https://mws-restaurants-stage-3.herokuapp.com/reviews/`
        fetch(url).then((response) => {
            return response.json()
        }).then(reviews => {
            callback(null, reviews);
        }).catch(error => {
            const error = (`Request failed.`);
            callback(error, null);
        })
    }


    /**
     * Fetch all restaurants.
     */
    static fetchRestaurants(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', DBHelper.DATABASE_URL);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status === 200) { // Got a success response from server!
                const json = JSON.parse(xhr.responseText);
                const restaurants = json.restaurants;
                callback(null, restaurants);
            } else {
                const error = (`Request failed. Returned status of ${xhr.status}`);
                callback(error, null);
            }
        };
        xhr.send();
    }

    /**
     * Fetch a restaurant by its ID.
     */
    static fetchRestaurantById(id, callback) {
        // fetch all restaurants with proper error handling.
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                const restaurant = restaurants.find(r => r.id == id);
                if (restaurant) { // Got the restaurant
                    callback(null, restaurant);
                } else { // Restaurant does not exist in the database
                    callback('Restaurant does not exist', null);
                }
            }
        });
    }

    /**
     * Fetch all restaurant reviews by restaurant id
     */
    static fetchReviewsById(id, callback) {
        DBHelper.loadFromIDB(`reviews-restaurant-${id}`, `reviews-restaurant-${id}`)
            .then(data => {
                if (data.length == 0) {
                    return DBHelper.loadReviewsFromAPI(`reviews/?restaurant_id=${id}`);
                }
                return Promise.resolve(data);
            })
            .then(reviews => {
                callback(null, reviews);
            })
            .catch(err => {
                console.log(`ERROR DB: ${err.status}`);
                callback(err, null);
            });
    }


    /**
     * Fetch restaurants by a cuisine type with proper error handling.
     */
    static fetchRestaurantByCuisine(cuisine, callback) {
        // Fetch all restaurants  with proper error handling
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given cuisine type
                const results = restaurants.filter(r => r.cuisine_type == cuisine);
                callback(null, results);
            }
        });
    }

    /**
     * Fetch restaurants by a neighborhood with proper error handling.
     */
    static fetchRestaurantByNeighborhood(neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given neighborhood
                const results = restaurants.filter(r => r.neighborhood == neighborhood);
                callback(null, results);
            }
        });
    }

    /**
     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
     */
    static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                let results = restaurants
                if (cuisine != 'all') { // filter by cuisine
                    results = results.filter(r => r.cuisine_type == cuisine);
                }
                if (neighborhood != 'all') { // filter by neighborhood
                    results = results.filter(r => r.neighborhood == neighborhood);
                }
                callback(null, results);
            }
        });
    }

    /**
     * Fetch all neighborhoods with proper error handling.
     */
    static fetchNeighborhoods(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all neighborhoods from all restaurants
                const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
                // Remove duplicates from neighborhoods
                const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
                callback(null, uniqueNeighborhoods);
            }
        });
    }

    /**
     * Fetch all cuisines with proper error handling.
     */
    static fetchCuisines(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all cuisines from all restaurants
                const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
                // Remove duplicates from cuisines
                const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
                callback(null, uniqueCuisines);
            }
        });
    }

    /**
     * Restaurant page URL.
     */
    static urlForRestaurant(restaurant) {
        return (`./restaurant.html?id=${restaurant.id}`);
    }

    /**
     * Restaurant image URL.
     */
    static imageUrlForRestaurant(restaurant) {
        return (`/img/${restaurant.id}.png`);
    }

    /**
     * Map marker for a restaurant.
     */
    static mapMarkerForRestaurant(restaurant, map) {
        const marker = new google.maps.Marker({
            position: restaurant.latlng,
            title: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant),
            map: map,
            animation: google.maps.Animation.DROP
        });
        return marker;
    }

    static initServiceWorker() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./service_worker.js")
                .then(registration => {
                    registration.update();
                    console.log("Service worker registered!");
                });
        }
    }

    static addOfflineReview(review) {
        return DBHelper.getOfflineStore().setItem(String(review.createdAt), review);
    }

    static addOfflineFavorite(favorite) {
        return DBHelper.getOfflineStore().setItem(String(favorite.id), favorite)
    }

    static addRestaurant(restaurant) {
        return DBHelper.getRestaurantStore().setItem(String(restaurant.id), restaurant);
    }

    static addReview(review) {
        return DBHelper.getReviewStore().setItem(String(review.id), review);
    }

    static async getAllOfflineData(callback) {
        const offlineData = [];
        await DBHelper.getOfflineStore().iterate(function(value, key, iterationNumber) {
            offlineData.push(value);
            console.log([key, value]);
        })
        callback(offlineData);
    }

}