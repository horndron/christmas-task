import { Toy } from '../../model/toy';
import noUiSlider from 'nouislider';
import wNumb from 'wNumb';

export interface ToyObj {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export function toysArray(toys: ToyObj[]): Toy[] {
  const toyObjArray: Toy[] = toys.map((toy) => {
    return new Toy(
      Number(toy.num),
      toy.name,
      Number(toy.count),
      Number(toy.year),
      toy.shape,
      toy.color,
      toy.size,
      toy.favorite,
    );
  });

  return toyObjArray;
}

function createSliderElementsValue(sliderContainer: HTMLElement, min: number, max: number) {
  const valuesContainer = document.createElement('div');
  valuesContainer.classList.add('slider-values');
  const minValue = document.createElement('div');
  minValue.classList.add('min');
  minValue.textContent = `${min}`;
  const maxValue = document.createElement('div');
  maxValue.classList.add('max');
  maxValue.textContent = `${max}`;

  valuesContainer.append(minValue);
  valuesContainer.append(maxValue);
  sliderContainer.after(valuesContainer);
}

export function createNouisliders(): void {
  const sliderCount = document.querySelector('.count-slider') as HTMLElement;
  const sliderCountMin = 1;
  const sliderCountMax = 12;
  const sliderYear = document.querySelector('.year-slider') as HTMLElement;
  const sliderYearMin = 1940;
  const sliderYearMax = 2020;

  noUiSlider.create(sliderCount, {
    start: [sliderCountMin, sliderCountMax],
    connect: true,
    tooltips: wNumb({ decimals: 0 }),
    behaviour: 'tap',
    step: 1,
    range: {
      'min': sliderCountMin,
      'max': sliderCountMax,
    },
  });
  createSliderElementsValue(sliderCount, sliderCountMin, sliderCountMax);

  noUiSlider.create(sliderYear, {
    start: [sliderYearMin, sliderYearMax],
    connect: true,
    tooltips: wNumb({ decimals: 0 }),
    behaviour: 'tap',
    step: 10,
    range: {
      'min': sliderYearMin,
      'max': sliderYearMax,
    },
  });
  createSliderElementsValue(sliderYear, sliderYearMin, sliderYearMax);
}

export function createSnowflakes(container: HTMLElement, count: number): void {
  for (let index = 0; index < count; index++) {
    const snowflakes = document.createElement('i');
    container.append(snowflakes);
  }
}

export default toysArray;
