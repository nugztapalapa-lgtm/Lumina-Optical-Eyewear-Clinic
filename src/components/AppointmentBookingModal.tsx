import React, { useState } from 'react';
import {
  CLINIC_DOCTORS,
  CLINIC_SERVICES,
  ACCEPTED_INSURANCES,
  CLINIC_INFO,
} from '../data/mockOpticalData';
import {
  X,
  Calendar,
  CheckCircle2,
  Download,
  FileCheck,
} from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  if (!isOpen) return null;

  // Booking Flow Steps
  const [step, setStep] = useState<'service' | 'doctor-time' | 'patient' | 'confirmed'>('service');

  // Form Fields
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || 'comprehensive-exam'
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:15 AM');

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [insurance, setInsurance] = useState('VSP (Vision Service Plan)');
  const [symptomsNote, setSymptomsNote] = useState('');

  // Generated confirmation
  const [bookingRef, setBookingRef] = useState('');

  const currentService =
    CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const availableDates = [
    { date: '2026-10-15', label: 'Thu, Oct 15' },
    { date: '2026-10-16', label: 'Fri, Oct 16' },
    { date: '2026-10-17', label: 'Sat, Oct 17' },
    { date: '2026-10-19', label: 'Mon, Oct 19' },
    { date: '2026-10-20', label: 'Tue, Oct 20' },
    { date: '2026-10-21', label: 'Wed, Oct 21' },
  ];

  const timeSlots = [
    '09:15 AM',
    '10:15 AM',
    '11:30 AM',
    '01:45 PM',
    '02:30 PM',
    '03:45 PM',
    '04:30 PM',
    '05:15 PM',
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientEmail.trim() || !patientPhone.trim()) {
      return;
    }
    const generatedRef = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setStep('confirmed');
  };

  const handleDownloadIcs = () => {
    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lumina Optical//Appointment Scheduler//EN
BEGIN:VEVENT
UID:${bookingRef}@luminaoptical.com
DTSTAMP:20261012T000000Z
DTSTART:20261015T101500
DTEND:20261015T110000
SUMMARY:Lumina Optical Eye Exam: ${currentService.title}
DESCRIPTION:Ref: ${bookingRef}\\nPatient: ${patientName}\\nLocation: ${CLINIC_INFO.address}, ${CLINIC_INFO.cityStateZip}\\nPhone: ${CLINIC_INFO.phone}
LOCATION:${CLINIC_INFO.address}, ${CLINIC_INFO.cityStateZip}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lumina-appointment-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col text-stone-900 dark:text-stone-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-800 dark:text-teal-400" />
            <h2 id="booking-modal-title" className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
              Schedule Clinic Visit
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (unless confirmed) */}
        {step !== 'confirmed' && (
          <div className="grid grid-cols-3 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950 text-[11px] font-medium text-stone-600 dark:text-stone-400">
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'service'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              1. Choose Service
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'doctor-time'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              2. Doctor & Time
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'patient'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              3. Patient Details
            </div>
          </div>
        )}

        {/* Modal Content Area */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {step === 'service' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Select Examination or Fitting Service
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  All comprehensive clinical exams include digital retinal screening and glaucoma testing.
                </p>
              </div>

              <div className="space-y-2.5">
                {CLINIC_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedServiceId === srv.id
                        ? 'border-teal-800 dark:border-teal-400 bg-teal-50/30 dark:bg-teal-950/40 ring-1 ring-teal-700 dark:ring-teal-400'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 block">
                          {srv.title}
                        </span>
                        <div className="text-stone-500 dark:text-stone-400 mt-0.5 flex items-center gap-2">
                          <span>{srv.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span>{srv.coveredByInsurance ? 'Vision Insurance Eligible' : 'Complimentary'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                          {srv.price === 0 ? 'Free' : `$${srv.price}`}
                        </span>
                        {srv.coveredByInsurance && (
                          <span className="text-[10px] text-stone-400 block">or Copay</span>
                        )}
                      </div>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">{srv.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep('doctor-time')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Continue to Doctor & Date →
                </button>
              </div>
            </div>
          )}

          {step === 'doctor-time' && (
            <div className="space-y-6">
              {/* Doctor Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Choose Optometrist:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctorId('any')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      selectedDoctorId === 'any'
                        ? 'border-teal-800 dark:border-teal-400 bg-teal-50/40 dark:bg-teal-950/40 font-semibold text-stone-900 dark:text-stone-100'
                        : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div>First Available</div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Fastest opening</span>
                  </button>

                  {CLINIC_DOCTORS.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        selectedDoctorId === doc.id
                          ? 'border-teal-800 dark:border-teal-400 bg-teal-50/40 dark:bg-teal-950/40 font-semibold text-stone-900 dark:text-stone-100'
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className="truncate">{doc.name}</div>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal truncate block">
                        {doc.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Select Date:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                  {availableDates.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`py-2 px-1.5 rounded-lg border text-center cursor-pointer transition-colors ${
                        selectedDate === item.date
                          ? 'border-teal-800 dark:border-teal-400 bg-teal-900 dark:bg-teal-700 text-white font-semibold shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className="text-[11px]">{item.label.split(',')[0]}</div>
                      <div className="font-semibold">{item.label.split(',')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Select Time Slot:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-lg border text-center font-mono cursor-pointer transition-colors ${
                        selectedTimeSlot === slot
                          ? 'border-teal-800 dark:border-teal-400 bg-teal-900 dark:bg-teal-700 text-white font-medium shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep('service')}
                  className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  ← Back to Service
                </button>
                <button
                  onClick={() => setStep('patient')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Continue to Patient Details →
                </button>
              </div>
            </div>
          )}

          {step === 'patient' && (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Patient Contact & Insurance Information
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  We bill your vision benefits directly. Bring your vision insurance card or member ID.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Marcus Thorne"
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="(408) 555-0123"
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Email Address (for appointment confirmation & reminders) *
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="marcus.thorne@example.com"
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Vision Insurance / Payment Plan
                  </label>
                  <select
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none cursor-pointer"
                  >
                    {ACCEPTED_INSURANCES.map((ins) => (
                      <option key={ins} value={ins}>
                        {ins}
                      </option>
                    ))}
                    <option value="Self-Pay / Private">Self-Pay / Private Consultation</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Reason for visit or symptoms (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={symptomsNote}
                    onChange={(e) => setSymptomsNote(e.target.value)}
                    placeholder="e.g., Routine exam, blurry distance vision, frequent digital eye strain, interested in new progressive glasses..."
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary Review Strip */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{currentService.title}</span>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {selectedDate} at {selectedTimeSlot} · Lumina Optical Willow Glen
                  </div>
                </div>
                <div className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {currentService.price === 0 ? 'Free' : `$${currentService.price}`}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('doctor-time')}
                  className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-lg cursor-pointer shadow-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-400">
                  BOOKING CONFIRMATION #{bookingRef}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Your appointment is confirmed!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  A calendar invite and preparation details have been sent to{' '}
                  <strong className="text-stone-800 dark:text-stone-200">{patientEmail}</strong>.
                </p>
              </div>

              {/* Card Summary */}
              <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Service:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{currentService.title}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Date & Time:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedDate} · {selectedTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Optometrist:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedDoctorId === 'any'
                      ? 'Lumina Clinical Staff'
                      : CLINIC_DOCTORS.find((d) => d.id === selectedDoctorId)?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Patient:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 dark:text-stone-400">Clinic Address:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                    {CLINIC_INFO.address}, Willow Glen
                  </span>
                </div>
              </div>

              {/* What to bring */}
              <div className="max-w-md mx-auto p-4 bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-left text-xs text-teal-950 dark:text-teal-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                  What to bring to your visit:
                </p>
                <ul className="list-disc pl-5 space-y-0.5 text-stone-600 dark:text-stone-400 text-[11px]">
                  <li>Current glasses and sunglasses</li>
                  <li>Vision insurance card (if applicable)</li>
                  <li>Contact lens boxes (if getting a contact lens refit)</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                  <span>Download .ICS Calendar Event</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
