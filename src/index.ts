import express, { request } from 'express'
import cors from 'cors'
import { Request,Response } from 'express';

const app = express();

app.use(express.json())
app.use(cors())

const users = [
    { id: 1, name: 'Niltão', playlists: [1, 2] },
    { id: 2, name: 'Nicóla', playlists: [3] },
    { id: 3, name: 'Will I Am', playlists: [] }
];
   // Vetor que simula uma tabela de playlists no banco de dados
const playlists = [
    { id: 1, name: 'Forróck', tracks: ['Foguete não tem ré', 'O golpe taí', 'Forrock das aranhas'] },
    { id: 2, name: 'Funk dos cria', tracks: ['Vida Louca', 'Deu Onda', 'Ela Só Quer Paz'] },
    { id: 3, name: 'K-pop', tracks: ['Dynamite', 'Lovesick Girls', 'Gee'] }
];


app.get('/',(req:Request,res:Response)=>{
    res.send('HELLO EXPRESS');
})

app.get('/users',(req:Request,res:Response)=>{
    res.send(users);
})

app.get('/users/:userid',(req:Request,res:Response)=>{
    let { userid } = req.params
    
    const usuario = users.filter((use)=>{
        return Number(userid) === use.id
    })
    res.send(usuario)
})

app.get('/search',(req:Request,res:Response)=>{
    let { keyword } = req.query
    console.log(req.query)
    const playlis = playlists.filter((use)=>{
        return keyword === use.name
    })
    res.send(playlis);
})

app.post('/users/:userId/playlis',(req:Request,res:Response)=>{
    const {userId} = req.params;
    const {id,name,tracks} = req.body;
    
    if(!id || !name || !tracks){
        return res.status(400).send('campo faltando');
    }
    
    const use = users.find(u => u.id == Number(userId))

    if(!use){
        return res.status(404).send('Usuário não encontrado')
    }
    
    use.playlists.push(Number(userId))
    playlists.push(id,name,tracks);
    
    res.status(201).send('playlist criada');
})

app.put('/users/:userId/playlists/:playlistId',(req:Request,res:Response)=>{
    const {name} = req.body
    const {playlistId} = req.params;
    const {userId} = req.params;

    const playId = playlists.find(u => u.id == Number(playlistId))
    
    const user = users.find(u => u.id == Number(userId));

    if(!playId){
        return res.status(404).send("Playlist não encontrada");    
    }

    if(!user){
        return res.status(404).send("usuario não encontrado");
    }

    if(!name){
        return res.status(400).send("sem nome");
    }

    playId.name = name;
    console.log(user)
    res.status(200).send("play-list autoalizada")

})



const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
