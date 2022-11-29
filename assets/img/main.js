(() => {
  
  // LLAMADO A LA API DE KONTENT
  const testURL =
    "https://deliver.kontent.ai/c5c47978-33d9-0022-146a-e31bed62d5ec/items";

  const getData = () => {
    fetch(testURL)
      .then((response) => response.json())
      .then((data) => setData(data.items))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // TEMPLATE - SLIDES
  const getSlideTemplate = (name, img) => {
    const template = document.createElement("template");
    template.innerHTML = `
      <div id="${name}" class="banner-slide fade">
        <img class="img-fluid" src="${img}" alt="${name}" />
      </div>
    `;
    return template.content.cloneNode(true);
  }

  // TEMPLATE - ARTICLES
  const getArticleTemplate = (id, title, body, img) => {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
        <div id="${id}" class="article card mx-auto">
          <img class="card-img-top" src="${img}" alt="${title}">
          <div class="card-body">
            <p class="card-text">${body}</p>
          </div>
        </div>
      </div>
    `;
    return template.content.cloneNode(true);
  }

  // IMPLEMENTACIÓN DE ANIMACIÓN PARA LOS SLIDES
  let slideIndex = 0;
  const runBanner = () => {
    const slides = document.getElementsByClassName("banner-slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(runBanner, 2000);
  };

  // IMPLEMENTACIÓN DEL TEMPLATE DE SLIDES
  const setSlides = (slides) => {
    const bannerContainer = document.getElementById("banner-container");
    slides.map((item) => {
      const slide = getSlideTemplate(item.name, item.url);
      bannerContainer.appendChild(slide);
    });
    runBanner();
  }

  // IMPLEMENTACIÓN DEL CONTENIDO DE LA API AL DOM
  const setData = (data) => {
    const articlesContainer = document.getElementById("articles-wrapper");
    data.map((item) => {
      if (item.system.type === "slide") {
        setSlides( item.elements.imagenes.value );
      } else if (item.system.type === "contenido" ) {
        const article = getArticleTemplate(
          item.system.id,
          item.elements.bajada.value,
          item.elements.texto.value,
          item.elements.imagen.value[0].url
          );
        articlesContainer.appendChild(article);
      }
    }); 
  }

  // INICIALIZACIÓN DE LA APP
  getData();
})();
