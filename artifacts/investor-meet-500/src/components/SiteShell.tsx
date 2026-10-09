import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Instagram, Linkedin, Menu, X, Youtube, ChevronDown } from 'lucide-react';
import { navigation } from '@/data/content';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Investor Meet 500 — Where Capital Meets Opportunity', description: 'Investor Meet 500 brings startups, founders, investors, banks and business decision-makers together for a one-day investment summit in Tamil Nadu.' },
  '/about': { title: 'About the Summit — Investor Meet 500', description: 'Discover why Investor Meet 500 brings startups, entrepreneurs, investors and financial institutions together across five investment tracks.' },
  '/tracks': { title: 'Investment Tracks — Investor Meet 500', description: 'Explore five funding tracks at Investor Meet 500, from startup pitching and business expansion to bank loans and mixed financing opportunities.' },
  '/startups': { title: 'For Startups — Investor Meet 500', description: 'Prepare to pitch at Investor Meet 500. Learn about the startup pathway, potential investor conversations, eligibility and preparation.' },
  '/investors': { title: 'For Investors — Investor Meet 500', description: 'Discover how investors, banks and financial institutions can meet growing businesses across five structured funding and expansion tracks.' },
  '/sponsors': { title: 'Sponsorship — Investor Meet 500', description: 'Review six published sponsorship tiers and explore branding, digital visibility and event participation opportunities at Investor Meet 500.' },
  '/partners': { title: 'Partners — Investor Meet 500', description: 'Explore partnership categories for corporate, government, banking, technology, media and industry organizations at Investor Meet 500.' },
  '/speakers': { title: 'Business Leader Directory — Investor Meet 500', description: 'Browse a 100-entry user-supplied reference directory of Tamil Nadu business leaders by name, company, region and sector. Entries do not indicate event attendance or speaker bookings.' },
  '/women-entrepreneurs': { title: 'Women Entrepreneurs — Investor Meet 500', description: 'Explore business growth and investment pathways for women-led companies across distribution, manufacturing, brands and technology services.' },
  '/global-opportunities': { title: 'Global Opportunities — Investor Meet 500', description: 'Connect Tamil Nadu with international investors, global companies, fund-level opportunities and strategic alliances through Investor Meet 500.' },
  '/consultation': { title: 'Guidance & Consultation — Investor Meet 500', description: 'Prepare for your next business step with first-level guidance on pitch decks, financial plans, project areas and investment processes.' },
  '/schedule': { title: 'Event Schedule — Investor Meet 500', description: 'Review the planned 8 AM to 6 PM programme, including registration, pitch sessions, investor meetings, financial discussions and networking.' },
  '/venue': { title: 'Venue — Investor Meet 500', description: 'Find planned hall, travel and stay information for Investor Meet 500. The event venue and location have not yet been announced.' },
  '/apply': { title: 'Registration — Investor Meet 500', description: 'Preview a guided Investor Meet 500 application across participant, company, project and document details. Online submission is not active.' },
};

function PageMetadata() {
  const [location] = useLocation();
  useEffect(() => {
    const routePath = location.split('#')[0];
    const metadata = pageMetadata[routePath] || { title: 'Investor Meet 500', description: 'A premium investment summit connecting businesses and capital.' };
    document.title = metadata.title;
    const setMeta = (selector: string, attribute: string, value: string, name: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', 'name', metadata.description, 'description');
    setMeta('meta[property="og:title"]', 'property', metadata.title, 'og:title');
    setMeta('meta[property="og:description"]', 'property', metadata.description, 'og:description');
    setMeta('meta[property="og:type"]', 'property', 'website', 'og:type');
    setMeta('meta[name="twitter:title"]', 'name', metadata.title, 'twitter:title');
    setMeta('meta[name="twitter:description"]', 'name', metadata.description, 'twitter:description');
    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image', 'twitter:card');

    const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/+$/, '');
    const imageUrl = publicSiteUrl
      ? `${publicSiteUrl}/images/hero-desktop.jpg`
      : new URL(`${import.meta.env.BASE_URL}images/hero-desktop.jpg`, window.location.origin).href;
    setMeta('meta[property="og:image"]', 'property', imageUrl, 'og:image');
    setMeta('meta[name="twitter:image"]', 'name', imageUrl, 'twitter:image');

    if (publicSiteUrl) {
      setMeta('meta[property="og:url"]', 'property', `${publicSiteUrl}${location}`, 'og:url');
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `${publicSiteUrl}${location}`;
    }
  }, [location]);
  return null;
}

export function SiteHeader() {
  const [location] = useLocation();
  const currentPath = location.split('#')[0];
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (open || moreOpen)) {
        setOpen(false);
        setMoreOpen(false);
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
      }
      if (event.key === 'Tab' && open) {
        const links = Array.from(document.querySelectorAll<HTMLElement>('#mobile-navigation a[href]'));
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, moreOpen]);
  useEffect(() => { setOpen(false); setMoreOpen(false); }, [location]);
  return <>
    <a className="skip-link" href="#main-content" data-testid="link-skip-content">Skip to content</a>
    <header className={`im-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="im-header-inner">
        <Link href="/" className="im-brand" aria-label="Investor Meet 500 home" data-testid="link-brand">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span className="brand-word"><span>Investor</span>Meet 500</span>
        </Link>
        <nav className="im-nav" aria-label="Main navigation">
          {navigation.slice(0, 9).map((item) => <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined} data-testid={`link-nav-${item.href.slice(1) || 'home'}`}>{item.label}</Link>)}
          <div className="nav-more">
            <button type="button" className="nav-more-toggle" aria-expanded={moreOpen} aria-controls="nav-more-links" onClick={() => setMoreOpen(value => !value)} data-testid="button-nav-more">More <ChevronDown size={13} /></button>
            {moreOpen && <div id="nav-more-links" className="nav-more-menu">{navigation.slice(9).map(item => <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</Link>)}</div>}
          </div>
          <Link href="/apply" className="im-btn small" data-testid="link-apply-header">Apply now <ArrowRight size={14} /></Link>
        </nav>
        <Link href="/apply" className="im-btn small header-cta" data-testid="link-apply-header-mobile">Apply now</Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} data-testid="button-menu-toggle">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
    <div id="mobile-navigation" className={`mobile-nav ${open ? 'open' : ''}`} aria-hidden={!open}>
      <nav className="mobile-nav-links" aria-label="Mobile navigation">
         {navigation.map((item) => <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} aria-current={currentPath === item.href ? 'page' : undefined} data-testid={`link-mobile-nav-${item.href.slice(1) || 'home'}`}>{item.label}</Link>)}
      </nav>
      <Link className="im-btn" href="/apply" tabIndex={open ? 0 : -1} data-testid="link-mobile-apply">Apply now <ArrowRight size={15} /></Link>
      <p className="hero-meta">Event date <strong>To be announced</strong></p>
    </div>
  </>;
}

export function SiteFooter() {
  const groups = [
    { title: 'The summit', links: [['About', '/about'], ['Tracks', '/tracks'], ['Schedule', '/schedule'], ['Venue', '/venue']] },
    { title: 'Participate', links: [['Startups', '/startups'], ['Investors', '/investors'], ['Sponsors', '/sponsors'], ['Partners', '/partners']] },
    { title: 'Discover', links: [['Business leaders', '/speakers'], ['Women entrepreneurs', '/women-entrepreneurs'], ['Global opportunities', '/global-opportunities'], ['Consultation', '/consultation']] },
    { title: 'Legal', links: [['Terms', '/about#event-policies'], ['Privacy', '/about#event-policies'], ['Payment / refund policy', '/about#event-policies']] },
  ];
  return <footer className="im-footer">
    <div className="im-container">
      <div className="footer-grid">
        <div className="footer-about">
          <Link href="/" className="im-brand" data-testid="link-footer-brand">
            <span className="brand-mark" aria-hidden="true">M</span><span className="brand-word"><span>Investor</span>Meet 500</span>
          </Link>
          <p>A one-day investment summit connecting founders, businesses, investors and financial institutions through a structured, focused meeting of capital and opportunity.</p>
          <span className="muted-label">Event date · To be announced</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }} aria-label="Social media profiles to be announced">
            <Instagram size={16} aria-hidden="true" /><Linkedin size={16} aria-hidden="true" /><Youtube size={17} aria-hidden="true" />
            <span className="muted-label">Social profiles to be announced</span>
          </div>
        </div>
        {groups.map(group => <div className="footer-col" key={group.title}>
          <h3>{group.title}</h3>
          <ul>{group.links.map(([label, href]) => <li key={`${label}-${href}`}><Link href={href} data-testid={`link-footer-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>{label}</Link></li>)}</ul>
        </div>)}
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Investor Meet 500. All rights reserved.</span><span>Event details and participation information are subject to announcement.</span></div>
    </div>
  </footer>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = location.split('#')[1];
      if (hash) {
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  return <div className="im-shell"><PageMetadata /><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>;
}

export function PageHero({ eyebrow, title, lead, image = 'about' }: { eyebrow: string; title: React.ReactNode; lead: string; image?: string }) {
  return <section className="page-hero" data-image={image}>
    <div className="im-container page-hero-content">
      <div className="crumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{eyebrow}</span></div>
      <p className="eyebrow">{eyebrow}</p><h1 className="page-title">{title}</h1><p className="page-lead">{lead}</p>
    </div>
  </section>;
}

export function SectionHeading({ eyebrow, title, lead, center = false }: { eyebrow: string; title: React.ReactNode; lead?: string; center?: boolean }) {
  return <div className={`section-heading ${center ? 'center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2 className="section-title">{title}</h2>{lead && <p className="section-lead">{lead}</p>}</div>;
}

export function CTA({ title = 'Make your next capital conversation count.', text = 'Join the room where businesses and decision-makers meet with purpose.', href = '/apply', label = 'Explore participation' }: { title?: string; text?: string; href?: string; label?: string }) {
  return <section className="cta-band"><div className="im-container"><span className="eyebrow" style={{ justifyContent: 'center' }}>Investor Meet 500</span><h2 className="section-title">{title}</h2><p className="section-lead" style={{ marginInline: 'auto' }}>{text}</p><div className="hero-actions" style={{ justifyContent: 'center' }}><Link className="im-btn" href={href} data-testid="link-cta-primary">{label}<ArrowRight size={15} /></Link><Link className="im-btn outline" href="/about" data-testid="link-cta-about">Explore the summit</Link></div></div></section>;
}
