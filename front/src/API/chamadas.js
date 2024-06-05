import axios from 'axios'

const API_Adress = 'http://20.195.170.24:5000/'

export async function salvar(caminho, body) {
    let url = API_Adress + `${caminho}/`;
    let resp = await axios.post(url, body);
    return resp;
}

export async function alterar(caminho, id, body) {
    let url = API_Adress + `${caminho}/${id}`;
    console.log(url);
    let resp = await axios.put(url, body);
    return resp.data;
}

export async function alterarFoto(caminho, id, arquivoImagem) {
    let tipo = caminho === 'produto' ? 'imgProduto' : caminho === 'evento' ? 'imgEvento' : 'imgCarrossel';
    let url = API_Adress + `${tipo}/${caminho}/${id}`
    const formData = new FormData();
    formData.append(tipo, arquivoImagem);
    const uploadConfig = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let resp = await axios.put(url, formData, uploadConfig);
    return resp.status;
}

export async function deletar(caminho, id) {
    let url = API_Adress + `${caminho}/${id}`;
    let resp = await axios.delete(url);
    return resp.status;
}

export async function buscarTodos(caminho) {
    let url = API_Adress + `${caminho}`
    let resp = await axios.get(url);
    return resp.data;
}

export async function buscarIndividual(caminho, id) {
    let url = API_Adress + `${caminho}/${id}`
    let resp = await axios.get(url);
    return resp.data;
}

export async function buscarPorCardapio(caminho, id) {
    let url = API_Adress + `${caminho}/cardapio/${id}`
    let resp = await axios.get(url)
    return resp.data;
}

export function buscarImagem(imagem) {
    const imagemCorrigida = imagem ? imagem.replace(/\\/g, '/') : '';
    let url = API_Adress + `${imagemCorrigida}`;
    return imagemCorrigida ? url : '';
}






