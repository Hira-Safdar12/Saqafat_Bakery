'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TopSellers() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => obs.disconnect();
  }, []);

  const go = (name: string) =>
    router.push(`/menu?item=${encodeURIComponent(name)}`);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes tsUp {
          from {
            opacity:0;
            transform:translateY(22px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes tsLine {
          from {
            transform:scaleX(0);
          }
          to {
            transform:scaleX(1);
          }
        }

        .ts-sec{
          background:#FAF6EE;
          position:relative;
          overflow:hidden;
          padding:
            clamp(48px,7vw,80px)
            clamp(16px,5vw,52px)
            clamp(44px,6vw,72px);
        }

        .ts-blob{
          position:absolute;
          border-radius:50%;
          pointer-events:none;
          z-index:0;
        }

        /* ───────────────── HEADING ───────────────── */

        .ts-head{
          text-align:center;
          position:relative;
          z-index:1;
          margin-bottom:clamp(28px,4vw,48px);
        }

        .ts-head.vis{
          animation:tsUp .6s ease both;
        }

        .ts-eyebrow{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          margin-bottom:12px;
        }

        .ts-eline{
          height:1.5px;
          width:32px;
          background:linear-gradient(90deg,transparent,#C97B3A);
          transform-origin:left;
        }

        .ts-eline:last-child{
          background:linear-gradient(90deg,#C97B3A,transparent);
          transform-origin:right;
        }

        .ts-eyebrow.vis .ts-eline{
          animation:tsLine .55s ease .1s both;
        }

        .ts-etxt{
          font-family:'DM Sans',sans-serif;
          font-size:10px;
          font-weight:500;
          letter-spacing:.26em;
          text-transform:uppercase;
          color:#C97B3A;
        }

        .ts-h2{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2rem,5vw,3.4rem);
          font-weight:600;
          color:#1E0F06;
          margin:0 0 10px;
          line-height:1.08;
        }

        .ts-h2 em{
          color:#C97B3A;
          font-style:italic;
        }

        .ts-sub{
          font-family:'DM Sans',sans-serif;
          font-size:clamp(.83rem,1.7vw,.95rem);
          font-weight:300;
          color:#7a5c44;
          line-height:1.7;
          max-width:420px;
          margin:0 auto;
        }

        /* ───────────────── GRID ───────────────── */

        .ts-bento{
  display:grid;

  /* slightly reduced middle width */
  grid-template-columns:
    1fr
    1.45fr
    1.45fr
    1fr;

  grid-template-rows:
    260px
    300px;

  gap:16px;

  max-width:1020px;
  margin:0 auto;

  position:relative;
  z-index:1;
}

        /* FIRST ROW */

        .ts-a{
  grid-column:1/3;
  grid-row:1/2;
}
        .ts-b{
  grid-column:3/4;
  grid-row:1/2;
}
        .ts-c{
          grid-column:4/5;
          grid-row:1/2;
        }

        /* SECOND ROW */

        .ts-f{
          grid-column:1/2;
          grid-row:2/3;
        }

        .ts-d{
          grid-column:2/4;
          grid-row:2/3;
        }

        .ts-e{
          grid-column:4/5;
          grid-row:2/3;
        }

        /* ───────────────── CARDS ───────────────── */

        .ts-card{
          position:relative;
          overflow:hidden;
          border-radius:22px;
          cursor:pointer;

          opacity:0;
          transform:translateY(16px);

          transition:
            transform .38s cubic-bezier(.25,.46,.45,.94),
            box-shadow .38s ease,
            opacity .5s ease;

          border:1.5px solid rgba(255,255,255,.8);

          box-shadow:0 3px 14px rgba(0,0,0,.07);
        }

        .ts-card.vis{
          opacity:1;
          transform:translateY(0);
        }

        .ts-card:hover{
          transform:translateY(-4px) scale(1.015);
          box-shadow:0 18px 42px rgba(92,46,14,.15);
          z-index:4;
          border-color:rgba(201,123,58,.28);
        }

        /* KEEP IMAGE FIT */

        .ts-card img{
          width:100% !important;
          height:100% !important;
          object-fit:cover !important;
        }

        .ts-card.img-card img{
          transition:transform .55s cubic-bezier(.25,.46,.45,.94) !important;
        }

        .ts-card.img-card:hover img{
          transform:scale(1.08) !important;
        }

        .ts-scrim{
          position:absolute;
          inset:0;
          z-index:1;

          background:linear-gradient(
            to top,
            rgba(18,5,2,.72) 0%,
            rgba(18,5,2,.12) 50%,
            transparent 100%
          );
        }

        .ts-img-info{
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          padding:12px 14px;
          z-index:2;

          display:flex;
          flex-direction:column;
          gap:2px;
        }

        .ts-iname{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(.9rem,1.6vw,1.12rem);
          font-weight:600;
          color:#FAF6EE;
          margin:0;
          line-height:1.15;
        }

        .ts-iprice{
          font-family:'DM Sans',sans-serif;
          font-size:10px;
          font-weight:500;
          color:#E8C97A;
          letter-spacing:.06em;
          margin:0;
        }

        /* ───────────────── TEXT CARDS ───────────────── */

        .ts-card.txt-card{
          display:flex;
          flex-direction:column;
          justify-content:center;
          padding:clamp(18px,3vw,28px)
                  clamp(16px,2.5vw,24px);
          cursor:default;
        }

        .txt-eyebrow{
          font-family:'DM Sans',sans-serif;
          font-size:9px;
          font-weight:600;
          letter-spacing:.22em;
          text-transform:uppercase;
          color:#C97B3A;
          margin:0 0 10px;

          display:flex;
          align-items:center;
          gap:6px;
        }

        .txt-eyebrow::before{
          content:'';
          display:inline-block;
          width:18px;
          height:1.5px;
          background:#C97B3A;
        }

        .txt-title{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1.4rem,2.8vw,2rem);
          font-weight:600;
          line-height:1.12;
          margin:0 0 10px;
        }

        .txt-desc{
          font-family:'DM Sans',sans-serif;
          font-size:clamp(.75rem,1.3vw,.85rem);
          font-weight:300;
          line-height:1.65;
          margin:0 0 18px;
        }

        .txt-pills{
          display:flex;
          flex-wrap:wrap;
          gap:7px;
          margin-bottom:16px;
        }

        .txt-pill{
          display:inline-flex;
          align-items:center;
          gap:5px;
          padding:5px 12px;
          border-radius:20px;
          font-family:'DM Sans',sans-serif;
          font-size:10px;
          font-weight:500;
          border:none;
          cursor:pointer;
        }

        .txt-pill-primary{
          background:linear-gradient(135deg,#5C2E0E,#A0673A);
          color:#FAF6EE;
        }

        .txt-pill-outline{
          background:rgba(92,46,14,.07);
          color:#5C2E0E;
          border:1px solid rgba(92,46,14,.15) !important;
        }

        .txt-rating{
          display:flex;
          align-items:center;
          gap:6px;
          font-family:'DM Sans',sans-serif;
          font-size:10px;
          font-weight:500;
        }

        .txt-stars{
          color:#E8A030;
          font-size:12px;
          letter-spacing:1px;
        }

        .txt-small-title{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1.1rem,2vw,1.4rem);
          font-weight:600;
          line-height:1.15;
          margin:0 0 8px;
        }

        .txt-small-desc{
          font-family:'DM Sans',sans-serif;
          font-size:clamp(.72rem,1.2vw,.8rem);
          font-weight:300;
          line-height:1.6;
          margin:0 0 14px;
        }

        .txt-order-btn{
          display:inline-flex;
          align-items:center;
          gap:7px;
          padding:8px 16px;
          border-radius:20px;
          border:none;
          cursor:pointer;

          background:linear-gradient(135deg,#5C2E0E,#A0673A);
          color:#FAF6EE;

          font-family:'DM Sans',sans-serif;
          font-size:10px;
          font-weight:600;
          letter-spacing:.08em;
          text-transform:uppercase;
        }

        /* ───────────────── RESPONSIVE ───────────────── */

        @media (max-width:899px){

          .ts-bento{
            grid-template-columns:repeat(2,1fr);
            grid-auto-rows:220px;
            gap:12px;
          }

          .ts-a,
          .ts-b,
          .ts-c,
          .ts-d,
          .ts-e,
          .ts-f{
            grid-column:auto !important;
            grid-row:auto !important;
          }

          .ts-b,
          .ts-d{
            grid-column:span 2 !important;
          }
        }

        @media (max-width:540px){

          .ts-bento{
            grid-template-columns:1fr;
          }

          .ts-b,
          .ts-d{
            grid-column:span 1 !important;
          }
        }

        @media (prefers-reduced-motion:reduce){

          .ts-card,
          .ts-card.vis,
          .ts-head{
            animation:none !important;
            opacity:1 !important;
            transform:none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ts-sec"
        aria-labelledby="ts-h2"
      >

        {/* BLOBS */}

        <div
          className="ts-blob"
          style={{
            width:'400px',
            height:'400px',
            background:'radial-gradient(circle,rgba(255,215,110,.15) 0%,transparent 70%)',
            top:'-90px',
            left:'-60px',
          }}
        />

        <div
          className="ts-blob"
          style={{
            width:'300px',
            height:'300px',
            background:'radial-gradient(circle,rgba(200,100,50,.07) 0%,transparent 70%)',
            bottom:'-40px',
            right:'4%',
          }}
        />

        {/* HEADING */}

        <div className={`ts-head${visible ? ' vis' : ''}`}>

          <div className={`ts-eyebrow${visible ? ' vis' : ''}`}>
            <span className="ts-eline" />
            <span className="ts-etxt">
              What Everyone Orders
            </span>
            <span className="ts-eline" />
          </div>

          <h2
            id="ts-h2"
            className="ts-h2"
          >
            Our Crowd <em>Favourites</em>
          </h2>

          <p className="ts-sub">
            Handcrafted with love — six of our most-adored creations, made fresh every day.
          </p>

        </div>

        {/* GRID */}

        <div className="ts-bento" role="list">

          {/* A */}

          <div
            className={`ts-card img-card ts-a${visible ? ' vis' : ''}`}
            style={{
              background:'#EDE0F0',
              transitionDelay:visible ? '0s' : '0s'
            }}
            onClick={() => go('Macarons')}
          >

            <Image
               src="/Favourites/burger.avif" alt="Burger" 
              fill
              priority
            />

            <div className="ts-scrim" />

            <div className="ts-img-info">
              <p className="ts-iname">Fire Grill Burger</p>
              <p className="ts-iprice">From PKR 800</p>
            </div>

          </div>

          {/* B */}

          <div
            className={`ts-card txt-card ts-b${visible ? ' vis' : ''}`}
            style={{
              background:'#EDE0F0',
              transitionDelay:visible ? '.07s' : '0s'
            }}
          >

            <p className="txt-eyebrow">
              Our Specialties
            </p>

            <h3
              className="txt-title"
              style={{ color:'#1E0F06' }}
            >
              Rolot Paatii
              <br />
              <em
                style={{
                  color:'#C97B3A',
                  fontStyle:'italic'
                }}
              >
                Poctanvs
              </em>
            </h3>

            <p
              className="txt-desc"
              style={{ color:'#5A3E2B' }}
            >
             
             
            </p>

            <div className="txt-pills">

              <button
                className="txt-pill txt-pill-primary"
                onClick={() => go('Menu')}
              >
                Try Now
              </button>

              <span
                style={{
                  fontFamily:'DM Sans,sans-serif',
                  fontSize:'11px',
                  fontWeight:500,
                  color:'rgba(92,46,14,.55)',
                  display:'flex',
                  alignItems:'center',
                  gap:'4px'
                }}
              >
                +
                <span
                  style={{
                    fontWeight:700,
                    color:'#C97B3A'
                  }}
                >
                  93%
                </span>
                rating
              </span>

              <button
                className="txt-pill txt-pill-outline"
                onClick={() => go('Menu')}
              >
                Menu
              </button>

            </div>

            <div className="txt-rating">
              <span className="txt-stars">★★★★★</span>
              <span>4.9</span>
              <span>(2,400+ reviews)</span>
            </div>

          </div>

          {/* C */}

          <div
            className={`ts-card img-card ts-c${visible ? ' vis' : ''}`}
            style={{
              background:'#E8F0E0',
              transitionDelay:visible ? '.14s' : '0s'
            }}
            onClick={() => go('Croissant')}
          >

            <Image
              src="/Favourites/pasta.jpg"  
              alt="Pasta"
              fill
              priority
            />

            <div className="ts-scrim" />

            <div className="ts-img-info">
              <p className="ts-iname">Creamy Alfredo Pasta</p>
              <p className="ts-iprice">From PKR 2,250</p>
            </div>

          </div>

          {/* F */}

          <div
            className={`ts-card img-card ts-f${visible ? ' vis' : ''}`}
            style={{
              background:'#EEF3E7',
              transitionDelay:visible ? '.21s' : '0s'
            }}
            onClick={() => go('Cupcake')}
          >

            <Image
               src="/Favourites/biryani.jpg"  
                alt="Biryani"
              fill
              priority
            />

            <div className="ts-scrim" />

            <div className="ts-img-info">
              <p className="ts-iname">Signature Dum Biryani</p>
              <p className="ts-iprice">From PKR 1,200</p>
            </div>

          </div>

          {/* D */}

          <div
            className={`ts-card img-card ts-d${visible ? ' vis' : ''}`}
            style={{
              background:'#F5EDE0',
              transitionDelay:visible ? '.28s' : '0s'
            }}
            onClick={() => go('Cupcakes')}
          >

            <Image
               src="/Favourites/pizza.jpg" alt="Pizza"
              fill
              priority
            />

            <div className="ts-scrim" />

            <div className="ts-img-info">
              <p className="ts-iname">Melted Mozzarella Pizza</p>
              <p className="ts-iprice">Most Loved</p>
            </div>

          </div>

          {/* E */}

          <div
            className={`ts-card txt-card ts-e${visible ? ' vis' : ''}`}
            style={{
              background:'#F5E6D8',
              transitionDelay:visible ? '.35s' : '0s'
            }}
          >

            <h3
              className="txt-small-title"
              style={{ color:'#1E0F06' }}
            >
              The Risde Soh
              <br />
              <em
                style={{
                  fontStyle:'italic',
                  color:'#C97B3A',
                  fontSize:'.85em'
                }}
              >
                Signature Series
              </em>
            </h3>

            <p
              className="txt-small-desc"
              style={{ color:'#5A3E2B' }}
            >
              Handcrafted, artisan-quality bakes that have been satisfying
              taste buds since 2009.
            </p>

            <button
              className="txt-order-btn"
              onClick={() => go('Menu')}
            >
              Order ↗
            </button>

          </div>

        </div>

      </section>
    </>
  );
}