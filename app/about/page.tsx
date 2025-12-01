"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink, Bot, Cpu, Zap, Rocket, Brain, CircuitBoard, Sparkles, Users, Globe, Mic, Star } from 'lucide-react';
import { useFormPopup } from '@/hooks/useFormPopup';
import { FormPopup } from '@/components/FormPopup';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// Founder images from Lovable migration (stored in public/lovable-uploads/)
const chrisImage = "/lovable-uploads/f46e68e3-f04e-41db-9ee4-5a1cec1831aa.png";
const nickImage = "/lovable-uploads/78efdd4f-4ba8-4b29-967a-ce18966a33d2.png";
const chrisProfileImage = "/lovable-uploads/a9f1895a-95ce-4693-8740-1208df0d27ca.png";
const nickProfileImage = "/lovable-uploads/da8791ef-79d6-4372-93af-202398fbc01b.png";

const About = () => {
  const { isOpen, openForm, closeForm } = useFormPopup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Subtle Floating Elements */}
      <div className="fixed top-20 right-10 z-10 animate-bounce [animation-duration:4s] [animation-delay:1s] opacity-60">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
          <Bot className="w-6 h-6 text-blue-600 animate-pulse [animation-duration:3s]" />
        </div>
      </div>
      
      <div className="fixed bottom-20 left-10 z-10 animate-bounce [animation-duration:5s] [animation-delay:2s] opacity-60">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
          <Brain className="w-5 h-5 text-purple-600 animate-pulse [animation-duration:2s]" />
        </div>
      </div>
      
      {/* Minimal Tech Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
      <Header onOpenForm={openForm} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-sm py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-orange-500/5 animate-pulse [animation-duration:4s]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="animate-fade-in">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  We build authority for leaders and brands in the AI era.
                </h1>
              </div>
              <div className="animate-fade-in [animation-delay:200ms]">
                <p className="text-xl text-muted-foreground mb-8 font-medium">
                  Founders of Total Authority: Chris Panteli & Nick Biggs
                </p>
              </div>
              <div className="animate-fade-in [animation-delay:400ms]">
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-200/50">
                    <span className="text-sm font-medium text-purple-700">AI-Driven Marketing</span>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full border border-blue-200/50">
                    <span className="text-sm font-medium text-blue-700">Thought Leadership</span>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full border border-orange-200/50">
                    <span className="text-sm font-medium text-orange-700">Authority Building</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end animate-fade-in [animation-delay:600ms]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-orange-500/20 blur-3xl animate-pulse [animation-duration:3s]" />
                <div className="flex gap-8 items-end relative z-10">
                  <div className="group transform hover:scale-105 transition-all duration-700 hover-scale">
                    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/40 group-hover:shadow-purple-500/20 group-hover:shadow-3xl transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      {chrisImage ? <img 
                        src={chrisImage} 
                        alt="Chris Panteli, Co-founder of Total Authority"
                        className="w-56 h-auto object-contain relative z-10"
                      /> : <div className="w-56 h-56 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative z-10"><Users className="w-16 h-16 text-purple-600/40" /></div>}
                    </div>
                  </div>
                  <div className="group transform hover:scale-105 transition-all duration-700 translate-y-8 hover-scale">
                    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/40 group-hover:shadow-blue-500/20 group-hover:shadow-3xl transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      {nickImage ? <img 
                        src={nickImage} 
                        alt="Nick Biggs, Co-founder of Total Authority"
                        className="w-56 h-auto object-contain relative z-10"
                      /> : <div className="w-56 h-56 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-orange-500/20 relative z-10"><Users className="w-16 h-16 text-blue-600/40" /></div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Total Authority Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full blur-3xl" />
            
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent relative z-10">
              About Total Authority
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6 relative z-10">
              <div className="animate-fade-in [animation-delay:200ms]">
                <p className="text-xl mb-8 font-medium leading-relaxed">
                  Total Authority is a digital marketing agency specializing in helping leaders and brands establish unshakeable authority in the AI-driven economy.
                </p>
              </div>
              <div className="animate-fade-in [animation-delay:400ms]">
                <p className="mb-8 text-lg leading-relaxed">
                  In a world where artificial intelligence is reshaping how we do business, create content, and connect with audiences, the traditional playbook for building authority has been completely rewritten. We help forward-thinking leaders navigate this new landscape and emerge stronger than ever.
                </p>
              </div>
              <div className="animate-fade-in [animation-delay:600ms]">
                <p className="mb-8 text-lg leading-relaxed">
                  Our comprehensive approach combines cutting-edge AI tools with time-tested authority-building strategies. We don't just help you adapt to the AI revolution – we help you lead it.
                </p>
              </div>
              <div className="animate-fade-in [animation-delay:800ms]">
                <p className="text-lg leading-relaxed">
                  Whether you're a CEO looking to establish thought leadership, a startup founder seeking market credibility, or an established brand pivoting for the AI era, Total Authority provides the strategic expertise and execution you need to dominate your space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50/80 to-blue-50/80 backdrop-blur-sm relative overflow-hidden">
        {/* Animated Tech Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse [animation-duration:3s]" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full animate-pulse [animation-duration:4s] [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full animate-pulse [animation-duration:5s] [animation-delay:2s]" />
        </div>


        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-fade-in">
            About Us
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Nick Biggs */}
            <div className="text-center lg:text-left animate-fade-in [animation-delay:200ms]">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="group w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-orange-500/20 p-1 shadow-2xl hover-scale transition-all duration-700 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-orange-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin [animation-duration:3s]" />
                  <div className="w-full h-full rounded-full overflow-hidden bg-white/30 backdrop-blur-md border border-white/40 relative z-10">
                    <img 
                      src={chrisProfileImage} 
                      alt="Nick Biggs"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Nick Biggs</h3>
              <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">
                    Nick Biggs is a digital marketing specialist with expertise in SEO and content marketing. He applies analytical insights and creative approaches to develop effective link-building campaigns that enhance search engine rankings and brand authority. Nick's work emphasizes sustainable growth through ethical and high-quality digital marketing practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Chris Panteli */}
            <div className="text-center lg:text-left animate-fade-in [animation-delay:400ms]">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="group w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 p-1 shadow-2xl hover-scale transition-all duration-700 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-500/30 to-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin [animation-duration:3s] [animation-direction:reverse]" />
                  <div className="w-full h-full rounded-full overflow-hidden bg-white/30 backdrop-blur-md border border-white/40 relative z-10">
                    <img 
                      src={nickProfileImage}
                      alt="Chris Panteli"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Chris Panteli</h3>
              <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">
                    Chris Panteli is an entrepreneur with a background in economics who transitioned from managing his family's fish and chip shop to building a successful career in digital marketing and SEO. He has a strong focus on link building and digital PR, leveraging storytelling and data-driven strategies to help brands increase their online visibility and organic traffic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-purple-50/30" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse [animation-duration:4s]" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse [animation-duration:4s] [animation-delay:2s]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Our Podcast: Market Movers
              </h2>
              <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  Join Chris and Nick every week as they dive deep into the strategies, tools, and mindsets that separate market leaders from followers. Market Movers features conversations with industry pioneers, breakthrough case studies, and actionable insights you can implement immediately.
                </p>
              </div>
              
              {/* Podcast Player */}
              <div className="animate-fade-in [animation-delay:400ms] flex justify-center">
                <iframe 
                  title="Market Movers: Building Brands & Links with Linkifi" 
                  height="315" 
                  width="100%" 
                  style={{border: 'none', minWidth: 'min(100%, 430px)', height: '315px'}} 
                  scrolling="no" 
                  data-name="pb-iframe-player" 
                  src="https://www.podbean.com/player-v2/?i=zp2st-1290619-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1b1b1b&font-color=auto&logo_link=episode_page&order=episodic&limit=4&filter=all&ss=d478e8812599deb72aed893f84e27af5&btn-skin=ff6d00&size=315" 
                  loading="lazy" 
                  allowFullScreen
                  className="rounded-lg shadow-xl max-w-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Events Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50/80 to-purple-50/80 backdrop-blur-sm">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse [animation-duration:4s]" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full animate-pulse [animation-duration:5s] [animation-delay:1000ms]" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-500/10 rounded-full animate-pulse [animation-duration:3s] [animation-delay:500ms]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Speaking Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sharing insights and strategies with SEO communities around the world
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* SEO Estonia 2025 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-fade-in">
                <div className="aspect-[16/10] relative overflow-hidden">
                  {/* Primary Image */}
                  <img 
                    src="/lovable-uploads/61843d16-4ce3-4d31-9475-7f05f94b7eb5.png" 
                    alt="Chris speaking at SEO Estonia 2025"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Secondary Image - appears on hover */}
                  <img 
                    src="/lovable-uploads/9e59bde5-b953-4a6c-aea4-22f63905a0c1.png" 
                    alt="Chris presenting at SEO Estonia 2025"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-200">2025</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">SEO Estonia 2025</h3>
                  <p className="text-sm opacity-90 mb-4">Advanced SEO Strategies & AI Integration</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <Users className="w-3 h-3" />
                    <span>500+ Attendees</span>
                    <div className="w-1 h-1 bg-white/50 rounded-full mx-2"></div>
                    <Globe className="w-3 h-3" />
                    <span>Tallinn, Estonia</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Link Building Mastery London 2025 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-fade-in [animation-delay:200ms]">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/03513aac-fff9-4292-871f-982ca94efe18.png" 
                    alt="Chris speaking at Link Building Mastery London 2025"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-orange-200">2025</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-200 transition-colors duration-300">Link Building Mastery</h3>
                  <p className="text-sm opacity-90 mb-4">London 2025 - Advanced Link Strategies</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <Users className="w-3 h-3" />
                    <span>300+ Attendees</span>
                    <div className="w-1 h-1 bg-white/50 rounded-full mx-2"></div>
                    <Globe className="w-3 h-3" />
                    <span>London, UK</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* SEO Vibes Dubai 2024 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-fade-in [animation-delay:400ms]">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/1b1b9172-200a-4e40-bc1f-b52ab362f1c5.png" 
                    alt="Chris speaking at SEO Vibes Dubai 2024"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <img 
                    src="/lovable-uploads/f6df4de1-89c6-4624-97e8-926883abe1cb.png" 
                    alt="Chris presenting AI strategies at SEO Vibes Dubai 2024"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-purple-200">2024</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-200 transition-colors duration-300">SEO Vibes Dubai</h3>
                  <p className="text-sm opacity-90 mb-4">How to Use AI to Build PR Links</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <Users className="w-3 h-3" />
                    <span>400+ Attendees</span>
                    <div className="w-1 h-1 bg-white/50 rounded-full mx-2"></div>
                    <Globe className="w-3 h-3" />
                    <span>Dubai, UAE</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Affiliate Gathering York 2024 */}
              <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-fade-in [animation-delay:600ms]">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/b336701d-65b5-4b8c-9e59-4835afe3ea42.png" 
                    alt="Chris at Affiliate Gathering York 2024"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <img 
                    src="/lovable-uploads/7cee1cdd-5197-41b6-b6d8-86ceecc55f82.png" 
                    alt="Panel discussion at Affiliate Gathering York 2024"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-200">2024</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-green-200 transition-colors duration-300">Affiliate Gathering</h3>
                  <p className="text-sm opacity-90 mb-4">York 2024 - Expert Panel Discussion</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <Users className="w-3 h-3" />
                    <span>250+ Attendees</span>
                    <div className="w-1 h-1 bg-white/50 rounded-full mx-2"></div>
                    <Globe className="w-3 h-3" />
                    <span>York, UK</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Speaking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in [animation-delay:800ms]">
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Events Spoken At</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Audience Reached</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenForm={openForm} />
      <FormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
};

// Podcast Feed Component
const PodcastFeed = () => {
  const [episodes, setEpisodes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    // Mock data for now - in a real implementation, you'd fetch from the RSS feed
    const mockEpisodes = [
      {
        id: 1,
        title: "Building Authority in the Age of AI with Gary Vaynerchuk",
        description: "Gary shares his insights on how AI is changing personal branding and what leaders need to do to stay relevant.",
        publishDate: "2025-01-08",
        audioUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        title: "The Future of Content Creation: AI Tools That Actually Work",
        description: "We break down the most effective AI tools for content creation and how to use them without losing authenticity.",
        publishDate: "2025-01-01",
        audioUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        title: "From Zero to Thought Leader: A 90-Day Blueprint",
        description: "Our step-by-step guide to establishing thought leadership in any industry, even if you're starting from scratch.",
        publishDate: "2024-12-25",
        audioUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop"
      }
    ];
    
    setEpisodes(mockEpisodes);
    setLoading(false);
  }, []);

  const displayedEpisodes = showMore ? episodes : episodes.slice(0, 6);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse" />
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded animate-pulse mb-3" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-3" />
              <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {displayedEpisodes.map((episode) => (
          <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={episode.imageUrl} 
                alt={episode.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3 line-clamp-2">{episode.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{episode.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{episode.publishDate}</span>
                <Button variant="ghost" size="sm" className="p-2">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {episodes.length > 6 && !showMore && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowMore(true)}
            className="px-8 py-3"
          >
            Load More Episodes
          </Button>
        </div>
      )}
    </div>
  );
};

export default About;