import { Mail, MapPin, Phone, Building2 } from 'lucide-react';
import { COLLEGE } from '@/lib/constants';

export default function Contact() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-slate-300 text-sm">Get in Touch with Us</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Address</h3>
              <div className="w-14 h-1 bg-slate-800 rounded-full mb-8" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">College Address</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {COLLEGE.address.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a
                      href={`mailto:${COLLEGE.email}`}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {COLLEGE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Location</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {COLLEGE.location}, Sholinghur Taluk, Ranipet District, Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Send a Message</h3>
              <div className="w-14 h-1 bg-slate-800 rounded-full mb-8" />
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your message. We will get back to you soon.');
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent resize-none"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
