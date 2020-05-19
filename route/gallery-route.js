
const express = require('express');
const router = express.Router();

const WebhookController = require('../controllers/gallery-controller');
const webhookController = new WebhookController();
const checkAuth= require('../middleware/check-auth');
const uploadUtil = require('../common/upload-util');
router.post('/login', webhookController.onlogin);
router.post('/signup', checkAuth,webhookController.onSignup);
router.delete('/:_id', checkAuth ,webhookController.ondelete);
router.post('/logout', checkAuth,webhookController.onlogout);
router.post('/adminLogin',webhookController.onadminlogin);
//router.post('/uploadimage',uploadUtil.upload.single('uploadedImage'),webhookController.onuploadimage);

module.exports = router;