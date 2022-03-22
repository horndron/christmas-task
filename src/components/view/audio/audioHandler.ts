export function audioPlayPause(
  audioBtn: HTMLElement,
  audio: HTMLAudioElement,
): void {

  if (audioBtn.classList.contains('active')) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

export function audioPLayForClick(audio: HTMLAudioElement): void {
  document.addEventListener('click', () => {
    audio.play();
  }, { once : true });
}

export default audioPlayPause;
