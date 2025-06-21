"use client";
import React, { useState } from 'react';

interface Animal {
  emoji: string;
  name: string;
  title: string;
  personality: string;
  therapy: string;
  specialty: string;
  signature: string;
}

const animals: Animal[] = [
  {
    emoji: '🐼',
    name: 'Panda',
    title: 'The Stoic Listener',
    personality: 'Calm, grounded, serene',
    therapy: 'Quiet, supportive presence who lets you speak freely and only offers deep, reflective feedback',
    specialty: 'Overthinking, emotional burnout, inner peace',
    signature: '“Stillness reveals what noise hides.”',
  },
  {
    emoji: '🦁',
    name: 'Lion',
    title: 'The Proud Motivator',
    personality: 'Bold, assertive, dignified',
    therapy: 'Direct and empowering; encourages you to own your voice and stand tall',
    specialty: 'Self-confidence, imposter syndrome, leadership stress',
    signature: '“Remember who you are.”',
  },
  {
    emoji: '🐱',
    name: 'Cat',
    title: 'The Relaxed Realist',
    personality: 'Chill, slightly aloof, emotionally intelligent',
    therapy: "Casual and nonjudgmental; helps you relax and not take life too seriously",
    specialty: 'Social anxiety, perfectionism, burnout from overworking',
    signature: "You don't need to have it all together — just land on your feet.",
  },
  {
    emoji: '🦊',
    name: 'Fox',
    title: 'The Clever Strategist',
    personality: 'Witty, smart, adaptable',
    therapy: 'Creative solutions and perspective shifts; always finds a workaround',
    specialty: 'Decision-making stress, masking emotions, self-sabotage',
    signature: "There's always a clever way forward.",
  },
  {
    emoji: '🐘',
    name: 'Elephant',
    title: 'The Gentle Healer',
    personality: 'Wise, empathetic, deeply thoughtful',
    therapy: 'Uses stories, metaphors, and long-term perspective to heal emotional wounds',
    specialty: 'Grief, trauma, long-term emotional pain',
    signature: 'Even the heaviest memories can be carried with grace.',
  },
];

export default function AnimalTherapistPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedAnimal = animals[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  const onSelectButtonClick = () => {
    // Example: redirect to a page based on animal name
    window.location.href = `/${selectedAnimal.name.toLowerCase()}-selected.html`;
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f6f8fa;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        h1 {
          margin-top: 40px;
          font-size: 2.2rem;
          color: #333;
        }
        .animal-list {
          display: flex;
          gap: 32px;
          margin: 40px 0 24px 0;
          flex-wrap: wrap;
          justify-content: center;
        }
        .animal-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          padding: 24px 18px 16px 18px;
          text-align: center;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          width: 140px;
          border: 2px solid transparent;
        }
        .animal-card.selected {
          border: 2px solid #4f8cff;
          box-shadow: 0 4px 16px rgba(79,140,255,0.13);
          transform: translateY(-4px) scale(1.04);
        }
        .animal-emoji {
          font-size: 2.8rem;
          margin-bottom: 8px;
        }
        .animal-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: #222;
        }
        .animal-trait {
          font-size: 0.98rem;
          color: #666;
          margin-bottom: 0;
        }
        .details {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          padding: 32px 28px;
          max-width: 420px;
          margin-top: 18px;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 0.5s;
        }
        .details-emoji {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }
        .details-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: #2a2a2a;
        }
        .details-section {
          margin-bottom: 8px;
          color: #444;
          font-size: 1.01rem;
        }
        .signature {
          margin-top: 12px;
          font-style: italic;
          color: #4f8cff;
          font-size: 1.08rem;
          border-left: 3px solid #4f8cff;
          padding-left: 12px;
        }
        .select-btn {
          margin-top: 24px;
          padding: 12px 32px;
          background: #4f8cff;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.08rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79,140,255,0.10);
          transition: background 0.18s, transform 0.18s;
          outline: none;
        }
        .select-btn:hover, .select-btn:focus {
          background: #2563eb;
          transform: translateY(-2px) scale(1.03);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 700px) {
          .animal-list { gap: 16px; }
          .animal-card { width: 110px; padding: 16px 8px 10px 8px; }
          .details { padding: 18px 8px; }
        }
      `}</style>

      <h1>Pick Your Animal Therapist</h1>

      <div className="animal-list" role="list">
        {animals.map((animal, idx) => (
          <div
            key={animal.name}
            className={`animal-card ${selectedIdx === idx ? 'selected' : ''}`}
            onClick={() => handleSelect(idx)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(idx);
              }
            }}
          >
            <div className="animal-emoji" aria-label={animal.name}>
              {animal.emoji}
            </div>
            <div className="animal-name">{animal.name}</div>
            <div className="animal-trait">{animal.title}</div>
          </div>
        ))}
      </div>

      <div className="details" aria-live="polite">
        <div className="details-emoji">{selectedAnimal.emoji}</div>
        <div className="details-title">
          {selectedAnimal.name} – {selectedAnimal.title}
        </div>
        <div className="details-section">
          <b>Personality:</b> {selectedAnimal.personality}
        </div>
        <div className="details-section">
          <b>Therapy Style:</b> {selectedAnimal.therapy}
        </div>
        <div className="details-section">
          <b>Specialty:</b> {selectedAnimal.specialty}
        </div>
        <div className="signature">{selectedAnimal.signature}</div>
        <button className="select-btn" onClick={onSelectButtonClick}>
          Select
        </button>
      </div>
    </>
  );
}
