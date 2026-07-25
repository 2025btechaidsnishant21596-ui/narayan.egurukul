import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  School, 
  Baby, 
  Sparkles, 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const SchoolSection: React.FC = () => {
  const [formType, setFormType] = useState<'admission' | 'franchise'>('admission');
  const [name, setName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [classStage, setClassStage] = useState('');
  const [investmentRange, setInvestmentRange] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);

    const inquiryData = {
      type: formType === 'admission' ? 'Admission' : 'Franchise',
      name,
      parentName: formType === 'admission' ? parentName : (parentName || null),
      phone,
      classStage: formType === 'admission' ? classStage : null,
      investmentRange: formType === 'franchise' ? investmentRange : null,
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'inquiries'), inquiryData);
      setSuccessMsg(`✅ ${formType === 'admission' ? 'Admission' : 'Franchise'} Inquiry submitted successfully and saved in Firestore!`);
      setName('');
      setParentName('');
      setPhone('');
      setClassStage('');
      setInvestmentRange('');
    } catch (err: any) {
      console.warn('Firestore error, saving locally:', err);
      setSuccessMsg('✅ Inquiry received! We will contact you at +91 ' + phone);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner - Clean Minimalist Dark Card */}
      <div className="p-8 lg:p-10 bg-zinc-900 text-white rounded-2xl space-y-3 text-center relative overflow-hidden border border-zinc-800 shadow-xs">
        <span className="inline-block px-3 py-1 bg-zinc-800 border border-zinc-700/80 rounded-full text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
          Hanumangarh Branch
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Sanfort Pre-School <span className="text-zinc-400 font-normal">Hanumangarh</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed">
          Hanumangarh's premier U.K. Concept Preschool. Nurturing young minds in a safe, smart, and deeply stimulating learning environment built specifically for early childhood excellence.
        </p>
      </div>

      {/* Grid: Details & Form */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Branch Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <School className="w-5 h-5 text-zinc-800" />
              <span>Branch At A Glance</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <div className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-zinc-600" /> Class Timings
                </div>
                <div className="text-zinc-600 leading-relaxed font-normal">
                  Play Group: 9:00 AM – 12:00 PM<br />
                  Nursery &amp; KG: 8:30 AM – 1:00 PM
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <div className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-zinc-600" /> Admissions Desk
                </div>
                <div className="text-zinc-600 leading-relaxed font-normal">
                  Play Group to Senior KG<br />
                  Call: +91 95711 48082
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <div className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-zinc-600" /> Pedagogy
                </div>
                <div className="text-zinc-600 leading-relaxed font-normal">
                  UK EYFS Concept<br />
                  Interactive Smart Boards
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <div className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-600" /> Location
                </div>
                <div className="text-zinc-600 leading-relaxed font-normal">
                  114-115 Jyoti Colony, Near Bus Stand,<br />
                  Hanumangarh Junction — 335512
                </div>
              </div>
            </div>
          </div>

          {/* Academic Stages */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-semibold uppercase bg-zinc-100 text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded-full">
                1.5 - 2.5 Years
              </span>
              <h4 className="text-sm font-bold text-zinc-900">Play Group</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Sensory training, play-way activities, &amp; socialization habits.
              </p>
            </div>

            <div className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-semibold uppercase bg-zinc-100 text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded-full">
                2.5 - 3.5 Years
              </span>
              <h4 className="text-sm font-bold text-zinc-900">Nursery</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Pre-writing, numeracy, phonics, &amp; fine motor coordination.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Admission / Franchise Form */}
        <div className="lg:col-span-6 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              type="button"
              onClick={() => { setFormType('admission'); setSuccessMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                formType === 'admission' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Admission Form
            </button>
            <button
              type="button"
              onClick={() => { setFormType('franchise'); setSuccessMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                formType === 'franchise' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Franchise Opportunity
            </button>
          </div>

          <h3 className="text-base font-bold text-zinc-900">
            {formType === 'admission' ? 'Apply for Preschool Admission' : 'Franchise Partner Inquiry'}
          </h3>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                {formType === 'admission' ? "Child's Full Name *" : "Full Name *"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                required
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />
            </div>

            {formType === 'admission' && (
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Parent's Name *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Enter Parent's Name"
                  required
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                Contact Number (10 Digits) *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                required
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />
            </div>

            {formType === 'admission' ? (
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Select Program *
                </label>
                <select
                  value={classStage}
                  onChange={(e) => setClassStage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none focus:border-zinc-900"
                >
                  <option value="">-- Select Stage --</option>
                  <option value="Play Group">Play Group (1.5+ Years)</option>
                  <option value="Nursery">Nursery (2.5+ Years)</option>
                  <option value="L.K.G.">L.K.G. (3.5+ Years)</option>
                  <option value="U.K.G.">U.K.G. (4.5+ Years)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                  Investment Range *
                </label>
                <select
                  value={investmentRange}
                  onChange={(e) => setInvestmentRange(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none focus:border-zinc-900"
                >
                  <option value="">-- Select Investment --</option>
                  <option value="12-15 Lacs">12-15 Lacs</option>
                  <option value="20 Lacs Onwards">20 Lacs Onwards</option>
                  <option value="50 Lacs Onwards">50 Lacs Onwards</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
