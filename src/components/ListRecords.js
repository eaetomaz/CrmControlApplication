import { LoadList, AttRecord, DeleteRecord, getData } from "../utils/api.js";

export async function CreateList(list, formRecords) {
    list.innerHTML = '';

    const listCrm = await LoadList();

    const trTitulos = document.createElement('tr');

    const tdNome = document.createElement('td');    
    tdNome.innerHTML = 'Nome';

    const tdEmail = document.createElement('td');
    tdEmail.innerHTML = 'E-mail';

    const tdCelular = document.createElement('td');
    tdCelular.innerHTML = 'Celular';

    const tdEndereco = document.createElement('td');
    tdEndereco.innerHTML = 'Endereço';

    const tdMotivo = document.createElement('td');
    tdMotivo.innerHTML = 'Motivo';
    
    trTitulos.appendChild(tdNome);
    trTitulos.appendChild(tdEmail);
    trTitulos.appendChild(tdCelular);
    trTitulos.appendChild(tdEndereco);
    trTitulos.appendChild(tdMotivo);
    list.appendChild(trTitulos);    
    
    listCrm.forEach(crm => {
        
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.style.display = 'flex';
        tdNome.style.alignItems = 'center';
        tdNome.innerHTML = crm.cliente;        

        const tdEmail = document.createElement('td');                
        tdEmail.innerHTML = crm.email;        

        const tdCelular = document.createElement('td');
        tdCelular.innerHTML = crm.celular;        

        const tdEndereco = document.createElement('td');
        tdEndereco.innerHTML = crm.endereco;        

        const tdMotivo = document.createElement('td');
        tdMotivo.innerHTML = crm.motivo;

        //tr.style.display = 'flex';
        //tr.style.alignItems = 'center';        

        // li.innerHTML = crm.cliente + '<br>Celular: ' + crm.celular +
        //  '<br>Email: ' + crm.email +
        //  '<br>Motivo: ' + crm.motivo +
        //  '<br>Endereço: ' + crm.endereco;        
            

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';        
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

            //await AttRecord(crm);                             

            await getData(crm, formRecords);
            await CreateList(list, formRecords);
        };
                          
        //li.appendChild(btnAtt);
        //li.appendChild(btnDelete);    
        //list.appendChild(li);

        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdCelular);
        tr.appendChild(tdEndereco);
        tr.appendChild(tdMotivo);
        list.appendChild(tr);
    });    

}

