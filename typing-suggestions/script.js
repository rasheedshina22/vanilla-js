const inputBox = document.querySelector(".input-box")
const results = document.querySelector(".results")

async function getData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    return data
}

function findMatchingBreed(breedToMatch, inputBreeds) {
    return inputBreeds.filter(place => {
        const regex = new RegExp(breedToMatch, "gi")
        return place.match(regex)
    })
}

inputBox.addEventListener("keyup", e => {
    getData().then(item => {
        const breeds = Object.keys(item.message)
        let matchingResult = []
        let userInput = e.target.value

        if (userInput.length) {
            matchingResult = findMatchingBreed(userInput, breeds)
        } else {
            matchingResult = []
        }
        let suggestionsHTML = matchingResult
            .map(item => {
                return `<li>${item}</li>`
            })
            .join(" ")
        results.innerHTML = suggestionsHTML
    })
})
