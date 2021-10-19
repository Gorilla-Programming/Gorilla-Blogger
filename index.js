const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles');
const ArticleModel = require('./models/article') 

const db = require('./config/keys').ModuleURI;
mongoose.connect(db , { useNewUrlParser:true})
        .then(() => console.log("MongoDb connected"))
        .catch((e) => console.log(e))

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))

app.get('/', async (req,res)=>{
    const articles = await ArticleModel.find().sort({date:'desc'});
    res.render("./articles/index",{articles: articles})
})

app.use('/articles',articleRouter)
app.listen(process.env.PORT || 3000);
