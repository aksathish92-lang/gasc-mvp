import { useEffect, useState } from 'react';
import { ChevronRight, BookOpen, Calendar, MapPin, Award, ChevronLeft } from 'lucide-react';
import { COLLEGE, COURSES } from '@/lib/constants';
import { useImages } from '@/hooks/useSiteData';

type Props = {
  navigate: (path: string) => void;
};

export default function Home({ navigate }: Props) {
  const { images: heroImages } = useImages('hero');
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goHero = (dir: number) => {
    setHeroSlide((prev) => (prev + dir + heroImages.length) % heroImages.length);
  };

  return (
    <div>
      {/* Hero slideshow */}
      <section className="relative h-[420px] sm:h-[520px] overflow-hidden group">
        {heroImages.length > 0 ? (
          heroImages.map((img, i) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === heroSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img.image_url}
                alt={img.title || 'College Campus'}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70" />

        {/* Arrows */}
        {heroImages.length > 1 && (
          <>
            <button
              onClick={() => goHero(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goHero(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === heroSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Welcome to Our College
            </h2>
            <p className="text-sm sm:text-lg text-slate-200 mb-6 leading-relaxed">
              {COLLEGE.name}, {COLLEGE.location}. Affiliated to {COLLEGE.affiliation}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="w-4 h-4" /> Est. {COLLEGE.established}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" /> {COLLEGE.district}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-4 h-4" /> {COLLEGE.affiliation}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Our Courses
            </h3>
            <p className="text-slate-500">Undergraduate (UG) Programs</p>
            <div className="w-16 h-1 bg-slate-800 mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.name}
                className="group bg-slate-50 rounded-xl border border-slate-200 p-6 hover:border-slate-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{course.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{course.dept}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-500">{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 text-slate-800 font-medium hover:gap-3 transition-all"
            >
              View All Courses <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                About Our College
              </h3>
              <div className="w-16 h-1 bg-slate-800 rounded-full mb-6" />
              <p className="text-slate-600 leading-relaxed mb-6">
                {COLLEGE.name}, {COLLEGE.location} is located in Sholinghur Taluk,
                {COLLEGE.district} and is affiliated to {COLLEGE.affiliation}. Established
                in {COLLEGE.established}, the college is committed to providing quality
                higher education to students from rural and semi-urban backgrounds.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-2xl font-bold text-slate-800">{COLLEGE.established}</p>
                  <p className="text-sm text-slate-500">Established</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-500">UG Programs</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Location</span>
                </div>
                <p className="text-sm text-slate-600 pl-8">Sholinghur Taluk, {COLLEGE.district}</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Affiliation</span>
                </div>
                <p className="text-sm text-slate-600 pl-8">{COLLEGE.affiliation}</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Established</span>
                </div>
                <p className="text-sm text-slate-600 pl-8">{COLLEGE.established}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
