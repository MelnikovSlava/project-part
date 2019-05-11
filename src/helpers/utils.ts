import { getMetamaskStatus } from './eth';


export function generateId(count = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < count; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function copyTextToClipboard(text) {
  if (!('clipboard' in navigator)) {
    let textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy', err);
    }

    document.body.removeChild(textArea);
  } else {
    navigator['clipboard']
      .writeText(text)
      .then()
      .catch((err) => console.error('Async: Could not copy text: ', err));
  }
}

export function tryParce(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Error parce data! Method: "tryParce"', error);
    return null;
  }
}

export function putToLocalStorage(id: string, value: any) {
  localStorage.setItem(id, JSON.stringify(value));
}

export function getFromLocalStorage(id: string): any {
  let data = localStorage.getItem(id);

  if (data !== null) {
    data = tryParce(data);
  }

  return data;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isInteger(num: number): boolean {
  return (num ^ 0) === num;
}

export function cutDecimals(num: number, numberOfDecimals: number = 3): number {
  return isInteger(num) ? num : +num.toFixed(numberOfDecimals);
}

export function childOf(child: Node, parent: Node): boolean {
  while ((child = child.parentNode) && child !== parent);
  return Boolean(child);
}

export function checkMetamaskStatus(f) {
  return function () {
    switch (getMetamaskStatus()) {
      case 'noMetamask':
        alert('Install metamask!');
        break;
      case 'unlockMetamask':
        alert('Unlock metamask!');
        break;
      default:
        f.apply(this, arguments);
        break;
    }
  };
}

// Set() => '1,2,3'
export function convertSetToQuery(set: Set<number | string>): string {
  const arr = [];

  set.forEach((value) => arr.push(value.toString()));

  const str = arr.join(',');

  return str === '' ? null : str;
}

export function trimNumber(num: number): string {
  return num > 1000 ? `${(num / 1000).toFixed(1)} k` : num.toString();
}

export function numToEth(num: number): string {
  return `${Math.round(num)} ETH`;
}
