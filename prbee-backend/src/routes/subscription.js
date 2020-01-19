const express = require('express');
const JsonResult = require('../results/json');
const NotifyResult = require('../results/notify');
const SubscriptionService = require('../services/subscription');

const router = express.Router();

router.get('/schema', async (req, res, next) => {
  try {
    const subscriptionService = new SubscriptionService();
    const schema = await subscriptionService.getSchema();
    res.json(new JsonResult(schema));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const subscriptionService = new SubscriptionService();
    await subscriptionService.saveSchema(req.body.schema);
    res.json(new NotifyResult('Schema has been saved'));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
