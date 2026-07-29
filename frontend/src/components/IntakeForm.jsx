import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, Loader2, Calendar, Phone, Mail, User, GraduationCap, DollarSign, FolderGit2, FileText } from 'lucide-react';
import { DOMAINS, BUDGET_RANGES } from '../data/projects';

export default function IntakeForm({ isOpen, onClose, selectedProject }) {
  const [formData, setFormData] = useState({
    student_name: '',
    college_name: '',
    phone_number: '',
    email: '',
    project_domain: 'AI-ML',
    selected_project_title: '',
    budget_range: '₹10k-₹20k',
    deadline: '',
    custom_requirements: '',
    company_website: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success'|'error', message: string }

  // Update form state when a project is selected from the catalog
  useEffect(() => {
    if (selectedProject) {
      setFormData(prev => ({
        ...prev,
        selected_project_title: selectedProject.title || '',
        project_domain: selectedProject.domain && selectedProject.domain !== 'All Domains' ? selectedProject.domain : 'AI-ML',
        budget_range: selectedProject.priceRange || '₹10k-₹20k'
      }));
    }
  }, [selectedProject]);

  // Default minimum deadline to tomorrow
  useEffect(() => {
    if (!formData.deadline) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 14);
      setFormData(prev => ({
        ...prev,
        deadline: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.student_name.trim()) {
      newErrors.student_name = 'Student full name is required.';
    }

    if (!formData.college_name.trim()) {
      newErrors.college_name = 'College or University name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanedPhone = formData.phone_number.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required for WhatsApp coordination.';
    } else if (!/^\d+$/.test(cleanedPhone) || cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      newErrors.phone_number = 'Enter a valid 10 to 15 digit contact number.';
    }

    if (!formData.selected_project_title.trim()) {
      newErrors.selected_project_title = 'Please enter or select a project title.';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Target submission deadline date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/submit-requirement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Requirement submitted successfully!'
        });
      } else {
        throw new Error(data.detail || 'Server encountered an error recording your response.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({
        type: 'error',
        message: err.message || 'Unable to connect to requirement service. Please check your connection or contact team directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white/90 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700/20 border border-blue-500/30 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">Project Requirement Intake</h3>
              <p className="text-xs text-slate-400">Onboarding pipeline for B.Tech / M.Tech / MCA Capstone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Modal View */}
        {submitStatus?.type === 'success' ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-950">Requirement Registered!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {submitStatus.message}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left text-xs text-slate-400 space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Student Name:</span>
                <span className="text-slate-700">{formData.student_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Domain:</span>
                <span className="text-blue-600">{formData.project_domain}</span>
              </div>
              <div className="flex justify-between">
                <span>Project Title:</span>
                <span className="text-slate-700 truncate max-w-[240px]">{formData.selected_project_title}</span>
              </div>
              <div className="flex justify-between">
                <span>Deadline:</span>
                <span className="text-emerald-400">{formData.deadline}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitStatus(null);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm transition-all"
            >
              Done & Return to Portal
            </button>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {submitStatus?.type === 'error' && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span>{submitStatus.message}</span>
              </div>
            )}

            {/* Row 1: Student & College Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Student Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                    errors.student_name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  } text-sm text-slate-900 placeholder-slate-600 focus:outline-none transition-colors`}
                />
                {errors.student_name && <p className="text-[11px] text-rose-400 mt-1">{errors.student_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  College / University <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleChange}
                  placeholder="e.g. VIT Vellore / SRM Institute"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                    errors.college_name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  } text-sm text-slate-900 placeholder-slate-600 focus:outline-none transition-colors`}
                />
                {errors.college_name && <p className="text-[11px] text-rose-400 mt-1">{errors.college_name}</p>}
              </div>
            </div>

            {/* Row 2: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  WhatsApp Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                    errors.phone_number ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  } text-sm text-slate-900 placeholder-slate-600 focus:outline-none transition-colors`}
                />
                {errors.phone_number && <p className="text-[11px] text-rose-400 mt-1">{errors.phone_number}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. student@domain.edu"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  } text-sm text-slate-900 placeholder-slate-600 focus:outline-none transition-colors`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 3: Domain & Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                  Project Domain <span className="text-rose-400">*</span>
                </label>
                <select
                  name="project_domain"
                  value={formData.project_domain}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {DOMAINS.filter(d => d !== 'All Domains').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                  Budget Range <span className="text-rose-400">*</span>
                </label>
                <select
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {BUDGET_RANGES.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Selected Project Title */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Selected or Custom Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="selected_project_title"
                value={formData.selected_project_title}
                onChange={handleChange}
                placeholder="e.g. Autonomous LLM Multi-Agent System"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                  errors.selected_project_title ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                } text-sm text-slate-900 placeholder-slate-600 focus:outline-none transition-colors`}
              />
              {errors.selected_project_title && <p className="text-[11px] text-rose-400 mt-1">{errors.selected_project_title}</p>}
            </div>

            {/* Row 5: Deadline Date Picker */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Final Submission Deadline <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                  errors.deadline ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                } text-sm text-slate-900 focus:outline-none transition-colors`}
              />
              {errors.deadline && <p className="text-[11px] text-rose-400 mt-1">{errors.deadline}</p>}
            </div>

            {/* Row 6: Custom Requirements Textarea */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Custom Architecture & Feature Notes (Optional)
              </label>
              <textarea
                name="custom_requirements"
                rows={3}
                value={formData.custom_requirements}
                onChange={handleChange}
                placeholder="Specify target cloud providers, IEEE paper topic guidelines, or custom feature sets..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Submit CTA */}
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

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Syncing with Intake Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Requirement & Get Architecture Plan</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
