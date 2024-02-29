let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async() => {
    try {
        await loadPlanets(currentPageUrl)
    } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
    }
    
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement('div')
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
            card.className = 'cards'

            const planetNameBG = document.createElement('div')
            planetNameBG.className = 'planet-name-bg'

            const planetName = document.createElement('span')
            planetName.className = 'planet-name'
            planetName.innerText = `${planet.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const planetImage = document.createElement('div')
                planetImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                planetImage.className = 'planet-image'

                const name = document.createElement('span')
                name.className = 'planet-details'
                name.innerText = `Nome: ${planet.name}`

                 const diameter = document.createElement('span')
                 diameter.className = 'planet-details'
                 diameter.innerText = `Diametro: ${convertDiameter(planet.diameter)} `

                 const climate = document.createElement('span')
                 climate.className = 'planet-details'
                 climate.innerText = `Clima: ${planet.climate}`

                 const terrain = document.createElement('span')
                 terrain.className = 'planet-details'
                 terrain.innerText = `Terreno: ${planet.terrain}`

                 const population = document.createElement('span')
                 population.className = 'planet-details'
                 population.innerText = `População: ${planet.population}`

                 modalContent.appendChild(planetImage)
                 modalContent.appendChild(name)
                 modalContent.appendChild(diameter)
                 modalContent.appendChild(climate)
                 modalContent.appendChild(terrain)
                 modalContent.appendChild(population)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'

        currentPageUrl = url
       

    } catch (error) {
        alert('Erro ao carregar os planetas')
        console.log(error)
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
         
        await loadPlanets(responseJson.next)
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {     
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
         
        await loadPlanets(responseJson.previous)
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertDiameter(diameter) {
    if (diameter === 'unknown'){
        return 'desconhecido'
    }

    return (diameter / 100).toFixed(3);
} 