{
  let currentIndex = 1
  let pagin = document.querySelector('.block-slider__pagin')
  let btnNext = document.querySelector('.block-slider__arrow[data-action="next"]')
  let btnPrev = document.querySelector('.block-slider__arrow[data-action="prev"]')
  let slides = document.querySelectorAll('.block-slider__item')

  btnNext.onclick = () => {
    if (currentIndex >= 6) return
    currentIndex++
    changeSlide(currentIndex)
  }
  btnPrev.onclick = () => {
    if (currentIndex <= 1) return
    currentIndex--
    changeSlide(currentIndex)
  }

  function changeSlide(index) {
    pagin.innerHTML = `0${index} / 06`
    slides.forEach((i) => {
      ;+i.getAttribute('data-idx') === index
        ? i.classList.add('block-slider__item_active')
        : i.classList.remove('block-slider__item_active')
    })
  }
}
