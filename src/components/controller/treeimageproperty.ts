export function setActiveProperty(container: HTMLElement, target: HTMLElement) {
  for (let index = 0; index < container.children.length; index++) {
    container.children[index].classList.remove('active');
  }
  
  target.classList.add('active');
}

function addTreeImageClickHandler(
  container: HTMLElement,
  replace: HTMLElement | HTMLImageElement,
  source: string,
  extension: string,
): void {
  container.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    
    if (
      target.classList.contains('property') &&
      target.dataset.name === 'tree'
    ) {
      (replace as HTMLImageElement)
        .src = `${source}/${target.dataset.value}.${extension}`;
      setActiveProperty(container, target);
    }

    if (
      target.classList.contains('property') &&
      target.dataset.name === 'background'
    ) {
      (replace as HTMLElement)
        .style
        .backgroundImage = `url(${source}/${target.dataset.value}.${extension})`;
      setActiveProperty(container, target);
    }
  });
}

export function createTreeImageProperty(
  container: HTMLElement,
  replace: HTMLElement | HTMLImageElement,
  name: 'tree' | 'background',
  source: string,
  extension: string,
  count: number,
): void {
  for (let index = 0; index < count; index++) {
    const element = document.createElement('div');
    element.classList.add('property');
    element.dataset.value = `${index + 1}`;
    element.dataset.name = `${name}`;
    element.style.backgroundImage = `url(${source}/${index + 1}.${extension})`;
    container.append(element);
  }
  
  addTreeImageClickHandler(container, replace, source, extension);
}

export default createTreeImageProperty;
