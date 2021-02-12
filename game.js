const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Which option is false about the final keyword?',
    choice1: 'A final method cannot be overridden in its subclasses.',
    choice2: 'A final class cannot be extended.',
    choice3: 'A final class cannot extend other classes.',
    choice4: 'A final method can be inherited.',
    answer: 3,
  },
  {
    question: ' Which of these class is superclass of String and StringBuffer class?',
    choice1: 'java.util',
    choice2: 'java.lang',
    choice3: 'ArrayList',
    choice4: 'None',
    answer: 2,
  },
  {
    question: 'What is the default value of long variable',
    choice1: '0',
    choice2: '0.0',
    choice3: '0L',
    choice4: 'None',
    answer: 3,
  },
  {
    question: 'What is Abstraction?',
    choice1: 'Abstraction is a technique to define different methods of same type.',
    choice2: 'Abstraction is the ability of an object to take on many forms.',
    choice3: 'It refers to the ability to make a class abstract in OOP.',
    choice4: 'None of above',
    answer: 3,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()


}

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)
  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })

})

const incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()

