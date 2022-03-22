function toysCountIncontainers(container: HTMLElement): void {
  const countElement = container
    .querySelector('.toys__selected-count') as HTMLElement;
  let count = 0;

  for (let index = 0; index < container.children.length; index++) {
    if (
      container.children[index].classList.contains('toys__image') &&
      !container.children[index].classList.contains('dragged')
    ) {
      count = count + 1;
    }
  }

  countElement.textContent = `${count}`;
}

export function dragHandler(
  e: Event,
  target: HTMLElement,
  newTargetContainer: HTMLElement,
): void {
  if (e.type == 'dragend') {
    const elemBelow = document
      .elementFromPoint((e as DragEvent).clientX, (e as DragEvent).clientY);
    if (elemBelow === newTargetContainer) {
      target.classList.add('dragged');
      target.style.top = `${(e as DragEvent).clientY - 30}px`;
      target.style.left = `${(e as DragEvent).clientX - 30}px`;
    } else {
      target.classList.remove('dragged');
      target.style.top = 'auto';
      target.style.left = 'auto';
    }
    const toyContainer = target.closest('.toys__selected') as HTMLElement;
    if (toyContainer) {
      toysCountIncontainers(toyContainer);
    }
  }
}

export function touchmoveHandler(e: Event, target: HTMLElement): void {
  target.style.top = `${(e as TouchEvent).targetTouches[0].clientY - 30}px`;
  target.style.left = `${(e as TouchEvent).targetTouches[0].clientX - 30}px`;
}

export default dragHandler;
