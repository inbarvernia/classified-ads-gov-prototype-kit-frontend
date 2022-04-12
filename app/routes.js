const express = require('express')
const router = express.Router()
const request = require('then-request');

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'which-ads'
router.post('/which-ads-answer', function (req, res) {

  let whichAds = req.session.data['which-ads']
  let adType = req.session.data['which-advert-type']

  // Check whether the variable matches a condition
  if (whichAds === "Filter" && adType === 'rental') {
    // Send user to next page
    res.redirect('/which-rental-filters')
  } else {
    // Send user to ineligible page
    res.redirect('/not-available')
  }

})


// Run this code when a form is submitted to 'which-rental-filters'
router.post('/which-rental-filters-answer', function (req, res) {

  let whichRentalFilter = req.session.data['which-rental-filters']

  // Check whether the variable matches a condition
  if (whichRentalFilter === "price") {
    // Send user to next page
    res.redirect('/what-price-range')
  } else {
    // Send user to ineligible page
    res.redirect('/not-available')
  }

})

// Respond to GET /results
// (Would need to first post parameters based on answers and then GET, but just doing an initial test)
router.get('/results', function (req, res) {
  console.log("Sending request")
  // Request some random text from an API
  request('GET', 'http://localhost:9000/adverts')
    .getBody('utf8') // Parse to text
    .then(text => JSON.parse(text)) // Parse to JSON
    .then(advertJson => {
      // Render our 'random' template with the data we got
      console.log("Information received")
      console.log(advertJson)
      res.render("results", { advert: advertJson })
    })
  console.log("Finished request cycle")
})

module.exports = router
