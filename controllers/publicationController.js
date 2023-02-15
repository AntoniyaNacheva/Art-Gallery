const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');

router.use(isAuth);

router.get('/create', (req, res) => {
	res.render('publication/create');
});

router.get('/create', async (req, res) => {
	const createdPublication = await publicationService.create(req.body);

	res.redirect('/');
});

module.exports = router;