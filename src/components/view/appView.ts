import { Toy } from '../model/toy';
import { Filters } from './filters/filters';
import { Sorting } from './sorting/sorting';
import { Storage } from '../controller/storageController';
import { createTreeImageProperty } from '../controller/treeimageproperty';
import { createNouisliders, createSnowflakes } from './utils/utils';
import { drawSelectedToys } from './toys/toys';
import { dragHandler, touchmoveHandler } from './utils/draggedHandler';
import { audioPlayPause } from './audio/audioHandler';
import { createGarland } from './garland/garland';
import { setActiveProperty } from '../controller/treeimageproperty';
import { navigationsHandler } from '../controller/navigationController';

export class AppView {
  filters: Filters;

  sorting: Sorting;

  storage: Storage;

  constructor(filter: HTMLElement, toys: Toy[]) {
    this.filters = new Filters(filter, toys);
    this.sorting = new Sorting();
    this.storage = new Storage();
  }

  viewContent(): void {
    const treePropertyContainer = document
      .querySelector('.christmas-tree__parametrs') as HTMLElement;
    const audio = new Audio('../../../assets/audio/audio.mp3') as HTMLAudioElement;
    const body: HTMLElement  = document.querySelector('body') as HTMLElement;
    const navbar = document.querySelector('.nav-bar') as HTMLElement;
    const startBtn = document.querySelector('#start') as HTMLElement;
    const snow = document.querySelector('#snow') as HTMLElement;
    const snowflakesCount = 50;

    navigationsHandler(navbar, body, startBtn);
    
    document.addEventListener('DOMContentLoaded', () => {
      createNouisliders();
      createSnowflakes(snow, snowflakesCount);
      this.viewTreeImageProperty(treePropertyContainer);
      this.onStorageLoadedHandler(audio);
      this.filtersTurnOn();
      this.resetStorageHandler(audio);
      drawSelectedToys(this.filters.toys, this.filters.selectedToys);
      this.dragToys();
      this.garlandHandler();
      this.snowSoundHandler(audio);
    });
  }

  filtersTurnOn() {
    const searchElem = document.querySelector('.search') as HTMLInputElement;

    this.onStorageSavedHandler();
    this.sorting.addToySortingHandler(
      this.filters.filtersElem,
      this.filters.filteredToys,
      this.filters.selectedToys,
    );
    this.filters.addShapeFilterHandler();
    this.filters.addCountFilterHandler();
    this.filters.addYearFilterHandler();
    this.filters.addColorFilterHandler();
    this.filters.addSizeFilterHandler();
    this.filters.addFavoriteFilterHandler();
    this.filters.addSearchFilterHandler(searchElem);
    this.addToySelectedHandler(this.filters.selectedToys);
    this.filters.addResetFiltersHandler();
  }

  addToySelectedHandler(array: string[]): void {
    const toysContainer = document
      .querySelector('.toys-container') as HTMLElement;
    const selectedToyCount = document
      .querySelector('.selected-toys__count') as HTMLElement;
  
    toysContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
  
      if (target.closest('.toys-container__item')) {
        if (array.length === 20 && !target.closest('.selected')) {
          const message = document.createElement('div');
          message.className = 'alert';
          message.innerHTML = '<p>Извините, все слоты заполнены</p>';
  
          toysContainer.append(message);
  
          setTimeout(() => message.remove(), 2000);
          return;
        }
  
        (target.closest('.toys-container__item') as HTMLElement)
          .classList.toggle('selected');
  
        array.length = 0;
        
        const selectedToys = toysContainer.querySelectorAll('.selected');
  
        selectedToys.forEach((toy) => {
          const toyElememt = toy as HTMLElement;
          array.push((toyElememt.dataset.number as string));
        });
  
        selectedToyCount.textContent = `${array.length}`;
        this.filters.selectedToys = array;
      }
      drawSelectedToys(this.filters.toys, this.filters.selectedToys);
    });
  }

  viewTreeImageProperty(container: HTMLElement): void {
    const tree = container.querySelector('.tree-variants') as HTMLElement;
    const background = container.querySelector('.background') as HTMLElement;
    const treeImage = document.querySelector('.tree-image') as HTMLImageElement;
    const backgroundElement = document
      .querySelector('.christmas-tree__tree') as HTMLElement;

    createTreeImageProperty(tree, treeImage, 'tree', './assets/tree', 'png', 6);
    createTreeImageProperty(
      background,
      backgroundElement,
      'background',
      './assets/bg',
      'jpg',
      10,
    );
  }

  dragToys(): void {
    const selectedToysContainer = document
      .querySelector('.christmas-tree') as HTMLElement;
    const newTargetContainer = document.querySelector('area') as HTMLElement;

    selectedToysContainer.addEventListener('dragstart', (e: Event) => {
      const etarget = e.target as HTMLElement;

      if (etarget.classList.contains('toys__image')) {
        dragHandler(e, etarget, newTargetContainer);
      }
    });

    selectedToysContainer.addEventListener('dragend', (e: Event) => {
      const etarget = e.target as HTMLElement;

      if (etarget.classList.contains('toys__image')) {
        dragHandler(e, etarget, newTargetContainer);
      }
    });

    selectedToysContainer.addEventListener('touchstart', (e: Event) => {
      const etarget = e.target as HTMLElement;

      if (etarget.classList.contains('toys__image')) {
        touchmoveHandler(e, etarget);
      }
    });

    selectedToysContainer.addEventListener('touchmove', (e: Event) => {
      const etarget = e.target as HTMLElement;

      if (etarget.classList.contains('toys__image')) {
        touchmoveHandler(e, etarget);
      }
    });
  }

  snowSoundHandler(audio: HTMLAudioElement) : void {
    const snowSoundContainer = document
      .querySelector('.snow-sound') as HTMLElement;

    snowSoundContainer.addEventListener('click', (e: Event) => {
      const etarget = e.target as HTMLElement;

      if (etarget.dataset.value === 'snow') {
        const snow = document.querySelector('#snow') as HTMLElement;
        etarget.classList.toggle('active');
        snow.classList.toggle('hide');
      }

      if (etarget.dataset.value === 'sound') {
        etarget.classList.toggle('active');
        audioPlayPause(etarget, audio);
      }
    });
  }

  garlandHandler(): void {
    const garlandContainer = document
      .querySelector('#garland ') as HTMLElement;
    const garlandBtns = document
      .querySelector('.garland__btns') as HTMLElement;
    const garlandOnOff = document
      .querySelector('#garland__on-off') as HTMLInputElement;
    const lampCountsInLines: number[] = [3, 5, 7, 8, 9];

    garlandBtns.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('garland__btn')) {
        const colorGarland = target.dataset.value as string;
        garlandOnOff.checked = true;

        createGarland(garlandContainer, lampCountsInLines, colorGarland);
        setActiveProperty(garlandBtns, target);

        target.classList.add('active');
      }
    });

    garlandOnOff.addEventListener('change', () => {
      const colorGarland = garlandBtns.querySelector('.active') as HTMLElement;

      if (garlandOnOff.checked) {
        if (colorGarland) {
          const color = colorGarland.dataset.value as string;

          createGarland(garlandContainer, lampCountsInLines, color);
        } else {
          createGarland(garlandContainer, lampCountsInLines);
        }
        
      } else {
        garlandContainer.innerHTML = '';
      }
    });
  }

  onStorageSavedHandler(): void {
    window.addEventListener('beforeunload', () => {
      const actives = this.filters.filtersElem.querySelectorAll('.active');
      const sliders = this.filters.filtersElem.querySelectorAll('.slider');
      const inputsChecked = this.filters.filtersElem
        .querySelectorAll('input:checked');

      this.storage.setToStorage(actives, sliders, inputsChecked);
      this.storage.setStorageProperty(
        this.filters.activeFilters,
        this.filters.selectedToys,
      );

      const treeVariants = document
        .querySelector('.tree-variants') as HTMLElement;
      const background = document
        .querySelector('.background') as HTMLElement;
      const garlandBtns = document
        .querySelector('.garland__btns') as HTMLElement;

      this.storage.setStorageTreeSettings(treeVariants, 'treeVariants');
      this.storage.setStorageTreeSettings(background, 'background');
      this.storage.setStorageTreeSettings(garlandBtns, 'garlandBtns');

      const switchGarland = document
        .querySelector('#garland__on-off') as HTMLInputElement;
      localStorage.setItem('switchGarland', `${switchGarland.checked}`);

      const snowSound = document.querySelector('.snow-sound') as HTMLElement;

      this.storage.setSnowSoundProperty(snowSound);
    });
  }

  onStorageLoadedHandler(audio: HTMLAudioElement): void {
    const buttons = this.filters.filtersElem.querySelectorAll('button');
    const sliders = this.filters.filtersElem.querySelectorAll('.slider');
    const inputs = this.filters.filtersElem.querySelectorAll('input');
    const activeFilters = this.storage.getActiveFiltersStorage();
    this.filters.selectedToys = this.storage.getSelectedToysStorage();

    if (activeFilters) {
      this.filters.activeFilters = activeFilters;
    }
    this.filters.toysFilterApply();
    this.storage.getToStorage(buttons, sliders, inputs);

    const treeVariants = document
      .querySelector('.tree-variants') as HTMLElement;
    const background = document
      .querySelector('.background') as HTMLElement;
    const garlandBtns = document
      .querySelector('.garland__btns') as HTMLElement;
    const christmasTreeContainer = document
      .querySelector('.christmas-tree__tree') as HTMLElement;
    const christmasTree = christmasTreeContainer
      .querySelector('.tree-image') as HTMLImageElement;

    this.storage.getStorageTreeSettings(
      treeVariants,
      'treeVariants',
      christmasTree,
      '../../assets/tree',
      'png',
    );
    this.storage.getStorageTreeSettings(
      background,
      'background',
      christmasTreeContainer,
      '../../assets/bg',
      'jpg',
    );
    this.storage.getStorageTreeSettings(garlandBtns, 'garlandBtns');

    if (localStorage.getItem('switchGarland') === 'true') {
      const garlandContainer = document
        .querySelector('#garland ') as HTMLElement;
      const lampCountsInLines: number[] = [3, 5, 7, 8, 9];
      const colorGarland = localStorage.getItem('garlandBtns') || '';
      const switchGarland = document
        .querySelector('#garland__on-off') as HTMLInputElement;
      switchGarland.checked = true;

      createGarland(garlandContainer, lampCountsInLines, colorGarland);
    }

    const snowSound = document.querySelector('.snow-sound') as HTMLElement;
    const snow = document.querySelector('#snow') as HTMLElement;
    this.storage.getSnowSoundProperty(snowSound, audio, snow);
  }

  resetStorageHandler(audio: HTMLAudioElement): void {
    const resetAll = this.filters.filtersElem
      .querySelector('#reset-all') as HTMLElement;
    const resetTreeProperty = document
      .querySelector('#reset-tree-property') as HTMLElement;

    resetAll?.addEventListener('click', () => {
      const selectedToyCount = document
        .querySelector('.selected-toys__count') as HTMLElement;
      selectedToyCount.textContent = '0';

      this.storage.resetStorage();
      this.filters.selectedToys = [];
      this.filters.addResetFiltersHandler();
      this.filters.toysFilterApply();
    });

    resetTreeProperty.addEventListener('click', () => {
      const christmasTreePropertyes = document
        .querySelectorAll('.christmas-tree__parametrs .active');
      const garland = document.querySelector('#garland') as HTMLElement;

      christmasTreePropertyes.forEach((property) => {
        property.classList.remove('active');
      });
      const christmasTreeContainer = document
        .querySelector('.christmas-tree__tree') as HTMLElement;
      christmasTreeContainer.style.removeProperty('background-image');

      const christmasTree = christmasTreeContainer
        .querySelector('.tree-image') as HTMLImageElement;
      christmasTree.src = './assets/tree/1.png';

      const switchGarland = document
        .querySelector('#garland__on-off') as HTMLInputElement;
      const snow = document.querySelector('#snow') as HTMLInputElement;
      switchGarland.checked = false;
      snow.classList.add('hide');
      garland.innerHTML = '';
      audio.pause();
      audio.currentTime = 0;

      this.storage.resetStorage();
      drawSelectedToys(this.filters.toys, this.filters.selectedToys);
    });
  }
}

export default AppView;
