(() => {
  const testURL =
    "https://deliver.kontent.ai/c5c47978-33d9-0022-146a-e31bed62d5ec/items";

  const getData = () => {
    fetch(testURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
      })
      .catch((error) => console.error(error));
  };

  getData();
})();
