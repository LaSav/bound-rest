const express = require('express');

const port = 3000;

const app = express();

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));

app.listen(port, console.log(`Server Listening on port ${port}`));
