import { FileText, CheckCircle2, Calendar, Download } from 'lucide-react';

export default function Admission() {
  const steps = [
    { title: 'Application', desc: 'Fill out the admission application form available at the college office.' },
    { title: 'Document Submission', desc: 'Submit required documents including mark sheets, transfer certificate, and community certificate.' },
    { title: 'Merit List', desc: 'Merit list will be published based on qualifying examination marks.' },
    { title: 'Counselling & Admission', desc: 'Selected candidates must attend counselling and complete admission formalities.' },
  ];

  const requirements = [
    '10+2 (Higher Secondary) mark sheet or equivalent',
    'Transfer Certificate (TC) from previous institution',
    'Community Certificate',
    'Aadhaar Card photocopy',
    'Passport-size photographs (4 copies)',
    'Income Certificate (if applicable)',
  ];

  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Admission</h2>
          <p className="text-slate-300 text-sm">Admission Information & Guidelines</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Admission process */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Admission Process</h3>
            <div className="w-14 h-1 bg-slate-800 rounded-full mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <FileText className="w-5 h-5 text-slate-500" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Required Documents
              </h3>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Important Dates</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Application Start</p>
                    <p className="text-sm text-slate-500">June 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Last Date to Apply</p>
                    <p className="text-sm text-slate-500">October 31, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Merit List Publication</p>
                    <p className="text-sm text-slate-500">November 2026</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 leading-relaxed">
                  For application forms and further details, please visit the college office
                  or contact us via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
