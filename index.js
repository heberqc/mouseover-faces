// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const target = document.getElementById("customElement")
const cat = document.getElementById("cat")

import { fromEvent } from 'rxjs';

const mid_x = 540/2
const mid_y = 480/2

const observer = {
  next: val => {
    const angle = Math.atan2(val.y, val.x)
    console.log(val.x, val.y, angle/3.14159*180)
  },
  error: err => console.log('error', err),
  complete: () => console.log('Complete!')
};

const source$ = fromEvent(cat, 'mousemove');
const subcription = source$.subscribe(observer);

setTimeout(() => {
  subcription.unsubscribe();
  console.log("unsubscribed")
}, 10000);

