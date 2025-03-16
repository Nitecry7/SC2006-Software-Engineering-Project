import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

function ContactPage() {
  return (
    <div className="pt-16 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Contact Us</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-cyan-500/30">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-cyan-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full bg-white/5 rounded-lg border border-cyan-500/30 p-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cyan-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-white/5 rounded-lg border border-cyan-500/30 p-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-cyan-300 mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-white/5 rounded-lg border border-cyan-500/30 p-3 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg p-3 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactInfo
              icon={<Mail className="w-5 h-5" />}
              title="Email"
              info="contact@sghome.com"
            />
            <ContactInfo
              icon={<Phone className="w-5 h-5" />}
              title="Phone"
              info="+65 6789 0123"
            />
            <ContactInfo
              icon={<MapPin className="w-5 h-5" />}
              title="Address"
              info="71 Robinson Road, Singapore 068895"
            />
            <ContactInfo
              icon={<MessageSquare className="w-5 h-5" />}
              title="Live Chat"
              info="Available 24/7"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, info }: { icon: React.ReactNode; title: string; info: string }) {
  return (
    <div className="flex items-center space-x-3 text-white">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-cyan-300">{info}</p>
      </div>
    </div>
  );
}

export default ContactPage;