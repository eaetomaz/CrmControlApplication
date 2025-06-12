import { LoadList, AttRecord, DeleteRecord } from "../utils/api.js";

export async function CreateList(list) {
    list.innerHTML = '';

    const listCrm = await LoadList();
    
    listCrm.forEach(crm => {
        
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';        

        li.innerHTML = crm.cliente + '<br>Celular: ' + crm.celular +
         '<br>Email: ' + crm.email +
         '<br>Motivo: ' + crm.motivo +
         '<br>Endereço: ' + crm.endereco;        

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        btnDelete.style.marginLeft = 'autot';
        btnDelete.textContent = 'Apagar';        
        btnDelete.onclick = async() => {
            await DeleteRecord(crm.id);
            await CreateList(list);

        };

        const btnAtt = document.createElement('button');
        btnAtt.className = 'btn-att';
        btnAtt.style.marginLeft = 'auto';
        btnAtt.textContent = 'Atualizar';
        btnAtt.onclick = async() => {
            await AttRecord(data);
            await CreateList(list);
        };
                            
        li.appendChild(btnAtt);
        li.appendChild(btnDelete);    
        list.appendChild(li);
    });    

}

