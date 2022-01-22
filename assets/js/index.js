import { apiKey } from '../modules/api-key.js'

const form = document.querySelector('form')
const gifsContainer = document.querySelector('.gifs-container')

const getUrl = (value) => {
   return `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${value}`
}

const fetchGifData = async (value) => {
   try {
      const url = getUrl(value)
      const response = await fetch(url)

      if (!response.ok) {
         throw new Error('Não foi possível obter os dados da api')
      }
      return response.json()
   } catch (error) {
      console.log(error)
   }
}

const getGifUrlImage = async (value) => {
   const response = await fetchGifData(value)
   const url = response.data[0].images.downsized.url

   return url
}

const getGifTitle = async (value) => {
   const response = await fetchGifData(value)
   const title = response.data[0].title

   return title
}

const gifCardHTML = (gifUrl, gifTitle) => {
   gifsContainer.innerHTML += `
   <div class="gifs-card">
      <img src="${gifUrl}">
      <p>${gifTitle}</p>
   </div>
`
}

form.addEventListener('submit', async event => {
   event.preventDefault()

   const inputValue = event.target.search.value
   const gifUrl = await getGifUrlImage(inputValue)
   const gifTitle = await getGifTitle(inputValue)

   gifCardHTML(gifUrl, gifTitle)
})