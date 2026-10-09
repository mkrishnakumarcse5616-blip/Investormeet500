import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { SiteShell } from '@/components/SiteShell';
import {
  AboutPage,
  ApplyPage,
  AudiencePage,
  ConsultationPage,
  GlobalOpportunitiesPage,
  HomePage,
  PartnersPage,
  SchedulePage,
  SpeakersPage,
  SponsorsPage,
  TracksPage,
  VenuePage,
  WomenEntrepreneursPage,
} from '@/pages/Pages';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <SiteShell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/tracks" component={TracksPage} />
          <Route path="/startups">{() => <AudiencePage kind="startups" />}</Route>
          <Route path="/investors">{() => <AudiencePage kind="investors" />}</Route>
          <Route path="/sponsors" component={SponsorsPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/speakers" component={SpeakersPage} />
          <Route path="/women-entrepreneurs" component={WomenEntrepreneursPage} />
          <Route path="/global-opportunities" component={GlobalOpportunitiesPage} />
          <Route path="/consultation" component={ConsultationPage} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/venue" component={VenuePage} />
          <Route path="/apply" component={ApplyPage} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
