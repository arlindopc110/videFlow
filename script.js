const containerVideos = document.querySelector('.videos__container');

async function buscarEMostrarVIdeos() {
    try {
        const buscar = await fetch("http://localhost:3000/videos")
        const videos = await buscar.json()

        videos.forEach((video) => {
            if (videos.categoria == "") {
                throw new Error("Vídeo não tem categoria")
            }
            containerVideos.innerHTML += `
               <li class="videos__item">
                   <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                   <div class="descricao-video">
                       <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                       <h3 class="titulo-video">${video.titulo}</h3>
                       <p class="titulo-canal">${video.descricao}</p>
                       <p class="categoria" hidden>${video.categoria}</p>
                   </div>
               </li>
               `;
        })
    } catch (error) {
        containerVideos.innerHTML = `p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostrarVIdeos();

const barraDePesquisa = document.querySelector('.pesquisar__input')

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');

    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase()
        const valorFiltro = filtro.toLowerCase()

        video.style.display = valorFiltro ? categoria.includes(valorFiltro) ? 'block' : 'none' : 'block';
    })
}