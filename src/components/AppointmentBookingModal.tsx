import React, { useState } from 'react';
import {
  CLINIC_DOCTORS,
  CLINIC_SERVICES,
  ACCEPTED_INSURANCES,
  CLINIC_INFO,
  formatRupiah,
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:15 WIB');

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [insurance, setInsurance] = useState('BPJS Kesehatan');
  const [symptomsNote, setSymptomsNote] = useState('');

  // Generated confirmation
  const [bookingRef, setBookingRef] = useState('');

  const currentService =
    CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const availableDates = [
    { date: '2026-10-15', label: 'Kam, 15 Okt' },
    { date: '2026-10-16', label: 'Jum, 16 Okt' },
    { date: '2026-10-17', label: 'Sab, 17 Okt' },
    { date: '2026-10-19', label: 'Sen, 19 Okt' },
    { date: '2026-10-20', label: 'Sel, 20 Okt' },
    { date: '2026-10-21', label: 'Rab, 21 Okt' },
  ];

  const timeSlots = [
    '09:15 WIB',
    '10:15 WIB',
    '11:30 WIB',
    '13:45 WIB',
    '14:30 WIB',
    '15:45 WIB',
    '16:30 WIB',
    '17:15 WIB',
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientEmail.trim() || !patientPhone.trim()) {
      return;
    }
    const generatedRef = `KROS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setStep('confirmed');
  };

  const handleDownloadIcs = () => {
    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Krostell Optik//Jadwal Pemeriksaan Mata//ID
BEGIN:VEVENT
UID:${bookingRef}@krostell.com
DTSTAMP:20261012T000000Z
DTSTART:20261015T101500
DTEND:20261015T110000
SUMMARY:Pemeriksaan Mata Krostell Optik: ${currentService.title}
DESCRIPTION:Ref: ${bookingRef}\\nPasien: ${patientName}\\nLokasi: ${CLINIC_INFO.address}, ${CLINIC_INFO.cityStateZip}\\nTelepon: ${CLINIC_INFO.phone}
LOCATION:${CLINIC_INFO.address}, ${CLINIC_INFO.cityStateZip}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `krostell-jadwal-${bookingRef}.ics`);
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
              Jadwal Kunjungan Klinik
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
              1. Pilih Layanan
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'doctor-time'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              2. Dokter & Waktu
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'patient'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              3. Data Pasien
            </div>
          </div>
        )}

        {/* Modal Content Area */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {step === 'service' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Pilih Layanan Pemeriksaan atau Fitting
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Seluruh pemeriksaan klinis komprehensif mencakup skrining retina digital resolusi ultra-tinggi dan evaluasi tekanan bola mata (glaukoma).
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
                          <span>{srv.coveredByInsurance ? 'Ditanggung Asuransi' : 'Gratis / Termasuk'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                          {srv.price === 0 ? 'Gratis' : formatRupiah(srv.price)}
                        </span>
                        {srv.coveredByInsurance && (
                          <span className="text-[10px] text-stone-400 block">Klaim Asuransi</span>
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
                  Lanjut ke Dokter & Jadwal →
                </button>
              </div>
            </div>
          )}

          {step === 'doctor-time' && (
            <div className="space-y-6">
              {/* Doctor Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                  Pilih Dokter Spesialis Mata:
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
                    <div>Pertama Tersedia</div>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">Jadwal tercepat</span>
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
                  Pilih Tanggal:
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
                  Pilih Jam Kunjungan:
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
                  ← Kembali ke Layanan
                </button>
                <button
                  onClick={() => setStep('patient')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Lanjut ke Data Pasien →
                </button>
              </div>
            </div>
          )}

          {step === 'patient' && (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Kontak Pasien & Informasi Asuransi
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Kami melayani penagihan klaim asuransi kesehatan langsung. Harap bawa kartu fisik asuransi atau nomor keanggotaan Anda saat hadir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="contoh: Marcus Thorne"
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Nomor WhatsApp / Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="0812-3456-7890"
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Alamat Email (untuk konfirmasi & pengingat jadwal) *
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
                    Asuransi Kesehatan / Skema Pembayaran
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
                    <option value="Self-Pay / Private">Pembayaran Mandiri / Pribadi</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    Keluhan mata atau alasan kunjungan (opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={symptomsNote}
                    onChange={(e) => setSymptomsNote(e.target.value)}
                    placeholder="contoh: Pemeriksaan rutin berkala, mata sering buram & cepat perih depan laptop, ingin konsultasi lensa progresif..."
                    className="w-full p-2.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary Review Strip */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{currentService.title}</span>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {selectedDate} pukul {selectedTimeSlot} · Butik Klinik Krostell Optik Senopati
                  </div>
                </div>
                <div className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {currentService.price === 0 ? 'Gratis' : formatRupiah(currentService.price)}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('doctor-time')}
                  className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-lg cursor-pointer shadow-xs"
                >
                  Konfirmasi Jadwal Kunjungan
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
                  KONFIRMASI JADWAL #{bookingRef}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Jadwal kunjungan Anda telah terkonfirmasi!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  Undangan kalender dan panduan persiapan pemeriksaan telah dikirim ke{' '}
                  <strong className="text-stone-800 dark:text-stone-200">{patientEmail}</strong>.
                </p>
              </div>

              {/* Card Summary */}
              <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Layanan:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{currentService.title}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Tanggal & Jam:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedDate} · {selectedTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Dokter Pemeriksa:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedDoctorId === 'any'
                      ? 'Tim Medis Krostell Optik'
                      : CLINIC_DOCTORS.find((d) => d.id === selectedDoctorId)?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Nama Pasien:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 dark:text-stone-400">Lokasi Butik Klinik:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                    {CLINIC_INFO.address}, Senopati
                  </span>
                </div>
              </div>

              {/* What to bring */}
              <div className="max-w-md mx-auto p-4 bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-left text-xs text-teal-950 dark:text-teal-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                  Yang perlu dibawa saat kunjungan:
                </p>
                <ul className="list-disc pl-5 space-y-0.5 text-stone-600 dark:text-stone-400 text-[11px]">
                  <li>Kacamata atau kacamata hitam yang sedang Anda gunakan</li>
                  <li>Kartu fisik atau digital asuransi kesehatan (jika menggunakan asuransi)</li>
                  <li>Kemasan lensa kontak Anda (jika menjadwalkan evaluasi lensa kontak)</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                  <span>Unduh Acara Kalender (.ICS)</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
