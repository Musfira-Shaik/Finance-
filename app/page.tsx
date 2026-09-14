"use client";

import { useEffect, useState } from "react";

type ModalStep = "setup" | "running" | "result";
type RangeProps = { label: string; value: number; suffix: string; onChange: (value: number) => void };

const chartBars = [
  { month: "Apr", planned: 46, actual: 54 },
  { month: "May", planned: 53, actual: 63 },
  { month: "Jun", planned: 49, actual: 58 },
  { month: "Jul", planned: 62, actual: 70 },
  { month: "Aug", planned: 56, actual: 67 },
  { month: "Sep", planned: 66, actual: 78 }
];
const allocations = [
  { label: "Product & R&D", amount: "₹ 1.16 Cr", width: 83 },
  { label: "Growth & GTM", amount: "₹ 86 L", width: 62 },
  { label: "People & Ops", amount: "₹ 64 L", width: 47 },
  { label: "Tools & Infra", amount: "₹ 32 L", width: 24 }
];

function RangeControl({ label, value, suffix, onChange }: RangeProps) {
  return (
    <div className="control">
      <label>{label}<span>{value}{suffix}</span></label>
      <input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [period, setPeriod] = useState("Last 12 months");
  const [modalStep, setModalStep] = useState<ModalStep | null>(null);
  const [scenario, setScenario] = useState("Balanced growth");
  const [growth, setGrowth] = useState(68);
  const [runProgress, setRunProgress] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (modalStep !== "running") return;
    setRunProgress(0);
    const timer = window.setInterval(() => {
      setRunProgress((value) => {
        if (value >= 100) {
          window.clearInterval(timer);
          setModalStep("result");
          return 100;
        }
        return value + 10;
      });
    }, 170);
    return () => window.clearInterval(timer);
  }, [modalStep]);

  const startOptimizer = () => setModalStep("setup");
  const closeModal = () => setModalStep(null);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">S</div><div className="brand-text">sage<span>.</span></div></div>
        <div>
          <div className="workspace-label">Workspace</div>
          <nav className="nav" aria-label="Primary navigation">
            {[
              ["Overview", "⌂"], ["Budgets", "▣"], ["Optimizer", "✦"], ["Scenarios", "◌"], ["Reports", "▤"]
            ].map(([name, icon]) => (
              <button key={name} className={activeNav === name ? "active" : ""} onClick={() => setActiveNav(name)}>
                <span className="nav-icon">{icon}</span>{name}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-foot">
          <div className="workspace-label">Your team</div>
          <div className="team-card"><div className="avatar">BB</div><div><b>Bug Busters</b><small>team-2E97F8FFF4BB</small></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="crumb">Workspace / <b>{activeNav}</b></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">♢<span className="dot" /></button>
            <div className="profile"><div className="avatar">AS</div><div><b>Arjun S.</b><small>Finance lead</small></div><span style={{ color: "#a4adbb", fontSize: 11 }}>⌄</span></div>
          </div>
        </header>

        <div className="content">
          <div className="heading-row">
            <div><p className="eyebrow">Executive command center</p><h1>Good morning, Arjun.</h1><p className="subheading">Here&apos;s the pulse of your team&apos;s financial health.</p></div>
            <button className="primary" onClick={startOptimizer}>✦ &nbsp; Run budget optimizer</button>
          </div>

          <section className="stats" aria-label="Key financial metrics">
            <div className="card stat"><span className="stat-label">Total annual budget</span><b className="stat-value">₹ 3.48 Cr</b><span className="delta">↑ 12.4% vs last year</span></div>
            <div className="card stat"><span className="stat-label">Budget utilized</span><b className="stat-value">64.8%</b><span className="delta">↑ 4.2% this quarter</span></div>
            <div className="card stat"><span className="stat-label">Runway</span><b className="stat-value">11.4 mo</b><span className="delta neutral">Based on current burn</span></div>
            <div className="card stat"><span className="stat-label">Potential savings</span><b className="stat-value">₹ 18.6 L</b><span className="delta">AI identified · 5.3%</span></div>
          </section>

          <section className="grid-main">
            <div className="card panel">
              <div className="panel-head"><div><h2 className="panel-title">Spend velocity</h2><div className="panel-sub">Actual vs planned monthly outflow</div></div><select className="select" value={period} onChange={(event) => setPeriod(event.target.value)}><option>Last 12 months</option><option>Last 6 months</option><option>Current quarter</option></select></div>
              <div className="velocity-list">{chartBars.map((item) => <div className="velocity-row" key={item.month}><span className="velocity-month">{item.month}</span><div className="velocity-bars"><div className="velocity-track"><i className="velocity-plan" style={{ width: `${item.planned}%` }} /></div><div className="velocity-track"><i className="velocity-actual" style={{ width: `${item.actual}%` }} /></div></div><span className="velocity-value">₹ {item.actual}L</span></div>)}</div>
              <div className="legend"><span>Planned</span><span>Actual</span><span>Forecast marker</span></div>
            </div>
            <div className="card panel health">
              <div className="panel-head"><div><h2 className="panel-title">Financial health</h2><div className="panel-sub">Your score is trending up</div></div><span style={{ color: "#7d91b5" }}>•••</span></div>
              <div className="health-score"><div className="score-ring"><b>76</b></div><p><strong>+8 points</strong><br />since last quarter<br />Top 24% of teams</p></div>
              <div className="health-list"><div className="health-line"><span>Cash efficiency</span><b>Good</b></div><div className="health-line"><span>Allocation balance</span><b>Strong</b></div><div className="health-line"><span>Forecast confidence</span><b>88%</b></div></div>
            </div>
          </section>

          <section className="lower">
            <div className="card panel"><div className="panel-head"><div><h2 className="panel-title">Current allocation</h2><div className="panel-sub">Annual budget across cost centers</div></div><button className="outline" onClick={startOptimizer}>View details</button></div><div className="allocation">{allocations.map((item) => <div className="allocation-row" key={item.label}><span className="allocation-label">{item.label}</span><div className="track"><div style={{ width: `${item.width}%` }} /></div><span className="allocation-amt">{item.amount}</span></div>)}</div></div>
            <div className="card panel insight"><span className="insight-tag">✦ Sage insight</span><h2 className="panel-title" style={{ marginTop: 10 }}>A smarter split is ready.</h2><p>We found a way to extend runway by <b>1.7 months</b> while keeping your growth targets intact. Run the optimizer to see the trade-offs.</p><button className="primary" onClick={startOptimizer}>Explore recommendation &nbsp; →</button></div>
          </section>

          <section className="card optimizer"><div className="optimizer-top"><div className="optimizer-copy"><div className="spark">✦</div><div><h2 className="panel-title">AI Budget Optimizer</h2><div className="panel-sub">Model v2.4 · Last synced 4 min ago · Explainable by design</div></div></div><div className="optimizer-actions"><button className="outline" onClick={() => setSaved(!saved)}>{saved ? "✓ Saved" : "Save scenario"}</button><button className="primary" onClick={startOptimizer}>Start simulation</button></div></div><div className="progress"><div /></div></section>
        </div>
      </main>

      {modalStep && <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="AI Budget Optimizer">
        <div className="modal">
          <div className="modal-head"><div><p className="eyebrow" style={{ marginBottom: 4 }}>AI budget optimizer</p><b style={{ fontSize: 14 }}>Find your most resilient allocation</b></div><button className="modal-close" onClick={closeModal} aria-label="Close optimizer">×</button></div>
          <div className="stepper"><div className={`step ${modalStep === "setup" ? "active" : "done"}`}>01 &nbsp; Set your priorities</div><div className={`step ${modalStep === "running" ? "active" : modalStep === "result" ? "done" : ""}`}>02 &nbsp; Optimize allocation</div><div className={`step ${modalStep === "result" ? "active" : ""}`}>03 &nbsp; Review recommendation</div></div>
          <div className="modal-body">
            {modalStep === "setup" && <><h2>What matters most right now?</h2><p>Tell Sage how you want to balance growth and resilience. We&apos;ll do the math.</p><div className="control-grid"><RangeControl label="Growth ambition" value={growth} suffix="%" onChange={setGrowth} /><RangeControl label="Cash buffer target" value={100 - growth + 15 > 100 ? 100 : 100 - growth + 15} suffix="%" onChange={(value) => setGrowth(115 - value)} /></div><div className="scenario-row">{["Balanced growth", "Efficiency first", "Aggressive expansion"].map((item) => <button key={item} className={`scenario ${scenario === item ? "selected" : ""}`} onClick={() => setScenario(item)}>{item}</button>)}</div><div className="modal-footer"><button className="outline" onClick={closeModal}>Cancel</button><button className="primary" onClick={() => setModalStep("running")}>Optimize my budget &nbsp; →</button></div></>}
            {modalStep === "running" && <div className="anim"><div className="pulse">✦</div><h3>Sage is thinking through 2,480 scenarios</h3><p>Testing trade-offs against your {scenario.toLowerCase()} profile.</p><div className="anim-progress"><div style={{ width: `${runProgress}%` }} /></div><p style={{ marginTop: 10, color: "#6d4aff", fontWeight: 700 }}>{runProgress}% complete</p></div>}
            {modalStep === "result" && <><h2>Your resilient allocation is ready.</h2><p>Based on your priorities, current burn, and 12-month growth forecast.</p><div className="result-grid"><div className="result-card"><h4>Annual savings unlocked</h4><div className="result-value">₹ 18.6 L</div><div className="saving">↑ 5.3% of total budget</div></div><div className="result-card"><h4>New runway</h4><div className="result-value">13.1 mo</div><div className="saving">↑ 1.7 months protected</div></div></div><div className="result-card" style={{ marginTop: 14 }}><h4>Before vs optimized allocation</h4><div className="compare">{[["Product & R&D", 83, 88], ["Growth & GTM", 62, 72], ["People & Ops", 47, 39], ["Tools & Infra", 24, 18]].map(([label, before, after]) => <div className="compare-line" key={String(label)}><span>{label}</span><div className="compare-bars"><i style={{ width: `${before as number}%` }} /><i style={{ width: `${after as number}%` }} /></div><b style={{ color: "#536175" }}>{after}%</b></div>)}</div></div><div className="explain"><b>Why this works</b><p>Sage shifts 6% from low-utilization tools and duplicate SaaS into Product & R&amp;D, protecting your launch milestone without reducing the cash buffer.</p></div><div className="modal-footer"><button className="outline" onClick={() => setModalStep("setup")}>Adjust inputs</button><button className="primary" onClick={() => { setSaved(true); closeModal(); }}>Save recommendation &nbsp; ✓</button></div></>}
          </div>
        </div>
      </div>}
    </div>
  );
}
