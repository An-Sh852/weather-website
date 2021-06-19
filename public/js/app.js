console.log('client side js is loaded!')

const resultDiv = document.querySelector('.result')
const weatherForm = document.querySelector('form')
const inputSearch = document.querySelector('input')
weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const location = inputSearch.value
  resultDiv.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return resultDiv.textContent = data.error
      }
      resultDiv.textContent = `It is ${data.temp} deg celsius in ${data.location}. It feels like ${data.feelslike} deg celsius`
    })
  })
})