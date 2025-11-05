import express from 'express';
const app = express()
import { urlencoded, json } from 'body-parser';
import { MongoClient } from 'mongodb';

var db, collection;
console.log("test")

//Need to check 
const url = "mongodb+srv://DemoDay2025:DemoDay2025@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "DemoDay2025";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(urlencoded({extended: true}))
app.use(json())
app.use(express.static('public'))

//still have to make frontend for this, will be a button that when pressed will display a list of the companies in the database
app.get('/', (req, res) => {
  db.collection('companies').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.html', {companies: result})
  })
})

//Have to make frontend for this route, will be an input tag someone can add a URL to which is then saved to the database and then displayed with the corresponding company name when someone searches for a company name 
// The article will just be an nachor tag with the company name list from above 
app.post('/articles', (req, res) => {
  db.collection('articles').insertOne({company_name: req.body.company_name, article_url: req.body.article_url, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})