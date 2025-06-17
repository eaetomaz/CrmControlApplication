const apiUrl = 'http://localhost:3000/consult';

// Consumação da API

async function apiRequest(endpoint, method = 'GET', data = null) {
    const option = {
        method,
        headers: { 'content-type': 'application/json' }
    };    

    if(data) option.body = JSON.stringify(data);    
    
    try {
        const res = await fetch(endpoint, option);
        if(!res.ok) throw new Error(`Erro: ${res.status}`);
        return await res.json();        
    } catch (error) {
        console.log(`Erro na requisição ${method} ${endpoint}:`, error);
        return null;
    }    
}

function validateData(data) {
    if(!data || typeof data !== 'object') {
        console.error('Dados inválidos:', data);
        return false;
    }

    //Validacões adicionais
    return true;
}

export let idAtt;

export async function getData(data, form) {
    const campos = ["cliente", "email", "celular", "endereco", "motivo"];

    idAtt = data.id;

    for (const campo of campos) {
        const input = document.getElementById(campo);
        if (input) {
            input.value = data[campo] ?? "";
        } else {
            console.warn(`Campo "${campo}" não encontrado no formulário.`);
        }
    }
}


export const LoadList = () => apiRequest(apiUrl);
export const AddRecord = (data) => apiRequest(apiUrl, 'POST', data);
export const AttRecord = (id, data) => apiRequest(`${apiUrl}/${id}`, 'PUT', data);
export const DeleteRecord = (id) => apiRequest(`${apiUrl}/${id}`, 'DELETE');