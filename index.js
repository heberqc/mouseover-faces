console.clear();

import './style.css';
import { fromEvent } from 'rxjs';

const subject = document.getElementById('subject');

const X_0 = (1/2) * window.innerWidth;
const Y_0 = (1/2) * window.innerHeight;

const gap = (x, y) => x < 0 ? 180 : y < 0 ? 360 : 0;

const observer = {
  next: val => {
    const cx = val.x - X_0;
    const cy = Y_0 - val.y;
    const angle = Math.round(Math.atan(cy/cx)*180/Math.PI + gap(cx, cy));
    console.log(`(${cx}, ${cy})`, angle);
  },
  error: err => console.log('error', err),
  complete: () => console.log('Complete!')
};

const source$ = fromEvent(document, 'mousemove');
const subcription = source$.subscribe(observer);

subject.addEventListener('click', () => {
  subcription.unsubscribe();
  console.log("unsubscribed")
});
