(() => {
  
  // LLAMADO A LA API DE KONTENT
  const testURL =
    "https://deliver.kontent.ai/c5c47978-33d9-0022-146a-e31bed62d5ec/items";

  const getData = () => {
    fetch(testURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setData(data.items);
      })
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
    data.map((item) => {
      if (item.system.type === "slide") {
        setSlides( item.elements.imagenes.value );
      }
    }); 
  }

  // INICIALIZACIÓN DE LA APP
  getData();
})();
