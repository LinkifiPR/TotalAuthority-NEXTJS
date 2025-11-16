"use client";


import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';

const TermsOfService = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onOpenForm={openForm} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500 mb-6">
              Last updated: June 25, 2025
            </p>
            
            <p className="text-lg text-slate-600 mb-6">
              Please read these Terms of Service ("Terms") carefully before using https://totalauthority.com (the "Website") operated by Bigg Pants Ltd T/A TotalAuthority ("we," "us," or "our"). These Terms include important information about your rights and responsibilities, including limitations on our liability.
            </p>
            
            <p className="mb-6">
              By accessing or using the Website, you agree to be bound by these Terms. If you do not accept them, you must not use the Website.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Offers and Pricing</h2>
            <p className="mb-6">
              We offer services and digital products on this Website. Prices are listed on the Website and include any applicable taxes and fees.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Purchases</h2>
            <p className="mb-3">When making a purchase, your payment is processed through a third-party provider. You may choose from:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Apple Pay</li>
              <li>PayPal</li>
              <li>Stripe</li>
            </ul>
            <p className="mb-6">
              These processors accept: American Express, Visa, MasterCard, Discover, cheque, and bank transfer. We are not responsible for how these third parties handle your payment data. Please refer to their respective privacy policies.
            </p>
            
            <p className="mb-3">By making a purchase, you confirm that:</p>
            <ul className="list-disc ml-6 mb-6">
              <li>You have the legal right to use the selected payment method</li>
              <li>All information provided is accurate and complete</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Cancellations</h2>
            <p className="mb-6">
              You may cancel a purchase prior to download, delivery, or performance. Cancellations must be requested via the Website or by contacting team@totalauthority.com. We do not charge a cancellation fee, but we do not issue refunds on cancelled purchases.
            </p>
            <p className="mb-6">
              We reserve the right to cancel an order before it is delivered or fulfilled. If we cancel, you will receive a full refund.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Refund Policy</h2>
            <p className="mb-6">
              We do not offer refunds on purchases made through the Website, unless we cancel the order.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Advance Payments</h2>
            <p className="mb-6">
              We may request an advance payment to cover upfront costs related to services or digital products. If we or you cancel the purchase, this advance will be refunded.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Deposits</h2>
            <p className="mb-6">
              We may also request a deposit to reserve a service or product. If the purchase is cancelled by either party, the deposit will be refunded.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">No Warranty on Purchases</h2>
            <p className="mb-6">
              To the fullest extent allowed by law, all services and digital products are provided "as is." No express or implied warranties are offered. Your statutory consumer rights, if applicable, are not affected.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Remedies</h2>
            <p className="mb-6">
              If there's a breach of these Terms in connection with a purchase, your remedy is limited to a price reduction or dispute resolution as outlined in the "Governing Law" section.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Subscriptions</h2>
            <p className="mb-3">
              Some products or services may be offered through a subscription model with a 1-month initial term.
            </p>
            <p className="mb-3">
              Subscriptions auto-renew monthly using the original payment method. We'll notify you in advance of each renewal.
            </p>
            <p className="mb-6">
              To cancel, email team@totalauthority.com at least 30 days before your next renewal.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Prohibited Uses</h2>
            <p className="mb-3">You agree not to misuse this Website. Prohibited activities include, but aren't limited to:</p>
            <ul className="list-disc ml-6 mb-6">
              <li>Impersonation or misrepresentation</li>
              <li>Spam or unauthorised promotions</li>
              <li>Disruptive behaviour affecting other users</li>
              <li>Overloading, disabling or interfering with site functionality</li>
              <li>Using bots or scrapers to access or copy site content</li>
              <li>Introducing malware or unauthorised code</li>
              <li>Attempting to gain unauthorised access to any systems</li>
              <li>Violating any local, national, or international laws</li>
            </ul>
            <p className="mb-6">
              This Website is provided "as is." We do not guarantee uninterrupted access or error-free performance.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Availability, Errors & Inaccuracies</h2>
            <p className="mb-6">
              We may update or correct information on the Website without notice. Services may be unavailable or mispriced. We reserve the right to correct any errors.
            </p>
            <p className="mb-6">
              If you notice an issue on our Website, invoice, or correspondence, please contact us at team@totalauthority.com.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-3">To the extent permitted by law, Bigg Pants Ltd T/A TotalAuthority will not be liable for any direct, indirect, incidental, special, or consequential damages related to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Use of the Website</li>
              <li>Inability to access or use the Website</li>
              <li>Reliance on content</li>
              <li>Third-party links, services or software</li>
              <li>Payment processing or account breaches</li>
            </ul>
            <p className="mb-6">
              If we're found liable for any loss or damage, total liability will not exceed the fees you paid for services directly related to the issue.
            </p>
            <p className="mb-6">
              These limits reflect a fair allocation of risk and remain in effect even if a limited remedy fails.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Third-Party Links</h2>
            <p className="mb-6">
              We may link to third-party websites for reference or convenience. These are not under our control, and we are not responsible for their content, services, or practices. Use them at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-6">
              Unless stated otherwise, all content on this Website—including text, graphics, logos, code, images, and layout—is owned by or licensed to Bigg Pants Ltd T/A TotalAuthority and protected by copyright and intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Infringement Notices</h2>
            <p className="mb-3">
              If you believe any content on the Website infringes your intellectual property, please email us at team@totalauthority.com with the subject line "Infringement of Intellectual Property Rights – DMCA."
            </p>
            <p className="mb-3">Include:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>A signature (digital or physical)</li>
              <li>Description of the original work</li>
              <li>URL or specific location of the infringing content</li>
              <li>Your full name, address, email, and phone number</li>
              <li>A good-faith statement that the use is not authorised by you, your agent, or the law</li>
            </ul>
            <p className="mb-6">
              Incomplete or false claims may result in legal liability.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Governing Law and Dispute Resolution</h2>
            <p className="mb-6">
              These Terms are governed by applicable contract law, without regard to conflict of law principles.
            </p>
            <p className="mb-6">
              If a dispute arises that we can't resolve informally, you agree to submit to binding dispute resolution or small claims proceedings in a mutually agreed venue.
            </p>
            <p className="mb-6">
              If any term is found unenforceable, the rest of the Terms remain in effect.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Changes to These Terms</h2>
            <p className="mb-6">
              We may update these Terms at any time. If we do, we'll post the revised version on the Website. Your continued use of the Website after updates means you accept the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have questions about these Terms, please contact:<br />
              team@totalauthority.com
            </p>
          </div>
        </div>
      </main>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
};

export default TermsOfService;
