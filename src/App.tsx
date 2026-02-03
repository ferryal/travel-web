import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppIntlProvider } from "@/i18n";
import { MainLayout } from "@/components/layout";
import {
  Dashboard,
  Flights,
  Bookings,
  Passengers,
  Finance,
  Promos,
  Campaigns,
  Users,
  Analytics,
  Accounting,
  Corporate,
  GroupBooking,
  PricingRules,
  ChatSupport,
} from "@/pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AppIntlProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="flights" element={<Flights />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="passengers" element={<Passengers />} />
              <Route path="finance" element={<Finance />} />
              <Route path="accounting" element={<Accounting />} />
              <Route path="promos" element={<Promos />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="corporate" element={<Corporate />} />
              <Route path="group-booking" element={<GroupBooking />} />
              <Route path="users" element={<Users />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="pricing-rules" element={<PricingRules />} />
              <Route path="chat-support" element={<ChatSupport />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AppIntlProvider>
  );
}

export default App;
