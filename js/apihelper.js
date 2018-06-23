/**
 * Common API helper functions.
 */
class APIHelper {

    static getBaseUrl() {
        return 'http://localhost:1337';
    }

    static postFavoriteToAPI(id, is_favorite) {
        if (!id || !is_favorite) return;

        const url = `${APIHelper.getBaseUrl()}/restaurants/${id}/?is_favorite=${is_favorite}`;

        return fetch(url, {
                method: 'PUT'
            })
            // .then(result => {
            //   console.log('result ', result)
            //   return result;
            // })
            .then(result => {
                console.log('result ', result)
                return result;
            })

            .catch(e => console.error(`${e}: Could not update.`));
    }

    static postReviewToAPI(review) {
        if (!review) return;

        const url = `${APIHelper.getBaseUrl()}/reviews/`

        var data = { restaurant_id: review.restaurant_id, name: review.name, rating: review.rating, comments: review.comments };

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            console.log('result ', result)
            return result;
        }).catch(e => console.error(`${e}: Could not post.`));
    }


    static favoriteRestaurant(restaurant) {
        if (!restaurant) return;

        const url = `${APIHelper.getBaseUrl()}/restaurants/${restaurant.id}/?is_favorite=${restaurant.is_favorite}`;

        return fetch(url, {
                method: 'PUT'
            })
            .then(response => response.json())
            // .then(data => {
            //   DBHelper.getRestaurantStore().setItem(String(restaurant.id), restaurant);
            //   return data;
            // })
            .catch(e => console.error(`${e}: Could not update.`));
    }

    /**
     * Fetch reviews
     */
    static fetchReviews(callback) {
        const url = `${APIHelper.getBaseUrl()}/reviews/`;
        fetch(url).then((response) => {
            return response.json()
        }).then(reviews => {
            callback(null, reviews);
        }).catch(error => {
            console.error(error);
            callback(null, error);
        })
    }


    static async fetchReviewsById(id) {
        try {
            let review = await DBHelper.getReviewStore().getItem(String(id));
            if (!review) {
                const url = `${APIHelper.getBaseUrl()}/reviews/${id}`;
                const response = await fetch(url);
                review = await response.json();
                DBHelper.getReviewStore().setItem(String(review.id), review);
            }
            return review;
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllReviewByRestaurantId(restaurant_id) {
        try {
            const url = `${APIHelper.getBaseUrl()}/reviews/?restaurant_id=${restaurant_id}`
            const response = await fetch(url);
            var reviews = await response.json();
            return reviews;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Fetch all restaurants.
     */
    static async fetchRestaurants() {
        const url = `${APIHelper.getBaseUrl()}/restaurants/`;
        return fetch(url);
    }

    static async fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {

        let restaurants = await APIHelper.getAllRestaurants();

        if (cuisine != 'all') { // filter by cuisine
            restaurants = restaurants.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
            restaurants = restaurants.filter(r => r.neighborhood == neighborhood);
        }
        return restaurants;
    }

    static async fetchRestaurantById(id) {
        try {
            let restaurant = await DBHelper.getRestaurantStore().getItem(String(id));
            if (!restaurant) {
                const url = `${APIHelper.getBaseUrl()}/restaurants/${id}`;
                const response = await fetch(url);
                restaurant = await response.json();
                DBHelper.getRestaurantStore().setItem(String(restaurant.id), restaurant);
            }
            return restaurant;
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllRestaurants() {
        const items = [];
        await DBHelper.getRestaurantStore().iterate(function(value, key, iterationNumber) {
            items.push(value);
            console.log([key, value]);
        })
        return items;
    }

    static get(id) {
        const url = `${APIHelper.getBaseUrl()}/restaurants/${id}`
        return fetch(url);
    }

}