import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';

const DEFAULT_WHATSAPP_NUMBER = '919876543210';

export default function FloatingContact({ onOpenForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
    company_website: ''
  });

  const quickMessage = useMemo(() => {
    const name = formData.name.trim() || 'Student';
    const contact = formData.contact.trim();
    const message = formData.message.trim() || 'I need help with a capstone project.';
    return `Hi NexGen Architects, I am ${name}. ${message}${contact ? ` My contact is ${contact}.` : ''}`;
  }, [formData]);

  const whatsappHref = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(quickMessage)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || formData.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Add your name, contact, and a short project message.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/quick-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'floating_help_widget'
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.detail || 'Unable to send message.');
      }
      setStatus({ type: 'success', message: data.message || 'Message sent. We will contact you shortly.' });
      setFormData({ name: '', contact: '', message: '', company_website: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Message failed. Try WhatsApp instead.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-blue-200 bg-white/95 p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <p className="text-sm font-extrabold text-slate-950">Instant Project Help</p>
              <p className="text-xs text-slate-500">Send a quick message or continue on WhatsApp.</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
              aria-label="Close quick contact"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {status && (
              <div className={`flex items-start gap-2 rounded-2xl border p-3 text-xs ${
                status.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
                <span>{status.message}</span>
              </div>
            )}

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="WhatsApp number or email"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us what project help you need..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <input
              type="text"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-600 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenForm();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Full Requirement Form
              <ExternalLink className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="group flex items-center gap-3 rounded-2xl border border-blue-200 bg-white/95 px-3 py-2 shadow-2xl shadow-blue-600/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-blue-300"
        title="Need Instant Project Help?"
        aria-label="Need Instant Project Help?"
      >
        <span className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-700">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Need Instant Project Help?
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-700 via-sky-600 to-emerald-500 text-white shadow-xl shadow-blue-600/35">
          {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 transition-transform group-hover:rotate-12" />}
        </span>
      </button>
    </div>
  );
}
