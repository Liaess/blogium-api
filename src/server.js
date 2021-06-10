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
    const id = parseInt(req.params.postId);
    res.send(postHomePage.filter((i)=>i.id === id)[0]);
});

let countId = 0;

app.post('/posts', (req,res)=>{
    countId++;
    const post = req.body;
    post.content = post.content.replace("<p>","").replace("</p>","");
    post.contentPreview = post.content.length > 15 ? post.content.split(16)[0] + "..." : post.content;
    post.commentCount = 0;
    postHomePage.push({id:countId, ...post})
    res.sendStatus(200);
});

app.get('/posts/:id/comments',(req,res)=>{
    const id = parseInt(req.params.id);
    res.send(commentID.filter((i)=>i.postId === id))
});

app.post('/posts/:id/comments',(req,res)=>{
    const id = parseInt(req.params.id);
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