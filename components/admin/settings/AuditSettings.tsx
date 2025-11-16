
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Archive, Settings } from 'lucide-react';

interface AuditSettingsData {
  email_notifications: boolean;
  notification_email: string;
  auto_archive_claimed: boolean;
}

export const AuditSettings: React.FC = () => {
  const [settings, setSettings] = useState<AuditSettingsData>({
    email_notifications: false,
    notification_email: '',
    auto_archive_claimed: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // For now, we'll store settings in localStorage
      // In a production app, you'd want to store this in the database
      const savedSettings = localStorage.getItem('audit_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      localStorage.setItem('audit_settings', JSON.stringify(settings));
      toast({
        title: "Settings saved",
        description: "Your audit management settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Audit Management Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email Notifications
              </Label>
              <p className="text-sm text-gray-600">
                Get notified when someone claims a new audit
              </p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, email_notifications: checked })
              }
            />
          </div>
          
          {settings.email_notifications && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="notification_email" className="text-sm">
                Notification Email
              </Label>
              <Input
                id="notification_email"
                type="email"
                placeholder="admin@company.com"
                value={settings.notification_email}
                onChange={(e) =>
                  setSettings({ ...settings, notification_email: e.target.value })
                }
                className="max-w-md"
              />
            </div>
          )}
        </div>

        {/* Auto Archive */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-medium flex items-center gap-2">
              <Archive className="w-4 h-4 text-orange-600" />
              Auto Archive Claimed Audits
            </Label>
            <p className="text-sm text-gray-600">
              Automatically archive audits when they are claimed
            </p>
          </div>
          <Switch
            checked={settings.auto_archive_claimed}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, auto_archive_claimed: checked })
            }
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
