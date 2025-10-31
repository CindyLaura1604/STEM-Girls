import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { BookOpen, Sparkles, GraduationCap, User } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { VocationQuiz } from './components/VocationQuiz';
import { PopCultureQuiz } from './components/PopCultureQuiz';
import { Courses } from './components/Courses';
import { Profile } from './components/Profile';

export default function App() {
  const [userProgress, setUserProgress] = useState({
    courseGrades: [] as Array<{ courseName: string; grade: number; area: string }>,
    quizResults: [] as Array<{ area: string; result: string }>,
  });

  const addCourseGrade = (courseName: string, grade: number, area: string) => {
    setUserProgress(prev => ({
      ...prev,
      courseGrades: [...prev.courseGrades, { courseName, grade, area }],
    }));
  };

  const addQuizResult = (area: string, result: string) => {
    setUserProgress(prev => ({
      ...prev,
      quizResults: [...prev.quizResults, { area, result }],
    }));
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5F5F5 0%, #E6CCFF 100%)' }}>
      <header className="bg-white shadow-sm border-b-4" style={{ borderColor: '#6A0DAD' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6A0DAD 0%, #FFD700 100%)' }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white" style={{ color: '#6A0DAD' }}>STEM Girls</h1>
              <p className="text-gray-600">Descubra seu futuro na tecnologia</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-2 gap-2" style={{ backgroundColor: '#ffffff' }}>
            <TabsTrigger 
              value="about" 
              className="flex flex-col gap-2 py-3 data-[state=active]:text-white"
              style={{ 
                ['--tw-gradient-from' as any]: '#6A0DAD',
                ['--tw-gradient-to' as any]: '#FFD700'
              }}
            >
              <BookOpen className="w-5 h-5" />
              <span>Sobre Nós</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vocation" 
              className="flex flex-col gap-2 py-3 data-[state=active]:text-white"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Quiz de Vocação</span>
            </TabsTrigger>
            <TabsTrigger 
              value="popculture" 
              className="flex flex-col gap-2 py-3 data-[state=active]:text-white"
            >
              <Sparkles className="w-5 h-5" />
              <span>Quiz Pop</span>
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="flex flex-col gap-2 py-3 data-[state=active]:text-white"
            >
              <BookOpen className="w-5 h-5" />
              <span>Cursos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex flex-col gap-2 py-3 data-[state=active]:text-white"
            >
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>

          <TabsContent value="vocation">
            <VocationQuiz onQuizComplete={addQuizResult} />
          </TabsContent>

          <TabsContent value="popculture">
            <PopCultureQuiz />
          </TabsContent>

          <TabsContent value="courses">
            <Courses onCourseComplete={addCourseGrade} />
          </TabsContent>

          <TabsContent value="profile">
            <Profile userProgress={userProgress} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
