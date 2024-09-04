import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizData: QuizQuestion[] = [
    {
      question: 'What does PCOS stand for?',
      options: ['Polycystic Ovarian Syndrome', 'Polycystic Ovary Syndrome', 'Primary Cystic Ovarian Syndrome', 'Polycystic Ovaries Syndrome'],
      answer: 'Polycystic Ovary Syndrome',
    },
    {
      question: 'What is a common symptom of PCOS?',
      options: ['Regular menstrual cycles', 'Excess hair growth', 'Weight loss', ' Low blood pressure'],
      answer: 'Excess hair growth',
    },
    {
      question: 'What is a common complication associated with PCOS?',
      options: ['Osteoporosis', 'Type 2 diabetes', 'Kidney stones', 'Alzheimer disease'],
      answer: 'Type 2 diabetes',
    },
    {
      question: 'Which of the following is NOT a treatment option for PCOS?',
      options: ['Birth control pills', 'Insulin-sensitizing medications', ' Corticosteroids', 'Lifestyle changes'],
      answer: 'Corticosteroids',
    },
    {
      question: 'PCOS can increase the risk of which of the following conditions during pregnancy?',
      options: [
        'Gestational diabetes',
        'Low blood pressure',
        'Anemia',
        ' Osteoporosis',
      ],
      answer: 'Gestational diabetes',
    },
    
  ];

  currentQuestion = 0;
  score = 0;
  selectedOption: string | null = null;
  incorrectAnswers: { question: string, incorrectAnswer: string, correctAnswer: string }[] = [];
  showingAnswers = false;
  shuffledOptions: string[] = [];

  constructor() {
    this.displayQuestion();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  displayQuestion() {
    this.shuffledOptions = [...this.quizData[this.currentQuestion].options];
    this.shuffleArray(this.shuffledOptions);
  }

  checkAnswer() {
    if (this.selectedOption) {
      const answer = this.selectedOption;
      if (answer === this.quizData[this.currentQuestion].answer) {
        this.score++;
      } else {
        this.incorrectAnswers.push({
          question: this.quizData[this.currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: this.quizData[this.currentQuestion].answer,
        });
      }
      this.currentQuestion++;
      this.selectedOption = null;
      if (this.currentQuestion < this.quizData.length) {
        this.displayQuestion();
      } else {
        this.showingAnswers = false;
      }
    }
  }

  retryQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.incorrectAnswers = [];
    this.showingAnswers = false;
    this.displayQuestion();
  }

  showAnswer() {
    this.showingAnswers = true;
  }
}