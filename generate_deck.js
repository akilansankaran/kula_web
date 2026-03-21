const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Kula";
pres.title = "Kula — Pitch Deck";

// ─── Palette ───────────────────────────────────────────────────────────────
const BG      = "0D0C0B";   // near-black
const GOLD    = "C9A96E";   // accent gold
const OFFWHT  = "E8E4DC";   // body text
const DIMWHT  = "A09890";   // muted text
const GOLDFNT = "C9A96E";

// ─── Helper: thin gold ring (circle outline) centered on slide ────────────
function addRing(slide, cx, cy, r, lineWidth = 0.5, lineColor = GOLD, transparency = 70) {
  // cx, cy = center; r = radius (all in inches)
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { type: "none" },
    line: { color: lineColor, width: lineWidth, transparency }
  });
}

// ─── Helper: small filled dot ─────────────────────────────────────────────
function addDot(slide, cx, cy, r, color = GOLD) {
  slide.addShape(pres.shapes.OVAL, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color },
    line: { type: "none" }
  });
}

// ─── Helper: state pill row ───────────────────────────────────────────────
function addStatePill(slide, x, y, label, desc, dotColor, filled = false) {
  // dot
  if (filled) {
    addDot(slide, x + 0.18, y + 0.15, 0.1, dotColor);
  } else {
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.08, y: y + 0.05, w: 0.2, h: 0.2,
      fill: { type: "none" },
      line: { color: dotColor, width: 1.5 }
    });
  }
  // label
  slide.addText(label, {
    x: x + 0.38, y: y, w: 1.4, h: 0.3,
    fontSize: 11, bold: true, color: OFFWHT, fontFace: "Georgia",
    margin: 0, valign: "middle"
  });
  // desc
  slide.addText(desc, {
    x: x + 0.38, y: y + 0.28, w: 3.0, h: 0.25,
    fontSize: 9, color: DIMWHT, fontFace: "Calibri",
    margin: 0, valign: "middle"
  });
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — COVER
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Large background rings
  addRing(s, 5, 2.8, 3.8, 0.5, GOLD, 82);
  addRing(s, 5, 2.8, 2.6, 0.4, GOLD, 75);
  addRing(s, 5, 2.8, 1.5, 0.3, GOLD, 65);

  // Center dot
  addDot(s, 5, 2.8, 0.12, GOLD);

  // KULA wordmark — large, centered
  s.addText("KULA", {
    x: 0, y: 1.7, w: 10, h: 1.2,
    fontSize: 88, fontFace: "Georgia", bold: true,
    color: GOLD, align: "center", charSpacing: 18, margin: 0
  });

  // Tagline
  s.addText("You meant to reach out.\nBut you could not find the time.", {
    x: 1.5, y: 3.2, w: 7, h: 1.0,
    fontSize: 16, fontFace: "Georgia", italic: true,
    color: OFFWHT, align: "center", lineSpacingMultiple: 1.4
  });

  // Fine rule
  s.addShape(pres.shapes.LINE, {
    x: 3.8, y: 4.35, w: 2.4, h: 0,
    line: { color: GOLD, width: 0.5, transparency: 40 }
  });

  // Founder tag
  s.addText("AS × 2   —   Harvard", {
    x: 0, y: 4.9, w: 10, h: 0.4,
    fontSize: 10, fontFace: "Calibri", color: DIMWHT,
    align: "center", charSpacing: 3
  });
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — THE PROBLEM
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Decorative ring top-right
  addRing(s, 9.5, 0.8, 2.2, 0.4, GOLD, 85);
  addRing(s, 9.5, 0.8, 1.4, 0.3, GOLD, 78);

  // Section label
  s.addText("THE PROBLEM", {
    x: 0.6, y: 0.42, w: 4, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("We have lost the art\nof being present for each other.", {
    x: 0.6, y: 0.8, w: 7.5, h: 1.5,
    fontSize: 30, fontFace: "Georgia", bold: true,
    color: OFFWHT, lineSpacingMultiple: 1.3, margin: 0
  });

  // Thin rule under heading
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 2.35, w: 5.5, h: 0,
    line: { color: GOLD, width: 0.5, transparency: 50 }
  });

  // Four stat/insight rows
  const rows = [
    ["60–80", "hours a week consumed by work, on average"],
    ["96×",   "a day we check our phones — mostly for nothing"],
    ["",      "Our closest relationships suffer in silence"],
    ["",      "We don't reach out because we can't read the room"],
  ];

  let ry = 2.55;
  for (const [stat, text] of rows) {
    if (stat) {
      s.addText(stat, {
        x: 0.6, y: ry, w: 1.5, h: 0.45,
        fontSize: 26, fontFace: "Georgia", bold: true,
        color: GOLD, margin: 0, valign: "bottom"
      });
      s.addText(text, {
        x: 2.2, y: ry + 0.05, w: 5.5, h: 0.42,
        fontSize: 13, fontFace: "Calibri", color: OFFWHT,
        margin: 0, valign: "bottom"
      });
    } else {
      // dot + text
      addDot(s, 0.78, ry + 0.2, 0.045, GOLD);
      s.addText(text, {
        x: 1.1, y: ry + 0.03, w: 6.5, h: 0.36,
        fontSize: 13, fontFace: "Calibri", color: OFFWHT,
        margin: 0, valign: "middle"
      });
    }
    ry += 0.62;
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — THE INSIGHT
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Large ring left
  addRing(s, 0.8, 2.8, 2.5, 0.4, GOLD, 84);
  addRing(s, 0.8, 2.8, 1.6, 0.3, GOLD, 75);
  addDot(s, 0.8, 2.8, 0.1, GOLD);

  // Section label
  s.addText("THE INSIGHT", {
    x: 0.6, y: 0.42, w: 4, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Context changes everything.", {
    x: 0.6, y: 0.8, w: 9, h: 0.9,
    fontSize: 34, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Body paragraph
  s.addText(
    "You would not call a friend at 2am. You would not text during a funeral. We already make these judgements every day — we simply lack the signal to share them.",
    {
      x: 0.6, y: 1.85, w: 7.6, h: 1.1,
      fontSize: 15, fontFace: "Calibri", color: DIMWHT,
      lineSpacingMultiple: 1.5, margin: 0
    }
  );

  // Pull-quote box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 3.3, w: 8.9, h: 1.55,
    fill: { color: "161411" },
    line: { type: "none" }
  });
  // Left gold accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 3.3, w: 0.06, h: 1.55,
    fill: { color: GOLD },
    line: { type: "none" }
  });
  s.addText("Availability is a feeling.\nKula makes it visible.", {
    x: 0.85, y: 3.38, w: 8.3, h: 1.38,
    fontSize: 22, fontFace: "Georgia", italic: true,
    color: GOLD, lineSpacingMultiple: 1.45, margin: 0, valign: "middle"
  });
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — WHAT IS KULA
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Rings top right
  addRing(s, 9.4, 1.0, 2.0, 0.4, GOLD, 84);
  addRing(s, 9.4, 1.0, 1.2, 0.3, GOLD, 76);

  // Section label
  s.addText("WHAT IS KULA", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading + subheading
  s.addText("A passive ambient layer\nfor your closest relationships.", {
    x: 0.6, y: 0.8, w: 7.8, h: 1.3,
    fontSize: 28, fontFace: "Georgia", bold: true,
    color: OFFWHT, lineSpacingMultiple: 1.3, margin: 0
  });

  // Body
  s.addText(
    "Kula runs silently in the background — reading your calendar, your motion, your context — and surfaces a soft signal to the people who matter most. No feeds. No notifications. Just presence.",
    {
      x: 0.6, y: 2.25, w: 7.5, h: 1.0,
      fontSize: 13, fontFace: "Calibri", color: DIMWHT,
      lineSpacingMultiple: 1.5, margin: 0
    }
  );

  // Thin rule
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 3.35, w: 8.8, h: 0,
    line: { color: GOLD, width: 0.4, transparency: 55 }
  });

  // Three states — horizontal layout
  const states = [
    { label: "Unavailable", desc: "Deep focus or rest. Do not disturb.", filled: false, cx: 1.6  },
    { label: "Available",   desc: "Open. A good time to reach out.",      filled: true,  cx: 5.0  },
    { label: "Pulse",       desc: "I am thinking of you right now.",       filled: true,  cx: 8.15 },
  ];

  for (const st of states) {
    // Circle
    if (st.filled) {
      addDot(s, st.cx, 4.05, 0.22, GOLD);
    } else {
      slide_addRing_local(s, st.cx, 4.05, 0.22, 1.5, GOLD, 0);
    }
    // Label
    s.addText(st.label, {
      x: st.cx - 1.1, y: 4.42, w: 2.2, h: 0.3,
      fontSize: 11, fontFace: "Georgia", bold: true,
      color: st.filled ? GOLD : OFFWHT,
      align: "center", margin: 0
    });
    // Desc
    s.addText(st.desc, {
      x: st.cx - 1.3, y: 4.74, w: 2.6, h: 0.5,
      fontSize: 9, fontFace: "Calibri", color: DIMWHT,
      align: "center", margin: 0
    });
  }

  function slide_addRing_local(slide, cx, cy, r, lineWidth, lineColor, transparency) {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2,
      fill: { type: "none" },
      line: { color: lineColor, width: lineWidth, transparency }
    });
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — HOW IT WORKS
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Ring bottom left
  addRing(s, 0.5, 5.0, 2.0, 0.4, GOLD, 85);
  addRing(s, 0.5, 5.0, 1.2, 0.3, GOLD, 76);

  // Section label
  s.addText("HOW IT WORKS", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Passive by design.", {
    x: 0.6, y: 0.8, w: 8, h: 0.75,
    fontSize: 34, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Four numbered steps in 2×2 grid
  const steps = [
    ["01", "Reads your calendar, phone usage, and motion patterns"],
    ["02", "Infers your availability — without you lifting a finger"],
    ["03", "Shares your signal only with your chosen circle — maximum 15 people"],
    ["04", "You can override at any time with a single tap"],
  ];

  const cols = [0.6, 5.3];
  const rows2 = [1.75, 3.3];

  let i = 0;
  for (const ry of rows2) {
    for (const cx of cols) {
      if (i >= steps.length) break;
      const [num, text] = steps[i];

      // Card background
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: ry, w: 4.35, h: 1.25,
        fill: { color: "161411" },
        line: { type: "none" }
      });
      // Number
      s.addText(num, {
        x: cx + 0.22, y: ry + 0.1, w: 0.7, h: 0.4,
        fontSize: 11, fontFace: "Georgia", bold: true,
        color: GOLD, margin: 0
      });
      // Text
      s.addText(text, {
        x: cx + 0.22, y: ry + 0.48, w: 3.9, h: 0.65,
        fontSize: 12.5, fontFace: "Calibri",
        color: OFFWHT, lineSpacingMultiple: 1.3, margin: 0
      });
      i++;
    }
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — THE PRODUCT / DEVICES
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Rings
  addRing(s, 9.5, 4.8, 2.2, 0.4, GOLD, 84);
  addRing(s, 9.5, 4.8, 1.4, 0.3, GOLD, 76);
  addDot(s, 9.5, 4.8, 0.1, GOLD);

  // Section label
  s.addText("THE PRODUCT", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Available everywhere you are.", {
    x: 0.6, y: 0.8, w: 8, h: 0.75,
    fontSize: 34, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Subline
  s.addText("One signal. Every surface.", {
    x: 0.6, y: 1.65, w: 6, h: 0.4,
    fontSize: 15, fontFace: "Georgia", italic: true,
    color: GOLD, margin: 0
  });

  // Four device cards in a row
  const devices = [
    { name: "iPhone",       detail: "Lock screen widget" },
    { name: "Apple Watch",  detail: "Gentle haptic pulse" },
    { name: "Mac",          detail: "Menu bar presence" },
    { name: "Smart Lamp",   detail: "Ambient light glow" },
  ];

  const cardW = 2.0;
  const cardH = 2.1;
  const startX = 0.5;
  const cardY  = 2.45;
  const gap    = 0.38;

  for (let i = 0; i < devices.length; i++) {
    const { name, detail } = devices[i];
    const cx = startX + i * (cardW + gap);

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: "161411" },
      line: { color: GOLD, width: 0.3, transparency: 60 }
    });

    // Circle icon placeholder
    addRing(s, cx + cardW / 2, cardY + 0.72, 0.38, 1.0, GOLD, 30);
    addDot(s, cx + cardW / 2, cardY + 0.72, 0.1, GOLD);

    // Device name
    s.addText(name, {
      x: cx, y: cardY + 1.3, w: cardW, h: 0.35,
      fontSize: 12, fontFace: "Georgia", bold: true,
      color: OFFWHT, align: "center", margin: 0
    });
    // Detail
    s.addText(detail, {
      x: cx, y: cardY + 1.65, w: cardW, h: 0.35,
      fontSize: 9, fontFace: "Calibri",
      color: DIMWHT, align: "center", margin: 0
    });
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — THE MARKET
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Rings left
  addRing(s, 0.5, 2.8, 2.4, 0.4, GOLD, 84);
  addRing(s, 0.5, 2.8, 1.5, 0.3, GOLD, 75);

  // Section label
  s.addText("THE MARKET", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("The ambient computing moment.", {
    x: 0.6, y: 0.8, w: 8.5, h: 0.75,
    fontSize: 32, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Body
  s.addText(
    "Screens are receding. Intelligence is moving into the periphery — into wearables, smart home, and passive layers. Kula is built for this shift.",
    {
      x: 0.6, y: 1.72, w: 8.5, h: 0.8,
      fontSize: 13, fontFace: "Calibri", color: DIMWHT,
      lineSpacingMultiple: 1.5, margin: 0
    }
  );

  // Large stat
  s.addText("1.8B", {
    x: 0.55, y: 2.7, w: 3.5, h: 0.9,
    fontSize: 64, fontFace: "Georgia", bold: true,
    color: GOLD, margin: 0
  });
  s.addText("smartphone users worldwide.\nThe real opportunity is the relationship layer on top.", {
    x: 0.6, y: 3.6, w: 4.5, h: 0.8,
    fontSize: 12, fontFace: "Calibri", color: OFFWHT,
    lineSpacingMultiple: 1.4, margin: 0
  });

  // Thin rule
  s.addShape(pres.shapes.LINE, {
    x: 5.4, y: 2.72, w: 0, h: 1.8,
    line: { color: GOLD, width: 0.4, transparency: 60 }
  });

  // Right column
  s.addText("Who we start with", {
    x: 5.7, y: 2.65, w: 4.0, h: 0.35,
    fontSize: 10, fontFace: "Georgia", bold: true, color: GOLD, margin: 0
  });
  s.addText(
    "College students and young professionals — people who feel the cost of disconnection most acutely, and who already expect ambient intelligence in their lives.",
    {
      x: 5.7, y: 3.05, w: 4.0, h: 1.3,
      fontSize: 12, fontFace: "Calibri", color: OFFWHT,
      lineSpacingMultiple: 1.45, margin: 0
    }
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — TRACTION
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Rings
  addRing(s, 9.3, 0.9, 2.0, 0.4, GOLD, 84);
  addRing(s, 9.3, 0.9, 1.2, 0.3, GOLD, 76);

  // Section label
  s.addText("TRACTION", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Early signal.", {
    x: 0.6, y: 0.8, w: 8, h: 0.75,
    fontSize: 38, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Four traction cards
  const cards = [
    { num: "6 wks",   label: "to build and ship MVP" },
    { num: "0",       label: "paid acquisition" },
    { num: "48 hrs",  label: "for users to feel more connected" },
    { num: "Growing", label: "waitlist, organic only" },
  ];

  const cW = 2.1;
  const cH = 2.0;
  const cGap = 0.28;
  const cY = 1.85;

  for (let i = 0; i < cards.length; i++) {
    const { num, label } = cards[i];
    const cx = 0.55 + i * (cW + cGap);

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cY, w: cW, h: cH,
      fill: { color: "161411" },
      line: { color: GOLD, width: 0.3, transparency: 65 }
    });
    // Gold top strip
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cY, w: cW, h: 0.06,
      fill: { color: GOLD },
      line: { type: "none" }
    });

    s.addText(num, {
      x: cx + 0.15, y: cY + 0.3, w: cW - 0.3, h: 0.85,
      fontSize: 34, fontFace: "Georgia", bold: true,
      color: GOLD, margin: 0
    });
    s.addText(label, {
      x: cx + 0.15, y: cY + 1.18, w: cW - 0.3, h: 0.65,
      fontSize: 11, fontFace: "Calibri", color: OFFWHT,
      lineSpacingMultiple: 1.3, margin: 0
    });
  }
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — TEAM
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Large rings, centered
  addRing(s, 5, 2.8, 3.5, 0.5, GOLD, 83);
  addRing(s, 5, 2.8, 2.3, 0.4, GOLD, 75);
  addRing(s, 5, 2.8, 1.3, 0.3, GOLD, 66);
  addDot(s, 5, 2.8, 0.12, GOLD);

  // Section label
  s.addText("THE TEAM", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Built by.", {
    x: 0.6, y: 0.8, w: 5, h: 0.75,
    fontSize: 38, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Two founder circles, side by side, centered
  const founders = [{ label: "A.S." }, { label: "A.S." }];
  const fcx = [3.2, 6.2];
  const fcy = 2.8;
  const fr  = 0.85;

  for (let i = 0; i < 2; i++) {
    const cx = fcx[i];
    // Outer ring
    s.addShape(pres.shapes.OVAL, {
      x: cx - fr, y: fcy - fr, w: fr * 2, h: fr * 2,
      fill: { color: "161411" },
      line: { color: GOLD, width: 1.0, transparency: 20 }
    });
    // Initials
    s.addText(founders[i].label, {
      x: cx - fr, y: fcy - 0.25, w: fr * 2, h: 0.5,
      fontSize: 22, fontFace: "Georgia", bold: true,
      color: GOLD, align: "center", margin: 0, valign: "middle"
    });
  }

  // Tagline
  s.addText("Two Harvard students who met at summer camp.\nBuilding the relationship layer the internet never had.", {
    x: 1.0, y: 4.2, w: 8, h: 0.9,
    fontSize: 14, fontFace: "Georgia", italic: true,
    color: OFFWHT, align: "center", lineSpacingMultiple: 1.45
  });
}


// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — THE ASK / CLOSING
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Large concentric rings
  addRing(s, 5, 2.8, 3.8, 0.5, GOLD, 82);
  addRing(s, 5, 2.8, 2.6, 0.4, GOLD, 74);
  addRing(s, 5, 2.8, 1.5, 0.3, GOLD, 64);
  addDot(s, 5, 2.8, 0.15, GOLD);

  // Section label
  s.addText("JOIN US", {
    x: 0.6, y: 0.42, w: 5, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: GOLD,
    charSpacing: 4, bold: true, margin: 0
  });

  // Heading
  s.addText("Pre-seed.", {
    x: 0.6, y: 0.8, w: 8, h: 0.8,
    fontSize: 44, fontFace: "Georgia", bold: true,
    color: OFFWHT, margin: 0
  });

  // Body
  s.addText(
    "We are raising a pre-seed round to expand the beta, grow the waitlist, and begin device integrations. If you believe the next great social primitive is presence — not content — we would love to talk.",
    {
      x: 0.6, y: 1.78, w: 8.6, h: 1.2,
      fontSize: 14, fontFace: "Calibri", color: OFFWHT,
      lineSpacingMultiple: 1.55, margin: 0
    }
  );

  // Rule
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 3.15, w: 8.8, h: 0,
    line: { color: GOLD, width: 0.5, transparency: 45 }
  });

  // KULA wordmark large again
  s.addText("KULA", {
    x: 0, y: 3.4, w: 10, h: 1.0,
    fontSize: 72, fontFace: "Georgia", bold: true,
    color: GOLD, align: "center", charSpacing: 18, margin: 0
  });

  // Closing tagline
  s.addText("You meant to reach out. Don't wait.", {
    x: 0, y: 4.65, w: 10, h: 0.5,
    fontSize: 13, fontFace: "Georgia", italic: true,
    color: OFFWHT, align: "center"
  });
}


// ─── Write ─────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/aaryansingh/kula/kula_pitch_deck.pptx" })
  .then(() => console.log("✅  Saved: /Users/aaryansingh/kula/kula_pitch_deck.pptx"))
  .catch(e => { console.error("❌ Error:", e); process.exit(1); });
