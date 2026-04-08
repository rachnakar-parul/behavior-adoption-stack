"use client";
import { useState } from "react";

const bundles = [
  {
    letter: "F",
    name: "Foundation",
    designLabel: "Inclusion Design",
    color: "#5ba3d9",
    metaphor: "Walls — users lost here are lost silently",
    layers: [
      { n:1, name:"Access", q:"Can they physically reach it?", hint:"e.g., 9% students had no smartphone; father's work schedule blocked 5PM access", actionHint:"e.g., Map temporal access patterns; explore device-sharing with neighbors" },
      { n:2, name:"Structural Permission", q:"Does the system allow it?", hint:"e.g., Girls couldn't stay after school — unsafe; principal blocked WhatsApp group", actionHint:"e.g., Build HoS relationship before launch; address safety constraints" },
      { n:3, name:"Trust", q:"Do they believe the source?", hint:"e.g., Parents didn't trust an unknown NGO sending links to their children", actionHint:"e.g., Parent orientation calls within 2 weeks; teacher endorsement at assembly" },
    ],
  },
  {
    letter: "C",
    name: "Comprehension & Capability",
    designLabel: "Onboarding Design",
    color: "#4ecdc4",
    metaphor: "Ceilings — users can see the opportunity but can't reach it",
    layers: [
      { n:4, name:"Awareness", q:"Do they understand what it means for their life?", hint:"e.g., \"STEM is important\" is abstract; \"this gets your daughter into Navodaya\" is awareness", actionHint:"e.g., Personalize the benefit to each user's daily reality" },
      { n:5, name:"Ability", q:"Can they do it right now?", hint:"e.g., Illiterate parents couldn't read text instructions; students ran out of mobile data mid-month", actionHint:"e.g., Switch to audio messages; shorter session formats; reduce data requirements" },
      { n:6, name:"Self-Efficacy", q:"Do they believe they can?", hint:"e.g., \"I'm not a math person\"; no prior experience with digital learning tools", actionHint:"e.g., Scaffolded easy first step; show relatable role models from their community" },
    ],
  },
  {
    letter: "E",
    name: "Environment & Timing",
    designLabel: "Behavioral Design",
    color: "#6fcf97",
    metaphor: "Speed bumps — highest design leverage, small changes = big results",
    layers: [
      { n:7, name:"Defaults & Environment", q:"Is the right behavior the easy behavior?", hint:"e.g., No pre-existing WhatsApp group; too many options causing decision paralysis", actionHint:"e.g., Set up channel before launch; reduce choices to one clear action" },
      { n:8, name:"Trigger", q:"Is something prompting them at the right moment?", hint:"e.g., No reminder at the right time; no social cue from peers", actionHint:"e.g., Timed personalized notifications; leverage scorecard sharing as social trigger" },
    ],
  },
  {
    letter: "D",
    name: "Drive",
    designLabel: "Empathy Design",
    color: "#f0c040",
    metaphor: "Weather — changes daily, deeply personal",
    layers: [
      { n:9, name:"Motivation", q:"Do they want to?", hint:"e.g., Benefit feels abstract and distant; no connection to their daily life goals", actionHint:"e.g., Make benefit visible at moment of action; give agency not just information" },
      { n:10, name:"Emotional & Visceral State", q:"Is their bandwidth available?", hint:"e.g., New mom too exhausted to try new recipes; student stressed from family conflict", actionHint:"e.g., Design for the tired version of user; reduce decisions; instant small rewards" },
      { n:11, name:"Identity", q:"Does this feel like \"me\"?", hint:"e.g., Self-directed learning feels like \"something city kids do, not us\"", actionHint:"e.g., Feature relatable role models; reframe behavior as normal for \"people like us\"" },
    ],
  },
];

const allLayers = bundles.flatMap(b => b.layers.map(l => ({ ...l, bundleLetter: b.letter, bundleColor: b.color })));

const statusOpts = [
  { key:"unknown", label:"?", color:"#6b7280", bg:"#f3f4f6" },
  { key:"green", label:"✓", color:"#15803d", bg:"#dcfce7" },
  { key:"yellow", label:"!", color:"#a16207", bg:"#fef9c3" },
  { key:"red", label:"✗", color:"#dc2626", bg:"#fee2e2" },
];

const statusColors: Record<string, string> = { unknown:"#d1d5db", green:"#22c55e", yellow:"#eab308", red:"#ef4444" };

export default function Home() {
  const [data, setData] = useState(allLayers.map(() => ({ status:"unknown", barrier:"", action:"" })));
  const [expanded, setExpanded] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (i: number, field: string, val: string) => {
    setData(d => d.map((item, j) => j === i ? { ...item, [field]: val } : item));
  };

  const reds = data.filter(d => d.status === "red").length;
  const yellows = data.filter(d => d.status === "yellow").length;
  const greens = data.filter(d => d.status === "green").length;
  const unknowns = data.filter(d => d.status === "unknown").length;

  const lowestBroken = allLayers.findIndex((_, i) => data[i].status === "red");

  const copySummary = () => {
    let txt = "BEHAVIOR ADOPTION STACK — DIAGNOSTIC SUMMARY\n\n";
    let idx = 0;
    bundles.forEach(b => {
      txt += `${b.letter} — ${b.name} (${b.designLabel})\n`;
      b.layers.forEach(l => {
        const d = data[idx];
        const st = d.status === "red" ? "✗ BROKEN" : d.status === "yellow" ? "! AT RISK" : d.status === "green" ? "✓ CLEAR" : "? UNRATED";
        txt += `  Layer ${l.n}: ${l.name} — ${st}\n`;
        if (d.barrier) txt += `    Barrier: ${d.barrier}\n`;
        if (d.action) txt += `    Action: ${d.action}\n`;
        idx++;
      });
      txt += "\n";
    });
    if (lowestBroken >= 0) {
      txt += `⚠ LOWEST BROKEN LAYER: Layer ${allLayers[lowestBroken].n} — ${allLayers[lowestBroken].name}\n`;
    }
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", maxWidth:640, margin:"0 auto", padding:"16px 12px", background:"#fafafa", minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0d1f3c,#1a3a5c)", borderRadius:12, padding:"20px 18px", marginBottom:16, color:"#fff" }}>
        <h1 style={{ fontSize:20, fontWeight:800, marginBottom:4, lineHeight:1.3 }}>Behavior Adoption Stack</h1>
        <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:14 }}>Rate each layer, identify barriers, plan interventions</p>
        
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {[
            { label:"Broken", count:reds, color:"rgba(239,68,68,0.2)", textColor:"#fca5a5" },
            { label:"At Risk", count:yellows, color:"rgba(234,179,8,0.2)", textColor:"#fde047" },
            { label:"Clear", count:greens, color:"rgba(34,197,94,0.2)", textColor:"#86efac" },
            { label:"Unrated", count:unknowns, color:"rgba(255,255,255,0.1)", textColor:"rgba(255,255,255,0.5)" },
          ].map((s,i) => (
            <div key={i} style={{ background:s.color, borderRadius:8, padding:"6px 0", flex:1, textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:s.textColor }}>{s.count}</div>
              <div style={{ fontSize:8, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:1, fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:3, marginBottom:6 }}>
          {bundles.map((b) => {
            const bundleIdx = allLayers.findIndex(l => l.bundleLetter === b.letter);
            const bundleLayers = b.layers.length;
            const bundleData = data.slice(bundleIdx, bundleIdx + bundleLayers);
            const hasRed = bundleData.some(d => d.status === "red");
            const allGreen = bundleData.every(d => d.status === "green");
            const barColor = hasRed ? "#ef4444" : allGreen ? "#22c55e" : bundleData.some(d => d.status === "yellow") ? "#eab308" : "#333";
            return (
              <div key={b.letter} style={{ flex:1, textAlign:"center" }}>
                <div style={{ height:5, borderRadius:3, background:barColor, marginBottom:3, transition:"background 0.2s" }} />
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", fontWeight:600 }}>{b.letter}</div>
              </div>
            );
          })}
        </div>

        {lowestBroken >= 0 && (
          <div style={{ marginTop:8, background:"rgba(239,68,68,0.15)", borderRadius:8, padding:"8px 12px", border:"1px solid rgba(239,68,68,0.3)" }}>
            <span style={{ fontSize:11, color:"#fca5a5" }}>⚠ Lowest broken layer: <strong>Layer {allLayers[lowestBroken].n} — {allLayers[lowestBroken].name}</strong> — start here</span>
          </div>
        )}
      </div>

      {/* Bundles */}
      {bundles.map((bundle) => {
        const bundleStartIdx = allLayers.findIndex(l => l.bundleLetter === bundle.letter);
        return (
          <div key={bundle.letter} style={{ marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, padding:"0 4px" }}>
              <div style={{ width:28, height:28, borderRadius:6, background:bundle.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"#fff", flexShrink:0 }}>{bundle.letter}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:"#1a1a1a" }}>{bundle.name}</div>
                <div style={{ fontSize:10, color:bundle.color, fontWeight:600 }}>{bundle.designLabel}</div>
              </div>
              <div style={{ fontSize:9, color:"#999", fontStyle:"italic", maxWidth:140, textAlign:"right" }}>{bundle.metaphor}</div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {bundle.layers.map((layer, li) => {
                const globalIdx = bundleStartIdx + li;
                const isOpen = expanded === globalIdx;
                const st = data[globalIdx].status;
                const borderColor = st === "red" ? "#fecaca" : st === "yellow" ? "#fef08a" : st === "green" ? "#bbf7d0" : "#e5e7eb";
                
                return (
                  <div key={globalIdx} style={{ background:"#fff", borderRadius:10, border:`1.5px solid ${borderColor}`, overflow:"hidden", transition:"border-color 0.2s" }}>
                    <div
                      onClick={() => setExpanded(isOpen ? null : globalIdx)}
                      style={{ display:"flex", alignItems:"center", padding:"10px 12px", cursor:"pointer", gap:8 }}
                    >
                      <div style={{ width:24, height:24, borderRadius:5, background:statusColors[st], display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>
                        {layer.n}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#1a1a1a" }}>{layer.name}</div>
                        <div style={{ fontSize:10, color:"#888", marginTop:1 }}>{layer.q}</div>
                      </div>
                      <div style={{ display:"flex", gap:3, flexShrink:0 }}>
                        {statusOpts.map(opt => (
                          <button
                            key={opt.key}
                            onClick={e => { e.stopPropagation(); update(globalIdx, "status", opt.key); }}
                            style={{
                              width:24, height:24, borderRadius:5, border: st === opt.key ? `2px solid ${opt.color}` : "1.5px solid #e0e0e0",
                              background: st === opt.key ? opt.bg : "#fff",
                              color: opt.color, fontSize:12, fontWeight:700, cursor:"pointer",
                              display:"flex", alignItems:"center", justifyContent:"center",
                            }}
                          >{opt.label}</button>
                        ))}
                      </div>
                      <span style={{ fontSize:14, color:"#ccc", flexShrink:0, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.2s" }}>▼</span>
                    </div>

                    {isOpen && (
                      <div style={{ padding:"0 12px 12px", borderTop:"1px solid #f0f0f0" }}>
                        <div style={{ marginTop:10 }}>
                          <label style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:"#999", display:"block", marginBottom:3 }}>What&apos;s the barrier?</label>
                          <textarea
                            value={data[globalIdx].barrier}
                            onChange={e => update(globalIdx, "barrier", e.target.value)}
                            placeholder={layer.hint}
                            style={{ width:"100%", minHeight:50, padding:"7px 9px", borderRadius:6, border:"1.5px solid #e5e7eb", fontSize:11, lineHeight:1.5, fontFamily:"inherit", resize:"vertical", color:"#333" }}
                          />
                        </div>
                        <div style={{ marginTop:8 }}>
                          <label style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:"#999", display:"block", marginBottom:3 }}>What can we do about it?</label>
                          <textarea
                            value={data[globalIdx].action}
                            onChange={e => update(globalIdx, "action", e.target.value)}
                            placeholder={layer.actionHint}
                            style={{ width:"100%", minHeight:50, padding:"7px 9px", borderRadius:6, border:"1.5px solid #e5e7eb", fontSize:11, lineHeight:1.5, fontFamily:"inherit", resize:"vertical", color:"#333" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div style={{ textAlign:"center", marginTop:16, padding:14, background:"#fff", borderRadius:10, border:"1.5px solid #e5e7eb" }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#1a1a1a", marginBottom:8 }}>Intervene at the layer that&apos;s broken, not the one that&apos;s visible.</div>
        <button
          onClick={copySummary}
          style={{ padding:"8px 20px", borderRadius:8, border:"none", background: copied ? "#22c55e" : "#1a3c5e", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:12, transition:"background 0.2s" }}
        >
          {copied ? "✓ Copied!" : "📋 Copy Summary"}
        </button>
        <div style={{ fontSize:10, color:"#999", marginTop:8 }}>The Behavior Adoption Stack · Parul Jauhari · 2026</div>
      </div>
    </div>
  );
}