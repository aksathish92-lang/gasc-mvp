import { Calendar, MapPin, Award, Building2, BookOpen, Users } from 'lucide-react';
import { COLLEGE } from '@/lib/constants';
import { useImages } from '@/hooks/useSiteData';

export default function About() {
  const { images } = useImages('about');
  const aboutImage = images[0]?.image_url;

  const facts = [
    { icon: Calendar, label: 'Established', value: COLLEGE.established },
    { icon: MapPin, label: 'District', value: 'Ranipet' },
    { icon: Building2, label: 'Taluk', value: 'Sholinghur' },
    { icon: Award, label: 'Affiliated To', value: 'Thiruvalluvar University, Vellore' },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">About Our College</h2>
          <p className="text-slate-300 text-sm">
            {COLLEGE.name}, {COLLEGE.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Our History
              </h3>
              <div className="w-14 h-1 bg-slate-800 rounded-full mb-6" />
              <p className="text-slate-600 leading-relaxed mb-4">
                {COLLEGE.name}, {COLLEGE.location} was established in {COLLEGE.established}
                with a vision to provide accessible, quality higher education to students
                from rural and semi-urban communities in the region.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Located in Sholinghur Taluk, Ranipet District, Tamil Nadu, the college is
                affiliated to {COLLEGE.affiliation}. It offers a range of undergraduate
                programs across Arts, Commerce, and Science disciplines.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The college is committed to academic excellence, inclusive education, and
                the holistic development of every student, fostering knowledge, values, and
                skills for a brighter future.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              {aboutImage ? (
                <img
                  src={aboutImage}
                  alt="College campus"
                  className="w-full h-72 object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full h-72 bg-slate-200 rounded-xl" />
              )}
            </div>
          </div>

          {/* Facts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <fact.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-slate-500 mb-1">{fact.label}</p>
                <p className="font-semibold text-slate-900">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Our Vision</h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                To be a center of academic excellence, empowering students from all
                backgrounds with knowledge, skills, and values that enable them to
                contribute meaningfully to society.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Our Mission</h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                To provide inclusive, quality higher education that fosters intellectual
                growth, critical thinking, and social responsibility, preparing students
                for meaningful careers and lifelong learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
