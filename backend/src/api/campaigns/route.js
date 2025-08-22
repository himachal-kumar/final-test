const express = require('express');
const router = express.Router();
const connectDB = require('../../lib/mongodb');
const Campaign = require('../../../src/models/campaign');

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    await connectDB();
    const campaigns = await Campaign.find({});
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new campaign
router.post('/', async (req, res) => {
  try {
    await connectDB();
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;