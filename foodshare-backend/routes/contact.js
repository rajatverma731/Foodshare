const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/', async (req, res) => {
  try {
    const { helpTopic, fullName, emailAddress, mobileNumber, message } = req.body;

    const newContact = new Contact({
      helpTopic,
      fullName,
      emailAddress,
      mobileNumber,
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
