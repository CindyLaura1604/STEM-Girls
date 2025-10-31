import { Card, CardContent } from './ui/card';
import { Target, Lightbulb, Users, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden border-2" style={{ borderColor: '#6A0DAD' }}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#E6CCFF' }}>
            <h2 className="mb-4" style={{ color: '#6A0DAD' }}>Bem-vinda ao STEM Girls!</h2>
            <p className="text-gray-700 mb-6">
              Uma plataforma criada especialmente para meninas que querem explorar e descobrir seu lugar 
              no maravilhoso mundo da ciência, tecnologia, engenharia e matemática.
            </p>
            <p className="text-gray-700">
              Aqui você vai descobrir qual área STEM combina mais com você, conhecer personagens 
              inspiradoras, fazer cursos introdutórios e acompanhar seu progresso!
            </p>
          </div>
          <div className="h-64 md:h-auto">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1707944746033-0232ca340fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMFNURU0lMjBzY2llbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEzNTUxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Meninas explorando STEM"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ backgroundColor: '#6A0DAD' }}>
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2" style={{ color: '#6A0DAD' }}>Descubra sua Vocação</h3>
            <p className="text-gray-600">
              Faça quizzes personalizados e descubra qual área STEM é perfeita para você!
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ backgroundColor: '#FFD700' }}>
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2" style={{ color: '#6A0DAD' }}>Aprenda Fazendo</h3>
            <p className="text-gray-600">
              Cursos básicos e práticos nas principais áreas STEM para você começar sua jornada.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ backgroundColor: '#6A0DAD' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2" style={{ color: '#6A0DAD' }}>Inspire-se</h3>
            <p className="text-gray-600">
              Conheça personagens incríveis da cultura pop que brilham nas áreas STEM!
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                 style={{ backgroundColor: '#FFD700' }}>
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-2" style={{ color: '#6A0DAD' }}>Acompanhe seu Progresso</h3>
            <p className="text-gray-600">
              Veja suas conquistas, notas e áreas de interesse em gráficos personalizados!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Statement */}
      <Card className="border-2" style={{ borderColor: '#FFD700' }}>
        <CardContent className="p-8 text-center">
          <h2 className="mb-4" style={{ color: '#6A0DAD' }}>Nossa Missão</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Acreditamos que toda menina tem potencial para brilhar nas áreas STEM. Nossa missão é 
            ajudá-las a descobrir, explorar e desenvolver suas habilidades através de experiências 
            interativas, divertidas e inspiradoras. Juntas, vamos construir um futuro mais diverso 
            e inclusivo na ciência e tecnologia! 🚀✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
