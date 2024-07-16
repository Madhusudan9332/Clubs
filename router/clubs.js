const express = require('express');
const clubsController = require('../controller/clubs');

const router = express.Router();

router.post('/api/clubs/scrap',clubsController.scrapClubsData);
router.post('/api/clubs',clubsController.postClubsData);
router.get('/api/clubs/all',clubsController.getClubsData);
router.get('/api/club/:ClubId',clubsController.getClubData);

module.exports = router;