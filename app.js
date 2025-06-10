const express = require('express');
const app = new express();
const PORT = 3000;
const path = require('path');

app.use(express.json())

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let listCrm = [ {id: 1, cliente: "Jorge", email: "jorge@gmail.com", celular: "(49) 9 8888-8888", endereco: "Travessa São Paulo, 236", motivo: "Marketing"} ];

//Listar todas os CRM´s
app.get('/consult', (req, res) => {
    res.json(listCrm);
})

//Listar registro específico
app.get('/consult/:id', (req, res) => {
    const { id } = req.params;

    const record = listCrm.find(t => t.id == id);
    if(!record) return res.status(404).json({ error: 'Registro não encontrado' });

    res.status(200).json(record);
});

//Adicionar CRM
app.post('/consult', (req, res) => {
    const { cliente, email, celular, 
        endereco, motivo } = req.body;

    const newCrm = {
        id: listCrm.length + 1,
        cliente: cliente,
        email: email,
        celular: celular,
        endereco: endereco,
        motivo: motivo
    };

    listCrm.push(newCrm);
    res.status(201).json(newCrm);
});

//Atualizar CRM 
app.put('/consult/:id', (req, res) => {
    const { id } = req.params;
    const { cliente, email, celular, 
        endereco, motivo } = req.body;

    const record = listCrm.find(t => t.id == id);
    if(!record) return res.status(404).json({ error: 'Registro não encontrado' });

    record.cliente = cliente ?? record.cliente;
    record.email = email ?? record.email;
    record.celular = celular ?? record.celular;
    record.endereco = endereco ?? record.endereco;
    record.motivo = motivo ?? record.motivo;

    res.json(record);
});

//Excluir CRM
app.delete('/consult/:id', (req, res) => {
    const { id } = req.params;
    listCrm = listCrm.filter(t => t.id != id);
    res.status(200).send(`Registro ${id} removido com sucesso`);
});

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})