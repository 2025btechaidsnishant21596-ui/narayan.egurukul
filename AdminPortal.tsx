import React, { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Trash2, 
  RefreshCw, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  Layers
} from 'lucide-react';
import { InquiryRecord } from '../types';

export const AdminPortal: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list: InquiryRecord[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as InquiryRecord);
      });
      setInquiries(list);
    } catch (e) {
      console.warn('Error fetching Firestore inquiries:', e);
      // Local fallback sample data if offline
      const mockList: InquiryRecord[] = [
        {
          id: 'mock-1',
          type: 'Admission',
          name: 'Rohan Sharma',
          phone: '9876543210',
          parentName: 'Mr. Sharma',
          classStage: 'Play Group',
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock-2',
          type: 'Franchise',
          name: 'Ananya Verma',
          phone: '9123456789',
          parentName: 'ananya@gmail.com',
          investmentRange: '12-15 Lacs',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setInquiries(mockList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this inquiry record?')) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } catch (err) {
        console.error('Delete error:', err);
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return alert('No inquiries available to export.');
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Parent/Email', 'Class/Investment', 'Date'];
    const rows = inquiries.map((i) => [
      i.id || '',
      i.type,
      i.name,
      i.phone,
      i.parentName || i.email || '',
      i.classStage || i.investmentRange || '',
      new Date(i.createdAt).toLocaleString()
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `narayan_egurukul_inquiries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filtered = inquiries.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.phone.includes(searchTerm);
    const matchesType = filterType === 'all' || i.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Admin Header - Clean Minimalist Dark Card */}
      <div className="p-6 sm:p-8 bg-zinc-900 border border-zinc-800 text-white rounded-2xl relative overflow-hidden shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700/80 rounded-xl flex items-center justify-center text-zinc-100 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Staff Admin Control Portal</h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage student inquiries, Sanfort pre-school admissions, and sync with Firestore.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-white font-medium text-xs rounded-lg flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-3 py-2 bg-white text-zinc-900 hover:bg-zinc-100 font-semibold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-3 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-2 sm:space-y-0 sm:flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by name or phone number..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none focus:border-zinc-900"
        >
          <option value="all">All Inquiry Types</option>
          <option value="admission">Admission</option>
          <option value="franchise">Franchise</option>
        </select>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-700" />
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Submitted Student &amp; Parent Inquiries</h3>
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Total Records: {filtered.length}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-medium text-xs">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-zinc-700" />
            Loading records from Firestore...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-medium text-xs">
            No inquiry records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 text-[10px] font-semibold uppercase tracking-wider">
                  <th className="p-3.5 pl-5">Type</th>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">Parent / Email</th>
                  <th className="p-3.5">Class / Investment</th>
                  <th className="p-3.5">Submitted Date</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-3.5 pl-5">
                      <span className="px-2.5 py-0.5 rounded-full font-semibold text-[10px] uppercase bg-zinc-100 text-zinc-800 border border-zinc-200">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-zinc-900">{item.name}</td>
                    <td className="p-3.5 font-medium text-zinc-700">{item.phone}</td>
                    <td className="p-3.5 text-zinc-600 font-normal">{item.parentName || item.email || '—'}</td>
                    <td className="p-3.5 font-medium text-zinc-700">{item.classStage || item.investmentRange || '—'}</td>
                    <td className="p-3.5 text-zinc-500 font-normal">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
