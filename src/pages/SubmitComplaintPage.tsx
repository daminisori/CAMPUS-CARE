import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { CategoryId, Complaint } from '../types';
import { CATEGORIES, SAMPLE_PHOTOS, HOSTEL_BLOCKS, BRANCHES } from '../constants/categories';
import { CategoryTicketTile } from '../components/CategoryTicketTile';
import { ComplaintCard } from '../components/ComplaintCard';
import { StampBadge } from '../components/common/StampBadge';
import { soundFX } from '../utils/audio';
import { 
  ChevronRight, 
  Upload, 
  Sparkles, 
  Camera, 
  X, 
  Ticket, 
  Plus
} from 'lucide-react';

interface SubmitComplaintPageProps {
  onTicketGenerated: (newTicket: Complaint) => void;
}

export const SubmitComplaintPage: React.FC<SubmitComplaintPageProps> = ({ onTicketGenerated }) => {
  const { currentUser, createComplaint, setCurrentView } = useComplaints();

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('water');
  const [title, setTitle] = useState('Water cooler not working in Block C 2nd floor');
  const [description, setDescription] = useState(
    'The drinking water pipe near Room 208 is not cooling and the lower overflow basin is clogged with stagnant water.'
  );
  const [block, setBlock] = useState(currentUser.block || 'Block C (Charaka)');
  const [roomNo, setRoomNo] = useState(currentUser.room || 'Floor 2 (Near 208)');
  const [branch, setBranch] = useState(currentUser.branch || 'Computer Science & Engineering');
  const [studentName, setStudentName] = useState(currentUser.name || 'Damini Sori');
  const [studentRoll, setStudentRoll] = useState('2024CSB1042');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
  ]);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const activeCategory = CATEGORIES[selectedCategory];

  const handleCategorySelect = (catId: CategoryId) => {
    soundFX.playClick();
    setSelectedCategory(catId);
    const sample = CATEGORIES[catId].sampleIssues[0];
    if (sample) {
      setTitle(sample);
    }
  };

  const handleSampleSelect = (sampleText: string) => {
    soundFX.playClick();
    setTitle(sampleText);
  };

  const handleAddSamplePhoto = (url: string) => {
    soundFX.playClick();
    if (!photos.includes(url)) {
      setPhotos(prev => [...prev, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    soundFX.playClick();
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFX.playClick();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPhotoUrl.trim()) {
      soundFX.playClick();
      setPhotos(prev => [...prev, customPhotoUrl.trim()]);
      setCustomPhotoUrl('');
      setShowUrlInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Realistic paper tear sound effect on submission!
    soundFX.playPaperTear();

    const deptMap: Record<CategoryId, string> = {
      equipment: 'Campus Maintenance & Electricals',
      power: 'Campus Maintenance & Electricals',
      water: 'Civil & Plumbing Services',
      sanitation: 'Sanitation & Housekeeping Wing',
      housing: 'Hostel Estate & Housing Management',
      network: 'IT & Campus Network Cell',
      security: 'Campus Security & Safety',
      admin: 'Academic & Student Affairs Office',
    };

    const newComplaint = createComplaint({
      category: selectedCategory,
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      urgency,
      studentName: studentName.trim(),
      studentRoll: studentRoll.trim(),
      studentEmail: currentUser.email,
      branch,
      block,
      roomNo,
      campusArea: block,
      assignedDepartment: deptMap[selectedCategory] || 'Campus Maintenance',
      photos,
    });

    onTicketGenerated(newComplaint);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="hover:text-navy hover:underline"
        >
          Dashboard
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-navy font-bold">New Grievance Boarding Ticket</span>
      </div>

      {/* HEADER */}
      <div className="border-b-2 border-dashed border-[#141E1B] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-ticket text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-ink">
              SUBMIT A COMPLAINT & BOARD A TICKET
            </h1>
            <p className="text-xs sm:text-sm font-mono text-ink-muted mt-1">
              Select your grievance category ticket, provide hostel details, attach photos, and dispense your official boarding pass.
            </p>
          </div>
          <StampBadge label="OFFICIAL FILING DESK" size="md" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* =========================================
            STEP 1: 8 ILLUSTRATED CATEGORY TICKET TILES
            ========================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-ticket text-xl sm:text-2xl uppercase tracking-wider text-navy flex items-center gap-2">
              <span>1. SELECT GRIEVANCE CATEGORY TICKET</span>
              <span className="text-xs font-mono text-brass-dark font-bold">
                (Choose 1 of 8 illustrated tickets)
              </span>
            </label>
          </div>

          {/* 8 Ticket-Stub Shaped Category Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {(
              [
                'equipment',
                'power',
                'water',
                'sanitation',
                'housing',
                'network',
                'security',
                'admin',
              ] as CategoryId[]
            ).map((catId) => (
              <CategoryTicketTile
                key={catId}
                category={catId}
                isSelected={selectedCategory === catId}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>

          {/* QUICK PRESET SUGGESTIONS FOR SELECTED CATEGORY */}
          <div className="p-3.5 bg-paper-50 rounded-2xl border-2 border-[#141E1B] shadow-sm flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-ink flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brass" />
              Quick Fill Issue Presets:
            </span>
            {activeCategory.sampleIssues.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleSelect(sample)}
                className="text-[11px] font-mono bg-paper-200 hover:bg-paper-300 text-ink px-2.5 py-1 rounded-lg border border-[#141E1B] transition-all transform active:scale-95 text-left"
              >
                + {sample}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================
            STEP 2: PROBLEM DETAILS & DESCRIPTION
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT FORM FIELDS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-paper-50 p-6 rounded-3xl border-2 border-[#141E1B] shadow-ticket space-y-5">
              <h3 className="font-ticket text-2xl uppercase tracking-wider text-navy border-b-2 border-dashed border-[#141E1B] pb-2">
                2. GRIEVANCE & LOCATION DETAILS
              </h3>

              {/* Title */}
              <div>
                <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                  Problem Summary / Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Water cooler leaking in Block C 2nd floor"
                  className="w-full px-4 py-3 rounded-xl bg-paper-100 border-2 border-[#141E1B] focus:border-brass focus:ring-1 focus:ring-brass text-sm font-semibold text-ink shadow-inner"
                />
              </div>

              {/* Description with Live Character Counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono font-bold uppercase text-ink">
                    Describe Your Problem <span className="text-red-600">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      description.length > 450 ? 'text-red-600 font-bold' : 'text-ink-muted'
                    }`}
                  >
                    {description.length} / 500 chars
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail, how often it occurs, and exact location indicators..."
                  className="w-full p-3.5 rounded-xl bg-paper-100 border-2 border-[#141E1B] focus:border-brass focus:ring-1 focus:ring-brass text-xs font-sans text-ink leading-relaxed resize-none shadow-inner"
                />
              </div>

              {/* Location Grid (Block & Room No) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Block / Building <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono text-ink focus:border-brass font-bold"
                  >
                    {HOSTEL_BLOCKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Room No. / Landmark <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    placeholder="e.g. Room 304 / Floor 2 corridor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono text-ink focus:border-brass font-bold"
                  />
                </div>
              </div>

              {/* Student Metadata (Name, Branch, Roll, Urgency) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t-2 border-dashed border-[#141E1B]">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Student Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono text-ink font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Academic Branch <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono text-ink font-bold"
                  >
                    {BRANCHES.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Roll / Registration No.
                  </label>
                  <input
                    type="text"
                    value={studentRoll}
                    onChange={(e) => setStudentRoll(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono text-ink font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-ink block mb-1">
                    Urgency Priority
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-paper-100 border-2 border-[#141E1B] text-xs font-mono uppercase font-bold text-ink"
                  >
                    <option value="low">Low (Routine)</option>
                    <option value="medium">Medium (Within 48h)</option>
                    <option value="high">High (Within 24h)</option>
                    <option value="urgent">Urgent / Safety Hazard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PHOTO EVIDENCE DROPZONE & SAMPLE PRESETS */}
            <div className="bg-paper-50 p-6 rounded-3xl border-2 border-[#141E1B] shadow-ticket space-y-4">
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#141E1B] pb-2">
                <h3 className="font-ticket text-2xl uppercase tracking-wider text-navy flex items-center gap-2">
                  <Camera className="w-5 h-5 text-brass" />
                  <span>3. ATTACH EVIDENCE PHOTOS</span>
                </h3>
                <span className="text-xs font-mono font-bold text-ink-muted">
                  {photos.length} Attached
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex-1 w-full flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#141E1B] hover:border-brass rounded-2xl bg-paper-100/80 cursor-pointer transition-colors group">
                  <Upload className="w-7 h-7 text-ink-muted group-hover:text-brass transition-colors mb-1" />
                  <span className="text-xs font-mono font-bold text-ink group-hover:text-navy">
                    Click to Upload Physical Photo
                  </span>
                  <span className="text-[10px] font-mono text-ink-faint">
                    PNG, JPG or Device Camera
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Sample Presets */}
                <div className="w-full sm:w-auto flex sm:flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase text-ink-muted block font-bold">
                    Quick Sample Presets:
                  </span>
                  <div className="flex flex-wrap sm:flex-col gap-1.5">
                    {SAMPLE_PHOTOS.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddSamplePhoto(sp.url)}
                        className="text-[10px] font-mono bg-paper-200 hover:bg-paper-300 text-ink px-2.5 py-1 rounded-lg border border-[#141E1B] text-left transition-all active:scale-95"
                      >
                        + {sp.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attached Photos Preview */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {photos.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden border-2 border-[#141E1B] shadow-sm group aspect-video bg-paper-200"
                    >
                      <img
                        src={url}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-navy text-white hover:bg-red-700 transition-colors shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: LIVE BOARDING PASS PREVIEW */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-ticket text-xl uppercase tracking-wider text-navy">
                  LIVE BOARDING TICKET PREVIEW
                </span>
                <StampBadge label="LIVE DRAFT" size="sm" />
              </div>

              {/* LIVE TICKET STUB USING REAL COMPLAINTCARD COMPONENT */}
              <ComplaintCard
                id="TCK-PREVIEW"
                ticketNumber="No. 999"
                title={title || 'Problem Title'}
                category={selectedCategory}
                location={`${block}, ${roomNo}`}
                description={description || 'Description will appear here'}
                department={activeCategory.title}
                priority={urgency}
                status="pending"
                date="Today"
              />

              {/* SUBMIT BUTTON WITH SOUND EFFECT */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-5 px-6 rounded-2xl bg-navy hover:bg-navy-dark text-paper-50 font-ticket text-2xl sm:text-3xl tracking-widest uppercase shadow-2xl border-4 border-brass flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 group"
                >
                  <Ticket className="w-7 h-7 text-brass group-hover:rotate-12 transition-transform" />
                  <span>SUBMIT & DISPENSE BOARDING TICKET</span>
                </button>
                <p className="text-center text-xs font-mono text-ink-muted mt-2">
                  🔊 Generates real-time ticket sound, paper tear rip, and rubber stamp thud!
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
