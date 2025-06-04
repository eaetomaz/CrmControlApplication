import { LoadList, AttRecord, DeleteRecord } from "../utils/api.js";

export async function CreateList(list) {
    list.innerHTML = '';

    const listCrm = await LoadList();
    
    listCrm.forEach(crm => {
        
        const li = document.createElement('li');
        li.textContent = crm.cliente + ' | ' + crm.celular;

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Apagar';
        btnDelete.onclick = 'click', async() => {
            await DeleteRecord(crm.id);
            await CreateList(list);
        };
        
        li.appendChild(btnDelete);        
        list.appendChild(li);
    });

}

