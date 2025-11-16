import React from 'react';

type Props = {
  value: 9 | 18;
  onChange: (value: 9 | 18) => void;
};

export default function HoleSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        type="button"
        onClick={() => onChange(9)}
        aria-pressed={value === 9}
        style={{
          padding: '8px 12px',
          background: value === 9 ? '#0B76FF' : '#EEE',
          color: value === 9 ? 'white' : 'black',
          borderRadius: 6,
        }}
      >
        9 holes
      </button>

      <button
        type="button"
        onClick={() => onChange(18)}
        aria-pressed={value === 18}
        style={{
          padding: '8px 12px',
          background: value === 18 ? '#0B76FF' : '#EEE',
          color: value === 18 ? 'white' : 'black',
          borderRadius: 6,
        }}
      >
        18 holes
      </button>
    </div>
  );
}
