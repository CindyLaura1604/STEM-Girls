import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, CheckCircle2, BookOpen, Code, Calculator, Cpu, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Course {
  id: string;
  title: string;
  area: string;
  description: string;
  duration: string;
  lessons: Array<{ title: string; content: string }>;
  image: string;
}

const COURSES: Course[] = [
  {
    id: 'intro-programming',
    title: 'Introdução à Programação',
    area: 'Tecnologia',
    description: 'Aprenda os fundamentos da programação e crie seu primeiro programa!',
    duration: '3 aulas',
    image: 'https://images.unsplash.com/photo-1635775017492-1eb935a082a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjEzMDAxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lessons: [
      {
        title: 'O que é Programação?',
        content: 'Programação é a arte de dar instruções para o computador executar tarefas. Você aprenderá conceitos como variáveis, que são como caixinhas que guardam informações, e funções, que são conjuntos de instruções que podem ser reutilizadas.',
      },
      {
        title: 'Seu Primeiro Código',
        content: 'Vamos criar um programa simples que diz "Olá, mundo!". Este é o primeiro passo de toda programadora. Você aprenderá sobre sintaxe, que é como escrever código que o computador entende, e sobre a importância de cada símbolo.',
      },
      {
        title: 'Lógica de Programação',
        content: 'A lógica é fundamental! Aprenda sobre estruturas condicionais (if/else) que permitem o programa tomar decisões, e loops que repetem ações. Com isso, você pode criar programas que pensam e agem de forma inteligente!',
      },
    ],
  },
  {
    id: 'math-basics',
    title: 'Matemática do Dia a Dia',
    area: 'Matemática',
    description: 'Descubra como a matemática está presente em tudo ao seu redor!',
    duration: '3 aulas',
    image: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMGVxdWF0aW9uc3xlbnwxfHx8fDE3NjEzMDE5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lessons: [
      {
        title: 'Padrões e Sequências',
        content: 'Tudo na natureza segue padrões matemáticos! Desde as pétalas de uma flor até a espiral de um caracol. Aprenda a identificar e criar sequências numéricas, e descubra a beleza matemática ao seu redor.',
      },
      {
        title: 'Geometria no Mundo Real',
        content: 'A geometria está em toda parte: em prédios, obras de arte, design de produtos. Explore formas, ângulos e proporções. Descubra como arquitetas usam geometria para criar estruturas incríveis e seguras.',
      },
      {
        title: 'Matemática na Tecnologia',
        content: 'Computadores funcionam com matemática! Aprenda como números binários (0 e 1) fazem a tecnologia funcionar, e como algoritmos matemáticos protegem suas senhas na internet.',
      },
    ],
  },
  {
    id: 'intro-engineering',
    title: 'Introdução à Engenharia',
    area: 'Engenharia',
    description: 'Aprenda a pensar como uma engenheira e resolver problemas criativos!',
    duration: '3 aulas',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHJvYm90aWNzfGVufDF8fHx8MTc2MTM1NTE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lessons: [
      {
        title: 'O Processo de Design',
        content: 'Engenheiras não apenas constroem - elas planejam! Aprenda o processo de design: identificar problemas, fazer brainstorming de soluções, criar protótipos e testar. Cada grande invenção começa com um plano.',
      },
      {
        title: 'Estruturas e Forças',
        content: 'Como pontes ficam de pé? Como prédios resistem a ventos fortes? Explore conceitos de tensão, compressão e equilíbrio. Aprenda por que triângulos são as formas mais fortes na engenharia.',
      },
      {
        title: 'Inovação e Sustentabilidade',
        content: 'As engenheiras do futuro criam soluções sustentáveis! Descubra como energia solar funciona, como podemos reciclar materiais de forma criativa, e como a tecnologia pode ajudar a proteger o planeta.',
      },
    ],
  },
  {
    id: 'science-exploration',
    title: 'Explorando as Ciências',
    area: 'Ciências',
    description: 'Descubra os mistérios do universo através da ciência!',
    duration: '3 aulas',
    image: 'https://images.unsplash.com/photo-1707944746033-0232ca340fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMFNURU0lMjBzY2llbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEzNTUxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lessons: [
      {
        title: 'O Método Científico',
        content: 'Como cientistas descobrem coisas novas? Através do método científico! Aprenda a fazer perguntas, criar hipóteses, fazer experimentos e tirar conclusões. É como ser uma detetive da natureza!',
      },
      {
        title: 'O Mundo Microscópico',
        content: 'Existe um universo inteiro que não podemos ver a olho nu! Explore o mundo das células, bactérias e moléculas. Descubra como nosso corpo funciona e como a vida se organiza em níveis microscópicos.',
      },
      {
        title: 'Do Átomo ao Universo',
        content: 'Tudo é feito de átomos - incluindo você! Aprenda sobre a tabela periódica, reações químicas, e como as mesmas leis da física que funcionam na Terra também funcionam em galáxias distantes.',
      },
    ],
  },
];

interface CoursesProps {
  onCourseComplete: (courseName: string, grade: number, area: string) => void;
}

export function Courses({ onCourseComplete }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [rating, setRating] = useState(0);

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentLesson(0);
    setShowEvaluation(false);
    setRating(0);
  };

  const handleNextLesson = () => {
    if (selectedCourse && currentLesson < selectedCourse.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      setShowEvaluation(true);
    }
  };

  const handleSubmitEvaluation = () => {
    if (selectedCourse && rating > 0) {
      onCourseComplete(selectedCourse.title, rating, selectedCourse.area);
      setSelectedCourse(null);
      setCurrentLesson(0);
      setShowEvaluation(false);
      setRating(0);
    }
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setCurrentLesson(0);
    setShowEvaluation(false);
    setRating(0);
  };

  if (showEvaluation && selectedCourse) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="border-2" style={{ borderColor: '#FFD700' }}>
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                 style={{ backgroundColor: '#FFD700' }}>
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle style={{ color: '#6A0DAD' }}>Parabéns! Você completou o curso!</CardTitle>
            <CardDescription>Como você avalia este curso?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-4xl transition-transform hover:scale-110"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <div className="text-center space-y-4">
              <Button
                onClick={handleSubmitEvaluation}
                disabled={rating === 0}
                className="text-white"
                style={{ backgroundColor: rating === 0 ? '#ccc' : '#6A0DAD' }}
              >
                Enviar Avaliação
              </Button>
              <Button
                onClick={handleBack}
                variant="outline"
                style={{ borderColor: '#6A0DAD', color: '#6A0DAD' }}
              >
                Voltar aos Cursos
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (selectedCourse) {
    const progress = ((currentLesson + 1) / selectedCourse.lessons.length) * 100;
    const lesson = selectedCourse.lessons[currentLesson];

    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">
                Aula {currentLesson + 1} de {selectedCourse.lessons.length}
              </span>
              <span className="text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <motion.div
          key={currentLesson}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge style={{ backgroundColor: '#FFD700', color: 'white' }}>
                  {selectedCourse.area}
                </Badge>
              </div>
              <CardTitle style={{ color: '#6A0DAD' }}>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#E6CCFF' }}>
                <h4 style={{ color: '#6A0DAD' }} className="mb-2">💡 Dica</h4>
                <p className="text-gray-700">
                  Pratique o que você aprendeu! Tente explicar este conceito para alguém - 
                  ensinar é uma das melhores formas de aprender.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="gap-2"
                  style={{ borderColor: '#6A0DAD', color: '#6A0DAD' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleNextLesson}
                    className="text-white"
                    style={{ backgroundColor: '#6A0DAD' }}
                  >
                    {currentLesson < selectedCourse.lessons.length - 1
                      ? 'Próxima Aula'
                      : 'Finalizar Curso'}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
        <CardHeader>
          <CardTitle style={{ color: '#6A0DAD' }}>Cursos Disponíveis</CardTitle>
          <CardDescription>
            Escolha um curso e comece a aprender agora mesmo!
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="Tecnologia">
            <Code className="w-4 h-4 mr-2" />
            TI
          </TabsTrigger>
          <TabsTrigger value="Matemática">
            <Calculator className="w-4 h-4 mr-2" />
            Matemática
          </TabsTrigger>
          <TabsTrigger value="Engenharia">
            <Cpu className="w-4 h-4 mr-2" />
            Engenharia
          </TabsTrigger>
          <TabsTrigger value="Ciências">
            <FlaskConical className="w-4 h-4 mr-2" />
            Ciências
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {COURSES.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onStart={() => handleStartCourse(course)}
              />
            ))}
          </div>
        </TabsContent>

        {['Tecnologia', 'Matemática', 'Engenharia', 'Ciências'].map((area) => (
          <TabsContent key={area} value={area} className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {COURSES.filter((c) => c.area === area).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onStart={() => handleStartCourse(course)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function CourseCard({ course, onStart }: { course: Course; onStart: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="border-2 hover:shadow-lg transition-shadow h-full" style={{ borderColor: '#E6CCFF' }}>
        <div className="h-48 overflow-hidden">
          <ImageWithFallback
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge style={{ backgroundColor: '#6A0DAD', color: 'white' }}>
              {course.area}
            </Badge>
            <span className="text-sm text-gray-500">{course.duration}</span>
          </div>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onStart}
            className="w-full text-white gap-2"
            style={{ backgroundColor: '#6A0DAD' }}
          >
            <BookOpen className="w-4 h-4" />
            Começar Curso
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
