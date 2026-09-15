import { useHashRoute } from '@/lib/useHashRoute';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import Admission from '@/pages/Admission';
import StudentCorner from '@/pages/StudentCorner';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';

function App() {
  const { route, navigate } = useHashRoute();

  const renderPage = () => {
    switch (route) {
      case '/':
        return <Home navigate={navigate} />;
      case '/about':
        return <About />;
      case '/courses':
        return <Courses />;
      case '/admission':
        return <Admission />;
      case '/student-corner':
        return <StudentCorner />;
      case '/gallery':
        return <Gallery />;
      case '/contact':
        return <Contact />;
      case '/admin':
        return <Admin />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentRoute={route} navigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
