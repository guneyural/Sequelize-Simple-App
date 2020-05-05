const app = require('express')();
const postRoutes = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(require('express').json());
app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
    res.send('Welcome, this is the homepage of this website.');
});

app.listen(PORT, () => console.log(`Server is on port ${PORT}`));