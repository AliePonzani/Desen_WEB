import axios from 'axios'

import { API_Adress } from '../constant';

export async function salvarProduto(body) {
    let url = API_Adress + '/produto/';

    let resp = await axios.post(url, body);

    return resp.data;
}

export async function alterarProduto(id, body) {
    let url = API_Adress + `/produto/${id}`;

    let resp = await axios.put(url, body);

    return resp.data;
}

export async function alterarFotoProduto(id, arquivoImagem) {
    let url = API_Adress + `/produto/imagem/${id}`
    const formData = new FormData();
    formData.append('imgProduto', arquivoImagem);
    const uploadConfig = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let resp = await axios.put(url, formData, uploadConfig);

    return resp.data;
}

export async function deletarProduto(id) {
    let url = API_Adress + `/produto/${id}`;
    let resp = await axios.delete(url);

    return resp.status;
}






