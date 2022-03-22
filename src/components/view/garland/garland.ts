function createGarlandLine(garland: HTMLElement, lampCount: number): void {
  const line = document.createElement('ul') as HTMLElement;
  line.classList.add('lightrope');

  for (let index = 0; index < lampCount; index++) {
    const lamp = document.createElement('li');
    line.append(lamp);
  }

  garland.append(line);
}

export function createGarland(
  garlandContainer: HTMLElement,
  lampCountsInLines: number[],
  garlandClassName = 'multicolor',
): void {
  garlandContainer.className = garlandClassName;
  garlandContainer.innerHTML = '';

  for (let index = 0; index < lampCountsInLines.length; index++) {
    createGarlandLine(garlandContainer, lampCountsInLines[index]);
  }
}

export default createGarland;
