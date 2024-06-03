import './index.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { buscarImagem } from '../../API/chamadas';

export default function CarrosselFotos(props) {
    const galeria = Array.isArray(props.imagens) ? props.imagens : [];

    const [indice, setIndice] = useState(0);

    const handleChange = (event, newValue) => {
        setIndice(newValue - 1);
    };

    return (
        <div className='carrosselFotos'>
            <h1>Fotos</h1>
            <div className='fotos'>
                <div className='fotoSecundaria'
                    style={{ backgroundImage: `url(${buscarImagem(props.imagens[indice-1]?.imagem) })`}}>
                </div>
                <div className='fotoPrincipal'
                    style={{ backgroundImage: `url(${buscarImagem(props.imagens[indice]?.imagem) })` }}>
                </div>
                <div className='fotoSecundaria'
                    style={{ backgroundImage: `url(${buscarImagem(props.imagens[indice+1]?.imagem) })` }}>
                </div>
            </div>
            <div className='btnSelecionar'>
                <Stack spacing={0}>
                    <Pagination
                        count={galeria.length}
                        onChange={handleChange}
                        size="small"
                        hidePrevButton
                        hideNextButton
                        sx={{
                            '& .MuiPaginationItem-root': {
                                border: "2px solid #a97f2c",
                                color: 'transparent',
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#FDE6E8'
                            },
                        }}
                    />
                </Stack>
            </div>
        </div>
    );
}
