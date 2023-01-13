import image1 from '@assets/images/img.png';
import smallImage1 from '@assets/images/small-img.png';
import { v } from '@src/utils/test';

import { fn } from './utils/test';

import '@assets/styles/style.scss';

const test = 1;

const a = BUILD_AT;

console.log(a);

fn();

const img = document.createElement('img');
img.src = image1;
document.body.appendChild(img);
const img2 = document.createElement('img');
img2.src = smallImage1;
document.body.appendChild(img2);
