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

function deleteAllCheckBoxes() {
  document.querySelector('.form__field_radio').textContent = '';
}



function generateTimes(n) {
  let hours = [];
  let mins = [];

  for (let i = 10; i < n; i++) {
    hours.push(String(i));
  }

  for (let i = 0; i < 56; i += 5) {
    if (i === 0 || i === 5) {
      mins.push(`0${i}`)
    } else {
      mins.push(String(i));
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

function createAllCheckBoxes(n) {
  const allTimes = generateTimes(n);
  allTimes.forEach(time => createCheckBox(time));
}

export { createAllCheckBoxes, deleteAllCheckBoxes}
