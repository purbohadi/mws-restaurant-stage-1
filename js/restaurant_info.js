let restaurant;
var map;

document.addEventListener('DOMContentLoaded', (event) => {
    DBHelper.initServiceWorker();

    document
        .getElementById('review-submit')
        .addEventListener('click', submitRestaurantReview);

    fetchRestaurantFromURL();
});

initServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service_worker.js")
            .then(registration => {
                registration.update();
                console.log("Service worker registered");
            });
    }
}

showMap = () => {
    const map = document.getElementById('map');
    if (map.style.display === 'none') {
        map.style.display = 'block'
        window.initMap();
    } else {
        map.style.display = 'none'
    }
}


/**
 * Initialize Google map
 */
window.initMap = () => {

    self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: self.restaurant.latlng,
        scrollwheel: false
    });
    DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);

    // fetchRestaurantFromURL((error, restaurant) => {
    //     if (error) { // Got an error!
    //         console.error(error);
    //     } else {
    //         // const reviewsPromises = [];

    //         // APIHelper.fetchReviews((err, reviews) => {
    //         //     reviews.forEach(review => {
    //         //         reviewsPromises.push(DBHelper.addReview(review));
    //         //     });
    //         // });

    //     }
    // });
}

fetchAllReviewByRestaurantId = (restaurant = self.restaurant) => {

    APIHelper.getAllReviewByRestaurantId(restaurant.id)
        .then(reviews => {
            reviews.forEach(review => {
                DBHelper.addReview(review);
            });
            fillReviewsHTML(reviews)
        })
        .catch(error => console.error(error));
}

/**
 * Fetch Restaurants reviews
 */
// fetchRestaurantReviews = (restaurant = self.restaurant) => {
//     APIHelper.fetchReviews((err, reviews) => {
//         const restaurantReviews = reviews.filter(obj => obj.restaurant_id === restaurant.id)
//         fillReviewsHTML(restaurantReviews)
//     })
// }


/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = async(callback) => {
    if (self.restaurant) { // restaurant already fetched!
        callback(null, self.restaurant)
        return;
    }
    const id = getParameterByName('id');
    if (!id) { // no id found in URL
        error = 'No restaurant id in URL'
        callback(error, null);
    } else {
        try {
            self.restaurant = await APIHelper.fetchRestaurantById(id);
            if (!self.restaurant) {
                return;
            }
        } catch (error) {
            console.error(error);
        }

        fillRestaurantHTML();
        fetchAllReviewByRestaurantId();
        // callback(null, self.restaurant)
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

favoriteRestaurant = () => {
    const favoriteButton = document.getElementById('isFavorite');
    let isFavorited = favoriteButton.innerHTML === '⭐' ? true : false;
    self.restaurant.is_favorite = !isFavorited;
    var favorite = { id: self.restaurant.id, isFavorited: self.restaurant.is_favorite, type: 'favorite' };

    // set to latest state
    isFavorited = !isFavorited;
    favoriteButton.innerHTML = isFavorited ? '⭐' : '★';

    // if (navigator.onLine) {
    return fetch(
            `${APIHelper.getBaseUrl()}/restaurants/${self.restaurant.id}/?is_favorite=${self.restaurant.is_favorite}`, {
                method: 'PUT'
            }
        )
        .then(handleErrors) //handle error
        .then(data => {
            DBHelper.addRestaurant(data);
            return data;
        })
        .catch(e => {
            console.error(`${e}: Could not update.`);
            //save to offline store
            DBHelper.addOfflineFavorite(favorite);
        });
    // } else {
    //     if (!navigator.onLine) {
    //         DBHelper.addOfflineFavorite(favorite);
    //     }
    // }


    // .then(result => {
    //     DBHelper.addRestaurant(data);
    // }).catch(error => {
    //     console.error('error in setting favorite ==> ', error);
    //     DBHelper.addOfflineFavorite(self.restaurant);
    // });

    // .then(response => {
    //   response.json();
    // })
    // .then(data => {
    //     // save updated restaurant to DB
    //     DBHelper.addRestaurant(data);
    //     return data;
    // })
    // .catch(e => {
    //     console.error(`${e}: Could not update.`);
    //     //save to offline store
    //     DBHelper.addOfflineFavorite(self.restaurant);
    // });


    // if (navigator.online) {
    //     console.log('-- isFavorited --', isFavorited);
    //     const url = `${APIHelper.getBaseUrl()}/restaurants/${id}/?is_favorite=${!isFavorited}`;
    //     isFavorited = !isFavorited;
    //     fetch(url, {
    //         method: 'PUT',
    //     }).then(result => {
    //         favoriteButton.innerHTML = isFavorited ? '💘' : '💙';
    //     }).catch(error => {
    //         console.error('error in sending review ==> ', error);
    //         console.log('stored to be send later');
    //     })
    // } else {
    //     isFavorited = !isFavorited;
    //     favoriteButton.innerHTML = isFavorited ? '💘' : '💙';
    //     var favorite = { id: id, isFavorited: isFavorited, type: 'favorite' };
    //     DBHelper.addOfflineFavorite(favorite);
    //     // DBHelper.createIndexedDB([{id: id, isFavorited: isFavorited, type:'favorite'}], 'offline');
    // }
}


/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
    const favoriteIconSpan = document.getElementById('isFavorite');
    favoriteIconSpan.innerHTML = restaurant.is_favorite === 'true' ? '⭐' : '★';
    // favoriteIconSpan.innerHTML = restaurant.is_favorite === 'true' ? '&starf' : '&star';
    favoriteIconSpan.className = 'star-favorite';

    // favoriteRestaurant();

    const name = document.getElementById('restaurant-name');
    name.innerHTML = restaurant.name;

    const address = document.getElementById('restaurant-address');
    address.innerHTML = restaurant.address;

    const image = document.getElementById('restaurant-img');
    image.querySelector('img').className = 'restaurant-img'
    image.querySelector('source').srcset = `/img/${restaurant.id}.webp`;
    image.querySelector('img').src = `/img/${restaurant.id}.png`;
    image.alt = `Picture of the restaurant ${restaurant.name}`;

    const cuisine = document.getElementById('restaurant-cuisine');
    cuisine.innerHTML = restaurant.cuisine_type;

    // fill operating hours
    if (restaurant.operating_hours) {
        fillRestaurantHoursHTML();
    }
    // fill reviews
    getReviewsById();
    // fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
    const hours = document.getElementById('restaurant-hours');
    for (let key in operatingHours) {
        const row = document.createElement('tr');

        const day = document.createElement('td');
        day.innerHTML = key;
        row.appendChild(day);

        const time = document.createElement('td');
        time.innerHTML = operatingHours[key];
        row.appendChild(time);

        hours.appendChild(row);
    }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.reviews) => {
    const container = document.getElementById('reviews-container');
    const title = document.createElement('h4');
    title.innerHTML = 'Reviews';
    container.append(title);

    if (!reviews) {
        const noReviews = document.createElement('p');
        noReviews.innerHTML = 'No reviews yet!';
        container.appendChild(noReviews);
        return;
    }

    if (self.pendingReviews) {
        reviews.push(...self.pendingReviews);
    }

    const ul = document.getElementById('reviews-list');
    reviews.forEach(review => {
        ul.appendChild(createReviewHTML(review));
    });
    container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {

    const date = document.createElement('p');
    const dateInDays = new Date(review.createdAt).toDateString();
    date.innerHTML = dateInDays.toString('yyyy-MM-dd');

    const template = `
  <li>
  <p tabindex="0" class="review-name">${review.name}</p>
  <p class="review-date">${date.innerHTML}</p>
  <p class="review-rating"><span>Rating: ${review.rating}</span></p>
  <p class="review-comments">${review.comments}</p>
  </li>  
  `;

    const range = document.createRange();
    const fragment = range.createContextualFragment(template);

    return fragment;

}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant = self.restaurant) => {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    li.innerHTML = restaurant.name;
    breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Get reviews by id
 */
getReviewsById = callback => {
    if (self.reviews) {
        callback(null, self.reviews);
        return;
    }

    const id = getParameterByName('id');
    if (!id) {
        error = 'Could not get parameter id';
        callback(error, null);
    } else {
        APIHelper.fetchReviewsById(id, (error, reviews) => {
            self.reviews = reviews;
            if (!reviews) {
                console.error(error);
                return;
            }

            // fill reviews
            fillReviewsHTML();
        });
    }
};

/**
 * Get form data
 */
getFormReviewData = (restaurant = self.restaurant) => {

    const data = {};
    const name = document.getElementById('review-name').value
    data.name = name;
    const comment = document.getElementById('review-text').value
    data.comments = comment;

    const restaurantId = restaurant.id
    data.restaurant_id = restaurantId;

    var rating = parseInt(
        document.querySelector('input[name="rating"]:checked').value
    );
    data.rating = rating;

    if (!name || !comment) {
        return;
    }

    data.createdAt = Date.now();
    data.updatedAt = Date.now();

    return data;
}

/**
 * Add offline review
 */
fillReviewHTML = review => {
    // const container = document.getElementById('reviews-container');
    // const title = document.createElement('h4');
    // title.innerHTML = 'Reviews';
    // container.appendChild(title);
    // const ul = document.getElementById('reviews-list');
    // ul.appendChild(createReviewHTML(review));
    // container.appendChild(ul);

    const newReviewHTML = createReviewHTML(review);
    const ul = document.getElementById('reviews-list');
    ul.appendChild(newReviewHTML);
    const reviewStatus = document.getElementById('review-status');
    reviewStatus.innerText = 'Thanks for reviewing!';

}

window.addEventListener("online", () => {
    console.log('== online ==');
    DBHelper.getAllOfflineData(offlineData => {
        if (!offlineData) {
            return;
        }
        const reviews = offlineData.filter(object => object.type === 'review');
        const favorites = offlineData.filter(object => object.type === 'favorite');

        const reviewUrl = APIHelper.getBaseUrl() + '/reviews/'
        const favoriteUrl = (id, isFavorited) => APIHelper.getBaseUrl() + `/restaurants/${id}/?is_favorite=${isFavorited}`;

        reviews.forEach(review => {

            reviewData = { restaurant_id: review.restaurant_id, name: review.name, rating: review.rating, comments: review.comments };

            fetch(reviewUrl, {
                body: JSON.stringify(reviewData),
                method: 'POST',
            }).then(result => {
                console.log('result ', result)
                //success remove offline review
                DBHelper.getOfflineStore().removeItem(String(review.createdAt));
            }).catch(error => {
                console.error('error in sending review ==> ', error);
            })
        });

        favorites.forEach(favorite => {
            fetch(favoriteUrl(favorite.id, favorite.isFavorited), {
                method: 'PUT',
            }).then(result => {
                console.log('== result ==', result);
                //success remove offline favorite
                DBHelper.getOfflineStore().removeItem(String(favorite.id));
            }).catch(error => {
                console.error('error in sending review ==> ', error);
            })
        })

        // reviews.forEach(review => {
        //   APIHelper.postReviewToAPI(review).then(result => {
        //     console.log('result ', result)
        //     //success remove offline reviews
        //     DBHelper.getOfflineStore().removeItem(String(review.createdAt));
        //   }).catch(error => {
        //     console.error('error in sending review ==> ', error);
        //     console.log('stored to be send later');
        //   })
        // });

        // favorites.forEach(favorite => {
        //   APIHelper.postFavoriteToAPI(favorite.id,favorite.isFavorited).then(result => {
        //     console.log('== result ==', result);
        //     //success remove offline favorite
        //     DBHelper.getOfflineStore().removeItem(String(favorite.id));
        //   }).catch(error => {
        //     console.error('error in sending favorite ==> ', error);
        //     console.log('stored to be send later');
        //   })
        // })

    })
}, false);

/**
 * Submit a new review.
 */
submitRestaurantReview = () => {

    const form = document.getElementById('review-form');
    const data = getFormReviewData(restaurant = self.restaurant);


    return fetch(`${APIHelper.getBaseUrl()}/reviews`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {

            fillReviewHTML(data);

            form.reset();

            // save to IDB
            DBHelper.addReview(data);

            return data;
        })
        .catch(err => {

            fillReviewHTML(data);
            form.reset();

            var review = {
                id: data.id,
                restaurant_id: data.restaurant_id,
                name: data.name,
                rating: data.rating,
                comments: data.comments,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                type: 'review'
            };

            // Save a offline review in IDB
            DBHelper.addOfflineReview(review);

            console.log(`Error: ${err}`);
            return data;
        });


    // if (navigator.online) {
    //     // APIHelper.postReviewToAPI(data).then(function() result => {
    //     //   console.log('result ', result)
    //     //   const newReviewHTML = createReviewHTML(data);
    //     //   const ul = document.getElementById('reviews-list');
    //     //   ul.appendChild(newReviewHTML);
    //     //   const reviewStatus = document.getElementById('review-status');
    //     //   reviewStatus.innerText = 'Thanks for reviewing!';
    //     // }).catch(error => {
    //     //   console.error('error in sending review ==> ', error);
    //     //   console.log('stored to be send later <3');
    //     // });

    //     // APIHelper.postReviewToAPI(data).then(result => {
    //     //   console.log('result ', result)
    //     // }).catch(error => {
    //     //   console.error('error in sending review ==> ', error);
    //     //   console.log('stored to be send later');
    //     // })

    //     const url = APIHelper.getBaseUrl() + '/reviews/';
    //     fetch(url, {
    //         body: JSON.stringify(data),
    //         method: 'POST',
    //     }).then(result => {
    //         console.log('result ', result)
    //     }).catch(error => {
    //         console.error('error in sending review ==> ', error);
    //         console.log('stored to be send later');
    //     })

    //     form.reset();
    //     fetchRestaurantReviews(restaurant = self.restaurant)
    // } else {
    //     data.type = 'review';
    //     data.id = data.createdAt;
    //     addOfflineReview(data);

    //     form.reset();

    //     var review = {
    //         id: data.id,
    //         restaurant_id: data.restaurant_id,
    //         name: data.name,
    //         rating: data.rating,
    //         comments: data.comments,
    //         createdAt: data.createdAt,
    //         updatedAt: data.updatedAt,
    //         type: 'review'
    //     };

    //     DBHelper.addOfflineReview(review);
    // }

};