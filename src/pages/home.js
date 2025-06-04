import { LoadList, AddRecord } from "../utils/api.js";
import { CreateList } from '../components/ListRecords.js';

document.addEventListener('DOMContentLoaded', async() => {
    const formRecords = document.getElementById('formCadastro');
    const list = document.getElementById('list');

    formRecords.addEventListener('submit', async() => {
        e.PreventDefault();

        const cliente = document.getElementById('cliente');
        const email = document.getElementById('email');
        const celular = document.getElementById('celular');
        const endereco = document.getElementById('endereco');
        const motivo = document.getElementById('motivo');

        if(!cliente || !email || !celular || !endereco || !motivo) return;        

        const data = {
            cliente: cliente,
            email: email,
            celular: celular,
            endereco: endereco,
            motivo: motivo
        };

        console.log('teste');

        await AddRecord(data);
        await CreateList(list);
        formRecords.reset();
    });


console.log('teste');
    await CreateList(list);
})