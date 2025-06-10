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

export const LoadList = () => apiRequest(apiUrl);
export const AddRecord = (data) => apiRequest(apiUrl, 'POST', data);
export const AttRecord = (data) => apiRequest(`${apiUrl}/${id}`, 'PUT', data);
export const DeleteRecord = (id) => apiRequest(`${apiUrl}/${id}`, 'DELETE');