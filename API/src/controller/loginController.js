import {Router} from "express"

let servidor = Router();

servidor.post('/login',(req, resp)=>{
    const{user,senha} = req.body;

    if(user ==='teste 1' && senha ==="12345"){
        return resp.status(200).json({message:'Login com sucesso'});

    }else{
        return resp.status(401).json({message:'User/senha inválidos'});
    }
});

export default servidor