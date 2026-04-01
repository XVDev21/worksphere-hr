import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Monitor, 
  History, 
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button, Input } from '../UI';

export const SecuritySettingsModal: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      setUpdateStatus('error');
      return;
    }
    setUpdateStatus('success');
    setTimeout(() => setUpdateStatus('idle'), 3000);
  };

  const activeSessions = [
    { id: 's1', device: 'MacBook Pro 14"', location: 'San Francisco, CA', current: true, lastActive: 'Now' },
    { id: 's2', device: 'iPhone 15 Pro', location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
    { id: 's3', device: 'Windows PC', location: 'London, UK', current: false, lastActive: '3 days ago' },
  ];

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Password Management */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <Lock size={16} />
          <span>Password Management</span>
        </div>
        <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border">
          <Input 
            label="Current Password" 
            type="password" 
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="New Password" 
              type="password" 
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            />
            <Input 
              label="Confirm New Password" 
              type="password" 
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground italic">
              Password must be at least 8 characters long.
            </p>
            <Button size="sm" onClick={handleUpdatePassword}>Update Password</Button>
          </div>
          {updateStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold bg-green-500/10 p-2 rounded-md">
              <CheckCircle2 size={14} />
              <span>Password updated successfully!</span>
            </div>
          )}
          {updateStatus === 'error' && (
            <div className="flex items-center gap-2 text-destructive text-xs font-bold bg-destructive/10 p-2 rounded-md">
              <AlertCircle size={14} />
              <span>Passwords do not match.</span>
            </div>
          )}
        </div>
      </section>

      {/* Two Factor Authentication */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <Smartphone size={16} />
          <span>Two-Factor Authentication</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${is2FAEnabled ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm font-bold">2FA Status: <span className={is2FAEnabled ? 'text-green-500' : 'text-muted-foreground'}>{is2FAEnabled ? 'Enabled' : 'Disabled'}</span></p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <button 
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${is2FAEnabled ? 'bg-primary' : 'bg-muted'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${is2FAEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </section>

      {/* Active Sessions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Monitor size={16} />
            <span>Active Sessions</span>
          </div>
          <button className="text-xs text-destructive font-bold hover:underline">Log out from all other sessions</button>
        </div>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                  {session.device.includes('iPhone') ? <Smartphone size={20} /> : <Monitor size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{session.device}</p>
                    {session.current && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Current</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                  <LogOut size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Account Activity */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <History size={16} />
          <span>Account Activity</span>
        </div>
        <div className="space-y-2">
          {[
            { date: '2026-03-31 14:22:05', action: 'Successful Login', device: 'Chrome on MacOS' },
            { date: '2026-03-30 09:15:12', action: 'Password Changed', device: 'Chrome on MacOS' },
            { date: '2026-03-28 22:45:30', action: 'Successful Login', device: 'Safari on iPhone' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 text-xs border-b border-border last:border-0">
              <div>
                <p className="font-bold">{activity.action}</p>
                <p className="text-muted-foreground">{activity.device}</p>
              </div>
              <p className="text-muted-foreground">{activity.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
