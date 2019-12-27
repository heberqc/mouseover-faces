console.clear();

import './style.css';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const subject = document.getElementById('subject');

const X_0 = (1/2) * window.innerWidth;
const Y_0 = (1/2) * window.innerHeight;

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
}

const observer = {
  next: val => {
    const cx = val.x - X_0;
    const cy = Y_0 - val.y;
    const angle = Math.round(Math.atan(cy/cx)*180/Math.PI + gap(cx, cy));
    subject.setAttribute('src', `https://raw.githubusercontent.com/heberqc/mouseover-faces/master/images/${faceSwitch(angle)}.jpeg`);
    console.log(`(${cx}, ${cy})`, `${angle}◦`);
  },
  error: err => console.log('error', err),
  complete: () => {
    subject.setAttribute('src', `https://raw.githubusercontent.com/heberqc/mouseover-faces/master/images/09.jpeg`);
    console.log('Complete!');
  },
};

const face$ = fromEvent(subject, 'mousemove');
const stopButton = fromEvent(subject, 'click');

const source$ = fromEvent(document, 'mousemove').pipe(takeUntil(stopButton));
const subcription = source$.subscribe(observer);
