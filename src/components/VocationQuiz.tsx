import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowRight, Code, Calculator, Cpu, FlaskConical, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const AREAS = [
  { id: 'ti', name: 'Tecnologia da Informação', icon: Code, color: '#6A0DAD' },
  { id: 'math', name: 'Matemática', icon: Calculator, color: '#FFD700' },
  { id: 'engineering', name: 'Engenharia', icon: Cpu, color: '#6A0DAD' },
  { id: 'science', name: 'Ciências', icon: FlaskConical, color: '#FFD700' },
];

const QUESTIONS: Record<string, Array<{ question: string; options: string[] }>> = {
  ti: [
    {
      question: 'O que mais te atrai em tecnologia?',
      options: [
        'Criar aplicativos e websites',
        'Proteger sistemas contra hackers',
        'Analisar grandes volumes de dados',
        'Desenvolver jogos e animações',
      ],
    },
    {
      question: 'Como você gostaria de trabalhar?',
      options: [
        'Em equipe desenvolvendo projetos',
        'De forma independente resolvendo problemas',
        'Criando soluções para empresas',
        'Pesquisando novas tecnologias',
      ],
    },
    {
      question: 'Qual dessas atividades você mais gostaria de fazer?',
      options: [
        'Programar um robô',
        'Criar um site do zero',
        'Desenvolver um app mobile',
        'Trabalhar com inteligência artificial',
      ],
    },
  ],
  math: [
    {
      question: 'O que você mais gosta em matemática?',
      options: [
        'Resolver problemas complexos',
        'Encontrar padrões e sequências',
        'Aplicar fórmulas em situações reais',
        'Criar modelos e simulações',
      ],
    },
    {
      question: 'Em qual área você aplicaria matemática?',
      options: [
        'Finanças e economia',
        'Criptografia e segurança',
        'Estatística e pesquisa',
        'Física e astronomia',
      ],
    },
    {
      question: 'Como você prefere trabalhar com números?',
      options: [
        'Analisando dados e tendências',
        'Criando provas e teoremas',
        'Fazendo cálculos práticos',
        'Modelando fenômenos naturais',
      ],
    },
  ],
  engineering: [
    {
      question: 'Que tipo de projeto você gostaria de criar?',
      options: [
        'Pontes e edifícios sustentáveis',
        'Robôs e sistemas automatizados',
        'Dispositivos médicos inovadores',
        'Sistemas de energia renovável',
      ],
    },
    {
      question: 'O que mais te motiva na engenharia?',
      options: [
        'Resolver problemas do mundo real',
        'Criar coisas com minhas próprias mãos',
        'Melhorar a vida das pessoas',
        'Inovar e inventar',
      ],
    },
    {
      question: 'Com qual área você mais se identifica?',
      options: [
        'Engenharia Civil e Arquitetura',
        'Engenharia Mecânica e Robótica',
        'Engenharia Biomédica',
        'Engenharia Ambiental',
      ],
    },
  ],
  science: [
    {
      question: 'Qual área da ciência mais te fascina?',
      options: [
        'Biologia e genética',
        'Química e materiais',
        'Física e astronomia',
        'Ciências ambientais',
      ],
    },
    {
      question: 'Como você gostaria de contribuir para a ciência?',
      options: [
        'Descobrindo curas para doenças',
        'Explorando o universo',
        'Criando materiais sustentáveis',
        'Protegendo o meio ambiente',
      ],
    },
    {
      question: 'Que tipo de trabalho científico te atrai?',
      options: [
        'Fazer experimentos em laboratório',
        'Trabalho de campo e pesquisa',
        'Análise de dados e modelagem',
        'Divulgação científica',
      ],
    },
  ],
};

const RESULTS: Record<string, Record<number, { career: string; description: string }>> = {
  ti: {
    0: { career: 'Desenvolvimento Web', description: 'Você tem perfil para criar websites e aplicações incríveis!' },
    1: { career: 'Segurança da Informação', description: 'Você seria ótima protegendo sistemas e dados!' },
    2: { career: 'Ciência de Dados', description: 'Você tem talento para analisar dados e gerar insights!' },
    3: { career: 'Desenvolvimento de Games', description: 'Você tem o perfil criativo para desenvolver jogos!' },
  },
  math: {
    0: { career: 'Matemática Financeira', description: 'Você seria excelente trabalhando com finanças e investimentos!' },
    1: { career: 'Criptografia', description: 'Você tem perfil para trabalhar com segurança e códigos!' },
    2: { career: 'Estatística', description: 'Você seria ótima analisando dados e fazendo pesquisas!' },
    3: { career: 'Matemática Aplicada', description: 'Você tem talento para aplicar matemática em outras áreas!' },
  },
  engineering: {
    0: { career: 'Engenharia Civil', description: 'Você seria ótima construindo estruturas sustentáveis!' },
    1: { career: 'Engenharia Mecatrônica', description: 'Você tem perfil para criar robôs e sistemas automatizados!' },
    2: { career: 'Engenharia Biomédica', description: 'Você seria excelente criando soluções para a saúde!' },
    3: { career: 'Engenharia Ambiental', description: 'Você tem talento para criar soluções sustentáveis!' },
  },
  science: {
    0: { career: 'Biologia Molecular', description: 'Você seria ótima pesquisando genética e biologia!' },
    1: { career: 'Astrofísica', description: 'Você tem perfil para explorar os mistérios do universo!' },
    2: { career: 'Química de Materiais', description: 'Você seria excelente desenvolvendo novos materiais!' },
    3: { career: 'Ciências Ambientais', description: 'Você tem talento para proteger nosso planeta!' },
  },
};

interface VocationQuizProps {
  onQuizComplete: (area: string, result: string) => void;
}

export function VocationQuiz({ onQuizComplete }: VocationQuizProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const handleNext = () => {
    if (selectedAnswer === '') return;

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (selectedArea && currentQuestion < QUESTIONS[selectedArea].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      // Calculate result
      const mostFrequent = newAnswers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      const resultIndex = parseInt(Object.entries(mostFrequent).sort((a, b) => b[1] - a[1])[0][0]);
      const result = selectedArea ? RESULTS[selectedArea][resultIndex] : null;
      
      if (result && selectedArea) {
        onQuizComplete(selectedArea, result.career);
      }
      
      setShowResult(true);
    }
  };

  const handleBackToAreas = () => {
    setSelectedArea(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
  };

  if (!selectedArea) {
    return (
      <div className="space-y-6">
        <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
          <CardHeader>
            <CardTitle style={{ color: '#6A0DAD' }}>Escolha uma Área para Explorar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Selecione a área STEM que você quer conhecer melhor. Vamos descobrir qual carreira 
              combina mais com você!
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="cursor-pointer border-2 hover:shadow-lg transition-all"
                      style={{ borderColor: area.color }}
                      onClick={() => handleAreaSelect(area.id)}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: area.color }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3>{area.name}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const area = AREAS.find(a => a.id === selectedArea);
  const questions = QUESTIONS[selectedArea];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const mostFrequent = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const resultIndex = parseInt(Object.entries(mostFrequent).sort((a, b) => b[1] - a[1])[0][0]);
    const result = RESULTS[selectedArea][resultIndex];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2" style={{ borderColor: '#FFD700' }}>
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ backgroundColor: '#FFD700' }}>
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle style={{ color: '#6A0DAD' }}>Seu Resultado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <h2 className="mb-2" style={{ color: '#6A0DAD' }}>{result.career}</h2>
              <p className="text-gray-700">{result.description}</p>
            </div>
            <div className="pt-6">
              <Button
                onClick={handleBackToAreas}
                className="text-white"
                style={{ backgroundColor: '#6A0DAD' }}
              >
                Fazer Outro Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Pergunta {currentQuestion + 1} de {questions.length}</span>
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
        <Card className="border-2" style={{ borderColor: area?.color }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              {area && <area.icon className="w-6 h-6" style={{ color: area.color }} />}
              <span className="text-gray-600">{area?.name}</span>
            </div>
            <CardTitle style={{ color: '#6A0DAD' }}>
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: selectedAnswer === index.toString() ? '#6A0DAD' : '#E6CCFF',
                    backgroundColor: selectedAnswer === index.toString() ? '#E6CCFF' : 'white',
                  }}
                  onClick={() => setSelectedAnswer(index.toString())}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBackToAreas}
                style={{ borderColor: '#6A0DAD', color: '#6A0DAD' }}
              >
                Voltar
              </Button>
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
                  {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
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
