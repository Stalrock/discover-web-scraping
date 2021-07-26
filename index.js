const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const getMovies = require('./src/imdb');
const PORT = process.env.PORT || 7000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/movies', async (req, res) => {
    const movies = await getMovies("https://www.imdb.com/what-to-watch/fan-favorites/?ref_=watch_tpks_tab");
    res.send(movies);
})

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

