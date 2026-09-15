import { Bell, Calendar, FileText, BookOpen } from 'lucide-react';

export default function StudentCorner() {
  const resources = [
    { icon: FileText, label: 'Examination Time Table', desc: 'Check upcoming exam schedules' },
    { icon: BookOpen, label: 'Study Materials', desc: 'Access course materials and notes' },
    { icon: Calendar, label: 'Academic Calendar', desc: 'Important dates and events' },
    { icon: Bell, label: 'Notifications', desc: 'Latest college notifications' },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Student Corner</h2>
          <p className="text-slate-300 text-sm">Resources for Students</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Student Resources</h3>
          <div className="w-14 h-1 bg-slate-800 rounded-full mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res) => (
              <div
                key={res.label}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                  <res.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{res.label}</h4>
                <p className="text-sm text-slate-600">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
