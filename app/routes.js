const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/which-ads-answer', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
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

module.exports = router
