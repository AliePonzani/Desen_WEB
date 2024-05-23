import './index.scss';


import React, { useEffect, useState } from 'react';
import { buscarDados } from '../../Service/api.service';
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import CarrosselFotos from '../../Components/Carrossel/fotos';
import CardsProdutos from '../../Components/CardProdutos/CardProdutos';
import CarrosselCards from '../../Components/Carrossel/cards';
import CardEvento from '../../Components/CardEvento/CardEvento';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from '../../Components/Login/Login';


const style = {
  position: 'absolute',
  top: '50%',
  left: "40%",
  transform: 'translate(-30%, -50%)'
};

export default function Home() {
  const [produtos, setProdutos] = useState();
  const [cardapios, setCardapios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [carrosselPrincipal, setCarrosselPrincipal] = useState([]);
  const [index, setIndex] = useState(0);


  const handleChange = (event, newValue) => {
    setIndex(newValue - 1);
  };

  const [botaoSelecionado, setBotaoSelecionado] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBotaoClick = async (cardapio) => {
    setBotaoSelecionado(cardapio.nome);
    const produtos = await buscarDados(`produto/cardapio/${cardapio.id}`)
    setProdutos(produtos);
  };

  const getImagemUrl = (imagem) => {
    const imagemCorrigida = imagem ? imagem.replace(/\\/g, '/') : '';
    return imagemCorrigida ? `url(http://127.0.0.1:5000/${imagemCorrigida})` : '';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const eventos = await buscarDados("evento")
        setEventos(eventos);
        let cardapios = await buscarDados("cardapio");
        setCardapios(cardapios);
        let imagens = await buscarDados("imagem/1")
        setImagens(imagens);
        let carrosselPrincipal = await buscarDados("imagem/0")
        setCarrosselPrincipal(carrosselPrincipal);
        setBotaoSelecionado(cardapios[0].nome);
        handleBotaoClick(cardapios[0])
      } catch (error) {
        console.error('Erro ao buscar os dados HOME:', error);
      }
    }
    fetchData();
  }, [index]);

  return (
    <div className="pagina-home">

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Login></Login>
        </Box>
      </Modal>

      <header>
        <div className='menu'>
          <a href="#eventos">Eventos</a>
          <a href="#cardapios">Cardápio</a>
          <a href="#sobre">Sobre</a>
          <a href="#maps">Localização</a>
        </div>
        <div className='logo'><img src='/assets/img/logo circular.png' alt='Logo circular ArtGula'></img></div>
        <div className='acessoAdm'>
          <button onClick={handleOpen}>Acesso restrito</button>
        </div>
      </header>

      <section className='painelPrincipal'>
        <div className='carrosselPrincipal' style={{ backgroundImage: getImagemUrl(carrosselPrincipal[index]?.imagem) }}>
          <div className='displayCarrossel'>
            <h1>
              {carrosselPrincipal[index]?.titulo}
            </h1>
            <button style={{ backgroundColor: "#a97f2c", color: "#f6cabc" }}>Faça seu pedido <IoLogoWhatsapp fontSize="2rem" /></button>
            <button style={{ backgroundColor: "#f6cabc", color: "#a97f2c" }}>Siga a gente <AiFillInstagram fontSize="2rem" /></button>
          </div>
          <div className='btnSelecionar'>
            <Stack spacing={0}>
              <Pagination
                count={carrosselPrincipal.length}
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
      </section>

      <section className='eventos' id='eventos'>
        <h1>Eventos</h1>
        <div className='containerCards'>
          <CarrosselCards dados={eventos} componente={CardEvento}></CarrosselCards>
        </div>
      </section>

      <section className='cardapios' id='cardapios'>
        <div className='listaCardapios'>
          <div className='botoesLista'>
            {cardapios.map((cardapio, index) => (
              <button
                key={index}
                className={cardapio.nome === botaoSelecionado ? 'selecionado' : ''}
                onClick={() => handleBotaoClick(cardapio)}
              >
                {cardapio.nome}
              </button>
            ))}
          </div>
          <Link to={`/cardapio/${botaoSelecionado}`}>Ver cardápio <strong>{botaoSelecionado}</strong> completo</Link>
        </div>
        <div className='carrosselCards'>
          <CarrosselCards dados={produtos} componente={CardsProdutos}></CarrosselCards>
        </div>
        <div>
        </div>
      </section>

      <section id='carrosselFotos'>
        <CarrosselFotos imagens={imagens} />
      </section>

      <section className='sobre' id='sobre'>
        <div className='logo_artgula'>
          <img src='/assets/img/tituloArtEGula.png' alt='logo principal loja'></img>
        </div>
        <div className='conteudo_sobre'>
          <div className='fotoDona'>
            <img src='/assets/img/fotoDona.png' alt='foto da idealizadora da ArtGula sentada em frente a loja'></img>
          </div>
          <p>Somos a Art & Gula, uma doceria e café localizada no
            charmoso bairro de Moema em São Paulo.
            Nossa loja foi pensada para proporcionar uma
            experiência inesquecível e instagramável.
            Nosso espaço é perfeito para você relaxar e também
            realizar sua festa de aniversário ou evento.
            Nós criamos bolos, doces e salgadinhos e atendemos
            o corporativo.<br />
            Nossos salgados são todos fabricações própria e se
            destacam pela qualidade. Nossa especialidade são os
            salgados congelados, que atendem o varejo e o atacado.</p>
        </div>
      </section>

      <section className='avaliacao'>
        <div>
          <img className='avaliacaoImg' src='/assets/img/avaliacao1.png' alt='avaliações loja'></img>
          <img className='avaliacaoImg' src='/assets/img/avaliacao2.png' alt='avaliações loja'></img>
          <img className='avaliacaoImg' src='/assets/img/avaliacao3.png' alt='avaliações loja'></img>
        </div>
        <img className='nota' src='/assets/img/nota.png' alt='nota google'></img>
      </section>

      <section className='maps'>
        <iframe
          title="Localização da ArtGula no Google Maps"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Av.%20Jurema,%20401%20-%20Moema,%20S%C3%A3o%20Paulo%20-%20SP,%2004079-001+(Art&amp;Gula)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
        <p>Endereço: Av. Jurema, 401 - Moema,<br />
          São Paulo - SP, 04079-001<br />
          Telefone: (11) 95865-5550<br />
          Horário de Funcionamento:<br />
          Terça à Sexta: 10h - 19h<br />
          Sábado, Domingo e feriados: 9h - 19h
        </p>
      </section>

      <footer className='rodape'>
        <div className='logo_rodape'>
          <img src='/assets/img/logo circular.png' alt='logo circular ArtGula'></img>
        </div>


        <div className='item_rodape'>
          <div >
            <h4>Produtos</h4>
            <ul>
              {cardapios.map((cardapio, index) => (
                <li key={index}>
                  <a href={`./cardapio/${cardapio.nome}`}>{cardapio.nome}</a>
                </li>
              ))}
            </ul>
          </div>

          <div >
            <h4>local</h4>
            <ul>
              <li><a href='#sobre'>Sobre a gente</a></li>
              <li><a href='https://www.ifood.com.br/delivery/sao-paulo-sp/art--gula-doceria-indianopolis/6e026fd8-8268-493d-bd1b-6f0daa6aa6b2?utm_medium=share'>iFood</a></li>
              <li><a href='https://wa.me/+5511958655550'>WhatsApp</a></li>
              <li><a href='https://g.page/artgulamoema/review?gm'>Avaliações</a></li>
              <li><a href='artgulacontato@gmail.com'>Contate a gente</a></li>
            </ul>
          </div>

        </div>
      </footer>

    </div >
  );
}


