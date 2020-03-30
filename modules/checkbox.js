// создание одной радиокнопки вhtml-документе 

const checkBoxTemplate = document.querySelector('.radio-template').content;

function createCheckBox(time) {
  const timeNoSec = time.substr(0,5);
  const idTime = `time${timeNoSec.replace(/:/, '-')}`;
  const checkBox = checkBoxTemplate.cloneNode(true);

  checkBox.querySelector('.radio').value = timeNoSec;
  checkBox.querySelector('.radio').id = idTime;
  checkBox.querySelector('.label').textContent = timeNoSec;
  checkBox.querySelector('.label').setAttribute('for', idTime);
  
  document.querySelector('.form__field_radio').appendChild(checkBox);
}

// создание массива вида ['10:00' ,'10:05' .... '15:55']
function generateTimes() {
  let hours = [];
  let mins = [];

  for (let i = 10; i < 16; i++) {
    hours.push(String(i));
  }

  for (let i = 0; i < 56; i += 5) {
    if (i === 0 || i === 5) {
      mins.push(`0${i}`)
    } else {
      mins.push(String(i));ы
    }
  }
  const arr = [];

  for (let hour of hours) {
    for (let min of mins) {
      arr.push(`${hour}:${min}`)
    }
  }
  return arr;
}

const allTimes = generateTimes();

// создание всех радиокнопок на основе массива
function createAllCheckBoxes() {
  allTimes.forEach(time => createCheckBox(time));
}

export { createAllCheckBoxes}