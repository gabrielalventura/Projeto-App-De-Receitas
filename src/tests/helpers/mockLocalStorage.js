// const localStorageMock = (function () {
//   let store = {};

//   return {
//     getItem(key) {
//       return store[key];
//     },

//     setItem(key, value) {
//       store[key] = value;
//     },

//     clear() {
//       store = {};
//     },

//     removeItem(key) {
//       delete store[key];
//     },

//     getAll() {
//       return store;
//     },
//   };
// }());

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });
// // função retirada de https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/;
