import React, { useState } from 'react';
import {
  FrameProduct,
  FrameColor,
  LensType,
  LensIndexMaterial,
  LensCoating,
  PrescriptionDetails,
  CartItem,
} from '../types/optical';
import {
  LENS_OPTIONS,
  LENS_MATERIALS,
  AVAILABLE_COATINGS,
} from '../data/mockOpticalData';
import { GlassesFrameSvg } from './GlassesFrameSvg';
import { X, Check, Upload, HelpCircle, FileText } from 'lucide-react';

interface ProductDetailModalProps {
  product: FrameProduct | null;
  initialColor?: FrameColor;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenPdTool: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialColor,
  isOpen,
  onClose,
  onAddToCart,
  onOpenPdTool,
}) => {
  if (!isOpen || !product) return null;

  // Selected state
  const [selectedColor, setSelectedColor] = useState<FrameColor>(
    initialColor || product.colors[0]
  );
  const [selectedLensType, setSelectedLensType] = useState<LensType>('single-vision');
  const [selectedMaterial, setSelectedMaterial] = useState<LensIndexMaterial>('polycarbonate');
  const [selectedCoatings, setSelectedCoatings] = useState<LensCoating[]>([
    AVAILABLE_COATINGS[0], // Base AR included
  ]);

  // Prescription State
  const [rxMethod, setRxMethod] = useState<'manual' | 'upload' | 'clinic-records'>('manual');
  const [odSphere, setOdSphere] = useState('-1.75');
  const [odCylinder, setOdCylinder] = useState('-0.50');
  const [odAxis, setOdAxis] = useState('180');
  const [osSphere, setOsSphere] = useState('-2.00');
  const [osCylinder, setOsCylinder] = useState('-0.75');
  const [osAxis, setOsAxis] = useState('095');
  const [pdValue, setPdValue] = useState(63);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [doctorClinicName, setDoctorClinicName] = useState('Lumina Optical Willow Glen (On File)');

  // Active step in modal
  const [activeStep, setActiveStep] = useState<'frame-lenses' | 'prescription'>('frame-lenses');

  // Toggle coating
  const handleToggleCoating = (coating: LensCoating) => {
    if (coating.id === 'anti-reflective-base') return; // Cannot unselect standard AR
    const exists = selectedCoatings.some((c) => c.id === coating.id);
    if (exists) {
      setSelectedCoatings(selectedCoatings.filter((c) => c.id !== coating.id));
    } else {
      setSelectedCoatings([...selectedCoatings, coating]);
    }
  };

  // Pricing math
  const chosenLensOption = LENS_OPTIONS.find((l) => l.id === selectedLensType) || LENS_OPTIONS[0];
  const chosenMaterial = LENS_MATERIALS.find((m) => m.id === selectedMaterial) || LENS_MATERIALS[0];
  const coatingsTotal = selectedCoatings.reduce((sum, c) => sum + c.price, 0);

  const totalLensPrice = chosenLensOption.price + chosenMaterial.price + coatingsTotal;
  const grandTotal = product.basePrice + totalLensPrice;

  // File upload simulate
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleFinishAndAddToCart = () => {
    const rx: PrescriptionDetails = {
      odSphere,
      odCylinder,
      odAxis,
      osSphere,
      osCylinder,
      osAxis,
      pupillaryDistance: pdValue,
      rxMethod,
      uploadedFileName: rxMethod === 'upload' ? uploadedFileName : undefined,
      doctorName: rxMethod === 'clinic-records' ? doctorClinicName : undefined,
    };

    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      product,
      selectedColor,
      lensType: selectedLensType,
      lensMaterial: selectedMaterial,
      lensPrice: totalLensPrice,
      selectedCoatings,
      prescription: selectedLensType !== 'non-prescription' ? rx : undefined,
      totalPrice: grandTotal,
      quantity: 1,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white dark:bg-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col text-stone-900 dark:text-stone-100">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-3">
            <h2 id="modal-title" className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
              Customize {product.name}
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">
              · {selectedColor.name} · {product.material}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-stone-500 dark:text-stone-400 mr-2">Total</span>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                ${grandTotal}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Step Navigation Bar */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950 text-xs font-medium">
          <button
            onClick={() => setActiveStep('frame-lenses')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors cursor-pointer ${
              activeStep === 'frame-lenses'
                ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-semibold bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            1. Frame Color & Lens Options
          </button>
          <button
            onClick={() => setActiveStep('prescription')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors cursor-pointer ${
              activeStep === 'prescription'
                ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-semibold bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            2. Prescription & Pupillary Distance (PD)
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {activeStep === 'frame-lenses' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live Frame Preview & Color Swatches */}
              <div className="md:col-span-5 space-y-6 md:sticky md:top-0">
                <div className="bg-stone-50 dark:bg-stone-950 rounded-xl p-6 border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center min-h-[220px]">
                  <GlassesFrameSvg
                    shape={product.shape}
                    color={selectedColor}
                    className="w-full max-w-[280px]"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-xs font-medium text-stone-800 dark:text-stone-200">{selectedColor.name}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                      Lens: {product.dimensions.lensWidth}mm · Bridge: {product.dimensions.bridgeWidth}mm · Temple: {product.dimensions.templeLength}mm
                    </p>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                    Choose Acetate / Titanium Finish:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          selectedColor.id === color.id
                            ? 'border-teal-800 dark:border-teal-400 bg-teal-50/40 dark:bg-teal-950/40 font-medium'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-700 shadow-2xs shrink-0"
                            style={{
                              background: color.secondaryHex
                                ? `linear-gradient(135deg, ${color.hex} 0%, ${color.secondaryHex} 100%)`
                                : color.hex,
                            }}
                          />
                          <span className="text-stone-800 dark:text-stone-200">{color.name}</span>
                        </div>
                        {selectedColor.id === color.id && (
                          <Check className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frame Details */}
                <div className="space-y-1.5 pt-2 text-xs text-stone-600 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800">
                  <p className="font-semibold text-stone-800 dark:text-stone-200">Craftsmanship Details:</p>
                  <ul className="space-y-1 pl-4 list-disc text-stone-500 dark:text-stone-400">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Lens Configuration */}
              <div className="md:col-span-7 space-y-7">
                {/* 1. Lens Type */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                      Step A: Lens Vision Type
                    </label>
                    <span className="text-xs text-teal-800 dark:text-teal-400 font-medium">Doctor Verified</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {LENS_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedLensType(opt.id as LensType)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          selectedLensType === opt.id
                            ? 'border-teal-800 dark:border-teal-400 bg-teal-50/30 dark:bg-teal-950/40 ring-1 ring-teal-700 dark:ring-teal-400'
                            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                              {opt.name}
                            </span>
                            <span className="text-xs text-stone-500 dark:text-stone-400 block">
                              {opt.subtitle}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                            {opt.price === 0 ? 'Included' : `+$${opt.price}`}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Lens Material / Thickness Index */}
                {selectedLensType !== 'non-prescription' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                        Step B: Optical Thickness & Index
                      </label>
                      <span className="text-xs text-stone-500 dark:text-stone-400">Higher index = lighter & thinner</span>
                    </div>

                    <div className="space-y-2">
                      {LENS_MATERIALS.map((mat) => (
                        <div
                          key={mat.id}
                          onClick={() => setSelectedMaterial(mat.id as LensIndexMaterial)}
                          className={`p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                            selectedMaterial === mat.id
                              ? 'border-teal-800 dark:border-teal-400 bg-teal-50/30 dark:bg-teal-950/40'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-stone-900 dark:text-stone-100">{mat.name}</span>
                            <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                              {mat.price === 0 ? 'Standard ($0)' : `+$${mat.price}`}
                            </span>
                          </div>
                          <p className="text-stone-600 dark:text-stone-300 mt-0.5">{mat.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Lens Coatings */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 block">
                    Step C: Performance Coatings & Protection
                  </label>

                  <div className="space-y-2">
                    {AVAILABLE_COATINGS.map((coating) => {
                      const isSelected = selectedCoatings.some((c) => c.id === coating.id);
                      const isBase = coating.id === 'anti-reflective-base';

                      return (
                        <div
                          key={coating.id}
                          onClick={() => handleToggleCoating(coating)}
                          className={`p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-teal-800 dark:border-teal-400 bg-teal-50/20 dark:bg-teal-950/30'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              disabled={isBase}
                              onChange={() => {}}
                              className="mt-0.5 text-teal-800 rounded focus:ring-teal-700"
                            />
                            <div>
                              <span className="font-semibold text-stone-900 dark:text-stone-100">{coating.name}</span>
                              <p className="text-stone-600 dark:text-stone-300 mt-0.5">{coating.description}</p>
                            </div>
                          </div>

                          <span className="font-semibold text-stone-900 dark:text-stone-100 shrink-0 tabular-nums">
                            {coating.price === 0 ? 'Included' : `+$${coating.price}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Prescription & PD Entry */
            <div className="space-y-7 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Prescription & Pupillary Distance Details
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Provide your optical measurements so our clinical edging laboratory can center your lenses.
                </p>
              </div>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setRxMethod('manual')}
                  className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                    rxMethod === 'manual'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  Enter Rx Values
                </button>
                <button
                  onClick={() => setRxMethod('upload')}
                  className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                    rxMethod === 'upload'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  Upload Rx Photo
                </button>
                <button
                  onClick={() => setRxMethod('clinic-records')}
                  className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                    rxMethod === 'clinic-records'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  Use Clinic Records
                </button>
              </div>

              {rxMethod === 'manual' && (
                <div className="space-y-6">
                  {/* OD / OS Table */}
                  <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden text-xs">
                    <div className="grid grid-cols-4 bg-stone-100 dark:bg-stone-800 p-2.5 font-semibold text-stone-700 dark:text-stone-300 text-center">
                      <div className="text-left pl-2">Eye</div>
                      <div>Sphere (SPH)</div>
                      <div>Cylinder (CYL)</div>
                      <div>Axis</div>
                    </div>

                    {/* OD (Right Eye) */}
                    <div className="grid grid-cols-4 p-3 border-t border-stone-200 dark:border-stone-800 items-center gap-2 bg-white dark:bg-stone-900">
                      <div className="font-semibold text-stone-800 dark:text-stone-200 pl-2">
                        OD <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">(Right Eye)</span>
                      </div>
                      <input
                        type="text"
                        value={odSphere}
                        onChange={(e) => setOdSphere(e.target.value)}
                        placeholder="-1.75"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={odCylinder}
                        onChange={(e) => setOdCylinder(e.target.value)}
                        placeholder="-0.50"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={odAxis}
                        onChange={(e) => setOdAxis(e.target.value)}
                        placeholder="180"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                    </div>

                    {/* OS (Left Eye) */}
                    <div className="grid grid-cols-4 p-3 border-t border-stone-200 dark:border-stone-800 items-center gap-2 bg-stone-50/50 dark:bg-stone-900/60">
                      <div className="font-semibold text-stone-800 dark:text-stone-200 pl-2">
                        OS <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">(Left Eye)</span>
                      </div>
                      <input
                        type="text"
                        value={osSphere}
                        onChange={(e) => setOsSphere(e.target.value)}
                        placeholder="-2.00"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={osCylinder}
                        onChange={(e) => setOsCylinder(e.target.value)}
                        placeholder="-0.75"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={osAxis}
                        onChange={(e) => setOsAxis(e.target.value)}
                        placeholder="095"
                        className="p-1.5 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded text-center font-mono focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pupillary Distance (PD) Input */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        Pupillary Distance (PD in mm):
                      </label>
                      <button
                        type="button"
                        onClick={onOpenPdTool}
                        className="text-xs text-teal-800 dark:text-teal-400 hover:text-teal-950 dark:hover:text-teal-300 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>How to measure my PD?</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="52"
                        max="74"
                        value={pdValue}
                        onChange={(e) => setPdValue(Number(e.target.value))}
                        className="flex-1 accent-teal-800 dark:accent-teal-500 cursor-pointer"
                      />
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm w-16 text-right tabular-nums">
                        {pdValue} mm
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Standard adult single PD is usually between 58mm and 68mm. Average is 63mm.
                    </p>
                  </div>
                </div>
              )}

              {rxMethod === 'upload' && (
                <div className="p-6 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl text-center space-y-3 bg-stone-50 dark:bg-stone-950">
                  <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto shadow-2xs border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
                    <Upload className="w-5 h-5 text-teal-800 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      Upload your prescription slip, doctor slip, or photo
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Accepts JPG, PNG, or PDF up to 10MB
                    </p>
                  </div>

                  <input
                    type="file"
                    id="rx-upload-input"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="rx-upload-input"
                    className="inline-block px-4 py-2 text-xs font-medium bg-stone-900 dark:bg-teal-800 text-white rounded-lg cursor-pointer hover:bg-stone-800 dark:hover:bg-teal-700"
                  >
                    Select File
                  </label>

                  {uploadedFileName && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-teal-800 dark:text-teal-400 font-medium pt-2">
                      <FileText className="w-4 h-4" />
                      <span>{uploadedFileName} attached</span>
                    </div>
                  )}
                </div>
              )}

              {rxMethod === 'clinic-records' && (
                <div className="p-5 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-950 space-y-3 text-xs">
                  <p className="font-semibold text-stone-800 dark:text-stone-200">
                    Retrieve Prescription From Clinic Database:
                  </p>
                  <p className="text-stone-600 dark:text-stone-300">
                    If you have received an eye exam at Lumina Optical within the last 2 years, our optometrists will pull your verified digital refraction directly from your chart.
                  </p>
                  <div>
                    <label className="block text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                      Clinic / Patient Account Note:
                    </label>
                    <input
                      type="text"
                      value={doctorClinicName}
                      onChange={(e) => setDoctorClinicName(e.target.value)}
                      placeholder="Your Full Name or Patient Chart Number"
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between gap-4">
          {activeStep === 'frame-lenses' ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
              >
                Back to Catalog
              </button>
              <button
                onClick={() => setActiveStep('prescription')}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
              >
                Proceed to Prescription & PD (Step 2)
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveStep('frame-lenses')}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
              >
                ← Back to Lens Selection
              </button>
              <button
                onClick={handleFinishAndAddToCart}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-900 dark:bg-teal-700 hover:bg-teal-950 dark:hover:bg-teal-600 rounded-lg cursor-pointer shadow-xs"
              >
                Confirm & Add to Bag (${grandTotal})
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
