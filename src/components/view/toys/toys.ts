import { Toy } from '../../model/toy';
import { ItemInfo } from '../../interfaces/interfaces';

function getItemsInfo(container: HTMLElement): ItemInfo[] {
  return Array.from(container.children).map((item) => {
    const rect = item.getBoundingClientRect();
    return {
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    };
  });
}

function aminateItems(
  oldItemsInfo: ItemInfo[],
  newItemsInfo: ItemInfo[],
): void {
  for (const newItemInfo of newItemsInfo) {
    const oldItemInfo = oldItemsInfo.find(
      (itemInfo) => itemInfo.element === newItemInfo.element);

    const translateX = oldItemInfo ? oldItemInfo.x - newItemInfo.x : 0;
    const translateY = oldItemInfo ? oldItemInfo.y - newItemInfo.y : newItemInfo.y;
    const scaleX = oldItemInfo ? oldItemInfo.width / newItemInfo.width : 1;
    const scaleY = oldItemInfo ? oldItemInfo.height / newItemInfo.height : 1;

    newItemInfo.element.animate(
      [
        {
          transform: `translate(${translateX}px, 
            ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: 500,
        easing: 'ease-out',
      },
    );
  }
}

export function drawToys(toyArray: Toy[], array: string[]): void {
  const toysContainer: HTMLElement = document
    .querySelector('.toys-container') as HTMLElement;
  const oldItemsInfo = getItemsInfo(toysContainer);

  if (toyArray.length === 0) {
    toysContainer.textContent = 'Извините, совпадений не обнаружено';
  }

  toysContainer.innerHTML = '';

  toyArray.forEach((item: Toy) => {
    const toyElem: HTMLElement = document.createElement('div');
    toyElem.classList.add('toys-container__item');

    if (array.indexOf(`${item.num}`) !== -1) toyElem.classList.add('selected');

    toyElem.dataset.number = `${item.num}`;
    toyElem.innerHTML = `
      <p class="name">${item.name}</p>
      <img src="./assets/toys/${item.num}.png" alt="${item.name}">
      <p class="count">Количество: ${item.count}</p>
      <p class="year">Год покупки: ${item.year} год</p>
      <p class="shape">Форма игрушки: ${item.shape}</p>
      <p class="color">Цвет игрушки: ${item.color}</p>
      <p class="size">Размер игрушки: ${item.size}</p>
      <p class="favorite">Любимая: ${item.favorite === true ? 'да' : 'нет'}</p>`;

    toysContainer.append(toyElem);
  });
  
  const newItemsInfo = getItemsInfo(toysContainer);
  aminateItems(oldItemsInfo, newItemsInfo);
}

export function drawSelectedToys(toys: Toy[], selectedToys: string[]): void {
  const selectedToysContainer: HTMLElement = document
    .querySelector('.right-side__toys') as HTMLElement;
  selectedToysContainer.innerHTML = '';
  
  if (selectedToys.length > 0) {
    toys.forEach((toy: Toy) => {
      if (selectedToys.indexOf(`${toy.num}`) !== -1) {
        const toyElem: HTMLElement = document.createElement('div');
        toyElem.classList.add('toys__selected');
        toyElem.innerHTML = `<p class="toys__selected-count">${toy.count}</p>`;

        for (let index = 0; index < toy.count; index++) {
          const image = document.createElement('img');
          image.className = 'toys__image';
          image.src = `./assets/toys/${toy.num}.png`;
          image.alt = `${toy.name}`;
          image.draggable = true;

          toyElem.append(image);
        }

        selectedToysContainer.append(toyElem);
      }
    });
  }

  if (selectedToys.length === 0) {
    for (let index = 0; index < 20; index++) {
      const toyElem: HTMLElement = document.createElement('div');
      toyElem.classList.add('toys__selected');
      toyElem
        .innerHTML = `<p class="toys__selected-count">${toys[index].count}</p>`;

      for (let indexToy = 0; indexToy < toys[index].count; indexToy++) {
        const image = document.createElement('img');
        image.className = 'toys__image';
        image.src = `./assets/toys/${toys[index].num}.png`;
        image.alt = `${toys[index].name}`;
        image.draggable = true;

        toyElem.append(image);
      }

      selectedToysContainer.append(toyElem);
    }
  }
}

export default drawToys;
