'use strict';
const fs = require('express');
const express = require('express');
const uuid = require('uuid/v4');
const app = express();
app.get('/', (req, res) => {
  res
    .status(200)
    .send("Hola")
    .end();
});
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_quickstart]