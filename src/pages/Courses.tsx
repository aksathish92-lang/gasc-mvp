import { BookOpen, Clock } from 'lucide-react';
import { COURSES } from '@/lib/constants';

export default function Courses() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Courses</h2>
          <p className="text-slate-300 text-sm">Undergraduate (UG) Programs</p>
        </div>
      </div>

      {/* Courses grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.name}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-slate-800 p-6">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src="/images/Seal_of_Tamil_Nadu.jpg"
                      alt="Tamil Nadu State Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg">{course.name}</h3>
                  <p className="text-slate-300 text-sm mt-1">{course.dept}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{course.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{course.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A comprehensive {course.duration.toLowerCase()} undergraduate program
                    designed to provide students with strong theoretical foundations and
                    practical skills in {course.category.toLowerCase()}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
