import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Code, 
  Database, 
  Cpu, 
  FlaskConical, 
  Layers
} from 'lucide-react';
import { SubjectResource } from '../types';

export const StudyMaterials: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1yICsFA898qwVypRo3EuYsqVfXJP47gE_?usp=drive_link";

  const subjects: SubjectResource[] = [
    {
      id: '1',
      code: 'MATH101',
      name: 'Engineering Mathematics I',
      semester: 1,
      branch: 'core',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '2',
      code: 'PHY101',
      name: 'Engineering Physics',
      semester: 1,
      branch: 'core',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '3',
      code: 'CHEM101',
      name: 'Engineering Chemistry',
      semester: 1,
      branch: 'core',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '4',
      code: 'CS101',
      name: 'Programming for Problem Solving (Python/C)',
      semester: 1,
      branch: 'core',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '5',
      code: 'AIDS201',
      name: 'Data Structures & Algorithms',
      semester: 2,
      branch: 'aids',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '6',
      code: 'AIDS202',
      name: 'Statistics & Probability for Data Science',
      semester: 2,
      branch: 'aids',
      type: 'pyq',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '7',
      code: 'AIML201',
      name: 'Fundamentals of Artificial Intelligence',
      semester: 2,
      branch: 'aiml',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '8',
      code: 'AIML202',
      name: 'Machine Learning Fundamentals',
      semester: 2,
      branch: 'aiml',
      type: 'notes',
      available: true,
      driveUrl: DRIVE_FOLDER_URL
    },
    {
      id: '9',
      code: 'AIML203',
      name: 'Neural Networks & Deep Learning',
      semester: 2,
      branch: 'aiml',
      type: 'ebook',
      available: false,
      driveUrl: DRIVE_FOLDER_URL
    }
  ];

  const filteredSubjects = subjects.filter((s) => {
    const matchesBranch = selectedBranch === 'all' || s.branch === selectedBranch;
    const matchesSem = selectedSemester === 'all' || s.semester.toString() === selectedSemester;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSem && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner - Clean Minimalist Dark Card */}
      <div className="p-8 lg:p-10 bg-zinc-900 text-white rounded-2xl space-y-3 text-center relative overflow-hidden border border-zinc-800 shadow-xs">
        <span className="inline-block px-3 py-1 bg-zinc-800 border border-zinc-700/80 rounded-full text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
          100% Free B.Tech PDF Downloads
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          B.Tech <span className="text-zinc-400 font-normal">Study Materials &amp; PYQs</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed">
          Hand-written lecture notes, 10+ year solved university question papers, lab manuals, and syllabus formula sheets for CSE, AIDS, AIML, and core engineering streams.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-2 md:space-y-0 md:flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects by name or code (e.g. Mathematics, Python, DSA)..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none focus:border-zinc-900"
          >
            <option value="all">All Engineering Branches</option>
            <option value="core">B.Tech Core (1st Year)</option>
            <option value="aids">CSE (AIDS)</option>
            <option value="aiml">CSE (AIML)</option>
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none focus:border-zinc-900"
          >
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
        </div>
      </div>

      {/* Branch Quick Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-3 hover:border-zinc-300 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <Code className="w-5 h-5 text-zinc-800" />
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
              6 Subjects
            </span>
          </div>
          <h3 className="text-sm font-bold text-zinc-900">B.Tech Core (Semester 1)</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Mathematics I, Physics, Chemistry, Basic Electrical, &amp; Programming.
          </p>
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline pt-1"
          >
            <span>Open Google Drive Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-3 hover:border-zinc-300 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <Database className="w-5 h-5 text-zinc-800" />
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
              Specialized
            </span>
          </div>
          <h3 className="text-sm font-bold text-zinc-900">CSE (AIDS Track)</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Data Structures, Statistics, Probability, DBMS, &amp; Python Notebooks.
          </p>
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline pt-1"
          >
            <span>Open Google Drive Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-3 hover:border-zinc-300 transition-all shadow-xs">
          <div className="flex items-center justify-between">
            <Cpu className="w-5 h-5 text-zinc-800" />
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
              AI Track
            </span>
          </div>
          <h3 className="text-sm font-bold text-zinc-900">CSE (AIML Track)</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Machine Learning algorithms, AI Fundamentals, &amp; Solved PYQ Banks.
          </p>
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline pt-1"
          >
            <span>Open Google Drive Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Subjects Resource Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-700" />
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Subject Notes &amp; Solved Papers</h3>
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Showing {filteredSubjects.length} subjects
          </span>
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredSubjects.map((sub, index) => (
            <div key={sub.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-bold text-xs flex items-center justify-center shrink-0 border border-zinc-200">
                  0{index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900">{sub.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700">
                      {sub.code}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 font-normal mt-0.5">
                    Semester {sub.semester} • Branch: {sub.branch.toUpperCase()} • Type: {sub.type.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {sub.available ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5" /> Coming Soon
                  </span>
                )}

                <a
                  href={sub.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
