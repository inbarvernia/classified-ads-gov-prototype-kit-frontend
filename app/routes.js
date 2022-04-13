const express = require('express')
const router = express.Router()
const request = require('then-request');

// Add your routes here - above the module.exports line

router.post('/which-ads-answer', function (req, res) {

  let whichAds = req.session.data['which-ads']
  let adType = req.session.data['which-advert-type']

  // Check whether the variable matches a condition
  if (whichAds === "Filter" && adType === 'rental') {
    // Send user to next page
    res.redirect('/which-rental-filters')
  } else if (whichAds === "All") {
    res.redirect('/what-display-order')
  }
  else {
    // Send user to ineligible page
    res.redirect('/not-available')
  }

})

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

router.post('/results', function (req, res) {
  let adType = req.session.data['which-advert-type']
  let requestUrl = 'http://localhost:9000/adverts';
  if (adType !== "all") {
    requestUrl += '?advertType=' + adType
  }
  // Request some random text from an API
  request('GET', requestUrl)
    .getBody('utf8') // Parse to text
    .then(text => JSON.parse(text)) // Parse to JSON
    .then(advertJson => {
      // Render our 'random' template with the data we got
      console.log(advertJson)
      res.render("results", { adverts: advertJson })
    })
})

module.exports = router
