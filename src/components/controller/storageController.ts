import { target } from 'nouislider';
import { ActiveFilters } from '../interfaces/interfaces';
import { audioPLayForClick } from '../view/audio/audioHandler';

export class Storage {
  setToStorage(
    actives: NodeListOf<Element>,
    sliders: NodeListOf<Element>,
    inputsChecked: NodeListOf<Element>,
  ): void {
    const activesValue: string[] = [];
    const inputsCheckedValue: string[] = [];

    actives.forEach((active) => {
      activesValue.push((active as HTMLElement).dataset.filter as string);
    });

    inputsChecked.forEach((input) => {
      inputsCheckedValue.push((input as HTMLElement).dataset.name as string);
    });

    sliders.forEach((slider) => {
      const sliderElem = slider as target;
      const minMax: number[] = [];
      
      minMax.push(Math.round(Number(
        (sliderElem.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow,
      )));
      minMax.push(Math.round(Number(
        (sliderElem.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow,
      )));

      localStorage.setItem(sliderElem.id, JSON.stringify(minMax));
    });

    localStorage.setItem('activesValue', JSON.stringify(activesValue));
    localStorage.setItem('inputsCheckedValue',
      JSON.stringify(inputsCheckedValue));
  }

  getToStorage(
    actives: NodeListOf<Element>,
    sliders: NodeListOf<Element>,
    inputsChecked: NodeListOf<Element>,
  ): void {
    if (localStorage.getItem('activesValue')) {
      const activesValue: string[] = JSON.parse(
        localStorage.getItem('activesValue') as string,
      );

      actives.forEach((active) => {
        if (
          activesValue.indexOf((active as HTMLElement)
            .dataset.filter as string) !== -1
        ) {
          active.classList.add('active');
        }
      });
    }

    if (localStorage.getItem('inputsCheckedValue')) {
      const inputsCheckedValue: string[] = JSON.parse(
        localStorage.getItem('inputsCheckedValue') as string,
      );

      inputsChecked.forEach((input) => {
        if (
          inputsCheckedValue.indexOf((input as HTMLElement)
            .dataset.name as string) !== -1
        ) {
          (input as HTMLInputElement).checked = true;
        }
      });
    }

    if (
      localStorage.getItem('count-slider') &&
      localStorage.getItem('year-slider')
    ) {
      sliders.forEach((slider) => {
        const sliderValues = JSON.parse(
          localStorage.getItem(slider.id) as string,
        );
        const elementMin = ((slider as HTMLElement).nextSibling as HTMLElement)
          .querySelector('.slider-values .min') as HTMLElement;
        const elementMax = ((slider as HTMLElement).nextSibling as HTMLElement)
          .querySelector('.slider-values .max') as HTMLElement;

        (slider as target).noUiSlider?.set(sliderValues);

        elementMin.textContent = `${sliderValues[0]}`;
        elementMax.textContent = `${sliderValues[1]}`;
      });
    }

    const zero = 0;
    const selectedToyCount = document
      .querySelector('.selected-toys__count') as HTMLElement;
    selectedToyCount.textContent = JSON.parse(
      localStorage.getItem('selectedToyCount') as string,
    ) || zero;
  }

  setStorageProperty(activeFilters: ActiveFilters, selectedToys: string[]): void {
    const selectedToyCount = document
      .querySelector('.selected-toys__count') as HTMLElement;

    localStorage.setItem('activeFilters', JSON.stringify(activeFilters));
    localStorage.setItem('selected', JSON.stringify(selectedToys));
    localStorage.setItem('selectedToyCount',
      JSON.stringify(selectedToyCount.textContent));
  }

  getActiveFiltersStorage(): ActiveFilters | null {
    if (localStorage.getItem('activeFilters')) {
      return JSON.parse(localStorage.getItem('activeFilters') as string);
    }
    return null;
  }

  getSelectedToysStorage(): string[] {
    return JSON.parse(localStorage.getItem('selected') as string) || [];
  }

  resetStorage(): void {
    localStorage.clear();
  }

  setStorageTreeSettings(container: HTMLElement, storageName: string): void {
    const active = container.querySelector('.active') as HTMLElement;

    if (active) {
      const propertyValue = active.dataset.value as string;
      localStorage.setItem(storageName, propertyValue);
    }
  }

  getStorageTreeSettings(
    container: HTMLElement,
    storageName: string,
    targetForStorage?: HTMLElement | HTMLImageElement,
    source?: string,
    extension?: string,
  ): void {
    const value = localStorage.getItem(`${storageName}`) as string || null;

    if (value) {
      const activeProperty = container
        .querySelector(`[data-value="${value}"]`) as HTMLElement;
      const activePropertyDataValue = activeProperty.dataset.name as string || '';
      activeProperty.classList.add('active');

      if (
        activePropertyDataValue === 'tree' &&
        targetForStorage &&
        source &&
        extension
      ) {
        (targetForStorage as HTMLImageElement)
          .src = `${source}/${value}.${extension}`;
      }

      if (activePropertyDataValue === 'background' &&
          targetForStorage &&
          source &&
          extension) {
        targetForStorage
          .style.backgroundImage = `url(${source}/${value}.${extension})`;
      }
    }
  }

  setSnowSoundProperty(container: HTMLElement): void {
    for (let index = 0; index < container.children.length; index++) {
      if ((container.children[index] as HTMLElement).dataset.value) {
        const nameStorage = (container.children[index] as HTMLElement)
          .dataset.value as string;

        localStorage.setItem(nameStorage,
          container
            .children[index].classList.contains('active') ? 'true' : 'false');
      }
    }
  }

  getSnowSoundProperty(
    container: HTMLElement,
    audio: HTMLAudioElement,
    snowElement: HTMLElement,
  ): void {
    for (let index = 0; index < container.children.length; index++) {
      if ((container.children[index] as HTMLElement).dataset.value) {
        const nameStorage = (container.children[index] as HTMLElement)
          .dataset.value as string;

        if (localStorage.getItem(nameStorage) === 'true') {
          (container.querySelector(`[data-value="${nameStorage}"]`) as HTMLElement)
            .classList.add('active');

          if (nameStorage === 'sound') audioPLayForClick(audio);
          else if (nameStorage === 'snow') snowElement.classList.remove('hide');
        } 
      }
    }
  }
}

export default Storage;
