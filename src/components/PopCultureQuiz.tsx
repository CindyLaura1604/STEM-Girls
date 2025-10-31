import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

const QUESTIONS = [
  {
    question: 'Como você prefere resolver problemas?',
    options: [
      'Com lógica e análise detalhada',
      'Com criatividade e inovação',
      'Com experimentos práticos',
      'Com cálculos precisos',
    ],
  },
  {
    question: 'Qual é seu superpoder ideal?',
    options: [
      'Superinteligência e habilidade técnica',
      'Criar tecnologias incríveis',
      'Entender todos os fenômenos naturais',
      'Resolver qualquer equação instantaneamente',
    ],
  },
  {
    question: 'Qual ambiente você prefere?',
    options: [
      'Um laboratório high-tech',
      'Uma oficina cheia de invenções',
      'Um laboratório de ciências',
      'Um escritório com muitos desafios',
    ],
  },
  {
    question: 'O que mais te motiva?',
    options: [
      'Proteger e ajudar as pessoas',
      'Criar algo nunca visto antes',
      'Descobrir os mistérios do universo',
      'Resolver enigmas complexos',
    ],
  },
  {
    question: 'Como você trabalha melhor?',
    options: [
      'Sozinha, focada na missão',
      'Em equipe, compartilhando ideias',
      'Alternando entre teoria e prática',
      'De forma estratégica e planejada',
    ],
  },
];

const CHARACTERS = [
  {
    name: 'Shuri (Pantera Negra)',
    description: 'Você é brilhante, inovadora e tecnologicamente avançada! Como Shuri, você tem um talento especial para criar tecnologias revolucionárias e usar a ciência para proteger e ajudar os outros.',
    traits: ['Genialidade tecnológica', 'Inovação', 'Coragem'],
    area: 'Tecnologia e Engenharia',
  },
  {
    name: 'Hermione Granger (Harry Potter)',
    description: 'Você é inteligente, dedicada e adora aprender! Como Hermione, você usa conhecimento, lógica e estudo constante para resolver qualquer desafio que aparecer.',
    traits: ['Inteligência', 'Dedicação', 'Versatilidade'],
    area: 'Ciências e Matemática',
  },
  {
    name: 'Princess Bubblegum (Hora de Aventura)',
    description: 'Você é uma cientista criativa e inovadora! Como a Princesa Jujuba, você combina ciência, química e criatividade para criar coisas incríveis e resolver problemas complexos.',
    traits: ['Criatividade científica', 'Liderança', 'Inovação'],
    area: 'Química e Ciências',
  },
  {
    name: 'Elastigirl (Os Incríveis)',
    description: 'Você é estratégica, adaptável e determinada! Como a Mulher-Elástica, você usa sua inteligência para planejar, resolver problemas e se adaptar a qualquer situação.',
    traits: ['Estratégia', 'Adaptabilidade', 'Determinação'],
    area: 'Engenharia e Tecnologia',
  },
  {
    name: 'Lisa Simpson (Os Simpsons)',
    description: 'Você é racional, curiosa e apaixonada por conhecimento! Como Lisa, você se destaca em todas as áreas STEM e usa sua inteligência para fazer a diferença no mundo.',
    traits: ['Versatilidade', 'Pensamento crítico', 'Paixão por aprender'],
    area: 'Todas as áreas STEM',
  },
];

export function PopCultureQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedAnswer === '') return;

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const calculateResult = () => {
    // Calculate the most common answer
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const maxCount = Math.max(...Object.values(counts));
    const mostCommon = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([answer]) => parseInt(answer));

    // Map answers to characters (with some variety)
    const resultMap: Record<number, number> = {
      0: 0, // Shuri
      1: 2, // Princess Bubblegum
      2: 1, // Hermione
      3: 4, // Lisa Simpson
    };

    const characterIndex = resultMap[mostCommon[0]] ?? 3;
    return CHARACTERS[characterIndex];
  };

  if (showResult) {
    const result = calculateResult();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2" style={{ borderColor: '#FFD700' }}>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6A0DAD 0%, #FFD700 100%)' }}
            >
              <Star className="w-12 h-12 text-white" />
            </motion.div>
            <CardTitle style={{ color: '#6A0DAD' }}>Você é...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="mb-3" style={{ color: '#FFD700' }}>{result.name}</h2>
              <p className="text-gray-700 mb-4">{result.description}</p>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: '#E6CCFF' }}>
              <h3 className="mb-3" style={{ color: '#6A0DAD' }}>Seus Superpoderes:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.traits.map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="px-4 py-2 rounded-full text-white"
                    style={{ backgroundColor: '#6A0DAD' }}
                  >
                    {trait}
                  </motion.div>
                ))}
              </div>
              <div className="text-gray-700">
                <strong style={{ color: '#6A0DAD' }}>Área Forte:</strong> {result.area}
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={handleRestart}
                className="text-white gap-2"
                style={{ backgroundColor: '#6A0DAD' }}
              >
                <Sparkles className="w-4 h-4" />
                Fazer Quiz Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2" style={{ borderColor: '#FFD700' }}>
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #6A0DAD 0%, #FFD700 100%)' }}>
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle style={{ color: '#6A0DAD' }}>Qual Personagem STEM Você É?</CardTitle>
          <p className="text-gray-600">
            Descubra qual personagem inspiradora da cultura pop combina com você!
          </p>
        </CardHeader>
      </Card>

      {/* Progress Bar */}
      <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Pergunta {currentQuestion + 1} de {QUESTIONS.length}</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
          <CardHeader>
            <CardTitle style={{ color: '#6A0DAD' }}>
              {QUESTIONS[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: selectedAnswer === index.toString() ? '#FFD700' : '#E6CCFF',
                    backgroundColor: selectedAnswer === index.toString() ? '#E6CCFF' : 'white',
                  }}
                  onClick={() => setSelectedAnswer(index.toString())}
                >
                  <RadioGroupItem value={index.toString()} id={`pop-option-${index}`} />
                  <Label htmlFor={`pop-option-${index}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>

            <div className="flex justify-end pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === ''}
                  className="text-white gap-2"
                  style={{ backgroundColor: selectedAnswer === '' ? '#ccc' : '#6A0DAD' }}
                >
                  {currentQuestion < QUESTIONS.length - 1 ? 'Próxima' : 'Ver Resultado'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
