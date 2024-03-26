document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.stars img')
  const feedbackMessage = document.getElementById('feedback-message')
  const imageContainer = document.getElementById('imageContainer')
  const moreInfoButton = document.getElementById('moreInfoButton')
  const submitButton = document.getElementById('submitButton')
  const feedbackTextSection = document.querySelector('.feedbackText')

  function handleClick(index) {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('light')
    }
    for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove('light')
    }
  }

  function handleMouseOver(event) {
    for (let i = 0; i <= event.currentTarget.dataset.index; i++) {
      stars[i].classList.add('light')
    }
    for (
      let i = parseInt(event.currentTarget.dataset.index) + 1;
      i < stars.length;
      i++
    ) {
      stars[i].classList.remove('light')
    }
  }

  submitButton.addEventListener('click', submitFeedback)

  // Funzione per gestire l'invio del feedback
  function submitFeedback() {
    const feedbackText = document.getElementById('formFeedbackText').value
    console.log('Feedback submitted:', feedbackText)

    const selectedStars = document.querySelectorAll('.stars img.light')

    // Nasconde le stelline, la sezione del commento e il tasto submit dopo il submit
    document.querySelector('.stars').style.display = 'none'
    document.querySelector('.commentArea').style.display = 'none'
    feedbackTextSection.style.display = 'none' // Nasconde il testo di feedback
    submitButton.style.display = 'none' // Nasconde il pulsante "Submit"

    if (selectedStars.length >= 6) {
      // Mostra il messaggio di ringraziamento
      feedbackMessage.innerText = 'Thanks for your feedback!'
      imageContainer.innerHTML = `
        <div id="gifContainer" style="display: flex; justify-content: center; align-items: center;">
          <img src="https://media1.tenor.com/m/6vWYnc0dkisAAAAd/your-feedback-is-appreciated-we-value-your-feedback.gif" alt="Love GIF" style="max-width: 100%;">
        </div>`
    } else {
      // Mostra il messaggio di scuse
      feedbackMessage.innerText = "We're sorry to hear your feedback."
      imageContainer.innerHTML = `
        <div id="gifContainer" style="display: flex; justify-content: center; align-items: center;">
          <img src="https://media1.tenor.com/m/9rRu1_qcVpIAAAAC/shredder-mr-burns.gif" alt="Sad GIF" style="max-width: 100%;">
        </div>`
    }

    moreInfoButton.style.display = 'block'
    moreInfoButton.style.margin = '0 auto'
    moreInfoButton.style.marginBottom = '20px'
    moreInfoButton.style.marginTop = '50px'

    imageContainer.appendChild(moreInfoButton)
  }

  moreInfoButton.addEventListener('click', redirectToMoreInfoPage)

  function redirectToMoreInfoPage() {
    window.location.href = 'https://epicode.com/it/'
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      handleClick(index)
    })
    star.addEventListener('mouseover', handleMouseOver)
  })
})