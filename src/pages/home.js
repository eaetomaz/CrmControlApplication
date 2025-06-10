import { LoadList, AddRecord } from "../utils/api.js";
import { CreateList } from '../components/ListRecords.js';



document.addEventListener('DOMContentLoaded', async() => {
    const formRecords = document.getElementById('formCadastro');
    const list = document.getElementById('list');

    const Records = await LoadList();

    formRecords.addEventListener('submit', async(e) => {
        e.preventDefault();
    
        const cliente = document.getElementById('cliente').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const endereco = document.getElementById('endereco').value;
        const motivo = document.getElementById('motivo').value;        

        if(!cliente || !email || !celular || !endereco || !motivo)
            return;               

        const id = Records.length +1;

        const data = {
            id,
            cliente,
            email,
            celular,
            endereco,
            motivo
        };
                        
        await AddRecord(data);
        await CreateList(list);
        formRecords.reset();
    });

    await CreateList(list);
})