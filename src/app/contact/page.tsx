'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vesselType: '',
    servicesNeeded: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to send message. Please email info@fleetskipper.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative mt-28 min-h-[400px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Book a free consultation or send us a message
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Left Column - Contact Info */}
              <div>
                {/* Direct Contact Info */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Contact Directly</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <a
                          href="mailto:info@fleetskipper.com"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          info@fleetskipper.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Phone</p>
                        <a
                          href="tel:+447446858414"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          +44 7446 858414
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Location</p>
                        <p className="text-white/90">
                          Belfast Harbour<br />
                          Northern Ireland
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Send a Message</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-cyan-50 border-2 border-cyan-500 rounded-2xl p-10 text-center shadow-lg">
                    <div className="bg-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Thanks for getting in touch. We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                        <p className="text-red-800 text-sm font-medium">{error}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="vesselType" className="block text-sm font-semibold text-slate-900 mb-2">
                        Vessel Type
                      </label>
                      <select
                        id="vesselType"
                        name="vesselType"
                        value={formData.vesselType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select vessel type</option>
                        <option value="tug">Tug</option>
                        <option value="pilot-boat">Pilot Boat</option>
                        <option value="crew-transfer">Crew Transfer Vessel</option>
                        <option value="survey">Survey Vessel</option>
                        <option value="workboat-other">Workboat (Other)</option>
                        <option value="multiple">Multiple Vessels</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="servicesNeeded" className="block text-sm font-semibold text-slate-900 mb-2">
                        Services Needed
                      </label>
                      <select
                        id="servicesNeeded"
                        name="servicesNeeded"
                        value={formData.servicesNeeded}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select service</option>
                        <option value="sms-build">SMS Documentation Build</option>
                        <option value="sms-audit">SMS Audit & Gap Analysis</option>
                        <option value="ongoing-support">Ongoing SMS Support</option>
                        <option value="app-demo">FleetSkipper App Demo</option>
                        <option value="general-inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your compliance needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    <p className="text-sm text-slate-500 text-center">
                      * Required fields
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
