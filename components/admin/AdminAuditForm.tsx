"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminAuditFormProps {
  onAuditCreated: () => void;
}

export const AdminAuditForm: React.FC<AdminAuditFormProps> = ({ onAuditCreated }) => {
  const [clientName, setClientName] = useState('');
  const [auditData, setAuditData] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  };

  const generateAuditCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const loadSampleData = () => {
    const sampleData = {
      client_name: "Bramlett Partners",
      audit_data: {
        // Executive Scorecard
        discovery_coverage: "3 of 4 queries",
        knowledge_accuracy: "Partial (size, sales, rebrand noted; no founding year)",
        knowledge_panel: "Not Present",
        overall_score: "7",
        
        // Discovery Phrases
        discovery_phrases: [
          {
            query: "best realtor in Austin",
            results: "Mark Martin • Roman Lopez • Eric Bramlett • Lindsay Neuren • Kent Redding • Ashley Stucki • Wade Giles • Bridget Ramey • Kumara Wilcoxon • Laurie Flood",
            mentioned: true,
            mention_type: "Eric"
          },
          {
            query: "top real estate agents in Austin", 
            results: "Eric Bramlett • Mark Martin • Roman Lopez • Ryan Smith • Kumara Wilcoxon • Wade Giles • Bridget Ramey • Kent Redding • Sara Coltharp • Chrissy Caputo",
            mentioned: true,
            mention_type: "Eric"
          },
          {
            query: "best real estate agency in Austin",
            results: "Realty Austin • Keller Williams • Compass • Kuper Sotheby's • Modere Group • Bramlett Partners • Spyglass • Realty Texas • The Agency Texas • JBGoodwin",
            mentioned: true,
            mention_type: "Partners"
          },
          {
            query: "best real estate brokerage in Austin",
            results: "Keller Williams • Compass • Realty Austin • Kuper Sotheby's • Realty Texas • JBGoodwin • The Agency Texas • Modere Group • Twelve Rivers • Moreland Properties",
            mentioned: false,
            mention_type: ""
          }
        ],
        
        // ChatGPT Knowledge
        chatgpt_knowledge: "Bramlett Partners (formerly Bramlett Residential) is a top boutique brokerage in Austin with 115+ agents and over $800 million in 2024 sales. Founded by Eric Bramlett, a multi‑year Austin Business Journal award winner, the firm is known for data‑driven marketing and 2,100+ five‑star reviews on Google, Yelp, and Zillow.",
        knowledge_gaps: [
          "No founding year (2003)",
          "No mention of recent PT50 awards or RealTrends ranking", 
          "No citation links shown"
        ],
        
        // Citation & Review Pulse
        platforms: [
          { name: "LinkedIn company page", reviews: "~2,900 followers", rating: null },
          { name: "Google Business Profile", reviews: "1,200+", rating: "4.9" },
          { name: "Yelp profile", reviews: "400+", rating: "5.0" },
          { name: "Zillow profile", reviews: "1,100+", rating: "5.0" }
        ],
        citation_domains: [
          "yelp.com",
          "listwithclever.com", 
          "expertise.com",
          "bizjournals.com"
        ],
        
        // Google Knowledge Graph Snapshot
        knowledge_panel_status: 'None for "Bramlett Partners" or "Eric Bramlett (Realtor)"',
        schema_status: "No Organization markup detected on site",
        kg_implication: "Without a resolved entity, Gemini/Bing Chat have weaker trust signals; name change may delay panel creation.",
        
        // ChatGPT Insights
        chatgpt_insights: [
          {
            signal: "High‑authority listicles",
            evidence: "Clever Top Agents 2025 & Expertise Best Realtors Austin drive agent lists",
            implication: "Secure or refresh inclusions—critical for \"brokerage\" query too"
          },
          {
            signal: "Review volume & rating", 
            evidence: "Agents/firms listed all carry ≥1,000 reviews & ≥4.8★ average",
            implication: "Maintain review velocity; expand to Trustpilot, HAR.com"
          },
          {
            signal: "Fresh dates (2025)",
            evidence: "Lists updated in 2025 outrank older posts", 
            implication: "Issue PR & blog content dated 2025 featuring rebrand"
          },
          {
            signal: "Name consistency",
            evidence: "Model sometimes still sees \"Bramlett Residential\"",
            implication: "Standardise \"Bramlett Partners (formerly ...)\" across all bios and citations"
          },
          {
            signal: "Entity presence",
            evidence: "Realty Austin & Keller Williams have Knowledge Panels",
            implication: "Claiming a KP will improve inclusion for generic \"brokerage\" phrases"
          }
        ],
        
        // Quick Wins
        quick_wins: [
          {
            title: "Publish an Entity Home page detailing rebrand + add Organization schema (sameAs: LinkedIn, Yelp, Zillow, GBP)",
            description: "Create structured data markup to help search engines understand your business entity",
            effort: "Low",
            impact: "Foundation for Knowledge Panel"
          },
          {
            title: "Update all existing citations to unified name; request Google/Yelp merge old & new names",
            description: "Consolidate brand mentions across platforms",
            effort: "Low", 
            impact: "Removes duplication & boosts model confidence"
          },
          {
            title: "Pitch Expertise.com & Clever with 2025 sales & awards data to lock list spots",
            description: "Proactively reach out to list publishers with updated information",
            effort: "Med",
            impact: "Likely adds Bramlett to \"brokerage\" query list"
          },
          {
            title: "Syndicate a BusinessWire press release on rebrand & $800M milestone (indexed 2025)",
            description: "Generate authoritative news coverage of company achievements",
            effort: "Med",
            impact: "Generates fresh high‑authority citations"
          }
        ],
        
        // Next Steps
        next_steps: [
          "Execute Quick Wins; re‑check ChatGPT in 4–6 weeks",
          "Begin Knowledge Panel path: claim GBP → add schema → secure press coverage",
          "Consider Deep‑Dive Audit to assess Claude, Gemini & Perplexity visibility and run buyer‑journey queries (e.g., \"best neighborhood agent for relocating families in Austin\")"
        ]
      }
    };

    setClientName(sampleData.client_name);
    setAuditData(JSON.stringify(sampleData.audit_data, null, 2));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const slug = generateSlug(clientName);
      const auditCode = generateAuditCode();
      
      const { data, error } = await supabase
        .from('audit_reports')
        .insert({
          client_name: clientName,
          share_url_slug: slug,
          audit_code: auditCode,
          audit_data: auditData
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: `Audit created successfully! Code: ${auditCode}`,
      });

      setClientName('');
      setAuditData('');
      onAuditCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create audit report",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Audit Report</CardTitle>
        <CardDescription>
          Paste the audit data and generate a beautiful client dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="auditData">Audit Data</Label>
            <div className="flex space-x-2 mb-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={loadSampleData}
              >
                Load Sample Data (Bramlett Partners)
              </Button>
            </div>
            <Textarea
              id="auditData"
              value={auditData}
              onChange={(e) => setAuditData(e.target.value)}
              placeholder="Paste the audit data here (JSON or plain text)"
              className="min-h-[300px] font-mono text-sm"
              required
            />
          </div>
          
          <Button type="submit" disabled={loading || submitting} className="w-full">
            {loading ? 'Creating...' : 'Generate Audit Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
