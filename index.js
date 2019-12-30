console.clear();

import './style.css';
import { merge, fromEvent } from 'rxjs';
import { map, pairwise, takeUntil } from 'rxjs/operators';

const subject = document.getElementById('subject');

// CONSTANTS
const X_0 = (1/2) * window.innerWidth;
const Y_0 = (1/2) * window.innerHeight;

// FUNCTIONS
const gap = (x, y) => x < 0 ? 180 : y < 0 ? 360 : 0;
const faceSwitch = angle => {
  if (angle < 45) return '01';
  else if (angle < 90) return '02';
  else if (angle < 135) return '03';
  else if (angle < 180) return '04';
  else if (angle < 225) return '05';
  else if (angle < 270) return '06';
  else if (angle < 315) return '07';
  else return '08';
};
const imageSource = (cod) => `https://raw.githubusercontent.com/heberqc/mouseover-faces/master/images/${cod}.jpeg`;

// OBSERVER
const observer = {
  next: val => {
    if (val.onface) {
      subject.setAttribute('src', imageSource('00'));
      return;
    }
    const cx = val.x - X_0;
    const cy = Y_0 - val.y;
    const angle = Math.round(Math.atan(cy/cx)*180/Math.PI + gap(cx, cy));
    subject.setAttribute('src', imageSource(faceSwitch(angle)));
    console.log(`(${cx}, ${cy})`, `${angle}◦`);
  },
  error: err => console.log('error', err),
  complete: () => {
    subject.setAttribute('src', imageSource('09'));
    console.log('Baby Yoda went to sleep!');
  },
};

// STREAMS
const stopButton = fromEvent(subject, 'click');
const face$ = fromEvent(subject, 'mousemove').pipe(takeUntil(stopButton), map(ev => ({ ...ev, onface: true })));
const angles$ = fromEvent(document, 'mousemove').pipe(takeUntil(stopButton));
const source$ = merge(face$, angles$).pipe(
  pairwise(),
  map(arr => ({
    x: arr[1].x,
    y: arr[1].y,
    onface: arr[0]. onface || arr[1]. onface || false,
  })),
);

// SUBSCRIPTION
const subcription = source$.subscribe(observer);
