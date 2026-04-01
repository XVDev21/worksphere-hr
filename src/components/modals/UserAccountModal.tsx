import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button, Input } from '../UI';
import { Camera, Bell, Shield, User as UserIcon } from 'lucide-react';

export const UserAccountModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleSave = () => {
    updateUser(formData);
    onClose();
  };

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Profile Avatar Section */}
      <section className="flex flex-col items-center gap-4">
        <div className="relative">
          <img 
            src={user?.avatar} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full border-4 border-primary/20 object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">{user?.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
        </div>
      </section>

      {/* Profile Information Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <UserIcon size={16} />
          <span>Profile Information</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input 
            label="Email Address" 
            value={formData.email} 
            readOnly
            className="bg-muted/50 cursor-not-allowed"
          />
          <Input 
            label="Phone Number" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Department</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <Bell size={16} />
          <span>Preferences</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle application theme</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative ${isDark ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isDark ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Notification Channels</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(notifications).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-muted/50 rounded-md transition-colors">
                  <input 
                    type="checkbox" 
                    checked={value}
                    onChange={() => setNotifications({ ...notifications, [key]: !value })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
