const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const container = document.querySelector('.container')
const list = container.querySelector('.list')
const items = container.querySelectorAll('.item')
const indicators = document.querySelector('.indicators')
const dots = indicators.querySelectorAll('ul li')

let active = 0
const last = items.length - 1

function updateSlider(direction) {
    list.style.setProperty('--calculation', direction)

    const currentItem = document.querySelector('.item.active')
    const currentDot = indicators.querySelector('ul li.active')

    if (currentItem) currentItem.classList.remove('active')
    if (currentDot) currentDot.classList.remove('active')

    items[active].classList.add('active')
    dots[active].classList.add('active')

    indicators.querySelector('.number').textContent =
        (active + 1).toString().padStart(2, '0')
}


// NEXT
nextButton.addEventListener('click', () => {
    active = active + 1 > last ? 0 : active + 1
    updateSlider(1)
})

// PREV  ✅ (ISSO NÃO EXISTIA)
prevButton.addEventListener('click', () => {
    active = active - 1 < 0 ? last : active - 1
    updateSlider(-1)
})

// DOTS ✅ (ISSO NÃO EXISTIA)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === active) return

        const direction = index > active ? 1 : -1
        active = index
        updateSlider(direction)
    })
})
