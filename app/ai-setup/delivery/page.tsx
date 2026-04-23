import type { Metadata } from 'next';
import DeliveryPackDashboardPage from '@/components/ai/DeliveryPackDashboardPage';

export const metadata: Metadata = {
  title: 'Delivery Pack Dashboard | Total Authority',
  description: 'Temporary dashboard view for your generated AI setup delivery pack.',
  alternates: {
    canonical: '/ai-setup/delivery',
  },
};

export default function AiSetupDeliveryPage() {
  return <DeliveryPackDashboardPage />;
}
