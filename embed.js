(function () {
  const CONTAINER_ID = "vemaventuri-solution-finder";
  const mount = document.getElementById(CONTAINER_ID);
  if (!mount) return;

  // --- Helpers: inject <link> and <style> only once
  function ensureLink(id, href) {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureStyle(id, cssText) {
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = cssText;
    document.head.appendChild(style);
  }

  // External CSS (fonts + icons)
  ensureLink(
    "sf-font-inter",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
  );
  ensureLink(
    "sf-tabler-icons",
    "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"
  );

  // Your CSS (from index.html) – unchanged except it will apply to the embedded block too.
  ensureStyle(
    "sf-solution-finder-style",
    `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #ffc300;
    --gold-pale: rgba(255,195,0,0.07);
    --gold-border: rgba(255,195,0,0.28);
    --dark: #0f0f13;
    --dark-2: #1a1a22;
    --text: #111112;
    --text-2: #6b6b72;
    --text-3: #9a9aa4;
    --border: rgba(0,0,0,0.1);
    --border-2: rgba(0,0,0,0.16);
    --surface: #ffffff;
    --surface-2: #f7f7f8;
    --radius: 12px;
    --radius-sm: 8px;
  }

  /* Scope-ish: apply background/font but let HubSpot page keep its own background */
  #${CONTAINER_ID} {
    font-family: 'Inter', sans-serif;
    color: var(--text);
  }

  #${CONTAINER_ID} .page { min-height: 100vh; display: flex; flex-direction: column; background:#f4f4f6; }
  #${CONTAINER_ID} nav {
    background: var(--dark);
    padding: 0 2rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  #${CONTAINER_ID} .nav-logo { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: .02em; }

  #${CONTAINER_ID} .hero {
    background: var(--dark);
    padding: 2.5rem 2rem 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  #${CONTAINER_ID} .hero-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: .14em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 8px;
  }
  #${CONTAINER_ID} .hero-title { font-size: 28px; font-weight: 600; color: #fff; line-height: 1.25; max-width: 480px; }
  #${CONTAINER_ID} .hero-sub { font-size: 14px; color: rgba(255,255,255,0.45); margin-top: 6px; max-width: 440px; }

  #${CONTAINER_ID} .main { max-width: 760px; width: 100%; margin: 0 auto; padding: 2rem 1.5rem 4rem; flex: 1; }

  #${CONTAINER_ID} .progress { display: flex; align-items: center; margin-bottom: 2rem; }
  #${CONTAINER_ID} .p-step { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 500; color: var(--text-3); }
  #${CONTAINER_ID} .p-step.active { color: var(--text); }
  #${CONTAINER_ID} .p-step.done { color: var(--text-2); }
  #${CONTAINER_ID} .p-num {
    width: 24px; height: 24px; border-radius: 50%; font-size: 11px; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    background: #e4e4e8; color: var(--text-3); flex-shrink: 0;
  }
  #${CONTAINER_ID} .p-step.active .p-num { background: var(--dark); color: #fff; }
  #${CONTAINER_ID} .p-step.done .p-num { background: #16a34a; color: #fff; }
  #${CONTAINER_ID} .p-line { flex: 1; max-width: 40px; height: 1px; background: #d8d8de; margin: 0 6px; }

  #${CONTAINER_ID} .sect-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  #${CONTAINER_ID} .sect-hint { font-size: 12px; color: var(--text-3); margin-bottom: 16px; display: flex; align-items: center; gap: 5px; }
  #${CONTAINER_ID} .sect-hint i { color: var(--gold); }

  #${CONTAINER_ID} .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  #${CONTAINER_ID} .grid1 { display: grid; grid-template-columns: 1fr; gap: 6px; }

  #${CONTAINER_ID} .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: .9rem 1.1rem; cursor: pointer; transition: border-color .15s, background .15s, transform .12s;
    text-align: left; position: relative; width: 100%;
  }
  #${CONTAINER_ID} .card:hover { border-color: var(--border-2); transform: translateY(-1px); }
  #${CONTAINER_ID} .card.sel { border-color: var(--gold); background: var(--gold-pale); }
  #${CONTAINER_ID} .check-ring {
    position: absolute; top: 10px; right: 10px; width: 18px; height: 18px; border-radius: 50%;
    border: 1.5px solid var(--border-2); display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: transparent; background: transparent; transition: all .15s;
  }
  #${CONTAINER_ID} .card.sel .check-ring { border-color: var(--gold); background: var(--gold); color: #000; }
  #${CONTAINER_ID} .card-icon { font-size: 20px; color: var(--text-3); margin-bottom: 8px; }
  #${CONTAINER_ID} .card.sel .card-icon { color: var(--gold); }
  #${CONTAINER_ID} .card-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; padding-right: 22px; line-height: 1.3; }
  #${CONTAINER_ID} .card-sub { font-size: 12px; color: var(--text-2); line-height: 1.4; }

  #${CONTAINER_ID} .cat-label {
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em;
    color: var(--text-2); margin-bottom: 8px; margin-top: 6px; display: flex; align-items: center; gap: 5px;
  }

  #${CONTAINER_ID} .back-btn {
    background: none; border: none; font-size: 12px; font-family: 'Inter', sans-serif;
    color: var(--text-2); cursor: pointer; padding: 0; display: flex; align-items: center;
    gap: 4px; margin-bottom: 1.5rem; transition: color .12s;
  }
  #${CONTAINER_ID} .back-btn:hover { color: var(--text); }

  #${CONTAINER_ID} .cta { margin-top: 18px; display: flex; align-items: center; gap: 12px; }
  #${CONTAINER_ID} .btn-primary {
    background: var(--dark); color: #fff; border: none; padding: 10px 22px;
    border-radius: var(--radius-sm); font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; display: flex; align-items: center;
    gap: 6px; transition: opacity .15s;
  }
  #${CONTAINER_ID} .btn-primary:disabled { opacity: .3; cursor: default; }
  #${CONTAINER_ID} .btn-primary:not(:disabled):hover { opacity: .82; }
  #${CONTAINER_ID} .cta-count { font-size: 12px; color: var(--text-3); }

  #${CONTAINER_ID} .results { display: flex; flex-direction: column; gap: 12px; }
  #${CONTAINER_ID} .res-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  #${CONTAINER_ID} .res-head {
    background: var(--dark); padding: 1.1rem 1.4rem;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  }
  #${CONTAINER_ID} .res-name { font-size: 22px; font-weight: 700; color: #fff; letter-spacing: .02em; }
  #${CONTAINER_ID} .res-tagline { font-size: 11px; color: rgba(255,255,255,.38); margin-top: 2px; font-weight: 400; }
  #${CONTAINER_ID} .res-badge {
    background: var(--gold); color: #000; font-size: 10px; font-weight: 700;
    letter-spacing: .04em; padding: 3px 10px; border-radius: 20px; white-space: nowrap;
    margin-top: 4px; flex-shrink: 0;
  }
  #${CONTAINER_ID} .res-body { padding: 1.1rem 1.4rem; }
  #${CONTAINER_ID} .claim {
    border-left: 2px solid var(--gold); padding: .65rem .9rem;
    border-radius: 0 6px 6px 0; background: var(--surface-2); margin-bottom: 1.1rem;
  }
  #${CONTAINER_ID} .claim-text { font-size: 13px; font-weight: 600; color: var(--text); }
  #${CONTAINER_ID} .sec-label {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: .09em; color: var(--text-3); margin-bottom: 8px;
  }
  #${CONTAINER_ID} .prob-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1.1rem; }
  #${CONTAINER_ID} .prob-item { font-size: 12px; color: var(--text); display: flex; align-items: flex-start; gap: 7px; line-height: 1.4; }
  #${CONTAINER_ID} .prob-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); margin-top: 5px; flex-shrink: 0; }
  #${CONTAINER_ID} .prob-item strong { font-weight: 600; }
  #${CONTAINER_ID} .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 1.1rem; }
  #${CONTAINER_ID} .tag { font-size: 11px; padding: 3px 9px; border-radius: 20px; border: 1px solid var(--border); color: var(--text-2); background: var(--surface-2); }
  #${CONTAINER_ID} .res-link {
    display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500;
    font-family: 'Inter', sans-serif; color: var(--text); text-decoration: none;
    border: 1px solid var(--border-2); padding: 7px 14px; border-radius: var(--radius-sm);
    transition: border-color .15s, background .15s;
  }
  #${CONTAINER_ID} .res-link:hover { background: var(--surface-2); }

  #${CONTAINER_ID} .demo-box {
    margin-top: 28px;
    background: var(--dark);
    border-radius: var(--radius);
    padding: 1.5rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  #${CONTAINER_ID} .demo-box-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: .12em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 4px;
  }
  #${CONTAINER_ID} .demo-box-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 3px; }
  #${CONTAINER_ID} .demo-box-sub { font-size: 12px; color: rgba(255,255,255,0.4); }
  #${CONTAINER_ID} .btn-demo {
    background: var(--gold); color: #000; border: none;
    padding: 11px 22px; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif;
    cursor: pointer; text-decoration: none; display: inline-flex;
    align-items: center; gap: 6px; white-space: nowrap; transition: opacity .15s;
    flex-shrink: 0;
  }
  #${CONTAINER_ID} .btn-demo:hover { opacity: .88; }

  #${CONTAINER_ID} .btn-restart {
    background: none; border: 1px solid var(--border); color: var(--text-2);
    padding: 9px 18px; border-radius: var(--radius-sm); font-size: 12px;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color .15s, color .15s;
  }
  #${CONTAINER_ID} .btn-restart:hover { border-color: var(--border-2); color: var(--text); }

  @media (max-width: 560px) {
    #${CONTAINER_ID} .grid2 { grid-template-columns: 1fr; }
    #${CONTAINER_ID} .hero-title { font-size: 22px; }
    #${CONTAINER_ID} .main { padding: 1.5rem 1rem 3rem; }
    #${CONTAINER_ID} .demo-box { flex-direction: column; align-items: flex-start; }
  }
  `
  );

  // Mount HTML skeleton (adapted from body)
  mount.innerHTML = `
    <div class="page">
      <nav>
        <div class="nav-logo"></div>
      </nav>

      <div class="hero">
        <div class="main" style="padding-top:0;padding-bottom:0">
          <div class="hero-eyebrow">Solution Finder</div>
          <div class="hero-title">Which solution fits your construction site?</div>
          <div class="hero-sub">Select your challenges – we'll recommend the right products.</div>
        </div>
      </div>

      <div class="main">
        <div class="progress" id="sf-prog"></div>
        <div id="sf-app"></div>
      </div>
    </div>
  `;

  // --- Your App JS (adapted: scoped IDs + function names)
  const cats = [
    {id:'q',icon:'ti-layers-difference',title:'Concrete Quality & Defects',sub:'Surfaces, voids, cracks',problems:[
      {id:'q1',title:'Honeycombing',short:'Voids caused by insufficient compaction',p:'PHONO'},
      {id:'q2',title:'Air voids & porosity',short:'Reduced density and structural strength',p:'PHONO'},
      {id:'q3',title:'Architectural concrete defects',short:'Stains, blemishes, uneven surfaces',p:'PHONO'},
      {id:'q4',title:'Shrinkage cracks & crazing',short:'Micro-cracks from rapid moisture loss at surface',p:'TEMO'},
      {id:'q5',title:'Thermal cracks',short:'Temperature differential >20 °C between core and surface',p:'TEMO'},
      {id:'q6',title:'Capillary pores & moisture ingress',short:'High w/c ratio increases frost-thaw damage',p:'SONO'},
    ]},
    {id:'w',icon:'ti-cloud-storm',title:'Weather & Site Conditions',sub:'Frost, heat, moisture',problems:[
      {id:'w1',title:'Winter concreting / frost',short:'Hydration slows or stops due to freezing',p:'TEMO'},
      {id:'w2',title:'Mass concrete & heat of hydration',short:'Dangerous temperature gradients in large elements',p:'TEMO'},
      {id:'w3',title:'Hot weather concreting',short:'Shrinkage cracks from rapid evaporation',p:'TEMO'},
      {id:'w4',title:'Variable aggregate moisture',short:'Uncontrolled w/c ratio deviations',p:'SONO'},
      {id:'w5',title:'Rain on fresh concrete',short:'Elevated w/c ratio, washed-out surface',p:'SONO'},
      {id:'w6',title:'SCC-specific risks',short:'Higher fresh concrete pressure, temperature-sensitive',p:'PREMO'},
    ]},
    {id:'s',icon:'ti-layout-board',title:'Formwork Safety',sub:'Fresh concrete pressure, blowout',problems:[
      {id:'s1',title:'Formwork failure / blowout',short:'Fresh concrete pressure exceeds formwork capacity',p:'PREMO'},
      {id:'s2',title:'Bulging',short:'Permanent deformation from local pressure overload',p:'PREMO'},
      {id:'s3',title:'Bottom-up pumping / one-sided formwork',short:'Unpredictable pressure peaks during placing',p:'PREMO'},
      {id:'s4',title:'Tall walls & columns',short:'Hydrostatic pressure hard to calculate without measurement',p:'PREMO'},
      {id:'s5',title:'Conservative placing speed',short:'Unnecessary time loss without real-time pressure data',p:'PREMO'},
      {id:'s6',title:'Special formwork (tunnels, bridges)',short:'Complex geometries with hard-to-predict pressure profiles',p:'PREMO'},
    ]},
    {id:'z',icon:'ti-clock-play',title:'Time Loss & Efficiency',sub:'Cycle times, stripping, documentation',problems:[
      {id:'z1',title:'Wrong stripping time',short:'Too early: structural damage – too late: unnecessary delays',p:'TEMO'},
      {id:'z2',title:'Post-tensioning too early / too late',short:'Cracks due to insufficient in-situ strength',p:'TEMO'},
      {id:'z3',title:'Conservative lab cube results',short:'Cube strength ≠ actual in-situ strength',p:'TEMO'},
      {id:'z4',title:'Slow cycle times',short:'Unclear strength development delays climbing systems',p:'TEMO'},
      {id:'z5',title:'Missing documentation & compliance records',short:'Liability risks and non-conformity issues',p:'TEMO'},
    ]},
  ];

  const prods = {
    TEMO:{claim:'Up to 30% faster stripping with the Maturity Method.',tags:['Temperature monitoring','Maturity monitoring','Stripping optimization'],url:'https://vemaventuri.io/temo-concrete-temperature-and-maturity-monitoring',tagline:'Temperature & Maturity Monitoring'},
    PREMO:{claim:'Up to 25% faster concrete placing.',tags:['Fresh concrete pressure','Formwork safety','Real-time monitoring'],url:'https://vemaventuri.io/premo-concrete-pressure-monitoring',tagline:'Pressure Monitoring'},
    PHONO:{claim:'Save costs on expensive rework.',tags:['Compaction monitoring','Concrete detection','Quality assurance'],url:'https://vemaventuri.io/phono-concrete-detection-and-compaction-monitoring',tagline:'Detection & Compaction Monitoring'},
    SONO:{claim:'Ensure your concrete quality.',tags:['w/c ratio control','Moisture measurement','Fresh concrete analysis'],url:'https://vemaventuri.io/sono-water-content-determination-of-fresh-concrete',tagline:'Water Content Determination'},
  };

  let step = 1, selCats = new Set(), selProbs = new Set();

  function q(sel) { return mount.querySelector(sel); }

  function prog() {
    const labels = ['Area','Problem','Solution'];
    q('#sf-prog').innerHTML = labels.map((l,i) => {
      const n = i + 1;
      let cls = 'p-step';
      if (n < step) cls += ' done';
      else if (n === step) cls += ' active';
      const num = n < step ? '<i class="ti ti-check" style="font-size:11px"></i>' : n;
      return `${i ? '<div class="p-line"></div>' : ''}<div class="${cls}"><span class="p-num">${num}</span>${l}</div>`;
    }).join('');
  }

  function render() {
    prog();
    const app = q('#sf-app');

    if (step === 1) {
      app.innerHTML = `
        <div class="sect-q">What are your biggest challenges on site?</div>
        <div class="sect-hint"><i class="ti ti-checks"></i> Multiple selection possible</div>
        <div class="grid2">
          ${cats.map(c => `
            <button class="card${selCats.has(c.id) ? ' sel' : ''}" onclick="sf_tog1('${c.id}')">
              <span class="check-ring"><i class="ti ti-check"></i></span>
              <div class="card-icon"><i class="ti ${c.icon}"></i></div>
              <div class="card-title">${c.title}</div>
              <div class="card-sub">${c.sub}</div>
            </button>`).join('')}
        </div>
        <div class="cta">
          <button class="btn-primary" onclick="sf_go(2)" ${selCats.size ? '' : 'disabled'}>
            Next <i class="ti ti-arrow-right"></i>
          </button>
          ${selCats.size ? `<span class="cta-count">${selCats.size} area${selCats.size > 1 ? 's' : ''} selected</span>` : ''}
        </div>
      `;
    } else if (step === 2) {
      const fc = cats.filter(c => selCats.has(c.id));
      app.innerHTML = `
        <button class="back-btn" onclick="sf_go(1)"><i class="ti ti-arrow-left"></i> Back</button>
        <div class="sect-q">Which specific problems apply to you?</div>
        <div class="sect-hint"><i class="ti ti-checks"></i> Multiple selection possible</div>
        <div style="display:flex;flex-direction:column;gap:20px">
          ${fc.map(cat => `
            <div>
              <div class="cat-label"><i class="ti ${cat.icon}"></i>${cat.title}</div>
              <div class="grid1">
                ${cat.problems.map(p => `
                  <button class="card${selProbs.has(p.id) ? ' sel' : ''}" onclick="sf_tog2('${p.id}')">
                    <span class="check-ring"><i class="ti ti-check"></i></span>
                    <div class="card-title">${p.title}</div>
                    <div class="card-sub">${p.short}</div>
                  </button>`).join('')}
              </div>
            </div>`).join('')}
        </div>
        <div class="cta" style="margin-top:18px">
          <button class="btn-primary" onclick="sf_go(3)" ${selProbs.size ? '' : 'disabled'}>
            Show solution <i class="ti ti-arrow-right"></i>
          </button>
          ${selProbs.size ? `<span class="cta-count">${selProbs.size} problem${selProbs.size > 1 ? 's' : ''} selected</span>` : ''}
        </div>
      `;
    } else {
      const map = {};
      cats.forEach(c => c.problems.forEach(p => {
        if (selProbs.has(p.id)) {
          if (!map[p.p]) map[p.p] = [];
          map[p.p].push(p);
        }
      }));
      const keys = Object.keys(map);

      app.innerHTML = `
        <button class="back-btn" onclick="sf_go(2)"><i class="ti ti-arrow-left"></i> Back</button>
        <div class="sect-q" style="margin-bottom:14px">Your recommendation${keys.length>1?'s':''} — ${keys.length} product${keys.length>1?'s':''}</div>
        <div class="results">
          ${keys.map(k => {
            const pr = prods[k], ps = map[k];
            return `<div class="res-card">
              <div class="res-head">
                <div>
                  <div class="res-name">${k}</div>
                  <div class="res-tagline">${pr.tagline}</div>
                </div>
                <span class="res-badge">${ps.length} problem${ps.length>1?'s':''} solved</span>
              </div>
              <div class="res-body">
                <div class="claim"><div class="claim-text">${pr.claim}</div></div>
                <div class="sec-label">Problems addressed</div>
                <div class="prob-list">
                  ${ps.map(p => `
                    <div class="prob-item">
                      <div class="prob-dot"></div>
                      <span><strong>${p.title}</strong> — ${p.short}</span>
                    </div>`).join('')}
                </div>
                <div class="tags">${pr.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <a class="res-link" href="${pr.url}" target="_blank" rel="noopener">
                  Learn more <i class="ti ti-arrow-right" style="font-size:11px"></i>
                </a>
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="demo-box">
          <div class="demo-box-text">
            <div class="demo-box-eyebrow">Ready to get started?</div>
            <div class="demo-box-title">See it live on your construction site.</div>
            <div class="demo-box-sub">Book a free demo – our experts will walk you through the right setup.</div>
          </div>
          <a class="btn-demo" href="https://vemaventuri.io/schedule-a-demo" target="_blank" rel="noopener">
            Book a demo <i class="ti ti-calendar"></i>
          </a>
        </div>

        <div class="cta" style="margin-top:14px">
          <button class="btn-restart" onclick="sf_reset()">Start over</button>
        </div>
      `;
    }
  }

  // Expose functions for onclick handlers
  window.sf_tog1 = function (id) { selCats.has(id) ? selCats.delete(id) : selCats.add(id); render(); };
  window.sf_tog2 = function (id) { selProbs.has(id) ? selProbs.delete(id) : selProbs.add(id); render(); };
  window.sf_go   = function (n)  { step = n; render(); };
  window.sf_reset= function ()   { step = 1; selCats = new Set(); selProbs = new Set(); render(); };

  render();
})();
``
