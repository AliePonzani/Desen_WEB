import './index.scss';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { buscarDados } from '../../Service/api.service';

import Login from '../../Components/Login/Login';
import CarrosselPrincipal from '../../Components/Carrossel/principal';
import CarrosselFotos from '../../Components/Carrossel/fotos';
import CardsProdutos from '../../Components/CardProdutos/CardProdutos';
import CarrosselCars from '../../Components/Carrossel/cards';
import CardEvento from '../../Components/CardEvento/CardEvento';


const style = {
  position: 'absolute',
  top: '50%',
  left: "40%",
  transform: 'translate(-30%, -50%)'
};

export default function Home() {
  const [produtos, setProdutos] = useState();
  const [subcategorias, setSubcategorias] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [produtosPorSubcategoria, setProdutosPorSubcategoria] = useState({});

  const [botaoSelecionado, setBotaoSelecionado] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const imagens = [
    { imagem: "/assets/img/croissant.jpg", titulo: "Croissant" },
    { imagem: "/assets/img/gelato.jpg", titulo: "Gelato" },
    { imagem: "/assets/img/panquecas.jpg", titulo: "Panquecas" }
  ];
  const imagens2 = ["/assets/img/croissant.jpg", "/assets/img/gelato.jpg", "/assets/img/panquecas.jpg", "/assets/img/croissant.jpg", "/assets/img/gelato.jpg", "/assets/img/panquecas.jpg"];

  const handleBotaoClick = (cardapio) => {
    setBotaoSelecionado(cardapio);
    const produtosFiltrados = produtos.filter(produtos => produtos.nomeSubcategoria === cardapio);
    setProdutosPorSubcategoria(produtosFiltrados);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const eventos = await buscarDados("evento")
        setEventos(eventos);

        let subcategorias = await buscarDados("subcategoria");

        const nomesubcategoriasArray = [];
        subcategorias.forEach(item => {
          if (!nomesubcategoriasArray.includes(item.nomeSubcategoria)) {
            nomesubcategoriasArray.push(item.nomeSubcategoria);
          }
        });
        setSubcategorias(nomesubcategoriasArray);
        setBotaoSelecionado(nomesubcategoriasArray[0]);

        const infoProdutos = await buscarDados("produto");
        setProdutos(infoProdutos);
        if (infoProdutos && infoProdutos.length > 0) {
          const produtosFiltrados = infoProdutos.filter(infoProdutos => infoProdutos.nomeSubcategoria === nomesubcategoriasArray[0]);
          setProdutosPorSubcategoria(produtosFiltrados);
        } else {
          console.log("Lista de produtos vazia.");
        }


      } catch (error) {
        console.error('Erro ao buscar os dados HOME:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pagina-home">

      <header>
        <div className='menu'>
          <a href="#eventos">Eventos</a>
          <a href="#cardapios">Cardápio</a>
          <a href="#sobre">Sobre</a>
          <a href="">Localização</a>
        </div>
        <div className='logo'><img src='/assets/img/logo circular.png'></img></div>
        <div className='acessoAdm'>
          <button onClick={handleOpen}>Acesso restrito</button>
        </div>
      </header>

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

      <section className='painelPrincipal'>
        <CarrosselPrincipal imagens={imagens} tipo="Painel Principal" />
      </section>

      <section className='eventos' id='eventos'>
        <h1>Eventos</h1>
        <CarrosselCars dados={eventos} componente={CardEvento}></CarrosselCars>
      </section>

      <section className='cardapios' id='cardapios'>
        <div className='listaCardapios'>
          <div className='botoesLista'>
            {subcategorias.map((cardapio, index) => (
              <button
                key={index}
                className={cardapio === botaoSelecionado ? 'selecionado' : ''}
                onClick={() => handleBotaoClick(cardapio)}
              >
                {cardapio}
              </button>
            ))}
          </div>
          <Link to={`./cardapio/${botaoSelecionado}`}>Ver cardapios {botaoSelecionado} completo</Link>
        </div>
        <div className='carrosselCards'>
          <CarrosselCars dados={produtosPorSubcategoria} componente={CardsProdutos}></CarrosselCars>
        </div>
        <div>
        </div>
      </section>
      <section id='carrosselFotos'>
        <CarrosselFotos imagens={imagens2} />
      </section>
      <section className='sobre' id='sobre'>
        <div className='logo_artgula'>
          <img src='/assets/img/tituloArtEGula.png'></img>
        </div>
        <div className='conteudo_sobre'>
          <div className='fotoDona'>
            <img src='/assets/img/fotoDona.png'></img>
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
          <img className='avaliacaoImg' src='/assets/img/avaliacao1.png'></img>
          <img className='avaliacaoImg' src='/assets/img/avaliacao2.png'></img>
        </div>
        <img className='avaliacaoImg' src='/assets/img/avaliacao3.png'></img>
        <img className='nota' src='/assets/img/nota.png'></img>
      </section>

      <section className='maps'>
        <iframe
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
          <img src='/assets/img/logo circular.png'></img>
        </div>


        <div className='item_rodape'>
          <div >
            <h4>Produtos</h4>
            <ul>
              {subcategorias.map((cardapio) => (
                <li><a href={`./cardapio/${cardapio}`}>{cardapio}</a></li>
              ))}
            </ul>
          </div>

          <div >
            <h4>local</h4>
            <ul>
              <li><a href='#'>Sobre a gente</a></li>
              <li><a href='#'>iFood</a></li>
              <li><a href='#'>WhatsApp</a></li>
              <li><a href='#'>Equipe</a></li>
              <li><a href='#'>Contate a gente</a></li>
            </ul>
          </div>

        </div>
      </footer>


    </div>
  );
}


