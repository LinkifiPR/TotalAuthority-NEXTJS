"use client";


import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';

const PrivacyPolicy = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onOpenForm={openForm} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              We value your privacy and take it seriously. Please read this Privacy Policy carefully before using https://totalauthority.com (the "Website") operated by Bigg Pants Ltd T/A TotalAuthority ("we," "our," or "us").
            </p>
            
            <p className="mb-6">
              This Privacy Policy explains how we collect, use, and handle your personal data when you access or use our Website. By using the Website, you agree to the terms outlined here. If you do not agree, please do not use the Website.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Information We Collect</h2>
            <p className="mb-6">
              We collect and store information that you provide directly and information collected automatically through tracking technologies. This includes:
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">1. Identifying Information – Name</h3>
            <p><strong>What we collect:</strong> Your name</p>
            <p><strong>Legal basis:</strong> Consent; Contract performance; Legal obligations</p>
            <p><strong>How we collect it:</strong> Forms you complete; tracking pixels</p>
            <p><strong>How we use it:</strong></p>
            <ul className="list-disc ml-6 mb-4">
              <li>Customer support</li>
              <li>Service delivery</li>
              <li>Contract fulfilment</li>
              <li>Marketing (if consented)</li>
              <li>Fraud prevention</li>
            </ul>
            <p className="mb-6">If you do not provide this, we may be unable to provide services or respond to enquiries.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">2. Identifying Information – Billing Address</h3>
            <p><strong>What we collect:</strong> Your billing address</p>
            <p><strong>Legal basis:</strong> Consent</p>
            <p><strong>How we collect it:</strong> Information you submit</p>
            <p><strong>How we use it:</strong> Analytics</p>
            <p className="mb-6">Without this, analytics related to payments may not be complete.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">3. Identifying Information – Email Address</h3>
            <p><strong>What we collect:</strong> Your email address</p>
            <p><strong>Legal basis:</strong> Consent; Contract performance; Legal obligations</p>
            <p><strong>How we collect it:</strong> Forms, tracking pixels</p>
            <p><strong>How we use it:</strong></p>
            <ul className="list-disc ml-6 mb-4">
              <li>Service communications</li>
              <li>Customer support</li>
              <li>Account verification</li>
              <li>Direct marketing (if consented)</li>
              <li>Resolving issues</li>
            </ul>
            <p className="mb-6">Without it, we can't contact you, provide services, or respond to your requests.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">4. Financial Information – Card Details</h3>
            <p className="mb-3">We may collect the following when processing payments:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Credit/debit card number</li>
              <li>Expiry date</li>
              <li>CVV code</li>
              <li>Bank account number (if relevant)</li>
            </ul>
            <p><strong>Legal basis:</strong> Consent; Contract performance</p>
            <p><strong>How we collect it:</strong> Secure payment forms</p>
            <p><strong>How we use it:</strong> Payment processing, fraud prevention, analytics</p>
            <p className="mb-6">Without these, transactions cannot be processed.</p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How We Protect Your Information</h2>
            <p className="mb-3">We use industry-standard measures to protect your personal data, including:</p>
            <ul className="list-disc ml-6 mb-6">
              <li>Secure data encryption (SSL)</li>
              <li>Access control and employee training</li>
              <li>Risk assessments and internal protocols</li>
              <li>Separation of internal systems from public networks</li>
              <li>Physical and logical security controls</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Cookies</h2>
            <p className="mb-6">
              We use cookies to improve user experience and track behaviour on our Website. For full details, please see our Cookie Policy.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Children's Privacy</h2>
            <p className="mb-6">
              This Website is not intended for use by anyone under the age of 18. We do not knowingly collect data from children. If a child provides personal data, we will delete it and take appropriate steps to prevent further collection.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Analytics</h2>
            <p className="mb-6">
              We use Google Analytics and similar tools to understand user behaviour and improve our services. To opt out of Google Analytics, visit: <a href="https://tools.google.com/dlpage/gaoptout/" className="text-orange-500 hover:text-orange-600">https://tools.google.com/dlpage/gaoptout/</a>
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Information Retention</h2>
            <p className="mb-3">We retain your personal data for as long as necessary to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Provide services</li>
              <li>Meet legal requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="mb-6">We regularly review data and delete what's no longer needed.</p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Direct Marketing</h2>
            <p className="mb-6">
              We may send marketing emails about our services if you've given consent. You can opt out at any time by clicking "unsubscribe" in any email or contacting us at team@totalauthority.com.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request deletion or correction</li>
              <li>Withdraw consent to processing</li>
              <li>Object to or restrict certain uses</li>
              <li>Receive a portable copy of your data</li>
              <li>Lodge a complaint with a relevant authority</li>
            </ul>
            <p className="mb-6">
              You can exercise these rights by contacting us at team@totalauthority.com. We may need to verify your identity before processing your request.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How to Contact Us</h2>
            <p className="mb-3">For questions, concerns, or to exercise your data rights, please contact:</p>
            <p className="mb-2">Bigg Pants Ltd T/A TotalAuthority</p>
            <p className="mb-2">team@totalauthority.com</p>
            <p className="mb-6">https://totalauthority.com</p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Third-Party Links</h2>
            <p className="mb-6">
              Our Website may link to other websites. We are not responsible for their privacy practices. Please review their policies before sharing your information.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Do Not Track</h2>
            <p className="mb-6">
              We do not respond to Do Not Track (DNT) signals. You can manage your preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Transfers</h2>
            <p className="mb-6">
              Your data may be processed outside your country of residence, including in jurisdictions where privacy laws may differ. We take steps to ensure your data is protected wherever it is processed.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. When we do, we'll post the updated version on this page. Please check back periodically.
            </p>

            <p className="text-sm text-slate-500 mt-8 pt-8 border-t border-slate-200">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
};

export default PrivacyPolicy;
