import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import { nanoid } from 'nanoid';
import Url from './models/url.js';
import validateURL from './utils/utils.js';

dotenv.config();
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connect(process.env.MONGO_DB_CONN_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.post('/api', async (req, res) => {
  const origUrl = req.body.origUrl;
  if (validateURL(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.status(200).json(url);
      } else {
        const urlId = nanoid();
        const base = process.env.BASE;
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log(req.body.origUrl);
    res.status(400).json('Invalid Original Url');
  }
});

app.get('/api/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(req.params.urlId);
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
