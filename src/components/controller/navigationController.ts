import { setActiveProperty } from './treeimageproperty';

function navigations(navigationLink: HTMLElement, bodyElement: HTMLElement) {
  const targetPageClassName = navigationLink.dataset.target as string;
  bodyElement.className = targetPageClassName;
}

export function navigationsHandler(
  navigation: HTMLElement,
  bodyElement: HTMLElement,
  startBtn: HTMLElement,
) {
  const search = bodyElement.querySelector('.search') as HTMLElement;
  
  navigation.addEventListener('click', (e: Event) => {
    const etarget = e.target as HTMLElement;
    if (etarget.classList.contains('nav-bar__link')) {
      navigations(etarget, bodyElement);
      setActiveProperty(navigation, etarget);

      if (bodyElement.classList.contains('toys-page')) search.focus();
    }
  });

  startBtn.addEventListener('click', () => {
    bodyElement.className = 'toys-page';
    search.focus();
  });
}

export default navigationsHandler;
