const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

// Handlebars middleware
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Init custom middleware
app.use(logger);
// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// bring in api routes/module
app.use('/api/members', require('./routes/api/members'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Member App', members });
});

// Set static folder (Good for serving just static pages such as index.html)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

