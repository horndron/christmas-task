import { toysArray } from './components/view/utils/utils';
import { App } from './components/app/app';
import data from './components/model/data';
import './global.sass';
import 'nouislider/dist/nouislider.css';

const toys = toysArray(data);
const filters: HTMLElement = document.querySelector('.filters') as HTMLElement;
const app = new App(filters, toys);

app.start();
