import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  // Add 8 more questions following the same format
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
    answer: "Blue Whale",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: "Da Vinci",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
  },
  {
    question: "Which country is home to kangaroos?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    answer: "Australia",
  },
  {
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Dickens", "Shakespeare", "Austen", "Twain"],
    answer: "Shakespeare",
  },
  {
    question: "What is the main component of the Sun?",
    options: ["Lava", "Hydrogen", "Oxygen", "Carbon"],
    answer: "Hydrogen",
  },
  {
    question: "In which year did WWII end?",
    options: ["1943", "1945", "1947", "1950"],
    answer: "1945",
  },
];


export default function QuizScreen() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<{question: string, correct: boolean}[]>([]);
  
    const handleSelect = (answer: string) => {
      setSelectedAnswer(answer);
    };
  
    const handleSubmit = () => {
      const isCorrect = selectedAnswer === questions[currentQuestion].answer;
      
      setUserAnswers([...userAnswers, {
        question: questions[currentQuestion].question,
        correct: isCorrect
      }]);
  
      if (isCorrect) {
        setScore(score + 1);
      }
  
      setSelectedAnswer(null);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push({
          pathname: "/results",
          params: { 
            score: isCorrect ? score + 1 : score,
            answers: JSON.stringify(userAnswers.concat([{
              question: questions[currentQuestion].question,
              correct: isCorrect
            }]))
          },
        });
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.questionCount}>
          Question {currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>
        
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === option && styles.selectedOption
            ]}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
  
        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedAnswer && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!selectedAnswer}
        >
          <Text style={styles.submitButtonText}>
            {currentQuestion < questions.length - 1 ? "Submit & Next" : "Submit & Finish"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    questionCount: {
      fontSize: 18,
      color: "#666",
      marginBottom: 20,
    },
    question: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
    },
    option: {
      backgroundColor: "#f0f0f0",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    selectedOption: {
      backgroundColor: "#d4e6ff",
      borderWidth: 1,
      borderColor: "#3498db",
    },
    optionText: {
      fontSize: 18,
    },
    submitButton: {
      backgroundColor: "#3498db",
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: "center",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
    },
    submitButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
    },
  });