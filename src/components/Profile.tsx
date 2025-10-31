import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Trophy, Star, TrendingUp, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface UserProgress {
  courseGrades: Array<{ courseName: string; grade: number; area: string }>;
  quizResults: Array<{ area: string; result: string }>;
}

interface ProfileProps {
  userProgress: UserProgress;
}

const AREA_COLORS: Record<string, string> = {
  'Tecnologia': '#6A0DAD',
  'Matemática': '#FFD700',
  'Engenharia': '#9D4EDD',
  'Ciências': '#FF6B9D',
};

export function Profile({ userProgress }: ProfileProps) {
  const { courseGrades, quizResults } = userProgress;

  // Calculate average grade
  const averageGrade = courseGrades.length > 0
    ? courseGrades.reduce((sum, course) => sum + course.grade, 0) / courseGrades.length
    : 0;

  // Calculate area distribution
  const areaDistribution = courseGrades.reduce((acc, course) => {
    acc[course.area] = (acc[course.area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(areaDistribution).map(([area, count]) => ({
    name: area,
    value: count,
  }));

  // Prepare bar chart data
  const barData = courseGrades.map((course) => ({
    name: course.courseName.length > 20 
      ? course.courseName.substring(0, 20) + '...' 
      : course.courseName,
    nota: course.grade,
  }));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 border-4" style={{ borderColor: '#FFD700' }}>
              <AvatarFallback className="text-white text-2xl" style={{ backgroundColor: '#6A0DAD' }}>
                SG
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="mb-2" style={{ color: '#6A0DAD' }}>Meu Perfil STEM</h2>
              <p className="text-gray-600 mb-4">
                Continue explorando e aprendendo sobre as áreas STEM!
              </p>
              <div className="flex flex-wrap gap-2">
                {courseGrades.length > 0 && (
                  <Badge className="gap-2" style={{ backgroundColor: '#FFD700', color: 'white' }}>
                    <Trophy className="w-4 h-4" />
                    {courseGrades.length} {courseGrades.length === 1 ? 'Curso Completo' : 'Cursos Completos'}
                  </Badge>
                )}
                {quizResults.length > 0 && (
                  <Badge className="gap-2" style={{ backgroundColor: '#6A0DAD', color: 'white' }}>
                    <Star className="w-4 h-4" />
                    {quizResults.length} {quizResults.length === 1 ? 'Quiz Realizado' : 'Quizzes Realizados'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {courseGrades.length === 0 && quizResults.length === 0 ? (
        <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-gray-600">Nenhuma atividade ainda</h3>
            <p className="text-gray-500">
              Comece fazendo um quiz ou curso para ver seu progresso aqui!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Cursos Completados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: '#E6CCFF' }}>
                    <BookOpen className="w-6 h-6" style={{ color: '#6A0DAD' }} />
                  </div>
                  <span className="text-3xl" style={{ color: '#6A0DAD' }}>
                    {courseGrades.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Média de Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: '#E6CCFF' }}>
                    <Star className="w-6 h-6" style={{ color: '#FFD700' }} />
                  </div>
                  <span className="text-3xl" style={{ color: '#6A0DAD' }}>
                    {averageGrade.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600">Quizzes Realizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: '#E6CCFF' }}>
                    <TrendingUp className="w-6 h-6" style={{ color: '#6A0DAD' }} />
                  </div>
                  <span className="text-3xl" style={{ color: '#6A0DAD' }}>
                    {quizResults.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {courseGrades.length > 0 && (
            <>
              <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#6A0DAD' }}>Notas dos Cursos</CardTitle>
                  <CardDescription>
                    Suas avaliações de cada curso completado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6CCFF" />
                      <XAxis dataKey="name" stroke="#6A0DAD" />
                      <YAxis domain={[0, 5]} stroke="#6A0DAD" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#E6CCFF', 
                          border: '2px solid #6A0DAD',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="nota" fill="#6A0DAD" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2" style={{ borderColor: '#FFD700' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#6A0DAD' }}>Áreas de Interesse</CardTitle>
                  <CardDescription>
                    Distribuição dos cursos que você completou por área
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={AREA_COLORS[entry.name] || '#6A0DAD'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#E6CCFF', 
                          border: '2px solid #6A0DAD',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}

          {/* Quiz Results */}
          {quizResults.length > 0 && (
            <Card className="border-2" style={{ borderColor: '#6A0DAD' }}>
              <CardHeader>
                <CardTitle style={{ color: '#6A0DAD' }}>Resultados dos Quizzes</CardTitle>
                <CardDescription>
                  Suas carreiras recomendadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border-2"
                      style={{ borderColor: '#E6CCFF', backgroundColor: 'white' }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 style={{ color: '#6A0DAD' }}>{result.result}</h4>
                          <p className="text-sm text-gray-600">
                            {result.area === 'ti' && 'Tecnologia da Informação'}
                            {result.area === 'math' && 'Matemática'}
                            {result.area === 'engineering' && 'Engenharia'}
                            {result.area === 'science' && 'Ciências'}
                          </p>
                        </div>
                        <Star className="w-8 h-8" style={{ color: '#FFD700' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Course History */}
          {courseGrades.length > 0 && (
            <Card className="border-2" style={{ borderColor: '#E6CCFF' }}>
              <CardHeader>
                <CardTitle style={{ color: '#6A0DAD' }}>Histórico de Cursos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseGrades.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <div className="flex-1">
                        <h4>{course.courseName}</h4>
                        <p className="text-sm text-gray-600">{course.area}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-xl">
                              {star <= course.grade ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
