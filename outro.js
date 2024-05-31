//Código omitido

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for (let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}
