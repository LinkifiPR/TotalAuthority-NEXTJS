import type { Metadata } from 'next';
import { Suspense } from 'react';
import DeliveryPackDashboardPage from '@/components/ai/DeliveryPackDashboardPage';

export const metadata: Metadata = {
  title: 'Delivery Pack Dashboard | Total Authority',
  description: 'Temporary dashboard view for your generated AI setup delivery pack.',
  alternates: {
    canonical: '/ai-setup/delivery',
  },
};

export default function AiSetupDeliveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Loading Delivery Pack</p>
            <h1 className="mt-3 text-3xl font-black">Preparing dashboard session</h1>
          </div>
        </div>
      }
    >
      <DeliveryPackDashboardPage />
    </Suspense>
  );
}
