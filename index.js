// пробегаемся по массиву, и каждый элемент массива преобразовываем в два символа
// первый - количество вхождений, второй само число.
// решил ограничить диапазон range, для того чтобы использовать только буквенные обозначения от 65 до 122 (A-z)

function serialize(arr) {
  let str = '';
  const range = 58;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      let char = String.fromCharCode(((arr[i] + 65) % range) + 65);
      str += char + String.fromCharCode(((i + 65) % range) + 65);
    }
  }

  return str;
}

function deserialize(str) {
  let arr = [];

  const range = 58;

  for (let i = 0; i < str.length; i += 2) {
    let count = ((str.charCodeAt(i) - 65) % range) + 65;
    let num = ((str.charCodeAt(i + 1) - 65) % range) + 65;

    for (let j = 0; j < count; j++) {
      arr.push(num);
    }
  }

  return arr;
}

function calculateCompression(original, compressed) {
  return ((compressed.length / original.length) * 100).toFixed(2);
}

function runTest(numbers) {
  const original = numbers.join(',');
  const serialized = serialize(numbers);
  const compressionRatio = calculateCompression(original, serialized);
  console.log(`Исходная строка:, ${original}`);
  console.log(`Сжатая строка:, ${serialized}`);
  console.log(`Коэффициент сжатия:, ${compressionRatio}%`);
  console.log('-------------------------------');
}

const tests = [
  [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  Array.from({ length: 50 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 500 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300)),
  Array.from({ length: 9 }, (_, index) => index + 1),
  Array.from({ length: 90 }, (_, index) => index + 10),
  Array.from({ length: 201 }, (_, index) => index + 100),
  Array.from({ length: 900 }, (_, i) => Math.floor(i / 3)),
];

tests.forEach((test) => {
  runTest(test);
});
