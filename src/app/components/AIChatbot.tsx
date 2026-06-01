'use client';

import { useState, useRef, useEffect } from 'react';

// ── DATA ────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { name: 'Chicken Patty', cal: 320, gf: false, veg: false, spicy: true, contains: ['Gluten', 'Egg'], desc: 'Crispy puff pastry filled with spiced chicken mince' },
  { name: 'Cream Roll', cal: 280, gf: false, veg: true, spicy: false, contains: ['Gluten', 'Dairy'], desc: 'Flaky pastry rolled with fresh whipped cream' },
  { name: 'Chocolate Cake (slice)', cal: 420, gf: false, veg: true, spicy: false, contains: ['Gluten', 'Dairy', 'Egg'], desc: 'Rich dark chocolate sponge with ganache' },
  { name: 'Fruit Custard', cal: 210, gf: true, veg: true, spicy: false, contains: ['Dairy', 'Egg'], desc: 'Seasonal fruits in creamy vanilla custard' },
  { name: 'Shahi Tukda', cal: 380, gf: false, veg: true, spicy: false, contains: ['Gluten', 'Dairy', 'Nut'], desc: 'Fried bread soaked in saffron rabri' },
  { name: 'Almond Croissant', cal: 350, gf: false, veg: true, spicy: false, contains: ['Gluten', 'Dairy', 'Nut'], desc: 'Buttery croissant with almond frangipane' },
  { name: 'Samosa (1 pc)', cal: 180, gf: false, veg: false, spicy: true, contains: ['Gluten'], desc: 'Crispy pastry with spiced potato & meat filling' },
  { name: 'Gulab Jamun (2 pc)', cal: 290, gf: true, veg: true, spicy: false, contains: ['Dairy', 'Nut'], desc: 'Soft milk-solid dumplings in rose sugar syrup' },
  { name: 'Cheese Sandwich', cal: 310, gf: false, veg: true, spicy: false, contains: ['Gluten', 'Dairy'], desc: 'Grilled sandwich with melted cheddar & herbs' },
  { name: 'Cold Coffee', cal: 190, gf: true, veg: true, spicy: false, contains: ['Dairy'], desc: 'Blended iced coffee with sweetened cream' },
];

const PLATTERS: Record<string, { item: string; qty: string; basePrice: number }[]> = {
  birthday: [
    { item: 'Chocolate Cake (full)', qty: '1', basePrice: 1800 },
    { item: 'Cream Rolls', qty: '20 pcs', basePrice: 800 },
    { item: 'Fruit Custard bowls', qty: '15 pcs', basePrice: 750 },
    { item: 'Almond Croissants', qty: '12 pcs', basePrice: 960 },
    { item: 'Cold Coffee', qty: '10 cups', basePrice: 1200 },
  ],
  office: [
    { item: 'Chicken Patties', qty: '30 pcs', basePrice: 1500 },
    { item: 'Cheese Sandwiches', qty: '20 pcs', basePrice: 1200 },
    { item: 'Samosas', qty: '30 pcs', basePrice: 900 },
    { item: 'Cream Rolls', qty: '15 pcs', basePrice: 600 },
    { item: 'Tea / Coffee', qty: '20 cups', basePrice: 800 },
  ],
  eid: [
    { item: 'Shahi Tukda', qty: '20 pcs', basePrice: 1600 },
    { item: 'Gulab Jamun', qty: '30 pcs', basePrice: 900 },
    { item: 'Fruit Custard', qty: '20 pcs', basePrice: 1000 },
    { item: 'Almond Croissants', qty: '15 pcs', basePrice: 1200 },
    { item: 'Chocolate Cake slices', qty: '20 pcs', basePrice: 1400 },
  ],
  family: [
    { item: 'Chicken Patties', qty: '20 pcs', basePrice: 1000 },
    { item: 'Cream Rolls', qty: '15 pcs', basePrice: 600 },
    { item: 'Shahi Tukda', qty: '12 pcs', basePrice: 960 },
    { item: 'Gulab Jamun', qty: '20 pcs', basePrice: 600 },
    { item: 'Cold Coffee', qty: '8 cups', basePrice: 960 },
  ],
};

const BOT_ANSWERS: Record<string, string> = {
  location: 'We are located at <b>Bhalwal, Sargodha</b>. <a href="https://www.google.com/maps/place/Saqafat+Bakery+%26+Cafe/@32.0684797,72.6866995,17z" target="_blank" rel="noopener noreferrer" style="color:#d89a5b">Open in Google Maps →</a>',
  hours: 'We are open <b>daily 8:00 AM – 11:00 PM</b>. On Fridays we open at 2:00 PM after Jumu\'ah prayers.',
  order: 'Order through our <b>Order page</b> on this website, or message us on WhatsApp. We offer dine-in, takeaway, and delivery!',
  delivery: 'Yes! We deliver within Bhalwal & nearby areas. Charges depend on distance. Order via website or WhatsApp.',
  price: 'Prices start from <b>Rs. 80</b> (Samosa) up to <b>Rs. 3,500+</b> for full cakes. See our Menu page for the full price list.',
  popular: 'Our bestsellers are 🤖<b>Cream Rolls</b>, 🥟 <b>Chicken Patties</b>, 🍮 <b>Shahi Tukda</b>, and our <b>Chocolate Cake</b>. The Cream Roll is a crowd favourite!',
  catering: 'Yes, we cater for weddings, corporate events & family gatherings! Use the <b>Platter Builder</b> tab to see package ideas, then WhatsApp us to finalise.',
  halal: 'All our products are <b>100% Halal</b>. We use only certified halal meat and ingredients.',
  custom: 'Yes! Custom cakes with 48 hours notice. Share the design, flavour, size, and occasion on WhatsApp and we\'ll make it happen.',
};

const QUICK_QUESTIONS = [
  { label: '📍 Location & hours', key: 'location' },
  { label: ' Do you deliver?', key: 'delivery' },
  { label: ' Most popular items', key: 'popular' },
  { label: ' Custom cakes?', key: 'custom' },
  { label: ' Price range', key: 'price' },
  { label: ' Is food Halal?', key: 'halal' },
];

const OCCASIONS = [
  { key: 'birthday', icon: '🎂', label: 'Birthday' },
  { key: 'office', icon: '💼', label: 'Office Party' },
  { key: 'eid', icon: '🌙', label: 'Eid Gathering' },
  { key: 'family', icon: '👨‍👩‍👧', label: 'Family Dinner' },
];

// ── TYPES ───────────────────────────────────────────────────────────
interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  showQuick?: boolean;
  time: string;
}

type Tab = 'chat' | 'platter' | 'calorie';

// ── HELPERS ─────────────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('location') || t.includes('where') || t.includes('address') || t.includes('map')) return BOT_ANSWERS.location;
  if (t.includes('hour') || t.includes('open') || t.includes('close') || t.includes('time')) return BOT_ANSWERS.hours;
  if (t.includes('deliver')) return BOT_ANSWERS.delivery;
  if (t.includes('order') || t.includes('buy')) return BOT_ANSWERS.order;
  if (t.includes('price') || t.includes('cost') || t.includes('how much') || t.includes('rate')) return BOT_ANSWERS.price;
  if (t.includes('popular') || t.includes('best') || t.includes('recommend') || t.includes('famous')) return BOT_ANSWERS.popular;
  if (t.includes('cater') || t.includes('event') || t.includes('wedding') || t.includes('party')) return BOT_ANSWERS.catering;
  if (t.includes('halal') || t.includes('pork') || t.includes('alcohol')) return BOT_ANSWERS.halal;
  if (t.includes('custom') || t.includes('cake') || t.includes('design')) return BOT_ANSWERS.custom;
  if (t.includes('gluten') || t.includes('allerg') || t.includes('calorie') || t.includes('ingredient')) return 'Check the <b>Ingredients tab</b> above to search any item for calories, allergens, and dietary info!';
  if (t.includes('platter') || t.includes('bulk') || t.includes('package')) return 'Use our <b>Platter Builder tab</b> — pick your occasion and number of guests for a full package suggestion!';
  return "Thanks for your message! For detailed queries our team is on WhatsApp. You can also browse our Menu or use the Platter Builder & Ingredients tabs above 😊";
}

// ── COMPONENT ───────────────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [guests, setGuests] = useState(10);
  const [platterResult, setPlatterResult] = useState<{ item: string; qty: string; price: number }[] | null>(null);
  const [search, setSearch] = useState('');
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 1, type: 'bot', showQuick: true,
        text: 'Assalam-o-Alaikum! Welcome to <b>Saqafat Bakery & Cafe</b>. I can answer menu questions, help find our location, and assist with orders. How can I help?',
        time: getTime(),
      }]);
    }
  }, [open]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const addUserMsg = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text, time: getTime() }]);
  };

  const addBotMsg = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, time: getTime() }]);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addUserMsg(text);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBotMsg(getReply(text));
    }, 600 + Math.random() * 400);
  };

  const buildPlatter = () => {
    if (!occasion) return;
    const mult = Math.max(1, Math.round(guests / 10));
    const result = PLATTERS[occasion].map(p => ({
      item: p.item, qty: p.qty, price: p.basePrice * mult,
    }));
    setPlatterResult(result);
  };

  const total = platterResult?.reduce((s, i) => s + i.price, 0) ?? 0;

  const filteredMenu = search
    ? MENU_ITEMS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    : MENU_ITEMS;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

        .saq-chatbot * { box-sizing: border-box; margin: 0; padding: 0; }

        .saq-fab {
          position: fixed; bottom: 24px; right: 24px;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, #d89a5b, #c4813f);
          border: none; cursor: pointer; z-index: 999;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(216,154,91,0.45);
          font-size: 24px; transition: transform 0.25s;
        }
        .saq-fab:hover { transform: scale(1.08); }

        .saq-window {
          position: fixed; bottom: 94px; right: 44px;
          width: 420px; height: 500px;
          background: #4d270d;
          border: 4px solid #d89a5ba3;
          border-radius: 20px;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          z-index: 998;
          font-family: 'DM Sans', sans-serif;
          animation: saqSlideUp 0.28s ease;
        }
        @keyframes saqSlideUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .saq-header {
          background: #2a1a12;
          border-bottom: 1px solid rgba(216,154,91,0.18);
          padding: 12px 16px;
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .saq-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg,#d89a5b,#c4813f);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .saq-hname { font-size: 13px; font-weight: 500; color: #faf0e4; }
        .saq-hstatus { font-size: 10px; color: #4ade80; display:flex; align-items:center; gap:4px; }
        .saq-hstatus::before { content:''; width:6px; height:6px; border-radius:50%; background:#4ade80; display:inline-block; }
        .saq-close { margin-left:auto; background:none; border:none; color:rgba(216,154,91,0.6); cursor:pointer; font-size:16px; padding:2px; transition:color 0.2s; }
        .saq-close:hover { color:#d89a5b; }

        .saq-tabs {
          display: flex; background: #2a1a12;
          border-bottom: 1px solid rgba(216,154,91,0.15);
          flex-shrink: 0;
        }
        .saq-tab {
          flex: 1; padding: 8px 4px; text-align: center;
          font-size: 9px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(250,240,228,0.45);
          cursor: pointer; border-bottom: 2px solid transparent;
          transition: all 0.2s; background: none; border-top: none;
          border-left: none; border-right: none;
        }
        .saq-tab.active { color: #d89a5b; border-bottom-color: #d89a5b; }

        .saq-msgs {
          flex: 1; overflow-y: auto; padding: 14px 12px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .saq-msgs::-webkit-scrollbar { width: 3px; }
        .saq-msgs::-webkit-scrollbar-thumb { background: rgba(216,154,91,0.25); border-radius:3px; }

        .saq-msg { display: flex; flex-direction: column; gap: 3px; max-width: 85%; }
        .saq-msg.bot { align-self: flex-start; }
        .saq-msg.user { align-self: flex-end; }
        .saq-bubble {
          padding: 9px 13px; border-radius: 14px;
          font-size: 12.5px; line-height: 1.55;
        }
        .saq-msg.bot .saq-bubble {
          background: #2a1a12; border: 1px solid rgba(216,154,91,0.2);
          color: #faf0e4; border-bottom-left-radius: 4px;
        }
        .saq-msg.user .saq-bubble {
          background: linear-gradient(135deg,#d89a5b,#c4813f);
          color: #1a0e0a; font-weight: 500; border-bottom-right-radius: 4px;
        }
        .saq-msg.bot .saq-bubble a { color: #d89a5b; }
        .saq-time { font-size: 9px; color: rgba(250,240,228,0.35); padding: 0 3px; }
        .saq-msg.user .saq-time { align-self: flex-end; }

        .saq-quick { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
        .saq-qbtn {
          padding: 5px 10px; border-radius: 999px;
          border: 1px solid rgba(216,154,91,0.28);
          background: rgba(216,154,91,0.06);
          color: #d89a5b; font-size: 10px; cursor: pointer;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .saq-qbtn:hover { background: rgba(216,154,91,0.15); border-color: #d89a5b; }

        .saq-typing {
          align-self: flex-start;
          background: #2a1a12; border: 1px solid rgba(216,154,91,0.2);
          border-radius: 14px; border-bottom-left-radius: 4px;
          padding: 10px 14px; display: flex; gap: 4px; align-items: center;
        }
        .saq-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #d89a5b; opacity: 0.4;
          animation: saqBounce 1.2s infinite;
        }
        .saq-dot:nth-child(2) { animation-delay: 0.2s; }
        .saq-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes saqBounce {
          0%,60%,100% { transform:translateY(0); opacity:0.4; }
          30% { transform:translateY(-5px); opacity:1; }
        }

        .saq-input-bar {
          padding: 10px 12px; background: #2a1a12;
          border-top: 1px solid rgba(216,154,91,0.15);
          display: flex; gap: 8px; align-items: center; flex-shrink: 0;
        }
        .saq-inp {
          flex: 1; background: #3a2418;
          border: 1px solid rgba(216,154,91,0.2);
          border-radius: 999px; padding: 8px 14px;
          color: #faf0e4; font-size: 12px; outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .saq-inp::placeholder { color: rgba(250,240,228,0.3); }
        .saq-inp:focus { border-color: rgba(216,154,91,0.6); }
        .saq-send {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg,#d89a5b,#c4813f);
          border: none; cursor: pointer; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          color: #1a0e0a; flex-shrink: 0; transition: transform 0.2s;
        }
        .saq-send:hover { transform: scale(1.08); }

        .saq-panel {
          flex: 1; overflow-y: auto; padding: 14px 12px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .saq-panel::-webkit-scrollbar { width: 3px; }
        .saq-panel::-webkit-scrollbar-thumb { background: rgba(216,154,91,0.25); border-radius:3px; }

        .saq-plabel { font-size: 11px; color: rgba(250,240,228,0.45); margin-bottom: 2px; }
        .saq-occ-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
        .saq-occ {
          padding: 11px 8px; border-radius: 12px; text-align: center;
          border: 1px solid rgba(216,154,91,0.2); background: #2a1a12;
          cursor: pointer; transition: all 0.2s;
        }
        .saq-occ:hover { border-color: #d89a5b; background: rgba(216,154,91,0.08); }
        .saq-occ.selected { border-color: #d89a5b; background: rgba(216,154,91,0.15); }
        .saq-occ .icon { font-size: 20px; margin-bottom: 3px; }
        .saq-occ .lbl { font-size: 11px; font-weight: 500; color: #faf0e4; }

        .saq-slider-row { display: flex; align-items: center; gap: 10px; }
        .saq-slider-row input[type=range] { flex: 1; accent-color: #d89a5b; }
        .saq-slider-val { font-size: 14px; font-weight: 500; color: #d89a5b; min-width: 20px; }

        .saq-build-btn {
          padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(216,154,91,0.35);
          background: rgba(216,154,91,0.1); color: #d89a5b;
          font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; align-self: flex-start;
        }
        .saq-build-btn:hover { background: rgba(216,154,91,0.2); border-color: #d89a5b; }

        .saq-result {
          background: #2a1a12; border: 1px solid rgba(216,154,91,0.2);
          border-radius: 12px; padding: 12px;
        }
        .saq-res-title { font-size: 12px; font-weight: 500; color: #d89a5b; margin-bottom: 8px; }
        .saq-res-row {
          display: flex; justify-content: space-between;
          padding: 6px 0; border-bottom: 1px solid rgba(216,154,91,0.08);
          font-size: 11.5px; color: #faf0e4;
        }
        .saq-res-row:last-of-type { border-bottom: none; }
        .saq-res-price { color: #d89a5b; font-weight: 500; }
        .saq-res-total {
          display: flex; justify-content: space-between;
          padding-top: 8px; margin-top: 4px;
          border-top: 1px solid rgba(216,154,91,0.2);
          font-size: 13px; font-weight: 500; color: #d89a5b;
        }
        .saq-wa-btn {
          margin-top: 10px; width: 100%; padding: 9px;
          background: #25D366; border: none; border-radius: 9px;
          color: white; font-size: 11px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s;
        }
        .saq-wa-btn:hover { opacity: 0.88; }

        .saq-search-wrap { position: relative; }
        .saq-search-wrap input {
          width: 100%; padding: 9px 12px 9px 34px;
          background: #2a1a12; border: 1px solid rgba(216,154,91,0.2);
          border-radius: 10px; color: #faf0e4; font-size: 12px;
          outline: none; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .saq-search-wrap input:focus { border-color: rgba(216,154,91,0.6); }
        .saq-search-wrap input::placeholder { color: rgba(250,240,228,0.3); }
        .saq-search-icon {
          position: absolute; left: 10px; top: 50%;
          transform: translateY(-50%); color: rgba(250,240,228,0.35); font-size: 14px;
        }
        .saq-item-card {
          background: #2a1a12; border: 1px solid rgba(216,154,91,0.18);
          border-radius: 11px; padding: 11px 12px;
        }
        .saq-item-name { font-size: 12.5px; font-weight: 500; color: #faf0e4; margin-bottom: 3px; }
        .saq-item-desc { font-size: 10.5px; color: rgba(250,240,228,0.45); margin-bottom: 7px; }
        .saq-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .saq-tag {
          padding: 2px 8px; border-radius: 999px; font-size: 9.5px; font-weight: 500;
        }
        .saq-tag.cal { background: rgba(216,154,91,0.15); color: #d89a5b; }
        .saq-tag.good { background: rgba(74,222,128,0.12); color: #4ade80; }
        .saq-tag.bad  { background: rgba(248,113,113,0.12); color: #f87171; }
        .saq-tag.info { background: rgba(250,240,228,0.07); color: rgba(250,240,228,0.5); }

        @media (max-width: 400px) {
          .saq-window { width: calc(100vw - 20px); right: 10px; bottom: 80px; }
        }
      `}</style>

      <div className="saq-chatbot">
        {/* FAB */}
        <button className="saq-fab" onClick={() => setOpen(o => !o)} aria-label="Open AI Assistant">
          {open ? '✕' : '🤖'}
        </button>

        {/* WINDOW */}
        {open && (
          <div className="saq-window" role="dialog" aria-label="Saqafat AI Assistant">
            {/* Header */}
            <div className="saq-header">
              <div className="saq-avatar">🤖</div>
              <div>
                <div className="saq-hname">Saqafat AI Assistant</div>
                <div className="saq-hstatus">Online — responds instantly</div>
              </div>
              <button className="saq-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            {/* Tabs */}
            <div className="saq-tabs">
              {(['chat', 'platter', 'calorie'] as Tab[]).map(t => (
                <button key={t} className={`saq-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'chat' ? ' Chat' : t === 'platter' ? ' Platter' : ' Ingredients'}
                </button>
              ))}
            </div>

            {/* CHAT TAB */}
            {tab === 'chat' && (
              <>
                <div className="saq-msgs">
                  {messages.map(m => (
                    <div key={m.id} className={`saq-msg ${m.type}`}>
                      <div className="saq-bubble" dangerouslySetInnerHTML={{ __html: m.text }} />
                      {m.showQuick && (
                        <div className="saq-quick">
                          {QUICK_QUESTIONS.map(q => (
                            <button key={q.key} className="saq-qbtn" onClick={() => sendMessage(q.label)}>
                              {q.label}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="saq-time">{m.time}</div>
                    </div>
                  ))}
                  {typing && (
                    <div className="saq-typing">
                      <div className="saq-dot" /><div className="saq-dot" /><div className="saq-dot" />
                    </div>
                  )}
                  <div ref={msgEndRef} />
                </div>
                <div className="saq-input-bar">
                  <input
                    className="saq-inp" type="text"
                    placeholder="Ask about menu, delivery, location..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  />
                  <button className="saq-send" onClick={() => sendMessage(input)} aria-label="Send">➤</button>
                </div>
              </>
            )}

            {/* PLATTER BUILDER TAB */}
            {tab === 'platter' && (
              <div className="saq-panel">
                <p className="saq-plabel">Select your occasion</p>
                <div className="saq-occ-grid">
                  {OCCASIONS.map(o => (
                    <div key={o.key} className={`saq-occ${occasion === o.key ? ' selected' : ''}`} onClick={() => setOccasion(o.key)}>
                      <div className="icon">{o.icon}</div>
                      <div className="lbl">{o.label}</div>
                    </div>
                  ))}
                </div>
                <p className="saq-plabel" style={{ marginTop: 4 }}>Number of guests</p>
                <div className="saq-slider-row">
                  <input type="range" min={5} max={50} step={5} value={guests} onChange={e => setGuests(+e.target.value)} />
                  <span className="saq-slider-val">{guests}</span>
                  <span style={{ fontSize: 11, color: 'rgba(250,240,228,0.4)' }}>guests</span>
                </div>
                <button className="saq-build-btn" onClick={buildPlatter}>Build my platter →</button>

                {platterResult && (
                  <div className="saq-result">
                    <div className="saq-res-title">Suggested platter for {guests} guests</div>
                    {platterResult.map((row, i) => (
                      <div key={i} className="saq-res-row">
                        <span>{row.item} <span style={{ color: 'rgba(250,240,228,0.4)', fontSize: 10 }}>({row.qty})</span></span>
                        <span className="saq-res-price">Rs. {row.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="saq-res-total"><span>Estimated Total</span><span>Rs. {total.toLocaleString()}</span></div>
                    <button className="saq-wa-btn" onClick={() => {
                      const occ = OCCASIONS.find(o => o.key === occasion)?.label;
                      const msg = encodeURIComponent(`Hi Saqafat! I'd like to order the ${occ} platter for ${guests} guests. Estimated Rs. ${total.toLocaleString()}. Please confirm.`);
                      window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
                    }}>
                      Order on WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* INGREDIENTS / CALORIE TAB */}
            {tab === 'calorie' && (
              <div className="saq-panel">
                <div className="saq-search-wrap">
                  <span className="saq-search-icon">🔍</span>
                  <input type="text" placeholder="Search item (e.g. Cream Roll)" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {filteredMenu.length === 0 && (
                  <p style={{ fontSize: 12, color: 'rgba(250,240,228,0.4)', textAlign: 'center', padding: '20px 0' }}>No items found</p>
                )}
                {filteredMenu.map((item, i) => (
                  <div key={i} className="saq-item-card">
                    <div className="saq-item-name">{item.name}</div>
                    <div className="saq-item-desc">{item.desc}</div>
                    <div className="saq-tags">
                      <span className="saq-tag cal">🔥 {item.cal} kcal</span>
                      <span className={`saq-tag ${item.gf ? 'good' : 'bad'}`}>{item.gf ? '✓ Gluten-free' : '✗ Contains Gluten'}</span>
                      <span className={`saq-tag ${item.veg ? 'good' : 'bad'}`}>{item.veg ? '🌿 Vegetarian' : '🍗 Non-veg'}</span>
                      {item.spicy && <span className="saq-tag bad">🌶 Spicy</span>}
                      <span className="saq-tag info">Contains: {item.contains.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
