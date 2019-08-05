import 'lazysizes';
import '../css/index.scss';
import AudioHelper from './audioHelper';

const handler = () => {
  const audioWrapperEl = document.getElementById('js-bgm');
  if (audioWrapperEl != null) {
    const audio = new AudioHelper(audioWrapperEl);
    audio.initialize();
  }
};

window.addEventListener('DOMContentLoaded', handler);
