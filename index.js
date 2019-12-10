// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const target = document.getElementById("customElement")

import { fromEvent } from 'rxjs';

const observer = {
  next: val => {
    console.log(val.x, val.y)
  },
  error: err => console.log('error', err),
  complete: () => console.log('Complete!')
};

const source$ = fromEvent(document, 'mousemove');
const subcription = source$.subscribe(observer);

setTimeout(() => {
  subcription.unsubscribe();
  console.log("unsubscribed")
}, 3000);