const express = require('express');
const path = require('path')
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const URL = require('./models/url');

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url ').then(() => console.log('Mongodb connected')
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.json());
// means we support both data json or form 
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute);
app.use('/', staticRouter);


app.get('/test', async (req, res) =>{
  const allUrls = await URL.find({});
    return res.render('home', {
      urls: allUrls,
   })
});


app.get('/url/:shortId', async (req, res) =>{
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
      {
        shortId,
    },
    {
      $push: {
          visitHistory:{
            timestamp: Date.now(),
          },
      },
    } 
    )
    if (entry) {
      res.redirect(entry.redirectURL);
  } 
  else {
      res.status(404).send('URL Not Found');
  }
});
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

