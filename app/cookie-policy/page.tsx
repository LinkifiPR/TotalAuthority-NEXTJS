"use client";


import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormPopup } from '@/components/FormPopup';
import { useFormPopup } from '@/hooks/useFormPopup';

const CookiePolicy = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onOpenForm={openForm} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              We respect your privacy and are committed to being transparent about how we use cookies and similar technologies. This Cookie Policy explains how cookies are used on https://totalauthority.com (the "Website"), operated by Bigg Pants Ltd T/A TotalAuthority ("we," "our," or "us").
            </p>
            
            <p className="mb-6">
              Please also review our Privacy Policy for more detail about how we collect, use, and protect your personal data, and your rights.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">What Are Cookies?</h2>
            <p className="mb-6">
              Cookies are small text files that a website stores on your device to improve your browsing experience. They help websites remember preferences, login information, and usage activity.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Types of Cookies We Use</h2>
            <p className="mb-6">We classify cookies based on their function:</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Essential Cookies</h3>
            <p className="mb-3">
              These are necessary for the Website to function properly. They enable core features like security, authentication, and fraud prevention. You cannot disable these through our cookie tool.
            </p>
            <p className="mb-3">We currently use:</p>
            <ul className="list-disc ml-6 mb-6">
              <li>Usercentrics Consent Management Platform</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Functional Cookies</h3>
            <p className="mb-6">
              These cookies allow the Website to remember your settings or choices (e.g., language preferences, login credentials). We do not currently use functional cookies.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Marketing Cookies</h3>
            <p className="mb-6">
              These cookies track user behaviour to help deliver targeted ads or limit how often you see a particular ad. We do not currently use marketing cookies.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Your Cookie Choices</h2>
            <p className="mb-3">You can manage your cookie preferences in two main ways:</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Using our cookie consent tool</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Available on the homepage or displayed when you first visit</li>
              <li>Allows you to accept or reject functional or marketing cookies</li>
              <li>You may update your preferences or withdraw consent at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Through your browser settings</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>You can set your browser to block or delete cookies</li>
              <li>Check your browser's help section for specific instructions</li>
              <li>For general guidance, visit aboutcookies.org</li>
            </ul>

            <p className="mb-6">
              Please note that disabling certain types of cookies may impact your experience or functionality on the Website.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Questions</h2>
            <p className="mb-3">If you have any questions about this Cookie Policy, please contact us at:</p>
            <p className="mb-6">team@totalauthority.com</p>

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

export default CookiePolicy;
