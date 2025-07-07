import { LoadList, AttRecord, DeleteRecord, getData } from "../utils/api.js";
import { mostrarTela } from "../pages/home.js";

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
        //btnDelete.textContent = 'Apagar';        
        btnDelete.onclick = async(e) => {
            e.preventDefault();
            await DeleteRecord(crm.id);
            await CreateList(list, formRecords);

        };        
        
        const iconTrash = document.createElement('i');
        iconTrash.className = 'fas fa-trash'; 
        btnDelete.appendChild(iconTrash);         
        
        const btnAtt = document.createElement('button');
        btnAtt.className = 'btn-att';
        btnAtt.style.marginLeft = 'auto';        
        btnAtt.onclick = async(e) => {
            e.preventDefault();

             document.getElementById("btnGravar").textContent = "Atualizar";   

            await getData(crm, formRecords);
            await CreateList(list, formRecords);
            mostrarTela(1);
        };

        const iconEdit = document.createElement('i');
        iconEdit.className = 'fas fa-edit';
        btnAtt.appendChild(iconEdit);
                          
        li.appendChild(btnAtt);
        li.appendChild(btnDelete);    
        list.appendChild(li);
    });    

}

