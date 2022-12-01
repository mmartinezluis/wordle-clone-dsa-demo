
const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const BOARD = (rows=6, cols=5) => Array.from({length: rows}, () => Array.from({length: cols}, () => ""));
const QUEUE = (rows=6) => new Array(rows).fill(0).map((el, index) => index);
export {ALPHABET, BOARD, QUEUE};