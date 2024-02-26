const a = {
  name: 'Nurgazy',
  age: 24,
};

console.log(a);

const aJson = JSON.stringify(a);

console.log(aJson, typeof aJson);

const b = JSON.parse(aJson);

function printObject(jsonString, keysArray = []) {
  return new Promise((resolve, reject) => {
      try {
          const obj = JSON.parse(jsonString);

          if (typeof obj !== 'object' || Array.isArray(obj)) {
              throw new Error('Результатом обработки JSON должен быть объект');
          }

          if (keysArray.length === 0) {
              console.log(JSON.stringify(obj, null, 2));
              resolve();
          } else {
              const filteredObj = Object.fromEntries(Object.entries(obj).filter(([key]) => keysArray.includes(key)));
              console.log(JSON.stringify(filteredObj, null, 2));
              resolve();
          }
      } catch (error) {
          reject(error.message);
      }
  });
}



printObject('{"name": "Нуржан", "age": 20, "city": "Бишкек"}')
  .then(() => console.log("Обработка успешно завершена"))
  .catch(error => console.error(error));


printObject('{"name": "Нуржан", "age": 20, "city": "Бишкек"}', ['name', 'city'])
  .then(() => console.log("Обработка успешно завершена"))
  .catch(error => console.error(error));



printObject('["это", "массив", "а не объект"]')
  .then(() => console.log("Обработка успешно завершена"))
  .catch(error => console.error(error));


printObject('{"name": "Айбек", "age": 31}', ['name', 'city'])
  .then(() => console.log("Обработка успешно завершена"))
  .catch(error => console.error(error));


const delayedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
      printObject('["это", "массив", "а не объект"]', ['name', 'city'])
          .then(() => resolve("Обработка успешно завершена"))
          .catch(error => reject(error));
  }, 1000);
});

delayedPromise.then(result => console.log(result)).catch(error => console.error(error));
