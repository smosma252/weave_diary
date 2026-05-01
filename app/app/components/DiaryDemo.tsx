'use client';

import { useEffect, useRef, useState } from 'react';

type Tab = 'log' | 'story' | 'adlib';

function LogContent() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h4 className="font-headline-md text-on-surface">Morning</h4>
          <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
        </div>
        <ul className="space-y-4 font-headline-md italic text-on-surface-variant/80 list-disc pl-5 marker:text-amber-600">
          <li className="reveal-line">5 km run. Clear sky, 14°C. First warm morning this year. Pace 5:38/km avg.</li>
          <li className="reveal-line">Cherry blossoms starting to open along the river. Took 3 photos.</li>
          <li className="reveal-line">Picked up dry cleaning on the way home. Checked off 2 Todoist tasks before 9 AM.</li>
        </ul>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h4 className="font-headline-md text-on-surface">Midday</h4>
          <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
        </div>
        <ul className="space-y-4 font-headline-md italic text-on-surface-variant/80 list-disc pl-5 marker:text-amber-600">
          <li className="reveal-line">
            Caught up on Slack. Replied to 4 threads in{' '}
            <span className="px-2 py-0.5 bg-surface-variant rounded text-xs not-italic">#team</span>, shared a link in{' '}
            <span className="px-2 py-0.5 bg-surface-variant rounded text-xs not-italic">#random</span>.
          </li>
          <li className="reveal-line">Lunch with Mika (Google Calendar, 12:00). Tried the new Thai place. Would go again.</li>
          <li className="reveal-line">Posted a photo from lunch on Bluesky. 8 likes.</li>
        </ul>
      </div>
    </>
  );
}

function StoryContent() {
  return (
    <div className="space-y-6">
      <p className="font-headline-md italic text-on-surface-variant/80 leading-relaxed reveal-line">
        The rain started as a whisper against the windowpane, a gentle interruption to the morning&apos;s silence. I found myself watching the droplets race, each trail a tiny history of momentum and gravity.
      </p>
      <p className="font-headline-md italic text-on-surface-variant/80 leading-relaxed reveal-line">
        By noon, the coffee was cold but the thoughts were warm. There is a specific kind of productivity that only happens when the world outside feels unreachable. Today, I didn&apos;t just work; I lived within the lines of my own narrative.
      </p>
    </div>
  );
}

function AdlibContent() {
  return (
    <div className="space-y-6">
      <p className="font-headline-md italic text-on-surface-variant/80 reveal-line">
        Blue sky. Cold air. Coffee first. Slack is too loud today. Why is everyone shouting in caps? Need more plants in the office. The monstera is looking sad. Reminder: Water the green things. Maybe a walk at 3?
      </p>
      <p className="font-headline-md italic text-on-surface-variant/80 reveal-line">
        Idea: What if the app had a &lsquo;darker&rsquo; dark mode? Like, ink on charcoal. Met with the team. Good energy. Ready for the weekend.
      </p>
    </div>
  );
}

const tabMeta: Record<Tab, { title: string; tags: string[] }> = {
  log:   { title: 'Saturday, March 7, 2026', tags: ['running', 'friends'] },
  story: { title: 'The Rain on the Glass',   tags: ['contemplative', 'writing'] },
  adlib: { title: 'Stream of Consciousness', tags: ['raw', 'unfiltered'] },
};

export default function DiaryDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('log');
  const [visible, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll<HTMLElement>('.reveal-line');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setVisible(true);
    }, 300);
  };

  const { title, tags } = tabMeta[activeTab];

  return (
    <section className="py-24 bg-surface-container-lowest/50 rounded-[3rem] px-8 border border-outline-variant/10">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">What your diary looks like</h2>
          <p className="text-body-md text-on-surface-variant">Choose the format that resonates with your rhythm.</p>
        </div>

        <div className="inline-flex bg-surface-container p-1 rounded-full border border-outline-variant/20">
          {(['log', 'story', 'adlib'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={
                activeTab === tab
                  ? 'px-8 py-2 rounded-full bg-on-surface text-surface text-label-md font-semibold transition-all'
                  : 'px-8 py-2 rounded-full text-on-surface-variant text-label-md hover:text-on-surface transition-all'
              }
            >
              {tab === 'log' ? 'Log' : tab === 'story' ? 'Story' : 'Ad-lib'}
            </button>
          ))}
        </div>

        <div
          className="relative mt-12 text-left bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden animate-floating"
          style={{ transition: 'opacity 0.3s ease', opacity: visible ? 1 : 0 }}
        >
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 className="font-headline-md text-on-surface">{title}</h3>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-surface-variant/50 rounded-full text-[10px] uppercase text-on-surface-variant tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div ref={contentRef} className="p-10 space-y-12">
            {activeTab === 'log'   && <LogContent />}
            {activeTab === 'story' && <StoryContent />}
            {activeTab === 'adlib' && <AdlibContent />}
          </div>
        </div>
      </div>
    </section>
  );
}
