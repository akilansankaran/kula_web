"use strict";
const pptxgen = require("pptxgenjs");

// ── THEME ────────────────────────────────────────────────────────────────────
const BG      = "0D0C0B";   // near black
const GOLD    = "C9A96E";   // warm gold
const OFFWHT  = "E8E4DC";   // warm off-white
const MUTED   = "8C8070";   // muted text
const TEAL    = "5BB5A5";   // accent teal
const CORAL   = "E8906A";   // accent coral
const BLUE    = "8B9EC8";   // accent blue
const ROSE    = "C47A9E";   // accent rose

const W = 13.33; // slide width  (LAYOUT_WIDE)
const H = 7.5;   // slide height

// ── HELPERS ──────────────────────────────────────────────────────────────────

/** Draw slide number bottom-right in small gold text */
function addSlideNumber(slide, num) {
  slide.addText(String(num), {
    x: W - 0.6, y: H - 0.35, w: 0.4, h: 0.25,
    fontSize: 9, color: GOLD, align: "right",
    fontFace: "Calibri", margin: 0,
  });
}

/** Draw the three-circle motif (vertical stack).
 *  cx = horizontal centre, topY = y of first circle top edge
 *  r  = radius in inches (diameter = 2r)
 */
function addThreeCircles(slide, cx, topY, r, gap) {
  const d = r * 2;
  const lw = 0.03; // line weight

  // 1) Teal filled – Pulse
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: topY, w: d, h: d,
    fill: { color: TEAL }, line: { color: TEAL, width: 0 },
  });

  // 2) Gold ring + centre dot – Available
  const y2 = topY + d + gap;
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: y2, w: d, h: d,
    fill: { type: "none" }, line: { color: GOLD, width: Math.round(lw * 72) },
  });
  // tiny centre dot
  const dotR = r * 0.2;
  slide.addShape(pres.shapes.OVAL, {
    x: cx - dotR, y: y2 + r - dotR, w: dotR * 2, h: dotR * 2,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });

  // 3) Muted ring – Unavailable
  const y3 = y2 + d + gap;
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: y3, w: d, h: d,
    fill: { type: "none" }, line: { color: MUTED, width: Math.round(lw * 72) },
  });
}

/** Column circle: one of "pulse", "available", "unavailable"
 *  cx = horizontal centre, cy = vertical centre, r = radius
 */
function addCircleMotif(slide, type, cx, cy, r) {
  const d = r * 2;
  if (type === "pulse") {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: d, h: d,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 },
    });
  } else if (type === "available") {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: d, h: d,
      fill: { type: "none" }, line: { color: GOLD, width: 2 },
    });
    const dotR = r * 0.22;
    slide.addShape(pres.shapes.OVAL, {
      x: cx - dotR, y: cy - dotR, w: dotR * 2, h: dotR * 2,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 },
    });
  } else { // unavailable
    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: d, h: d,
      fill: { type: "none" }, line: { color: MUTED, width: 2 },
    });
  }
}

// ── PRESENTATION ─────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author  = "Kula";
pres.title   = "Kula — Pitch Deck";

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Cover
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };

  // Very subtle large circle outline as background texture (centred)
  const bgR = 4.2;
  slide.addShape(pres.shapes.OVAL, {
    x: W / 2 - bgR, y: H / 2 - bgR, w: bgR * 2, h: bgR * 2,
    fill: { type: "none" },
    line: { color: GOLD, width: 1, transparency: 95 },
  });
  // Second smaller halo
  const bgR2 = 2.8;
  slide.addShape(pres.shapes.OVAL, {
    x: W / 2 - bgR2, y: H / 2 - bgR2, w: bgR2 * 2, h: bgR2 * 2,
    fill: { type: "none" },
    line: { color: GOLD, width: 1, transparency: 95 },
  });

  // "kula" — bottom-left, 72pt Georgia italic gold
  slide.addText("kula", {
    x: 0.7, y: H - 2.2, w: 5, h: 1.2,
    fontSize: 72, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Tagline below
  slide.addText("You meant to reach out. But you could not find the time.", {
    x: 0.7, y: H - 1.1, w: 6.5, h: 0.7,
    fontSize: 18, fontFace: "Calibri", color: OFFWHT,
    align: "left", margin: 0,
  });

  // Three circles – right side, stacked vertically
  const cx = W - 1.5;
  const r  = 0.55;
  const gap = 0.25;
  const totalH = r * 6 + gap * 2;
  const topY = (H - totalH) / 2;
  addThreeCircles(slide, cx, topY, r, gap);
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — The Problem
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 2);

  // Heading — left, large, italic gold, wrapped
  slide.addText("Could you spend more time with your loved ones during the work day?", {
    x: 0.7, y: 1.0, w: 7.2, h: 1.8,
    fontSize: 36, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Body
  slide.addText(
    "The friction to reconnect is too high. Every tool demands you initiate, coordinate, remember. When you're running at full capacity, they become barriers — not bridges.",
    {
      x: 0.7, y: 3.1, w: 7.0, h: 2.0,
      fontSize: 14, fontFace: "Calibri",
      color: OFFWHT, align: "left", margin: 0,
    }
  );

  // Right side decorative: two circles drifting apart
  // Teal
  slide.addShape(pres.shapes.OVAL, {
    x: W - 2.8, y: 1.5, w: 1.4, h: 1.4,
    fill: { color: TEAL, transparency: 20 },
    line: { color: TEAL, width: 0 },
  });
  // Rose — offset / drifting
  slide.addShape(pres.shapes.OVAL, {
    x: W - 1.9, y: 2.7, w: 1.3, h: 1.3,
    fill: { color: ROSE, transparency: 25 },
    line: { color: ROSE, width: 0 },
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — The Solution
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 3);

  // Heading
  slide.addText("Kula.", {
    x: 0.7, y: 0.6, w: 10, h: 1.0,
    fontSize: 48, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Subheading
  slide.addText("Ambient presence. Not another notification.", {
    x: 0.7, y: 1.55, w: 9, h: 0.55,
    fontSize: 20, fontFace: "Calibri",
    color: OFFWHT, align: "left", margin: 0,
  });

  // Three columns
  const cols = [
    { type: "available", label: "Available",   desc: "You're free. Your circle knows.",   cx: 2.5 },
    { type: "unavailable", label: "Unavailable", desc: "Focus mode. No interruptions.",    cx: 6.67 },
    { type: "pulse",     label: "Pulse",       desc: "One tap. I'm here.",               cx: 10.83 },
  ];

  const circleY = 2.7;
  const r = 0.42;

  for (const col of cols) {
    addCircleMotif(slide, col.type, col.cx, circleY, r);
    // Label
    slide.addText(col.label, {
      x: col.cx - 1.5, y: circleY + r + 0.15, w: 3.0, h: 0.45,
      fontSize: 15, fontFace: "Georgia", italic: true,
      color: GOLD, align: "center", margin: 0,
    });
    // Description
    slide.addText(col.desc, {
      x: col.cx - 1.7, y: circleY + r + 0.65, w: 3.4, h: 0.7,
      fontSize: 13, fontFace: "Calibri",
      color: OFFWHT, align: "center", margin: 0,
    });
  }

  // Footer note
  slide.addText(
    "Kula connects to your calendar and switches your status automatically.",
    {
      x: 0.7, y: H - 0.65, w: W - 1.4, h: 0.35,
      fontSize: 12, fontFace: "Calibri",
      color: MUTED, align: "center", margin: 0,
    }
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — How It Works
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 4);

  slide.addText("Three moments.", {
    x: 0.7, y: 0.7, w: 9, h: 0.9,
    fontSize: 40, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  const steps = [
    { num: "01", color: TEAL,  type: "pulse",     text: "Your circle sees your status in real time." },
    { num: "02", color: GOLD,  type: "available",  text: "Mutual availability surfaces itself. No coordination." },
    { num: "03", color: CORAL, type: "pulse-coral", text: "One tap sends a Pulse. No message. Just: I'm here." },
  ];

  const colW  = (W - 1.4) / 3;
  const baseX = 0.7;

  steps.forEach((step, i) => {
    const cx = baseX + colW * i + colW / 2;
    const r  = 0.38;
    const circY = 2.1;

    // Circle
    if (step.type === "pulse") {
      slide.addShape(pres.shapes.OVAL, {
        x: cx - r, y: circY - r, w: r * 2, h: r * 2,
        fill: { color: TEAL }, line: { color: TEAL, width: 0 },
      });
    } else if (step.type === "available") {
      slide.addShape(pres.shapes.OVAL, {
        x: cx - r, y: circY - r, w: r * 2, h: r * 2,
        fill: { type: "none" }, line: { color: GOLD, width: 2 },
      });
      const dotR = r * 0.22;
      slide.addShape(pres.shapes.OVAL, {
        x: cx - dotR, y: circY - dotR, w: dotR * 2, h: dotR * 2,
        fill: { color: GOLD }, line: { color: GOLD, width: 0 },
      });
    } else { // coral pulse
      slide.addShape(pres.shapes.OVAL, {
        x: cx - r, y: circY - r, w: r * 2, h: r * 2,
        fill: { color: CORAL }, line: { color: CORAL, width: 0 },
      });
    }

    // Number
    slide.addText(step.num, {
      x: cx - 1.2, y: circY - r - 0.55, w: 2.4, h: 0.45,
      fontSize: 28, fontFace: "Georgia",
      color: MUTED, align: "center", margin: 0,
    });

    // Description text
    slide.addText(step.text, {
      x: cx - 1.5, y: circY + r + 0.2, w: 3.0, h: 1.2,
      fontSize: 14, fontFace: "Calibri",
      color: OFFWHT, align: "center", margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Available On
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 5);

  slide.addText("Always with you.", {
    x: 0.7, y: 0.7, w: 9, h: 0.9,
    fontSize: 40, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // 2x2 grid
  const items = [
    { label: "Phone",     color: TEAL },
    { label: "Laptop",    color: CORAL },
    { label: "Bracelet",  color: BLUE },
    { label: "Desk lamp", color: ROSE },
  ];

  const gridX = [2.2, 7.0];
  const gridY = [2.0, 4.2];
  const r = 0.35;

  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx  = gridX[col];
    const cy  = gridY[row] + r;

    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2,
      fill: { color: item.color, transparency: 15 },
      line: { color: item.color, width: 2 },
    });
    slide.addText(item.label, {
      x: cx + 0.2, y: cy - 0.25, w: 3.0, h: 0.5,
      fontSize: 18, fontFace: "Georgia", italic: true,
      color: OFFWHT, align: "left", margin: 0,
    });
  });

  // Subtext
  slide.addText("A premium hardware and software ecosystem.", {
    x: 0.7, y: H - 0.7, w: W - 1.4, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: MUTED, align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Who It's For
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 6);

  slide.addText("Built for people who give everything.", {
    x: 0.7, y: 0.7, w: 10, h: 1.0,
    fontSize: 38, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  const bullets = [
    { text: "Professionals in tech, consulting, finance, and medicine", color: TEAL  },
    { text: "Dual-career couples navigating parallel lives",            color: CORAL },
    { text: "Families with children across different schedules",        color: BLUE  },
  ];

  bullets.forEach((b, i) => {
    const cy = 2.3 + i * 1.1;
    const r  = 0.12;
    // Coloured circle dot
    slide.addShape(pres.shapes.OVAL, {
      x: 0.7, y: cy - r, w: r * 2, h: r * 2,
      fill: { color: b.color }, line: { color: b.color, width: 0 },
    });
    // Text
    slide.addText(b.text, {
      x: 1.1, y: cy - 0.22, w: 9.5, h: 0.5,
      fontSize: 16, fontFace: "Calibri",
      color: OFFWHT, align: "left", margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Our Mission
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 7);

  slide.addText("We built Kula because we lived it.", {
    x: 0.7, y: 0.7, w: 10, h: 0.9,
    fontSize: 36, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Para 1
  slide.addText(
    "Between lectures and deadlines, the people we love most — parents across time zones, siblings, friends — started to feel further away. Finding the same open window felt impossible.",
    {
      x: 0.7, y: 1.85, w: 9.8, h: 1.5,
      fontSize: 14, fontFace: "Calibri",
      color: OFFWHT, align: "left", margin: 0,
    }
  );

  // Para 2
  slide.addText(
    "The time is always there. Finding it together is the problem Kula solves.",
    {
      x: 0.7, y: 3.5, w: 9.0, h: 0.9,
      fontSize: 14, fontFace: "Calibri",
      color: OFFWHT, align: "left", margin: 0,
    }
  );

  // Bottom-left: two overlapping circles (teal + coral)
  const bx = 0.7;
  const by = H - 1.1;
  const br = 0.28;
  slide.addShape(pres.shapes.OVAL, {
    x: bx, y: by - br, w: br * 2, h: br * 2,
    fill: { color: TEAL, transparency: 20 }, line: { color: TEAL, width: 0 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: bx + br * 0.9, y: by - br, w: br * 2, h: br * 2,
    fill: { color: CORAL, transparency: 20 }, line: { color: CORAL, width: 0 },
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Traction / Waitlist
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 8);

  // Large decorative gold outline circle — centre-right
  const dcx = W - 2.5;
  const dcy = H / 2;
  const dr  = 2.5;
  slide.addShape(pres.shapes.OVAL, {
    x: dcx - dr, y: dcy - dr, w: dr * 2, h: dr * 2,
    fill: { type: "none" },
    line: { color: GOLD, width: 1, transparency: 75 },
  });
  // Inner halo
  const dr2 = 1.6;
  slide.addShape(pres.shapes.OVAL, {
    x: dcx - dr2, y: dcy - dr2, w: dr2 * 2, h: dr2 * 2,
    fill: { type: "none" },
    line: { color: GOLD, width: 1, transparency: 80 },
  });

  // Heading
  slide.addText("Join us.", {
    x: 0.7, y: 0.8, w: 9, h: 1.1,
    fontSize: 48, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // URL
  slide.addText("akilansankaran.github.io/kula_web/", {
    x: 0.7, y: 2.3, w: 10, h: 0.7,
    fontSize: 20, fontFace: "Calibri",
    color: OFFWHT, align: "left", margin: 0,
  });

  // Subtext
  slide.addText(
    "Be the first to bring Kula home. Early access, product updates, pre-order priority.",
    {
      x: 0.7, y: 3.2, w: 9.0, h: 0.7,
      fontSize: 14, fontFace: "Calibri",
      color: MUTED, align: "left", margin: 0,
    }
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Team
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };
  addSlideNumber(slide, 9);

  slide.addText("Built by people who needed it.", {
    x: 0.7, y: 0.7, w: 10, h: 0.9,
    fontSize: 38, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Two avatar circles side by side
  const avatarD = 1.2; // diameter
  const avatarR = avatarD / 2;
  const avatarY = 2.1;
  const av1cx   = 3.5;
  const av2cx   = 5.8;

  [av1cx, av2cx].forEach((cx) => {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - avatarR, y: avatarY, w: avatarD, h: avatarD,
      fill: { type: "none" }, line: { color: GOLD, width: 2 },
    });
    slide.addText("AS", {
      x: cx - avatarR, y: avatarY + avatarR - 0.22, w: avatarD, h: 0.44,
      fontSize: 16, fontFace: "Georgia", bold: true,
      color: GOLD, align: "center", margin: 0,
    });
  });

  // Bio lines
  slide.addText("Two Harvard students who met at the Research Science Institute.", {
    x: 0.7, y: avatarY + avatarD + 0.3, w: W - 1.4, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: OFFWHT, align: "center", margin: 0,
  });
  slide.addText("With parents across time zones and lives that never quite slow down.", {
    x: 0.7, y: avatarY + avatarD + 0.85, w: W - 1.4, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: MUTED, align: "center", margin: 0,
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Close
// ════════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: BG };

  // Subtle halo (same as cover)
  const bgR = 4.2;
  slide.addShape(pres.shapes.OVAL, {
    x: W / 2 - bgR, y: H / 2 - bgR, w: bgR * 2, h: bgR * 2,
    fill: { type: "none" },
    line: { color: GOLD, width: 1, transparency: 95 },
  });

  // Large text centre-left
  slide.addText("Be the first to bring Kula home.", {
    x: 0.7, y: 1.8, w: 8.5, h: 1.4,
    fontSize: 40, fontFace: "Georgia", italic: true,
    color: GOLD, align: "left", margin: 0,
  });

  // Email
  slide.addText("hello@kula.app", {
    x: 0.7, y: 3.4, w: 6, h: 0.65,
    fontSize: 18, fontFace: "Calibri",
    color: OFFWHT, align: "left", margin: 0,
  });

  // Right side: three circles (same layout as cover)
  const cx  = W - 1.5;
  const r   = 0.55;
  const gap = 0.25;
  const totalH = r * 6 + gap * 2;
  const topY   = (H - totalH) / 2;
  addThreeCircles(slide, cx, topY, r, gap);

  // Copyright
  slide.addText("© 2026 Kula", {
    x: 0.7, y: H - 0.4, w: 4, h: 0.28,
    fontSize: 9, fontFace: "Calibri",
    color: MUTED, align: "left", margin: 0,
  });
}

// ── WRITE FILE ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/aaryansingh/kula/kula-pitch.pptx" })
  .then(() => console.log("✓ kula-pitch.pptx written"))
  .catch((err) => { console.error(err); process.exit(1); });
