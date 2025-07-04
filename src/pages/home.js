import { LoadList, AddRecord, AttRecord, idAtt } from "../utils/api.js";
import { CreateList } from '../components/ListRecords.js';

const btnGravar = document.getElementById("btnGravar");
const formRecords = document.getElementById('formCadastro');

document.addEventListener('DOMContentLoaded', async() => {
    
    const list = document.getElementById('list');

    const Records = await LoadList();
    await CreateList(list);
})


btnGravar.addEventListener('click', async(e) => {
        e.preventDefault();        

        const cliente = document.getElementById('cliente').value;
            const email = document.getElementById('email').value;
            const celular = document.getElementById('celular').value;
            const endereco = document.getElementById('endereco').value;
            const motivo = document.getElementById('motivo').value;        

            if(!cliente || !email || !celular || !endereco || !motivo)
                return;          
    
        if(btnGravar.textContent == 'Gravar') {                                   

            const id = list.length +1;
            const data = { id, cliente, email, celular, endereco, motivo};
                            
            await AddRecord(data);
            await CreateList(list, formRecords);            

        } else {

            const newData = {cliente, email, celular, endereco, motivo };
            
            await AttRecord(idAtt, newData);
            await CreateList(list, formRecords);    
            
            btnGravar.textContent = "Gravar";
        }

        formRecords.reset();
    });