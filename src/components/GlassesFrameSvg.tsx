import React from 'react';
import { FrameShape, FrameColor } from '../types/optical';

interface GlassesFrameSvgProps {
  shape: FrameShape;
  color: FrameColor;
  className?: string;
  showLensReflection?: boolean;
}

export const GlassesFrameSvg: React.FC<GlassesFrameSvgProps> = ({
  shape,
  color,
  className = 'w-full h-auto',
  showLensReflection = true,
}) => {
  const primaryColor = color.hex;
  const secondaryColor = color.secondaryHex || color.hex;
  const isTortoise = color.id.includes('tortoise');
  const isTitanium = color.id.includes('gold') || color.id.includes('silver') || color.id.includes('titanium');
  const frameStrokeWidth = isTitanium ? 3.5 : 7;

  // Unique pattern ID based on color to prevent SVG collision
  const patternId = `tortoise-${color.id}-${shape}`;
  const gradientId = `grad-${color.id}-${shape}`;

  return (
    <svg
      viewBox="0 0 520 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft shadow under glasses */}
        <filter id="soft-drop" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.08" floodColor="#0f172a" />
        </filter>

        {/* Linear gradient for metallic or acetate depth */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="50%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </linearGradient>

        {/* Acetate Tortoiseshell pattern */}
        {isTortoise && (
          <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={primaryColor} />
            <circle cx="10" cy="12" r="7" fill={secondaryColor} opacity="0.85" />
            <circle cx="28" cy="26" r="9" fill="#2d1305" opacity="0.95" />
            <circle cx="34" cy="8" r="5" fill="#eab308" opacity="0.5" />
            <circle cx="8" cy="32" r="6" fill="#78350f" opacity="0.8" />
            <path d="M 18,2 Q 22,12 16,24" stroke="#1c0c04" strokeWidth="3" opacity="0.7" fill="none" />
          </pattern>
        )}

        {/* Anti-reflective lens sheen gradient */}
        <linearGradient id="lens-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#2dd4bf" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Group with subtle shadow */}
      <g filter="url(#soft-drop)">
        {/* Temple arms in background (folded or extending subtly backward) */}
        <g stroke={isTortoise ? `url(#${patternId})` : `url(#${gradientId})`} strokeWidth="4" strokeLinecap="round" opacity="0.45">
          <path d="M 62 105 C 40 85, 20 65, 12 55" />
          <path d="M 458 105 C 480 85, 500 65, 508 55" />
        </g>

        {/* Nose Pads (transparent silicone + metal stem) */}
        <g opacity="0.85">
          <ellipse cx="230" cy="120" rx="4" ry="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" transform="rotate(-15 230 120)" />
          <ellipse cx="290" cy="120" rx="4" ry="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" transform="rotate(15 290 120)" />
          <path d="M 233 114 L 244 105" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 287 114 L 276 105" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Bridge linking the two rims */}
        {renderBridge(shape, isTortoise ? `url(#${patternId})` : `url(#${gradientId})`, isTitanium)}

        {/* LENSES & RIMS according to shape */}
        {renderLensesAndRims(
          shape,
          isTortoise ? `url(#${patternId})` : `url(#${gradientId})`,
          frameStrokeWidth,
          showLensReflection,
          isTitanium
        )}

        {/* Hinge Rivets / Endpieces */}
        <g fill={isTitanium ? '#cbd5e1' : '#f1f5f9'} opacity="0.9">
          <circle cx="58" cy="104" r="2.2" />
          <circle cx="64" cy="104" r="2.2" />
          <circle cx="462" cy="104" r="2.2" />
          <circle cx="456" cy="104" r="2.2" />
        </g>
      </g>
    </svg>
  );
};

function renderBridge(shape: FrameShape, frameFill: string, isTitanium: boolean) {
  if (shape === 'aviator') {
    return (
      <g stroke={frameFill} strokeWidth={isTitanium ? 3 : 4} strokeLinecap="round" fill="none">
        {/* Aviator top brow bar */}
        <path d="M 200 80 Q 260 76 320 80" />
        {/* Aviator arched lower bridge */}
        <path d="M 226 102 Q 260 92 294 102" />
      </g>
    );
  }

  // Keyhole bridge for classic round / acetate or sleek arch for titanium
  return (
    <g stroke={frameFill} strokeWidth={isTitanium ? 3 : 5.5} strokeLinecap="round" fill="none">
      <path d="M 228 102 C 242 88, 278 88, 292 102" />
    </g>
  );
}

function renderLensesAndRims(
  shape: FrameShape,
  frameFill: string,
  strokeWidth: number,
  showReflection: boolean,
  isTitanium: boolean
) {
  switch (shape) {
    case 'round':
      return (
        <>
          {/* Left Lens & Rim */}
          <circle
            cx="150"
            cy="115"
            r="70"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 110 80 Q 150 65 190 90 L 175 140 Q 135 110 95 125 Z"
              fill="url(#lens-sheen)"
            />
          )}

          {/* Right Lens & Rim */}
          <circle
            cx="370"
            cy="115"
            r="70"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 330 80 Q 370 65 410 90 L 395 140 Q 355 110 315 125 Z"
              fill="url(#lens-sheen)"
            />
          )}
        </>
      );

    case 'square':
      return (
        <>
          {/* Left Lens & Rim */}
          <rect
            x="76"
            y="54"
            width="150"
            height="116"
            rx="22"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 90 70 L 190 70 L 170 125 L 90 125 Z"
              fill="url(#lens-sheen)"
              opacity="0.8"
            />
          )}

          {/* Right Lens & Rim */}
          <rect
            x="294"
            y="54"
            width="150"
            height="116"
            rx="22"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 308 70 L 408 70 L 388 125 L 308 125 Z"
              fill="url(#lens-sheen)"
              opacity="0.8"
            />
          )}
        </>
      );

    case 'cat-eye':
      return (
        <>
          {/* Left Lens & Rim with uplifted outer brow */}
          <path
            d="M 68 84 C 95 62, 185 70, 225 90 C 228 140, 185 168, 140 166 C 90 164, 62 135, 68 84 Z"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth + 1}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 88 88 Q 140 76 195 95 L 180 135 Q 120 120 88 88 Z"
              fill="url(#lens-sheen)"
            />
          )}

          {/* Right Lens & Rim */}
          <path
            d="M 452 84 C 425 62, 335 70, 295 90 C 292 140, 335 168, 380 166 C 430 164, 458 135, 452 84 Z"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth + 1}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 432 88 Q 380 76 325 95 L 340 135 Q 400 120 432 88 Z"
              fill="url(#lens-sheen)"
            />
          )}
        </>
      );

    case 'aviator':
      return (
        <>
          {/* Tear-drop Aviator Left Rim */}
          <path
            d="M 76 80 C 130 74, 205 78, 222 92 C 226 138, 198 178, 150 178 C 100 178, 70 144, 76 80 Z"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 96 90 Q 150 82 205 95 L 185 145 Q 130 130 96 90 Z"
              fill="url(#lens-sheen)"
            />
          )}

          {/* Tear-drop Aviator Right Rim */}
          <path
            d="M 444 80 C 390 74, 315 78, 298 92 C 294 138, 322 178, 370 178 C 420 178, 450 144, 444 80 Z"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 424 90 Q 370 82 315 95 L 335 145 Q 390 130 424 90 Z"
              fill="url(#lens-sheen)"
            />
          )}
        </>
      );

    case 'geometric':
      return (
        <>
          {/* Left Octagon/Hexagon */}
          <polygon
            points="100,60 190,60 225,95 215,150 160,172 105,160 80,120 85,85"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 105 72 L 185 72 L 195 110 L 98 110 Z"
              fill="url(#lens-sheen)"
            />
          )}

          {/* Right Octagon/Hexagon */}
          <polygon
            points="420,60 330,60 295,95 305,150 360,172 415,160 440,120 435,85"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {showReflection && (
            <path
              d="M 415 72 L 335 72 L 325 110 L 422 110 Z"
              fill="url(#lens-sheen)"
            />
          )}
        </>
      );

    case 'oval':
    default:
      return (
        <>
          <ellipse
            cx="150"
            cy="115"
            rx="74"
            ry="55"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 100 95 Q 150 80 195 100 L 180 135 Q 130 115 100 95 Z"
              fill="url(#lens-sheen)"
            />
          )}

          <ellipse
            cx="370"
            cy="115"
            rx="74"
            ry="55"
            fill="#f1f5f9"
            fillOpacity="0.4"
            stroke={frameFill}
            strokeWidth={strokeWidth}
          />
          {showReflection && (
            <path
              d="M 320 95 Q 370 80 415 100 L 400 135 Q 350 115 320 95 Z"
              fill="url(#lens-sheen)"
            />
          )}
        </>
      );
  }
}
