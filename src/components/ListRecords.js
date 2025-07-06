import { LoadList, AttRecord, DeleteRecord, getData } from "../utils/api.js";

export async function CreateList(list, formRecords) {
    list.innerHTML = '';

    const listCrm = await LoadList();
    
    listCrm.forEach(crm => {
        
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';        

        li.innerHTML = crm.cliente + ' - Celular: ' + crm.celular;

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        btnDelete.style.marginLeft = 'autot';
        btnDelete.textContent = 'Apagar';        
        btnDelete.onclick = async(e) => {
            e.preventDefault();
            await DeleteRecord(crm.id);
            await CreateList(list, formRecords);

        };        
        
        const btnAtt = document.createElement('button');
        btnAtt.className = 'btn-att';
        btnAtt.style.marginLeft = 'auto';
        btnAtt.textContent = 'Atualizar';
        btnAtt.onclick = async(e) => {
            e.preventDefault();

             document.getElementById("btnGravar").textContent = "Atualizar";   

            await getData(crm, formRecords);
            await CreateList(list, formRecords);
        };
                          
        li.appendChild(btnAtt);
        li.appendChild(btnDelete);    
        list.appendChild(li);
    });    

}

