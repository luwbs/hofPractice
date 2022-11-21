// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var fives = [];

  _.each(numbers, function(number) {
    if (number % 5 === 0) {
      fives.push(number);
    }
  });
  return fives.length;

};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var result = [];
  // look at each
    // if user value matches our sought term
      // push to result
  _.each(tweets, function(tweet, ind, arr) {
    if (arr[ind].user === user) {
      result.push(tweet);
    }
  });
  return result;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  return _.filter(fruits, function(fruit) {
    return fruit === targetFruit;
  });
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  return _.filter(fruits, function(fruit) {
    return fruit[0] === letter;
  });
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  return _.filter(desserts, function(dessert) {
    return dessert.type === 'cookie';
  });
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  return _.filter(tweets, function(tweet) {
    return tweet.user === user;
  });
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  _.map(fruits, function(fruit) {
    return fruit.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  // iterate through collection
  return _.map(desserts, function(dessert, index, desserts) {
    // create dessert object
    var result = dessert;
    // does ingredients list include flour?
      // if so, new prop glutenFree = false
      // otherwise, gF = true
    if (_.contains(dessert.ingredients, 'flour')) {
      result.glutenFree = false;
    } else {
      result.glutenFree = true;
    }
    return result;
  });

  // return result obj
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  return _.map(tweets, function(tweet, index, tweets) {
    return tweet.message;
  });
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  // iterate thru grocery list
  return _.map(groceries, function(item, index) {
    // destringify price by removing '$' and converting to int
    // multiply by 100 to work in pennies, avoiding dodgy binary math
    var price = Math.floor(item.price.substring(1) * 100);

    // sale price is price - (price * coupon)
    var salePrice = Math.round(price - (price * coupon));

    // convert to dollars and re-stringify sale price with $
    salePrice = '$' + (salePrice / 100);

    // add salePrice property to current item
    item.salePrice = salePrice;

    // return it
    return item;
  });
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  return _.reduce(products, function(memo, item) {
    return memo + parseFloat(item.price.substring(1));
  }, 0);
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {
  return _.reduce(desserts, function(totals, item) {
    // if type doesn't exist in totals
      // instantiate it
    // otherwise
      // increment it
    // if (!totals[item.type]) {
    //   totals[item.type] = 1;
    // } else {
    //   totals[item.type] += 1;
    // }

    // refactoring into ternary as practice:
    !totals[item.type] ? totals[item.type] = 1 : totals[item.type]++;
    return totals;
  }, {});

};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  // iterate thru tweets
  // if user exists
    // increment number of messages
  // otherwise
    // create user prop as current user
    // and messages = 1
  return _.reduce(tweets, function(totals, tweet) {
    if (totals[tweet.user]) {
      totals[tweet.user]++;
    } else {
      totals[tweet.user] = 1;
    }
    return totals;
  }, {} );
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  // if releaseYear is in the 90s
    // push current title to memoizer
  // return memoizer to use in next iteration
  return _.reduce(movies, function(ninetiesMovs, movie) {
    if (movie.releaseYear >= 1990 && movie.releaseYear <= 2000) {
      ninetiesMovs.push(movie['title']);
    }
    return ninetiesMovs;
  }, []);
};

// return a boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  return _.reduce(movies, function(shorterExists, movie) {
    // if current movie length is less than limit
    // shorterExists = true
    if (movie.runtime < timeLimit) {
      shorterExists = true;
    }
    return shorterExists;
  }, false);
};


// quiz question
/* given the following array, which underbar funcs can I use to return
an array containing only those stickers where I have fewer than 5? */

var githubStickers = [
  {
    name: "Octocat",
    qty: 12
  },
  {
    name: "Luchadortocat",
    qty: 2
  },
  {
    name: "Gracehoppertocat",
    qty: 5
  }
]

var returnLessThanFive = function (stickers) {

  return _.filter(stickers, function(item, index, arr) {
    return (item.qty < 5);
  });

};

// console.log(returnLessThanFive(githubStickers));

var data = {
  supplies: [
      {item: 'New Skis', price: 1200},
      {item: 'Lift Ticket', price: 75},
      {item: 'Lunch', price: 25},
      {item: 'Gas in car', price: 30}
  ]
};

var total = _.reduce(data.supplies,
      function (memoizer, value) {
        return {price: (memoizer.price + value.price)};
      });
// console.log(total);
// console.log('Total cost to go skiing: $' + total.price, '#reduceexamplethreeunderscore');