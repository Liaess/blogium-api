import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let postHomePage = [
    {
        id: 1,
        title: 'Hello World',
        coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
        commentCount: 2
      }
];

app.get('/posts',(req,res)=>{
    res.send(postHomePage);
});

app.get('/posts/:postId', (req,res)=>{
    const id = parseInt(req.params.postId)
    res.send(postHomePage.filter((i)=>i.id === id)[0]);
});


app.listen(4000, ()=>{
    console.log("Servidor funcionando!")
});