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
        li.style.textDecoration = crm.confirmado ? 'line-through' : 'none'; // Processo finalizado

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';                                    
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

        const btnCheck = document.createElement('button');
        btnCheck.onclick = async(e) => {
            e.preventDefault();

            const newData = {
                id: crm.id,
                cliente: crm.cliente,
                email: crm.email,
                celular: crm.celular,
                endereco: crm.endereco,
                motivo: crm.motivo,
                confirmado: crm.confirmado == true ? false : true                
            };          

            await AttRecord(crm.id, newData);
            await CreateList(list, formRecords);
        };

        const iconCheck = document.createElement('i');
        iconCheck.className = crm.confirmado == false ? 'fas fa-check' : 'fas fa-times';
        btnCheck.appendChild(iconCheck);
                          
        li.appendChild(btnAtt);
        li.appendChild(btnDelete);    
        li.appendChild(btnCheck);
        list.appendChild(li);
    });    

}

