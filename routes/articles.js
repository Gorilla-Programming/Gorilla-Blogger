const express = require('express');
const router = express.Router();
const Article = require('./../models/article');

router.get('/new',(req,res)=>{
 res.render("./articles/new" , {articleCreate: new Article()})
})

router.get('/:id',async (req,res)=>{
    const currentArticle = await Article.findById(req.params.id);
    if(currentArticle == null) res.redirect('/');
    res.render("./articles/show",{currentArticle:currentArticle});
} )

router.post('/',async (req,res)=>{
    let articleCreate = new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown,
    })
    
    try{
        articleCreate = await articleCreate.save();
        res.redirect(`articles/${articleCreate.id}`);
        
    }catch(e){
        console.log(e);
        res.render("articles/new" , {articleCreate:articleCreate})
    }
    
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports=router;