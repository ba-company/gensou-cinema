import 'lazysizes';
// @ts-ignore
import throttle from 'lodash.throttle';
import '../css/index.scss';
import AudioHelper from './audioHelper';
import calcScrollTop from './scrollHelper';

const handler = () => {
  // audio
  const audioWrapperEl = document.getElementById('js-bgm');
  if (audioWrapperEl != null) {
    const audio = new AudioHelper(audioWrapperEl);
    audio.initialize();
  }

  // header
  const headerEl = document.getElementById('js-header');
  const scrollHandler = () => {
    const scrollTop = calcScrollTop();
    const threshold = window.innerHeight;
    console.log({ scrollTop, threshold });
    if (headerEl != null) {
      headerEl.setAttribute(
        'data-is-head',
        (scrollTop <= threshold).toString()
      );
    }
  };
  window.addEventListener('scroll', throttle(scrollHandler));
};

window.addEventListener('DOMContentLoaded', handler);
