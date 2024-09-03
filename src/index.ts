import express from 'express'
import cors from 'cors'
import { Request,Response } from 'express';

const app = express();

app.use(express.json())
app.use(cors())

app.delete('/deletar/:id',(Req:Request,Res:Response)=>{
    let nome = Req.params.id;
    Res.send(nome);
    console.log(nome);
})

app.post('/users',(Req:Request,Res:Response)=>{
    const usuarioNovo = Req.body;
    Res.status(201).send('usuario criado');
    console.log(usuarioNovo);
})

app.listen(3003,()=>{
    console.log("Servidor rodando https://localhost:3003");
})
