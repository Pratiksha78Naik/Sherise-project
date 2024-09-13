import { Component, OnInit } from '@angular/core';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-hygquiz',
  templateUrl: './hygquiz.component.html',
  styleUrls: ['./hygquiz.component.css']
})
export class HygQuizComponent implements OnInit {
  quizData: QuizQuestion[] = [
    {
      question: 'What is one major reason girls in India drop out of school after starting menstruation?',
      options: ['Lack of interest in studies', 'Early marriage', 'Lack of proper menstrual hygiene facilities', 'Poor academic performance'],
      answer: 'Lack of proper menstrual hygiene facilities',
    },
    {
      question: 'Which of the following can help improve menstrual hygiene for girls in schools?',
      options: ['Providing more homework', 'Separate toilets with water and disposal facilities', 'Increasing school hours', 'Reducing the number of teachers'],
      answer: 'Separate toilets with water and disposal facilities',
    },
    {
      question: 'What is a common misconception about menstruation that leads to stigma?',
      options: ['It is a natural biological process', 'It makes women impure or unclean', 'It is necessary for reproduction', 'It is a sign of good health'],
      answer: 'It makes women impure or unclean',
    },
    {
      question: 'How can menstrual hygiene education benefit young girls?',
      options: ['By increasing absenteeism', 'By reducing drop-out rates', 'By increasing gender disparity', 'By promoting superstitions'],
      answer: 'By reducing drop-out rates',
    },
    {
      question: 'What percentage of girls in India are unaware of menstruation until they experience it?',
      options: ['10%', '20%', '50%', '70%'],
      answer: '70%',
    },
    
  
  ];

  currentQuestion = 0;
  score = 0;
  selectedOption: string | null = null;
  incorrectAnswers: { question: string, incorrectAnswer: string, correctAnswer: string }[] = [];
  showingAnswers = false;
  shuffledOptions: string[] = [];

  ngOnInit() {
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
