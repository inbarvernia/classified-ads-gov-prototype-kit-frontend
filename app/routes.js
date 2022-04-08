const express = require('express')
const router = express.Router()

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

module.exports = router
