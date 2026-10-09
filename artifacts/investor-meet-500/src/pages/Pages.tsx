import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';
import { CTA, PageHero, SectionHeading } from '@/components/SiteShell';
import { partnerCategories, participantGroups, schedule, speakers, speakerCategories, sponsorTiers, statistics, tracks } from '@/data/content';

const APPLICATION_DRAFT_KEY = 'investor-meet-500-application-draft';
const CONSULTATION_DRAFT_KEY = 'investor-meet-500-consultation-draft';
const CONSULTATION_REQUESTS_KEY = 'investor-meet-500-consultation-requests';

function readBrowserJson<T>(key: string, fallback: T): T {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeBrowserJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeBrowserKey(key: string) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function downloadBrowserJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function StatsBand() {
  return <section className="section compact alt"><div className="im-container"><ul className="stats" aria-label="Summit at a glance">{statistics.map(item => <li className="stat" key={item.label}><strong style={item.compact ? { fontSize: 'clamp(20px,2.5vw,32px)' } : undefined}>{item.value}</strong><span>{item.label}</span></li>)}</ul></div></section>;
}

function InfoCards({ items, columns }: { items: { title: string; copy: string }[]; columns?: string }) {
  return <div className="card-grid" style={columns === '2' ? { gridTemplateColumns: 'repeat(2,minmax(0,1fr))' } : undefined}>{items.map((item, index) => <article className="info-card" key={item.title}><span className="card-index">0{index + 1} / OPPORTUNITY</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>;
}

export function HomePage() {
  const [homeHall, setHomeHall] = useState('All halls');
  const [mapOpen, setMapOpen] = useState(false);
  const featuredSchedule = useMemo(() => schedule.filter(item => {
    if (homeHall === 'All halls') return true;
    if (homeHall === 'Hall 1') return ['Main hall', 'Halls 1–3', 'All halls', 'Welcome area'].includes(item.hall);
    if (homeHall === 'Hall 2') return ['Halls 1–3', 'All halls'].includes(item.hall);
    if (homeHall === 'Hall 3') return ['Halls 1–3', 'All halls'].includes(item.hall);
    return ['Financial area'].includes(item.hall);
  }), [homeHall]);
  return <>
    <section className="im-hero"><div className="im-container im-hero-inner"><div className="hero-copy">
      <p className="hero-kicker">An investment summit with purpose</p>
      <h1 className="hero-title">Where capital<br /><em>meets opportunity.</em></h1>
      <p className="hero-sub">Investor Meet 500 brings startups, entrepreneurs, investors, banks and business decision-makers into one room for a day of focused conversations and meaningful connections.</p>
      <div className="hero-actions"><Link href="/apply" className="im-btn" data-testid="link-apply-pitch">Apply to pitch <ArrowRight size={15} /></Link><Link href="/investors" className="im-btn outline" data-testid="link-home-investor">Become an investor</Link><Link href="/about" className="text-link" style={{ marginLeft: 8 }} data-testid="link-home-about">Explore the event <ArrowRight size={14} /></Link></div>
      <p className="hero-meta">Event date <strong>To be announced</strong><span aria-hidden="true">·</span> Venue <strong>To be announced</strong></p>
    </div></div><span className="hero-index">ONE DAY · FIVE TRACKS · 500 PARTICIPANTS</span></section>
    <StatsBand />
    <section className="section"><div className="im-container split">
      <div className="editorial-image"><img src="/images/about-audience.jpg" alt="Founders and investors gathered in a conference hall" loading="lazy" /><span className="image-caption">A working floor for capital and ambition</span></div>
      <div><SectionHeading eyebrow="The summit" title={<>A room built for capital to meet <em>ambition.</em></>} lead="Investor Meet 500 is a premium platform connecting startups, entrepreneurs, banks and investors to create meaningful partnerships, drive innovation and accelerate growth." />
        <ul className="feature-list"><li>Investment opportunities</li><li>Banking opportunities</li><li>Business connections</li><li>Business expansion</li><li>Startup access</li><li>Investor access</li><li>Funding opportunities</li><li>Focused networking</li></ul>
        <Link href="/about" className="im-btn outline" data-testid="link-about-from-home">About the summit <ArrowRight size={14} /></Link>
      </div>
    </div></section>
    <section className="section paper"><div className="im-container"><SectionHeading eyebrow="Capital, in context" title={<>Five tracks. One <em>funding landscape.</em></>} lead="Five dedicated routes bring equity and structured debt into the same high-intent setting. Each track is designed around a different business requirement." />
      <div className="track-grid">{tracks.map(item => <article className="track-card" key={item.number}><div className="track-image"><img src={item.image} alt={item.alt} loading="lazy" /><span className="track-number">{item.number}</span></div><div className="track-body"><h3>{item.title}</h3><p>{item.description}</p><div className="track-foot"><span>{item.focus}</span><span>Five-track programme</span></div><Link href="/tracks" className="text-link" data-testid={`link-track-details-${item.number}`}>Track details <ArrowRight size={14} /></Link></div></article>)}</div>
      <Link href="/tracks" className="im-btn outline" style={{ marginTop: 26 }} data-testid="link-all-tracks-home">Explore all tracks <ArrowRight size={15} /></Link>
    </div></section>
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Choose your way in" title={<>A place for every side of the <em>conversation.</em></>} lead="Whether you are raising, investing, lending or creating the conditions for growth, your role has a defined path into the summit." />
      <div className="path-grid">{[
        { title: 'Startups', id: '/startups', img: '/images/path-startups.jpg', copy: 'Bring the business you are building to the capital that can help it grow.' },
        { title: 'Investors', id: '/investors', img: '/images/path-investors.jpg', copy: 'Meet prepared opportunities across equity, debt and business expansion.' },
        { title: 'Sponsors', id: '/sponsors', img: '/images/path-sponsors.jpg', copy: 'Associate your organization with a focused investment platform.' },
      ].map(card => <Link key={card.title} href={card.id} className="path-card" data-testid={`link-home-path-${card.title.toLowerCase()}`}><img src={card.img} alt="" loading="lazy" /><div className="path-content"><small>Participation pathway</small><h3>{card.title}</h3><p>{card.copy}</p><span className="text-link">Discover your path <ArrowRight size={14} /></span></div></Link>)}</div>
    </div></section>
    <section className="section paper"><div className="im-container"><SectionHeading eyebrow="Partner with impact" title={<>A clear place to stand behind <em>business growth.</em></>} lead="Six published sponsor tiers give organizations a starting point for a considered conversation. Packages, inventory and deliverables remain subject to confirmation." />
      <div className="tier-grid">{sponsorTiers.map((tier,index)=><article className={`tier ${index===0?'featured':''}`} key={tier.title}><span className="muted-label">TIER 0{index+1}</span><h3>{tier.title}</h3><strong>{tier.price}</strong><p className="section-lead" style={{fontSize:13,margin:'0 0 12px'}}>{tier.note}</p><Link className="im-btn small outline" href="/consultation" data-testid={`link-home-sponsor-${index+1}`}>Explore tier <ArrowRight size={13}/></Link></article>)}</div>
      <p className="notice" style={{marginTop:18}}>Sponsor pricing is published as provided. No sponsor, package availability or deliverable has been confirmed.</p>
    </div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Our partners" title={<>A broad ecosystem. <em>No names assumed.</em></>} lead="The summit is designed to welcome organizations that can contribute to a stronger business and investment ecosystem. Partner identities are not yet confirmed." />
      <div className="card-grid">{partnerCategories.map((category,index)=><article className="info-card" key={category}><span className="card-index">CATEGORY 0{index+1}</span><h3>{category}</h3><p>Participation is open for discussion. No organization in this category is represented as a confirmed partner.</p><span className="badge">To be announced</span></article>)}</div>
      <div style={{marginTop:26}}><Link href="/partners" className="text-link" data-testid="link-home-partners">Explore partner categories <ArrowRight size={14}/></Link></div>
    </div></section>
    <section className="section compact" style={{background:'#07111d'}}><div className="im-container split">
      <div><SectionHeading eyebrow="The next chapter" title={<>Your next opportunity <em>starts here.</em></>} lead="Bring a clear business case. Find the right pathway. Start a conversation that can continue beyond the summit." />
        <div className="hero-actions"><Link href="/apply" className="im-btn" data-testid="link-home-final-apply">Apply to pitch <ArrowRight size={14}/></Link><Link href="/investors" className="im-btn outline" data-testid="link-home-final-investor">For investors</Link><Link href="/sponsors" className="im-btn outline" data-testid="link-home-final-sponsor">Sponsor the summit</Link></div>
      </div>
      <div><span className="eyebrow">Case-study references</span><div className="mini-case-grid">{['TNSI 2024','Startup TN','TE Chennai','The Chennai Angels'].map((name,index)=><article className="mini-case" key={name}><strong>{name}</strong><span>Reference {String(index+1).padStart(2,'0')}</span></article>)}</div><p className="form-notice">Names shown as case-study references only; no affiliation, endorsement or participation at Investor Meet 500 is implied.</p></div>
    </div></section>
    <section className="section paper"><div className="im-container"><SectionHeading eyebrow="Speaker directory" title={<>Ideas from across the <em>business landscape.</em></>} lead="No speaker bookings have been confirmed. Names and affiliations will be added only after confirmation." />
      <div className="home-speaker-strip">{speakers.slice(0,4).map((speaker,index)=><article className="home-speaker" key={speaker.category}><b>0{index+1}</b><strong>Announcement pending</strong><span>{speaker.category} · speaker to be confirmed</span></article>)}</div>
      <Link href="/speakers" className="text-link" data-testid="link-home-speakers">Browse speaker directory <ArrowRight size={14}/></Link>
    </div></section>
    <section className="section"><div className="im-container home-women"><div className="home-women-copy"><span className="eyebrow">Women entrepreneurs</span><h2 className="section-title">Ambition deserves <em>room to grow.</em></h2><p className="section-lead">An open invitation to women-led businesses across manufacturing, distribution, technology and services to explore relevant capital pathways.</p><Link href="/women-entrepreneurs" className="im-btn" data-testid="link-home-women">Explore opportunities <ArrowRight size={14}/></Link></div></div></section>
    <section className="section global-band"><div className="im-container"><SectionHeading eyebrow="Global opportunities" title={<>Tamil Nadu, in conversation <em>with the world.</em></>} lead="A proposed platform for globally minded companies and institutions to explore connections. International participants and affiliations are not yet confirmed." />
      <div className="global-paths">{['Investors','Companies','Fund-level approach','Strategic alliances'].map((item,index)=><div className="global-path" key={item}><small>Pathway 0{index+1}</small>{item}</div>)}</div>
      <Link href="/global-opportunities" className="im-btn outline" style={{marginTop:28}} data-testid="link-home-global">Explore global opportunities <ArrowRight size={14}/></Link>
    </div></section>
    <section className="section paper"><div className="im-container split"><div><SectionHeading eyebrow="Guidance & consultation" title={<>A clearer first step for your <em>next big move.</em></>} lead="Explore first-level guidance around a pitch deck, project financial plan, funding structure or a specific business case." />
      <ul className="plain-list">{['Pitch deck and investor readiness','Project financial plan','Financial experts and funding structure','Project areas and specific cases'].map(item=><li key={item}>{item}</li>)}</ul>
      <Link href="/consultation" className="im-btn" data-testid="link-home-consultation">Explore guidance <ArrowRight size={14}/></Link><p className="form-notice">Requests can be saved in your browser only; they are not delivered to event organizers.</p>
    </div><div className="editorial-image"><img src="/images/card-expansion.jpg" alt="Business leaders discussing an expansion plan" loading="lazy"/><span className="image-caption">Guidance details to be confirmed</span></div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Event schedule" title={<>One day. From 8am to <em>6pm.</em></>} lead="The planned programme creates space for arrival, pitches, investor meetings and follow-through. Times and hall assignments remain subject to confirmation." />
      <div className="hall-tabs" role="group" aria-label="Filter schedule by hall">{['All halls','Hall 1','Hall 2','Hall 3','Financial area'].map(hall=><button key={hall} type="button" aria-pressed={homeHall===hall} onClick={()=>setHomeHall(hall)} data-testid={`home-schedule-filter-${hall.toLowerCase().replaceAll(' ','-')}`}>{hall}</button>)}</div>
      {featuredSchedule.map((item)=><article className="schedule-row" key={item.time}><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.detail}</p></div><span>{item.hall}</span></article>)}
      {homeHall==='Financial area' && featuredSchedule.length===0 && <p className="notice">Financial-area session assignments are to be announced.</p>}
      <div style={{marginTop:24}}><Link href="/schedule" className="im-btn outline" data-testid="link-home-schedule">View full schedule <ArrowRight size={14}/></Link></div>
    </div></section>
    <section className="section paper"><div className="im-container split"><div><SectionHeading eyebrow="The venue" title={<>Three halls. One shared <em>purpose.</em></>} lead="A three-hall venue and financial interaction area are planned. The event date, city, venue identity and travel details are to be announced." />
      <p className="notice">Event date: To be announced · Venue: To be announced</p><div className="hero-actions"><Link href="/venue" className="im-btn" data-testid="link-home-venue">Venue information <ArrowRight size={14}/></Link><button type="button" className="im-btn outline" onClick={()=>setMapOpen(true)} data-testid="button-home-map">View full map</button></div>
    </div><div className="venue-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>{['Hall 1','Hall 2','Hall 3','Financial area'].map((title,index)=><div className="venue-cell" key={title}><strong>{title}</strong><span>{index===3?'Interaction space':'Track and programme space'} · details to be announced</span></div>)}</div></div></section>
    {mapOpen && <MapExplanationDialog onClose={()=>setMapOpen(false)} />}
  </>;
}

export function AboutPage() {
  const why = [
    { title: 'Pre-validated participation', copy: 'The event is designed around considered preparation so decision-makers can spend their time on relevant business conversations.' },
    { title: 'Five dedicated tracks', copy: 'Startups, business loans, expansion, bank loans and mixed requirements each have a defined route through the summit.' },
    { title: 'Equity and debt together', copy: 'The format recognizes that growth can call for equity, structured debt, banking relationships or a combination of these.' },
    { title: 'Built around follow-through', copy: 'Pitches begin a conversation. Investor meetings and clear next steps help participants continue it after the event.' },
  ];
  return <>
    <PageHero eyebrow="About the summit" title={<>A working floor for <em>capital and ambition.</em></>} lead="One day, five investment tracks and three halls. Investor Meet 500 is built to bring fundable businesses and relevant decision-makers into focused conversation." />
    <StatsBand />
    <section className="section"><div className="im-container split"><div><SectionHeading eyebrow="Who we are" title={<>About <em>Investor Meet 500.</em></>} lead="Investor Meet 500 is a one-day, high-impact investor summit connecting startups, entrepreneurs, banks, investors and financial institutions. It is a platform for meaningful partnerships, innovation and growth—not simply a room of introductions." />
      <p className="section-lead">Across three halls and five investment tracks, the summit plans to bring 500 participants together around funding requirements from ₹50 Lakhs to ₹500 Cr. Its structure gives business owners, financial institutions and capital providers a shared place to explore what comes next.</p><Link href="/tracks" className="text-link" data-testid="link-about-tracks">See the investment tracks <ArrowRight size={14} /></Link>
    </div><div className="editorial-image"><img src="/images/about-audience.jpg" alt="Audience in a summit hall" loading="lazy" /><span className="image-caption">One day · Three halls · Five tracks</span></div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="The difference" title={<>Designed for the <em>conversation after the pitch.</em></>} lead="Qualification, relevant tracks and time for direct interaction shape a day where participants can focus on useful next steps." /><InfoCards items={why} /></div></section>
    <section className="section"><div className="im-container split"><div><SectionHeading eyebrow="Our objective" title={<>Shorten the distance between a business and the capital it <em>needs.</em></>} />
      <ul className="plain-list"><li><strong>Unlock capital.</strong> Connect businesses with investors, banks and financial institutions across the published ₹50 Lakhs–₹500 Cr. funding range.</li><li><strong>Qualify the floor.</strong> Bring preparation and relevant funding tracks into participant conversations.</li><li><strong>Widen access.</strong> Make room for startups, MSMEs and expanding businesses alongside larger enterprises.</li><li><strong>Build partnerships.</strong> Create space for joint ventures, vendor relationships and institutional ties.</li><li><strong>Support growth.</strong> Connect funding discussions to working capital, capacity and new-market ambitions.</li></ul></div>
      <div className="editorial-image"><img src="/images/card-expansion.jpg" alt="Business leaders collaborating around an expansion plan" loading="lazy" /><span className="image-caption">Practical conversations. Shared ambition.</span></div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Who should participate" title={<>If your next stage needs capital—or your capital needs a pipeline—<em>this is your room.</em></>} lead="The summit is designed for a broad business community, with structured routes for both capital seekers and capital providers." /><InfoCards items={participantGroups} /></div></section>
    <CTA title="A better conversation starts with preparation." text="Explore your track, audience and event-day pathway." />
    <section className="section compact" id="event-policies"><div className="im-container"><SectionHeading eyebrow="Event information" title={<>Policies and participation terms are <em>to be announced.</em></>} lead="No legal, privacy or payment/refund policy documents have been supplied or confirmed for publication yet." /><div className="card-grid">{[['Terms','To be announced'],['Privacy','To be announced'],['Payment / refund policy','To be announced']].map(([title, copy])=><article className="info-card" key={title}><span className="card-index">POLICY</span><h3>{title}</h3><p>{copy}. Please revisit this page for the confirmed policy information.</p></article>)}</div></div></section>
  </>;
}

export function TracksPage() {
  return <>
    <PageHero eyebrow="Five routes to funding" image="tracks" title={<>Five tracks. One day. <em>₹50 Lakhs to ₹500 Cr.</em></>} lead="Each route serves a different funding need, from startup equity to structured credit and expansion. Select the path that best describes what your business is seeking." />
    <StatsBand />
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Track overview" title={<>Find your funding <em>route.</em></>} lead="Each track sits within the published funding range. Selecting a route does not guarantee funding, approval or a meeting." /><div className="track-grid">{tracks.map(track => <article className="track-card" key={track.number}><div className="track-image"><img src={track.image} alt={track.alt} loading="lazy" /><span className="track-number">{track.number}</span></div><div className="track-body"><h3>{track.title}</h3><p>{track.description}</p><div className="track-foot"><span>{track.focus}</span><span>₹50 Lakhs–₹500 Cr.</span></div><p><strong>Best suited to</strong><br />{track.fit}</p><Link href="/apply" className="im-btn small" data-testid={`link-apply-track-${track.number}`}>Apply now <ArrowRight size={13} /></Link></div></article>)}</div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="How to choose" title={<>Match the need, not just the <em>label.</em></>} lead="The track is a starting point for the right conversation—not a funding decision. Consider your business stage, use of funds and preferred financing structure." /><div className="steps">{[['01','Describe the need','Be clear about the amount, purpose and timing of your funding requirement.'],['02','Choose the route','Select the closest fit across startup equity, business lending, expansion or mixed requirements.'],['03','Prepare the case','Bring a concise business profile and supporting financial context to validation.'],['04','Meet relevant capital','Use your pitch and scheduled conversations to explore potential fit and next steps.']].map(item => <article className="step-card" key={item[0]}><b>{item[0]}</b><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div></div></section>
    <CTA title="Know your route. Prepare your case." label="Start registration" />
  </>;
}

const audiencePages = {
  startups: {
    eyebrow: 'For founders', title: <>Bring your ambition to the <em>right room.</em></>, lead: 'A structured opportunity for founders seeking funding, investor access and focused conversations about what it takes to scale.',
    label: 'Apply to pitch', cards: [
      { title: 'Capital for the next stage', copy: 'Explore investment opportunities across five routes, with a published funding range from ₹50 Lakhs to ₹500 Cr.' },
      { title: 'A prepared pitch', copy: 'Present your product, traction, market and use of funds with the context investors need to assess fit.' },
      { title: 'Direct investor access', copy: 'Meet investors, banks and financial institutions in a format built for relevant conversations.' },
      { title: 'Useful connections', copy: 'Build relationships with business leaders, partners and peers beyond your funding conversation.' },
      { title: 'Clear process', copy: 'Move through registration, validation, track allocation, pitch sessions and follow-through.' },
      { title: 'Founder readiness', copy: 'Use the time before event day to clarify your business case and supporting financial materials.' },
    ],
    points: ['A clear product or service and customer problem', 'A defined capital requirement and intended use', 'Business, financial and pitch information ready for validation', 'Willingness to share accurate information with relevant participants'],
  },
  investors: {
    eyebrow: 'For investors', title: <>A sharper view of the <em>opportunity pipeline.</em></>, lead: 'Meet businesses across stages and funding needs in one structured setting—alongside banks, institutions and fellow capital providers.',
    label: 'Register interest', cards: [
      { title: 'Startup access', copy: 'Explore founders with early-stage ideas, growth plans and equity funding ambitions.' },
      { title: 'Business opportunities', copy: 'Engage with companies seeking working capital, expansion support and strategic partners.' },
      { title: 'Five focused tracks', copy: 'Move between startup, loan, expansion, bank-loan and mixed-loan routes.' },
      { title: 'Prepared conversations', copy: 'A validation-led process is intended to keep the floor relevant and purposeful.' },
      { title: 'Broader ecosystem', copy: 'Meet entrepreneurs, banks, financial institutions, sponsors and business leaders.' },
      { title: 'A day with structure', copy: 'Pitch sessions, investor meetings, financial discussions and networking across the day.' },
    ],
    points: ['Angel investors, family offices and individual investors', 'Venture, private equity and corporate investment teams', 'Banks, NBFCs and financial institutions', 'Strategic investors and business leaders'],
  },
};

export function AudiencePage({ kind }: { kind: keyof typeof audiencePages }) {
  const config = audiencePages[kind];
  return <>
    <PageHero eyebrow={config.eyebrow} title={config.title} lead={config.lead} image={kind === 'startups' ? 'tracks' : 'about'} />
    <StatsBand />
    <section className="section"><div className="im-container"><SectionHeading eyebrow={kind === 'startups' ? 'The founder case' : 'The investor case'} title={kind === 'startups' ? <>What founders gain from a focused capital conversation.</> : <>A credible setting for considered investment.</>} lead="The event is built around relevance, preparation and a clear path from first conversation to next step." /><InfoCards items={config.cards} /></div></section>
    <section className="section alt"><div className="im-container split"><div><SectionHeading eyebrow="Preparation" title={<>What to bring to the <em>conversation.</em></>} lead="Good conversations begin with clear information. The following guidance helps participants arrive prepared without implying a funding or admission outcome." /><ul className="plain-list">{config.points.map(item => <li key={item}><Check size={15} color="#d6b66f" /> {item}</li>)}</ul></div><div className="info-card"><span className="card-index">APPLICATION PROCESS</span><h3>From interest to a considered pitch</h3><p>Registration → validation → track assignment → pitch → investor conversations → follow-through.</p><p className="notice">The registration flow saves a draft in this browser only. It is not submitted or delivered to event organizers.</p><Link href="/apply" className="im-btn" data-testid={`link-${kind}-registration`}>Continue to registration <ArrowRight size={14} /></Link></div></div></section>
    <CTA label={config.label} />
  </>;
}

export function SponsorsPage() {
  return <>
    <PageHero eyebrow="Sponsor the summit" title={<>Be visible where business <em>moves forward.</em></>} lead="Associate your brand with a serious investment platform bringing founders, investors, financial institutions and business leaders together." />
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Sponsorship opportunities" title={<>A platform for lasting <em>visibility.</em></>} lead="Six published sponsorship tiers and prices provide a starting point. Detailed deliverables are indicative areas of visibility and remain subject to a confirmed sponsor agreement." /><div className="tier-grid">{sponsorTiers.map((tier, index) => <article className={`tier ${index === 0 ? 'featured' : ''}`} key={tier.title}><span className="muted-label">PARTNERSHIP TIER 0{index + 1}</span><h3>{tier.title}</h3><strong>{tier.price}</strong><p className="section-lead" style={{ fontSize: 13, margin: '0 0 12px' }}>{tier.note}</p><ul><li>Brand visibility across agreed event touchpoints</li><li>Digital and on-site presence, subject to final package</li><li>Opportunity for relevant business engagement</li></ul><Link href="/consultation" className="im-btn small outline" data-testid={`link-sponsor-tier-${index+1}`}>Enquire now <ArrowRight size={13} /></Link></article>)}</div><p className="notice" style={{ marginTop: 20 }}>Tier pricing is published as provided. Sponsorship inventory, deliverables, availability and contractual details are to be confirmed.</p></div></section>
    <section className="section alt"><div className="im-container split"><div><SectionHeading eyebrow="Partner with impact" title={<>Visibility built around <em>substance.</em></>} lead="Bring your organization closer to the conversations shaping investment, entrepreneurship and business growth." /><ul className="plain-list"><li>Brand placement across the agreed summit identity</li><li>Event and programme presence based on selected tier</li><li>Digital recognition in event communications</li><li>Relevant in-room visibility and networking opportunities</li><li>Engagement with a business-oriented participant community</li></ul></div><div className="editorial-image"><img src="/images/path-sponsors.jpg" alt="Leadership team meeting in a contemporary conference room" loading="lazy" /><span className="image-caption">Partner with purpose</span></div></div></section>
    <CTA title="Explore a sponsorship conversation." href="/consultation" label="Enquire now" />
  </>;
}

export function PartnersPage() {
  const categories = partnerCategories.map((category, index) => ({ title: category, copy: 'Partner identity and participation are to be announced. This category is open for relevant organizations to explore a conversation.' + (index === 0 ? ' Corporate participation may include business leaders and strategic organizations.' : '') }));
  return <>
    <PageHero eyebrow="Our partners" title={<>An ecosystem that makes <em>ambition possible.</em></>} lead="Investor Meet 500 welcomes institutions whose work strengthens access to capital, business capability and long-term growth." />
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Partner ecosystem" title={<>A place for aligned <em>institutions.</em></>} lead="Partner identities have not been confirmed. No organization shown here should be understood as a current sponsor or event partner." /><div className="card-grid">{categories.map((item,index)=><article className="info-card" key={item.title}><span className="card-index">CATEGORY 0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p><span className="badge">Partner to be announced</span></article>)}</div></div></section>
     <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Work with us" title={<>Bring your institution into the <em>conversation.</em></>} lead="Corporate, government, banking, technology, media and industry association partners are invited to explore participation." center /><div style={{ textAlign: 'center' }}><Link href="/consultation" className="im-btn" data-testid="link-partners-consultation">Explore partnership <ArrowRight size={14} /></Link></div></div></section>
    <CTA title="Partnerships begin with alignment." href="/consultation" label="Start a conversation" />
  </>;
}

export function SpeakersPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => speakers.filter(speaker => (category === 'All' || speaker.category === category) && `${speaker.name} ${speaker.title} ${speaker.category}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <>
    <PageHero eyebrow="Speakers" title={<>Ideas and experience for the <em>next decision.</em></>} lead="The summit programme will bring together people shaping investment, industry and entrepreneurship. Speaker announcements will appear here when confirmed." />
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Speaker directory" title={<>Voices from across the <em>investment landscape.</em></>} lead="No speaker bookings have been confirmed. This directory uses clear announcement placeholders rather than invented names or affiliations." />
      <label className="speaker-search"><span className="sr-only">Search speakers</span><input className="search-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search category or expertise" aria-label="Search speakers" data-testid="input-speaker-search" /></label>
      <div className="speaker-filter" role="group" aria-label="Filter speakers">{speakerCategories.map(item => <button type="button" key={item} className="filter-chip" aria-pressed={category === item} onClick={() => setCategory(item)} data-testid={`filter-speaker-${item.toLowerCase().replaceAll(' ','-')}`}>{item}</button>)}</div>
      <div className="card-grid">{filtered.map((speaker, index) => <article className="speaker-card" key={`${speaker.category}-${index}`}><div className="speaker-avatar" aria-hidden="true">{speaker.initials}</div><div><span className="badge">{speaker.category}</span><h3>{speaker.name}</h3><p>{speaker.title} · {speaker.company}</p><p>Location: To be announced</p></div></article>)}</div>
      {filtered.length === 0 && <p className="notice">No speaker placeholders match that search. Try another category.</p>}
    </div></section><CTA title="Interested in joining the programme?" href="/consultation" label="Register your interest" />
  </>;
}

export function WomenEntrepreneursPage() {
  const industries = ['Dealers & distributors', 'OEMs', 'Manufacturing', 'Brand owners', 'Technology services', 'Healthcare & services'];
  return <>
    <PageHero eyebrow="Women entrepreneurs" title={<>Ambition should have <em>room to grow.</em></>} lead="Investor Meet 500 welcomes women-led businesses across industries to explore capital, partnerships and the next stage of scale." image="tracks" />
    <section className="section"><div className="im-container split"><div><SectionHeading eyebrow="Access with intent" title={<>A broader view of women-led <em>enterprise.</em></>} lead="From manufacturing floors to digital services, women entrepreneurs are building companies with the capacity to grow, employ and reach new markets." /><p className="section-lead">The summit’s five funding routes provide a setting for women founders and business owners to discuss their requirements with investors, banks and financial institutions. Participation, eligibility and funding outcomes remain subject to review.</p><Link className="im-btn" href="/apply" data-testid="link-women-apply">Explore opportunities <ArrowRight size={14} /></Link></div><div className="editorial-image"><img src="/images/women-founder.jpg" alt="A woman entrepreneur discussing business with colleagues in a modern office" loading="lazy" /><span className="image-caption">Business leadership across every sector</span></div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Across sectors" title={<>Opportunity across the <em>economy.</em></>} lead="The participation landscape is broad by design. These are examples of business areas welcomed at the summit." /><div className="card-grid">{industries.map((industry,index)=><article className="info-card" key={industry}><span className="card-index">SECTOR 0{index+1}</span><h3>{industry}</h3><p>Explore capital access, institutional relationships and strategic connections relevant to your business.</p></article>)}</div></div></section>
    <CTA title="Bring your business into the room." label="Explore opportunities" />
  </>;
}

export function GlobalOpportunitiesPage() {
  return <>
    <PageHero eyebrow="Global opportunities" title={<>Connecting Tamil Nadu <em>to the world.</em></>} lead="A platform for international investors, companies and institutions to explore thoughtful routes into partnerships, funding and market connections." />
    <section className="section"><div className="im-container split"><div><SectionHeading eyebrow="A wider horizon" title={<>Local ambition. <em>International perspective.</em></>} lead="Investor Meet 500 aims to create a place for globally minded businesses and institutions to find relevant connections across regions and sectors." /><ul className="plain-list"><li><strong>International investors.</strong> Explore businesses and capital conversations connected to Tamil Nadu.</li><li><strong>International companies.</strong> Consider market access, suppliers, partnerships and expansion pathways.</li><li><strong>Fund-level opportunities.</strong> Discuss collaboration across capital structures and investment platforms.</li><li><strong>Strategic alliances.</strong> Build relationships that connect capability and market demand.</li><li><strong>Government opportunities.</strong> Explore institutional and public-sector engagement where relevant.</li></ul></div><div className="map-illustration" role="img" aria-label="Abstract global connections map illustrating Tamil Nadu's international business connections"><div className="map-center"><Globe2 size={44} strokeWidth={1} /><p>TAMIL NADU ↔ WORLD</p><span>Connections to be developed</span></div></div></div></section>
    <section className="section alt"><div className="im-container"><SectionHeading eyebrow="International pathways" title={<>Build the connection with <em>clarity.</em></>} lead="International participation details and affiliations are to be announced. No country, institution or investment partnership is represented as confirmed." /><InfoCards items={[{title:'Market entry',copy:'Explore first conversations around market access, local partners and regional opportunity.'},{title:'Strategic alliances',copy:'Connect complementary capabilities, distribution, manufacturing and technology.'},{title:'Capital relationships',copy:'Consider investment approaches and funding structures aligned with business needs.'}]} /></div></section>
    <CTA title="Explore global opportunities." label="Start a conversation" href="/consultation" />
  </>;
}

type ConsultationData = { name: string; company: string; email: string; phone: string; interest: string; time: string; message: string };
const blankConsultation: ConsultationData = { name: '', company: '', email: '', phone: '', interest: '', time: '', message: '' };

export function ConsultationPage() {
  const [data, setData] = useState<ConsultationData>(() => readBrowserJson(CONSULTATION_DRAFT_KEY, blankConsultation));
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (Object.values(data).some(value => value.trim())) writeBrowserJson(CONSULTATION_DRAFT_KEY, data);
  }, [data]);

  const update = (key: keyof ConsultationData, value: string) => {
    setData(current => ({ ...current, [key]: value }));
    setStatus('');
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const current = event.currentTarget;
    if (!current.reportValidity()) return;
    const previous = readBrowserJson<ConsultationData[]>(CONSULTATION_REQUESTS_KEY, []);
    const saved = writeBrowserJson(CONSULTATION_REQUESTS_KEY, [...previous, { ...data, savedAt: new Date().toISOString() }]);
    if (!saved) {
      setError('Browser storage is unavailable. Your request was not saved. You can export by copying your details before leaving.');
      return;
    }
    setStatus('Consultation draft saved in this browser only. It has not been sent to Investor Meet 500 or delivered to event organizers.');
  };

  const reset = () => {
    setData(blankConsultation);
    const cleared = removeBrowserKey(CONSULTATION_DRAFT_KEY);
    setStatus(cleared ? 'The local form draft was cleared.' : 'Browser storage is unavailable, so the saved draft could not be cleared.');
    setError('');
  };
  const clearSaved = () => {
    const clearedDraft = removeBrowserKey(CONSULTATION_DRAFT_KEY);
    const clearedRequests = removeBrowserKey(CONSULTATION_REQUESTS_KEY);
    const cleared = clearedDraft && clearedRequests;
    setData(blankConsultation);
    setStatus(cleared ? 'All browser-saved consultation data has been cleared.' : 'Browser storage is unavailable, so not all saved data could be cleared.');
    setError('');
  };
  const exportSaved = () => downloadBrowserJson('investor-meet-500-consultation.json', {
    draft: data,
    savedRequests: readBrowserJson<ConsultationData[]>(CONSULTATION_REQUESTS_KEY, []),
  });

  return <>
    <PageHero eyebrow="Guidance & consultation" title={<>Get the right first-level <em>guidance.</em></>} lead="Start with a clear conversation about your pitch, financial plan, project area or next institutional step." />
    <section className="section"><div className="im-container form-layout"><div><SectionHeading eyebrow="Where guidance can help" title={<>Make the next move with <em>more clarity.</em></>} lead="A consultation can help frame the questions and information needed for a considered business conversation." /><ul className="plain-list"><li>Pitch deck and investor readiness</li><li>Project financial plan</li><li>Financial experts and funding structure</li><li>Project area and specific cases</li><li>Governmental and international processes</li></ul><p className="notice">Browser-only request preview. No contact address or submission service is available, so nothing is delivered to event organizers.</p></div>
       <form className="form-panel" aria-label="Local consultation draft" onSubmit={handleSubmit} onReset={event => { event.preventDefault(); reset(); }}>
         <div className="form-local-label"><span className="local-indicator" aria-hidden="true" /> Local consultation draft <span>Saved on this device only</span></div>
        <div className="form-grid">
          <div className="field"><label htmlFor="consult-name">Name *</label><input id="consult-name" name="name" className="form-input" required minLength={2} autoComplete="name" value={data.name} onChange={event=>update('name',event.target.value)} data-testid="input-consult-name" /></div>
          <div className="field"><label htmlFor="consult-company">Company *</label><input id="consult-company" name="company" className="form-input" required autoComplete="organization" value={data.company} onChange={event=>update('company',event.target.value)} data-testid="input-consult-company" /></div>
          <div className="field"><label htmlFor="consult-email">Email *</label><input id="consult-email" name="email" className="form-input" type="email" required autoComplete="email" value={data.email} onChange={event=>update('email',event.target.value)} data-testid="input-consult-email" /></div>
          <div className="field"><label htmlFor="consult-phone">Phone *</label><input id="consult-phone" name="phone" className="form-input" type="tel" required pattern="[+0-9() -]{7,20}" autoComplete="tel" value={data.phone} onChange={event=>update('phone',event.target.value)} data-testid="input-consult-phone" /></div>
          <div className="field"><label htmlFor="consult-interest">Area of interest *</label><select id="consult-interest" name="interest" className="form-select" required value={data.interest} onChange={event=>update('interest',event.target.value)} data-testid="select-consult-interest"><option value="" disabled>Select an area</option>{['Pitch deck','Project financial plan','Financial experts','Project areas','Specific cases','Governmental process','International process','Other'].map(x=><option key={x}>{x}</option>)}</select></div>
          <div className="field"><label htmlFor="consult-time">Preferred date & time</label><input id="consult-time" name="time" className="form-input" type="datetime-local" value={data.time} onChange={event=>update('time',event.target.value)} data-testid="input-consult-time" /></div>
          <div className="field full"><label htmlFor="consult-message">Message *</label><textarea id="consult-message" name="message" className="form-textarea" required minLength={10} placeholder="A little context about the guidance you are looking for" value={data.message} onChange={event=>update('message',event.target.value)} data-testid="input-consult-message" /></div>
        </div>
         <div className="form-actions"><button className="im-btn" type="submit" data-testid="button-consult-save">Save draft in this browser <ArrowRight size={14} /></button><button className="im-btn outline" type="reset" data-testid="button-consult-reset">Reset form</button></div>
        <div className="inline-actions"><button className="secondary-action" type="button" onClick={exportSaved} data-testid="button-consult-export">Export saved data</button><button className="secondary-action" type="button" onClick={clearSaved} data-testid="button-consult-clear">Clear saved data</button></div>
        {error && <p className="form-status" role="alert">{error}</p>}{status && <p className="form-status" role="status">{status}</p>}
         <p className="form-notice">This consultation draft auto-saves to this browser. It is not an organizer submission, and nothing is sent or received. Export or clear your local copy at any time.</p>
      </form>
    </div></section>
  </>;
}

export function SchedulePage() {
  const halls = ['All halls', 'Hall 1', 'Hall 2', 'Hall 3', 'Financial area'];
  const [selectedHall, setSelectedHall] = useState('All halls');
  const visibleItems = schedule.filter(item => {
    if (selectedHall === 'All halls') return true;
    if (selectedHall === 'Hall 1') return ['Main hall', 'Halls 1–3', 'All halls', 'Welcome area'].includes(item.hall);
    if (selectedHall === 'Hall 2' || selectedHall === 'Hall 3') return ['Halls 1–3', 'All halls'].includes(item.hall);
    return item.hall === 'Financial area';
  });
  return <>
    <PageHero eyebrow="Event schedule" title={<>A full day, with room for <em>meaningful work.</em></>} lead="The planned programme runs from 08:00 AM to 06:00 PM. Exact event date, session titles and hall assignments remain to be announced." />
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Programme outline" title={<>One day. Three halls. <em>Clear next steps.</em></>} lead="This editable schedule outline reflects the event plan. Times and session allocations are subject to confirmation." />
      <div className="hall-tabs" role="group" aria-label="Choose a schedule hall">{halls.map(hall=><button type="button" key={hall} aria-pressed={selectedHall === hall} onClick={()=>setSelectedHall(hall)} data-testid={`schedule-filter-${hall.toLowerCase().replaceAll(' ','-')}`}>{hall}</button>)}</div>
      <div aria-live="polite">{visibleItems.map(item=><article className="schedule-row" key={item.time}><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.detail}</p></div><span>{item.hall}</span></article>)}</div>
      {visibleItems.length === 0 && <p className="notice" role="status">{selectedHall} session assignments are to be announced. The full programme outline will be published when the event schedule is confirmed.</p>}
      <p className="notice" style={{ marginTop: 22 }}>Event date: To be announced. Schedule details are indicative and may be updated.</p></div></section>
  </>;
}

function MapExplanationDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);
  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="map-dialog" role="dialog" aria-modal="true" aria-labelledby="map-dialog-title" data-testid="dialog-map-details">
      <span className="eyebrow">Venue map</span><h2 id="map-dialog-title">A confirmed map is not available yet.</h2>
      <p>The venue name, floor plan, city and hall assignments are all to be announced. The plan currently includes three halls and a financial interaction area; this is not a confirmed venue layout.</p>
      <div className="venue-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>{['Hall 1','Hall 2','Hall 3','Financial area'].map((item,index)=><div className="venue-cell" key={item}><strong>{item}</strong><span>{index===3?'Interaction space':'Programme space'} · planned</span></div>)}</div>
      <div className="map-dialog-actions"><button className="secondary-action" type="button" onClick={onClose} data-testid="button-map-close">Close</button><Link className="im-btn" href="/venue" onClick={onClose} data-testid="link-map-venue">Venue details <ArrowRight size={14}/></Link></div>
    </section>
  </div>;
}

export function VenuePage() {
  const [mapOpen, setMapOpen] = useState(false);
  return <>
    <PageHero eyebrow="The venue" title={<>A setting for the conversations <em>that matter.</em></>} lead="A premium venue with three halls and a dedicated financial interaction area is planned. Venue identity, city and travel details will be announced." />
    <section className="section"><div className="im-container split"><div><SectionHeading eyebrow="Venue information" title={<>Space designed around <em>connection.</em></>} lead="The event plan includes three halls for investment tracks, plus a financial area for focused conversations. Confirmed venue details will be published here when available." /><p className="notice">Venue name: To be announced<br />Location: To be announced<br />Event date: To be announced</p></div><div className="editorial-image"><img src="/images/about-audience.jpg" alt="Conference hall prepared for an audience" loading="lazy" /><span className="image-caption">Venue photograph · illustrative only</span></div></div></section>
      <section className="section alt"><div className="im-container"><SectionHeading eyebrow="Halls & areas" title={<>The working layout of the <em>summit.</em></>} lead="Hall titles and allocations will be confirmed with the event venue." /><div className="venue-grid">{[['Hall 1','Investment track · To be announced'],['Hall 2','Investment track · To be announced'],['Hall 3','Investment track · To be announced'],['Financial Area','Focused interaction · To be announced']].map(([title,detail])=><div className="venue-cell" key={title}><strong>{title}</strong><span>{detail}</span></div>)}</div><div style={{ marginTop: 28 }}><button className="im-btn outline" type="button" onClick={()=>setMapOpen(true)} data-testid="button-venue-map">View full map <ArrowRight size={14} /></button></div></div></section>
    <section className="section"><div className="im-container"><SectionHeading eyebrow="Plan your visit" title={<>Travel and stay details are <em>on the way.</em></>} lead="Travel guidance, accommodation suggestions, accessibility and confirmed map information will be added when the venue is announced." /><div className="card-grid">{['Venue location','Travel information','Stay information'].map((item,index)=><article className="info-card" key={item}><span className="card-index">DETAIL 0{index+1}</span><h3>{item}</h3><p>To be announced. No location or travel arrangements have been confirmed.</p></article>)}</div></div></section>
    {mapOpen && <MapExplanationDialog onClose={()=>setMapOpen(false)} />}
  </>;
}

const participantTypes = ['Startup', 'Investor', 'Entrepreneur', 'Sponsor', 'Other'];
const stepsLabel = ['Participant type', 'Personal information', 'Company information', 'Project details', 'Documents', 'Review', 'Submit'];
type ApplicationData = { type: string; name: string; email: string; phone: string; company: string; role: string; track: string; amount: string; purpose: string; fileName: string; preparation: string[] };
const blankApplication: ApplicationData = { type: '', name: '', email: '', phone: '', company: '', role: '', track: '', amount: '', purpose: '', fileName: '', preparation: [] };
const preparationItems = ['Company background', 'Project valuation', 'Financial projections', 'Success drivers', 'Risk level', 'Supporting documents', 'Financial information'];

export function ApplyPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<ApplicationData>(() => readBrowserJson(APPLICATION_DRAFT_KEY, blankApplication));
  const [draftSaved, setDraftSaved] = useState(() => Boolean(readBrowserJson<ApplicationData | null>(APPLICATION_DRAFT_KEY, null)));
  useEffect(() => {
    if (Object.entries(data).some(([key, value]) => key !== 'preparation' && typeof value === 'string' && value.trim()) || data.preparation.length) {
      setDraftSaved(writeBrowserJson(APPLICATION_DRAFT_KEY, data));
    }
  }, [data]);
  const change = (key: keyof ApplicationData, value: string) => setData(current => ({ ...current, [key]: value }));
  const togglePreparation = (item: string, checked: boolean) => setData(current => ({
    ...current,
    preparation: checked ? [...current.preparation, item] : current.preparation.filter(value => value !== item),
  }));
  const validate = () => {
    if (step === 0 && !data.type) return 'Select a participant type to continue.';
    if (step === 1 && (!data.name.trim() || !/^\S+@\S+\.\S+$/.test(data.email) || !/^[+0-9() -]{7,20}$/.test(data.phone))) return 'Enter your name, a valid email and a phone number.';
    if (step === 2 && (!data.company.trim() || !data.role.trim())) return 'Enter your company or organization and your role.';
    if (step === 3 && (!data.track || !data.amount.trim() || data.purpose.trim().length < 10)) return 'Select a relevant track and provide your funding requirement and purpose (at least 10 characters).';
    return '';
  };
  const next = () => { const validation = validate(); if (validation) { setError(validation); return; } setError(''); setStep(current => Math.min(current + 1, 6)); };
  const finish = () => { writeBrowserJson(APPLICATION_DRAFT_KEY, data); setDone(true); setStep(6); };
  const resetApplication = () => {
    removeBrowserKey(APPLICATION_DRAFT_KEY);
    setData(blankApplication);
    setStep(0);
    setDone(false);
    setError('');
    setDraftSaved(false);
  };
  const exportApplication = () => downloadBrowserJson('investor-meet-500-application-draft.json', {
    draft: data,
    currentStep: step + 1,
    notice: 'Browser-only draft. This is not an official application and has not been delivered to event organizers.',
  });
  return <>
    <PageHero eyebrow="Registration" title={<>A considered application begins with <em>clarity.</em></>} lead="A guided, seven-part application draft helps you prepare your profile. It saves only in this browser and is not submitted to the event." />
    <section className="section"><div className="im-container form-layout"><aside><SectionHeading eyebrow="Application flow" title={<>Your path to the <em>summit.</em></>} lead="Share only what is needed to describe your participation and business requirement." /><p className="notice">This is a browser-only application draft, not an official submission. It saves to this device so you can return to it. Nothing is sent to or received by event organizers.</p><p className="section-lead">Event date: To be announced<br />Funding range: ₹50 Lakhs – ₹500 Cr.<br />Planned participants: 500</p><div className="application-controls"><span className="muted-label">{draftSaved ? 'Draft saved on this device' : 'Draft is not saved yet'}</span><div className="inline-actions"><button className="secondary-action" type="button" onClick={exportApplication} data-testid="button-apply-export">Export draft</button><button className="secondary-action" type="button" onClick={resetApplication} data-testid="button-apply-clear">Clear / reset</button></div><p className="form-notice">Export a JSON copy or clear local data at any time. No official application is received.</p></div></aside>
       <div className="form-panel" aria-live="polite"><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}><span className="eyebrow">{done ? 'Preview complete' : `Step ${step + 1} of 7`}</span><span className="muted-label">{done ? 'Browser draft saved' : stepsLabel[step]}</span></div><div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={7} aria-valuenow={done ? 7 : step + 1} aria-label={`Application progress, step ${done ? 7 : step + 1} of 7`}>{Array.from({ length: 7 }, (_, index)=><span key={index} className={index <= (done ? 6 : step) ? 'active' : ''} />)}</div>
         {done ? <div><h2 className="section-title" style={{ fontSize: 36 }}>Your draft is ready.</h2><p className="section-lead">Your details are saved in this browser only. This is not an official application, it has not been sent, and the event organizers have not received it. You can export or clear the draft using the controls beside this form.</p><Link href="/" className="im-btn" style={{ marginTop: 24 }} data-testid="link-apply-home">Return home <ArrowRight size={14} /></Link></div> : <>
           {step === 0 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Who are you joining as?</h2><p className="section-lead">Choose the participant profile that best fits this application.</p><div className="choice-grid" style={{ marginTop: 22 }}>{participantTypes.map(type=><button type="button" className="choice" aria-pressed={data.type===type} key={type} onClick={()=>change('type',type)} data-testid={`choice-applicant-${type.toLowerCase()}`}>{type}<span>{type==='Startup'?'Founder or early-stage business':type==='Investor'?'Fund or individual investor':type==='Entrepreneur'?'Business owner or leader':type==='Sponsor'?'Brand or organization':'Another participant profile'}</span></button>)}</div></div>}
           {step === 1 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Your personal information</h2><div className="form-grid" style={{ marginTop: 22 }}><div className="field full"><label htmlFor="apply-name">Full name *</label><input id="apply-name" className="form-input" autoComplete="name" value={data.name} onChange={e=>change('name',e.target.value)} data-testid="input-apply-name" /></div><div className="field full"><label htmlFor="apply-email">Email *</label><input id="apply-email" type="email" className="form-input" autoComplete="email" value={data.email} onChange={e=>change('email',e.target.value)} data-testid="input-apply-email" /></div><div className="field full"><label htmlFor="apply-phone">Phone *</label><input id="apply-phone" type="tel" className="form-input" autoComplete="tel" value={data.phone} onChange={e=>change('phone',e.target.value)} data-testid="input-apply-phone" /></div></div></div>}
           {step === 2 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Company information</h2><div className="form-grid" style={{ marginTop: 22 }}><div className="field full"><label htmlFor="apply-company">Company / organization *</label><input id="apply-company" className="form-input" autoComplete="organization" value={data.company} onChange={e=>change('company',e.target.value)} data-testid="input-apply-company" /></div><div className="field full"><label htmlFor="apply-role">Your role *</label><input id="apply-role" className="form-input" value={data.role} onChange={e=>change('role',e.target.value)} data-testid="input-apply-role" /></div></div></div>}
           {step === 3 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Business & project details</h2><div className="form-grid" style={{ marginTop: 22 }}><div className="field full"><label htmlFor="apply-track">Preferred track *</label><select id="apply-track" className="form-select" value={data.track} onChange={e=>change('track',e.target.value)} data-testid="select-apply-track"><option value="">Choose a track</option>{tracks.map(track=><option key={track.number}>{track.title}</option>)}</select></div><div className="field full"><label htmlFor="apply-amount">Funding requirement *</label><input id="apply-amount" className="form-input" placeholder="Amount and currency" value={data.amount} onChange={e=>change('amount',e.target.value)} data-testid="input-apply-amount" /></div><div className="field full"><label htmlFor="apply-purpose">Purpose / business summary *</label><textarea id="apply-purpose" className="form-textarea" minLength={10} value={data.purpose} onChange={e=>change('purpose',e.target.value)} data-testid="input-apply-purpose" /></div></div></div>}
           {step === 4 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Documents & preparation</h2><p className="section-lead">A preparation checklist helps you organize a future conversation. It is not an eligibility review or public validation portal.</p><label className="file-box" style={{ display: 'block', marginTop: 20 }}>Choose a document for local reference<input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" onChange={event=>change('fileName',event.currentTarget.files?.[0]?.name || '')} style={{ display: 'block', marginTop: 12 }} data-testid="input-apply-document" />{data.fileName && <span className="form-status">Selected locally: {data.fileName}</span>}</label><div className="checklist" role="group" aria-label="Preparation checklist">{preparationItems.map((item,index)=><label key={item}><input type="checkbox" checked={data.preparation.includes(item)} onChange={event=>togglePreparation(item,event.target.checked)} data-testid={`checkbox-preparation-${index+1}`}/><span>{item}</span></label>)}</div><p className="form-notice">Checklist selections and document filename are kept in this browser only. No file is uploaded.</p></div>}
           {step === 5 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Review your details</h2><div className="review-box" style={{ marginTop: 22 }}><span><strong>Participant type:</strong> {data.type}</span><span><strong>Name:</strong> {data.name}</span><span><strong>Email:</strong> {data.email}</span><span><strong>Phone:</strong> {data.phone}</span><span><strong>Company:</strong> {data.company}</span><span><strong>Role:</strong> {data.role}</span><span><strong>Track:</strong> {data.track}</span><span><strong>Funding need:</strong> {data.amount}</span><span><strong>Document:</strong> {data.fileName || 'None selected'}</span><span><strong>Preparation checklist:</strong> {data.preparation.length} of {preparationItems.length} marked</span></div><p className="notice" style={{ marginTop: 15 }}>Continue to save a browser draft only. This is not a submission; no application is sent or received by organizers.</p></div>}
            {step === 6 && <div><h2 className="section-title" style={{ fontSize: 34 }}>Save your browser draft</h2><p className="section-lead">The final step stores this application draft locally on your device. It is not an official submission and does not create an application record for the event.</p><p className="notice" style={{ marginTop: 20 }}>The event date, venue, eligibility criteria and participation terms are to be announced.</p></div>}
           {error && <p className="form-status" role="alert">{error}</p>}
            <div className="form-actions">{step > 0 && <button className="im-btn outline" type="button" onClick={()=>{setError('');setStep(step-1);}} data-testid="button-apply-back"><ChevronLeft size={14} /> Back</button>}{step < 6 ? <button className="im-btn" type="button" onClick={next} data-testid="button-apply-next">Continue <ChevronRight size={14} /></button> : <button className="im-btn" type="button" onClick={finish} data-testid="button-apply-save">Save browser draft <Check size={14} /></button>}</div>
         </>}
       </div>
    </div></section>
  </>;
}
