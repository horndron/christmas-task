import { Toy } from '../../model/toy';
import { drawToys } from '../toys/toys';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class Sorting {
  sortingToy(data: Toy[], prop: 'name' | 'count' | 'year', sort: string): void {
    if (sort === SortOrder.ASC) {
      data.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    }
    if (sort === SortOrder.DESC) {
      data.sort((a, b) => a[prop] > b[prop] ? -1 : 1);
    }
  }

  addToySortingHandler(
    filtersElem: HTMLElement,
    toysFilter: Toy[],
    selectedToys: string[],
  ): void {
    const sorting = filtersElem.querySelector('#sort') as HTMLElement;

    document.addEventListener('DOMContentLoaded', () => {
      const sortProp: string[] = (sorting as HTMLSelectElement).value.split('-');
      if (
        sortProp[0] === 'name' ||
        sortProp[0] === 'count' ||
        sortProp[0] === 'year'
      ) {
        this.sortingToy(toysFilter, sortProp[0], sortProp[1]);
        drawToys(toysFilter, selectedToys);
      }
    });
    
    sorting.addEventListener('change', (e: Event) => {
      const etarget: HTMLSelectElement = e.target as HTMLSelectElement;
      const sortProp: string[] = etarget.value.split('-');

      if (
        sortProp[0] === 'name' ||
        sortProp[0] === 'count' ||
        sortProp[0] === 'year'
      ) {
        this.sortingToy(toysFilter, sortProp[0], sortProp[1]);
        drawToys(toysFilter, selectedToys);
      }
    });
  }
}

export default Sorting;
