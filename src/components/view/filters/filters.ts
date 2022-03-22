import { Toy } from '../../model/toy';
import { drawToys } from '../toys/toys';
import { target } from 'nouislider';
import './filters.sass';
import { ActiveFilters } from '../../interfaces/interfaces';

export class Filters {
  filtersElem: HTMLElement;

  toys: Toy[];

  filteredToys: Toy[];

  selectedToys: string[];

  activeFilters: ActiveFilters;

  constructor(filtersElem: HTMLElement, toys: Toy[]) {
    this.filtersElem = filtersElem;
    this.toys = toys;
    this.selectedToys = [];
    this.filteredToys = toys;
    this.activeFilters = {
      name: [],
      shape: [],
      count: [],
      year: [],
      color: [],
      size: [],
      favorite: [],
      search: [],
    };
  }

  toysFilterApply(): void {
    const filter = this.activeFilters;
    this.filteredToys = this.toys.filter((toy: Toy) => {
      return (
        (!filter.shape.length || filter.shape.includes(toy.shape)) &&
        (
          !filter.count.length ||
          (toy.count >= filter.count[0] && toy.count <= filter.count[1])
        ) &&
        (
          !filter.year.length || (toy.year >= filter.year[0] &&
          toy.year <= filter.year[1])
        ) &&
        (!filter.color.length || filter.color.includes(toy.color)) &&
        (!filter.size.length || filter.size.includes(toy.size)) &&
        (!filter.favorite.length || toy.favorite === true) &&
        (
          !filter.search.length ||
          toy.name.toLowerCase().indexOf(filter.search[0]) !== -1
        )
      );
    });

    drawToys(this.filteredToys, this.selectedToys);
  }

  addShapeFilterHandler(): void {
    const shapes = this.filtersElem
      .querySelector('.filters__form') as HTMLElement;

    shapes.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;
      
      if (etarget.tagName === 'BUTTON') {
        etarget.classList.toggle('active');
        this.activeFilters.shape.length = 0;
        const active = shapes.querySelectorAll('.active');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.filter as string;
          this.activeFilters.shape.push(dataFilter);
        });

        this.toysFilterApply();
      }
    });
  }

  addCountFilterHandler(): void {
    const count = this.filtersElem.querySelector('.count-slider') as target;
    const elementMin = ((count as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .min') as HTMLElement;
    const elementMax = ((count as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .max') as HTMLElement;

    count.noUiSlider?.on('update', () => {
      this.activeFilters.count.length = 0;
      const min = Math.round(Number(
        (count.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow),
      );
      const max = Math.round(Number(
        (count.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow),
      );

      elementMin.textContent = `${min}`;
      elementMax.textContent = `${max}`;

      this.activeFilters.count.push(min, max);

      this.toysFilterApply();
    });
  }

  addYearFilterHandler(): void {
    const years = this.filtersElem.querySelector('.year-slider') as target;
    const elementMin = ((years as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .min') as HTMLElement;
    const elementMax = ((years as HTMLElement).nextSibling as HTMLElement)
      .querySelector('.slider-values .max') as HTMLElement;

    years.noUiSlider?.on('update', () => {
      this.activeFilters.year.length = 0;
      const min = Math.round(Number(
        (years.querySelector('.noUi-handle-lower') as HTMLElement).ariaValueNow),
      );
      const max = Math.round(Number(
        (years.querySelector('.noUi-handle-upper') as HTMLElement).ariaValueNow),
      );

      elementMin.textContent = `${min}`;
      elementMax.textContent = `${max}`;

      this.activeFilters.year.push(min, max);

      this.toysFilterApply();
    });
  }

  addColorFilterHandler(): void {
    const colors = this.filtersElem
      .querySelector('.filters__color') as HTMLElement;

    colors.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;
      
      if (etarget.tagName === 'BUTTON') {
        etarget.classList.toggle('active');
        this.activeFilters.color.length = 0;
        const active = colors.querySelectorAll('.active');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.filter as string;
          this.activeFilters.color.push(dataFilter);
        });

        this.toysFilterApply();
      }
    });
  }

  addSizeFilterHandler(): void {
    const sizes = this.filtersElem
      .querySelector('.filters__size') as HTMLElement;

    sizes.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;

      if (etarget.tagName === 'INPUT') {
        this.activeFilters.size.length = 0;
        const active = sizes.querySelectorAll('input:checked');

        active.forEach((elem) => {
          const dataFilter = (elem as HTMLElement).dataset.name as string;
          this.activeFilters.size.push(dataFilter);
        });

        this.toysFilterApply();
      }
    });
  }

  addFavoriteFilterHandler(): void {
    const favorite = this.filtersElem
      .querySelector('.filters__favorite') as HTMLElement;

    favorite.addEventListener('click', (e: Event) => {
      const etarget: HTMLElement = e.target as HTMLElement;

      if (etarget.tagName === 'INPUT') {
        this.activeFilters.favorite.length = 0;
        const active = favorite.querySelector('input:checked');
        
        if (active) this.activeFilters.favorite.push('true');

        this.toysFilterApply();
      }
    });
  }

  addSearchFilterHandler(searchElem: HTMLInputElement): void {
    searchElem.addEventListener('input', (e: Event) => {
      this.activeFilters.search.length = 0;
      const etarget = e.target as HTMLInputElement;
      const searchName: string = etarget.value.toLowerCase();
      this.activeFilters.search.push(searchName);

      this.toysFilterApply();
    });
  }

  addResetFiltersHandler(): void {
    const resetFilters = this.filtersElem
      .querySelector('#reset-filters') as HTMLElement;

    resetFilters.addEventListener('click', () => {
      const actives = this.filtersElem.querySelectorAll('.active');
      const inputsChecked = this.filtersElem.querySelectorAll('input:checked');
      const sliders = this.filtersElem.querySelectorAll('.slider');
      

      actives.forEach((active) => {
        active.classList.remove('active');
      });

      inputsChecked.forEach((input) => {
        (input as HTMLInputElement).checked = false;
      });

      sliders.forEach((slider) => {
        const sliderElem = slider as target;
        const minValue = (
          sliderElem.querySelector('.noUi-handle-lower') as HTMLElement
        ).ariaValueMin;
        const maxValue = (
          sliderElem.querySelector('.noUi-handle-upper') as HTMLElement
        ).ariaValueMax;
        sliderElem.noUiSlider?.set([
          Math.round(Number(minValue)),
          Math.round(Number(maxValue)),
        ]);
      });

      this.activeFilters = {
        name: [],
        shape: [],
        count: [],
        year: [],
        color: [],
        size: [],
        favorite: [],
        search: [],
      };

      this.toysFilterApply();
    });
  }
}

export default Filters;
