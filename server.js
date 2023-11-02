require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ShortUrl = require('./models/shortURL');
const shortURL = require("./models/shortURL");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGODB_URL)


app.get("/", async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render("index", {shortUrls: shortUrls});
})

app.post("/shortUrls", async (req,res) => {
   await shortURL.create({full: req.body.fullUrl});
   res.redirect('/')
})

app.get("/:shortUrl", async (req,res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
})



app.listen(process.env.PORT || 5000);
