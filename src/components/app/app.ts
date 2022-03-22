import { AppView } from '../view/appView';
import { Toy } from '../model/toy';

export class App {
  appView: AppView;

  constructor(filter: HTMLElement, toys: Toy[]) {
    this.appView = new AppView(filter, toys);
  }

  start(): void {
    this.appView.viewContent();
  }
}

export default App;
