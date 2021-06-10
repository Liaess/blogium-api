import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let postHomePage = [];

let commentID = [];

app.get('/posts',(req,res)=>{
    res.send(postHomePage);
});

app.get('/posts/:postId', (req,res)=>{
    const id = +req.params.postId;
    res.send(postHomePage.filter((i)=>i.id === id)[0]);
});

let countId = 0;

app.post('/posts', (req,res)=>{
    if(req.body.coverUrl.length === 0){
        return res.status(400).send("Empty coverUrl");
    }
    if(req.body.title.length === 0){
        return res.status(400).send("Empty title");
    }
    if(req.body.content.length === 0){
        return res.status(400).send("Empty story");
    }
    countId++;
    const post = req.body;
    post.content = post.content.replace("<p>","").replace("</p>","");
    post.contentPreview = post.content.length > 15 ? post.content.split(16)[0] + "..." : post.content;
    post.commentCount = 0;
    postHomePage.push({id:countId, ...post})
    res.sendStatus(200);
});

app.put('/posts/:id', (req,res)=>{
    const id = +req.params.id;
    const post = req.body;
    post.content = post.content.replace("<p>","").replace("</p>","");
    const postOnServer = postHomePage.filter((i)=>i.id === id)[0];
    postOnServer.title = post.title;
    postOnServer.coverUrl = post.coverUrl;
    postOnServer.content = post.content;
    postOnServer.contentPreview = post.content.length > 15 ? post.content.split(16)[0] + "..." : post.content;
});

app.get('/posts/:id/comments',(req,res)=>{
    const id = +req.params.id;
    res.send(commentID.filter((i)=>i.postId === id))
});

app.delete('/posts/:id', (req,res)=>{
    const id = +req.params.id;
    postHomePage = postHomePage.filter((i)=>i.id !== id);
    res.sendStatus(200)
});

app.post('/posts/:id/comments',(req,res)=>{
    if(req.body.author.length === 0){
        return res.status(400).send("Empty name");
    }
    if(req.body.content.length === 0){
        return res.status(400).send("Empty comment");
    }
    const id = +req.params.id;
    const comment = req.body;
    comment.postId = id;
    commentID.push(comment);
    res.sendStatus(200);

    const post = postHomePage.filter((i)=>i.id === id)[0]
    post.commentCount++
});

app.listen(4000, ()=>{
    console.log("Servidor funcionando!")
});