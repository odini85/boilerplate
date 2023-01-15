import image1 from '@assets/images/img.png';
import smallImage1 from '@assets/images/small-img.png';
import { v } from '@src/utils/test';

import { fn } from './utils/test';

import '@assets/styles/style.scss';

const test = 1;

console.log({ BUILD_AT, API_BASE_URL });

fn();

const img = document.createElement('img');
img.src = image1;
document.body.appendChild(img);
const img2 = document.createElement('img');
img2.src = smallImage1;
document.body.appendChild(img2);

const a = (v1: string, v2: string) => `v1 + v2 : ${v1 + v2}`;

const template = `template literal __  ${a('123', '456')}`;

console.log(template);
