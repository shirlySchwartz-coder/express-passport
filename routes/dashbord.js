const express = require('express');
const router = express.Router();

// Dashboard
router.get(('/dashbord'), (req, res) => {
    try {
        res.render('dashboard', {user: req.user})
    }catch(e) {
      done(e);
    }
  });  

module.exports = router;
