export default function getArrayfromServer(callback) {
  fetch('https://1534.org/form-school3/php/export.php', {
      method: 'GET'
     
    })
    .then((res) => res.text())
    .then(result => {
      if (result) {
        callback(result)
      }
    })
    .catch((err) => console.log(err))
}

