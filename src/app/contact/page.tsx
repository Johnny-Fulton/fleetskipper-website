'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be implemented later with backend
    console.log('Form data:', formData);
    setSubmitted(true);
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
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90">
              Book a free consultation or send us a message
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Left Column - Contact Info & Calendly */}
              <div>
                <div id="book-consultation" className="mb-12">
                  <h2 className="text-3xl font-bold text-navy mb-6">Book Free Consultation</h2>
                  <p className="text-lg text-body-text mb-6">
                    Schedule a 15-minute call to discuss your vessel and compliance needs. 
                    No pressure, just practical advice.
                  </p>
                  
                  {/* Calendly Placeholder */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <Calendar size={48} className="text-teal mx-auto mb-4" />
                    <p className="text-body-text font-semibold mb-2">Calendly Widget Goes Here</p>
                    <p className="text-sm text-gray-500">
                      <!-- Calendly inline widget will be embedded here -->
                    </p>
                  </div>
                </div>

                {/* Direct Contact Info */}
                <div className="bg-gradient-to-br from-navy to-navy-light text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Directly</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-teal" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <a 
                          href="mailto:jonathan@fleetskipper.com" 
                          className="text-teal hover:text-teal-light transition-colors"
                        >
                          jonathan@fleetskipper.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-teal/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-teal" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Phone</p>
                        <a 
                          href="tel:+447446858414" 
                          className="text-teal hover:text-teal-light transition-colors"
                        >
                          +44 7446 858414
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-teal/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} className="text-teal" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Location</p>
                        <p className="text-white/90">
                          Based in Northern Ireland<br />
                          Serving UK workboat operators
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">Send a Message</h2>
                <p className="text-lg text-body-text mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-teal/10 border-2 border-teal rounded-xl p-8 text-center">
                    <div className="bg-teal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                    <p className="text-body-text">
                      Thanks for getting in touch. We'll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="vesselType" className="block text-sm font-semibold text-navy mb-2">
                        Vessel Type
                      </label>
                      <select
                        id="vesselType"
                        name="vesselType"
                        value={formData.vesselType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
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
                      <label htmlFor="servicesNeeded" className="block text-sm font-semibold text-navy mb-2">
                        Services Needed
                      </label>
                      <select
                        id="servicesNeeded"
                        name="servicesNeeded"
                        value={formData.servicesNeeded}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
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
                      <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        placeholder="Tell us about your compliance needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange hover:bg-orange-dark text-white px-6 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      Send Message
                    </button>

                    <p className="text-sm text-gray-500 text-center">
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
