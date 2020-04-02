import { createAllCheckBoxes, deleteAllCheckBoxes } from './checkbox.js';
import getArrayFromServer from './server.js';
import { array } from './mockData.js'

let appData = [];

// получаем данные с сервера и присваиваем их переменной appData
getArrayFromServer((arr) => {
  appData = JSON.parse(arr.replace(/<br\/>/g, '')); // данные пришли в виде текста, надо было преобразовать в JSON
  document.querySelector('input[name=day]').removeAttribute('disabled'); // сделано для того чтобы поле выбора дня разблокировалось после того, как данные пришли. Хотя сейчас в html не установлен атрибут
});


// функция ищет в предлагаемом массиве вида [
//  {"time": "10:00:00",
//    "day": "31-03-20" 
//  }, {...}, {...} .....] соответсвие указанное дате 
function getOccupiedTimes(checkedArr, day) {
  const counters = checkedArr.filter(el => el.day === day) // фильтруем чтобы в массиве остались только объекты, у которых значение ключа day соответсвует аргументу selectedDay
    .map(el => el.time) // оставляем в этом объекте только одну пару ключ-значение - time
    .reduce((res, current) => {
      if (!res[current]) {
        res[current] = 1;
      } else {
        res[current]++;
      }
      return res;
    }, {}); // создаем объект, в котором указывается сколько раз встречается какое время

  const busyTimes = Object.entries(counters) // преобразуем объект в массив массивов ["10:00:00", 4] - одно значениеж
    .filter(el => el[1] > 2) // фильтруем, если второе число больше 2
    .map(el => el[0]) // оставляем  нулевой элемент (время) в каждом массиве
    .map(el => el.substr(0, 5)); // обрезаем как нам надо

  return busyTimes;
}


function timeRadioButtons(occupiedTimes) {
  const timeButtons = document.querySelectorAll('input[name=time]');
  const lables = document.querySelectorAll('.label');

  timeButtons.forEach(timeButton => { // проходим по всем радиокнопкам и если массив с занятых времен содержит значение timeButton
    if (occupiedTimes.includes(timeButton.value)) {
      timeButton.setAttribute('disabled', true); // то блокируем кнопку
      timeButton.checked = false;

      lables.forEach(label => { // проходим по всем строкам привязанным к радиокнопке и если кнопка имеет айди такой же как у labl htmlFor
        if (timeButton.hasAttribute('disabled') && timeButton.id === label.htmlFor) {
          label.classList.add('label_busy'); // то назначаем строке нужный класс
        }
      })

    } else { // в обратном случае делаем все наоборот
      timeButton.removeAttribute('disabled');
      lables.forEach(label => {
        if (!timeButton.hasAttribute('disabled') && timeButton.id === label.htmlFor) {
          label.classList.remove('label_busy');
        }
      })
    }
  })
}

function dayChangeHandler() {
  const selectedDay = document.querySelector('input[name=day]').value;
  
  if (selectedDay === '2020-04-06') {
    deleteAllCheckBoxes();
    createAllCheckBoxes(14);
    document.querySelector('.form__button').removeAttribute('disabled');

  } else if (selectedDay === '2020-04-04' || selectedDay === '2020-04-05') {
    deleteAllCheckBoxes();
    document.querySelector('.form__field_radio').textContent = 'К сожалению, на выходные записи нет';
    document.querySelector('.form__button').setAttribute('disabled' , true);

  } else {
    deleteAllCheckBoxes();
    createAllCheckBoxes(16);
    document.querySelector('.form__button').removeAttribute('disabled');
  }
  const occupiedTimes = getOccupiedTimes(appData, selectedDay);
  timeRadioButtons(occupiedTimes);

}

document.querySelector('input[name=day]').addEventListener('change', dayChangeHandler); 
