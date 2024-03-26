// Recupera l'array results dai dati di sessione
const questions = JSON.parse(sessionStorage.getItem("questions")) || [];
// il console log sottostante viene fatto per accertarci che arriva integro
console.log("log di come arriva array per controllo", questions); // Per controllo

// parte finale grafica dopo conclucsione test
const finish = () => {
  const rimuoviTimer = document.getElementsByClassName("containerTimer")[0] ;
  const rimuoviTitoloDomanda = document.getElementsByClassName("Question")[0];
  const rimuoviBottoniRisposta = document.getElementsByClassName("contenitoreRisposte")[0] ;
  const centraBottoneAlCentro = document.getElementById("show-result-button") ;
  rimuoviTimer.classList.add("stilePerUtimaDomanda")
  rimuoviTitoloDomanda.classList.add("stilePerUtimaDomanda")
  rimuoviBottoniRisposta.classList.add("stilePerUtimaDomanda")
  centraBottoneAlCentro.classList.add("stilePerUtimaDomandaBottone")
  clearInterval(timer)
}

// Array (per il momento vuoto) per salvare l'esito di ogni risposta data dall'utente
const results = []

// Codice per il timer
let counter = 50
let progress = 0
let timer

// Definizione dell'elemento h4 e inizializzazione del timer
const h4 = document.createElement("h4")
const containerText = document.getElementById("container-text")
const second = document.createElement("p")
const rimanenti = document.createElement("p")
containerText.append(second, h4, rimanenti)
h4.classList.add("progress-textH4")
second.classList.add("progress-textP")
rimanenti.classList.add("progress-textP")
second.innerText = "SECONDS"
rimanenti.innerText = "REMAINING"

// Funzione per avviare il timer
function startTimer() {
  clearInterval(timer); 
  if(index < questions.length) {
    const domandaCorrente = questions[index];
    // Imposta il tempo per rispondere per la domanda corrente
    counter = domandaCorrente.tempoPerRispondere;
  } else {
    console.log("Evita di avviare il timer se l'indice è fuori range");
    return; // Evita di avviare il timer se l'indice è fuori range
  }
  progress = 0; // Reimposta il progresso a 0 per la nuova domanda
  timer = setInterval(() => {
    counter--
    h4.innerText = counter
    const progressBar = document.getElementById("progress-bar")
    const domanda = questions[index]
    progress = progress + (100 / domanda.tempoPerRispondere); // Aggiorna questa linea per calcolare il progresso in modo proporzionale
    progressBar.style.background = `conic-gradient(cyan ${progress}%, #9b9898 0%)`

    if (counter === 0) {
      clearInterval(timer)
      index++
      if (index < questions.length) {
        const domanda = questions[index]
        results.push({
          question: domanda.question,
          selectedAnswer: "Time Out",
          correctAnswer: domanda.correct_answer,
          isCorrect: false,
          difficulty: domanda.difficulty,
        })
        console.log("Tempo scaduto!")
        nextQuestion()
        startTimer()

      } else {
        console.log("Tempo scaduto ultima domanda!aaaaaaaaaaaaa")
        const domanda = questions[index -1]
        const provola = questions[4]
        results.push({
          question: provola.question,
          selectedAnswer: "Time Out",
          correctAnswer: domanda.correct_answer,
          isCorrect: false,
          difficulty: domanda.difficulty,
        })
        // Se siamo all'ultima domanda, aggiungi il pulsante per mostrare i risultati
        const footer = document.querySelector("footer")
        const showResultButton = document.createElement("button")
        showResultButton.textContent = "MOSTRA RISULTATO TEST"
        showResultButton.id = "show-result-button"
        showResultButton.classList.add("button-ans")
        footer.innerHTML = "" // Rimuovi eventuali vecchi pulsanti nel footer
        footer.appendChild(showResultButton)
        showResultButton.addEventListener("click", () => {
          window.location.href = "result.html" // Redirigi verso la pagina dei risultati
        })
        // Salva l'array results nei dati di sessione dopo che l'utente ha completato il quiz
        sessionStorage.setItem("results", JSON.stringify(results))
        finish()
        console.log("Hai completato tutte le domande! è il timer è scaduto")
        
      }
    }
  }, 1000)
}

// Variabile per tenere traccia dell'indice della domanda corrente
let index = 0

// Funzione per mostrare la prossima domanda
function nextQuestion() {
  const contatoreElement = document.querySelector(".valoreContatore")
  const questionElement = document.querySelector(".Question")
  const risposteElement = document.querySelector(".contenitoreRisposte")
  risposteElement.innerHTML = ""
  // Controlla se siamo all'ultima domanda
  if (index === questions.length) {
    // Se siamo all'ultima domanda, ferma il timer
    startTimer()
    
  } else {
    // Se non siamo all'ultima domanda, avvia il timer per la prossima domanda
    startTimer()
  }
  const domanda = questions[index]
  console.log("se da errore alla 127 è tutto ok!")
  questionElement.innerHTML = `<h1>${domanda.question}</h1>`
  contatoreElement.innerHTML = `<span>${index + 1}<span class="coloreContatore"> / ${questions.length}</span></span>`
  const tutteLeRisposte = [...domanda.incorrect_answers, domanda.correct_answer]
  tutteLeRisposte.sort(() => Math.random() - 0.5)
  tutteLeRisposte.forEach((risposta, rispostaIndex) => {
    const bottone = document.createElement("button")
    bottone.textContent = risposta
    bottone.classList.add("button-ans")
    risposteElement.appendChild(bottone)
    bottone.addEventListener("click", () => {
      let isCorrect = risposta === domanda.correct_answer
      //modifica background colore bottone in base alla risposta
      if (isCorrect) {
        bottone.classList.add("green")
        setTimeout(nextQuestion, 300)
      } else {
        bottone.classList.add("red")
        setTimeout(nextQuestion, 200)
      }

      console.log(isCorrect ? "Risposta corretta!" : "Risposta sbagliata!")
      //dove vengono push i dati inerenti alle risposte
      results.push({
        question: domanda.question,
        selectedAnswer: risposta,
        correctAnswer: domanda.correct_answer,
        isCorrect: isCorrect,
        difficulty: domanda.difficulty,
      })
      index++
      // Controlla se siamo all'ultima domanda
      if (index === questions.length) {
        // Se siamo all'ultima domanda, aggiungi il pulsante per mostrare i risultati
        const footer = document.querySelector("footer")
        const showResultButton = document.createElement("button")
        showResultButton.textContent = "MOSTRA RISULTATO TEST"
        showResultButton.id = "show-result-button"
        showResultButton.classList.add("button-ans")
        footer.innerHTML = "" // Rimuovi eventuali vecchi pulsanti nel footer
        footer.appendChild(showResultButton)
        showResultButton.addEventListener("click", () => {
          console.log("Hai completato tutte le domande! e l'ultima l'hai selezionata brova")
          window.location.href = "result.html" // Redirigi verso la pagina dei risultati
        })
        // Salva l'array results nei dati di sessione dopo che l'utente ha completato il quiz
        finish()
        sessionStorage.setItem("results", JSON.stringify(results))
      } else {
        // Se non siamo all'ultima domanda, mostra la prossima domanda
        
      }
    })
  })
}

// Chiama la funzione startTimer per avviare il quiz
nextQuestion()
startTimer()
console.log("NON APRIRE ARRAY SOTTOSTANTE PRIMA DI COMPLETARE LE DOMANDE PENA BUG VISIVO NEI LOG")
console.log("NON INFLUENZA LA LOGICA")
console.log("Array che viene riempito ogni volta che utente compila le domande", results)