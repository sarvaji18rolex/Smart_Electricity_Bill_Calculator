import React from 'react';
import { HOUSE_TYPES, SEASONS } from '../utils/calculator';

const SettingsPanel = ({ settings, setSettings }) => {
  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-col gap-lg">
      <div className="card">
        <h3 className="mb-md text-xl">House Type</h3>
        <p className="text-muted text-sm mb-md">Select your house type to adjust baseline consumption</p>
        <div className="flex-col gap-sm">
          {Object.entries(HOUSE_TYPES).map(([key, type]) => (
            <label key={key} className="flex items-center gap-sm p-sm" style={{ cursor: 'pointer', borderRadius: 'var(--radius-sm)', border: settings.houseType === key ? '1px solid var(--primary-accent)' : '1px solid transparent', backgroundColor: settings.houseType === key ? 'rgba(14, 165, 233, 0.1)' : 'transparent' }}>
              <input 
                type="radio" 
                name="houseType" 
                value={key} 
                checked={settings.houseType === key} 
                onChange={(e) => handleChange('houseType', e.target.value)} 
                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-accent)' }}
              />
              <span className="font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="mb-md text-xl">Seasonal Settings</h3>
        <p className="text-muted text-sm mb-md">Select current season for accurate calculation</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
          {Object.entries(SEASONS).map(([key, season]) => (
            <button
              key={key}
              className={`btn ${settings.season === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleChange('season', key)}
              style={{ width: '100%', padding: 'var(--spacing-md)' }}
            >
              {season.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="mb-md text-xl">Billing Settings</h3>
        <div className="input-group">
          <label className="input-label">Flat Rate per Unit (₹)</label>
          <input 
            type="number" 
            min="0" 
            step="0.5"
            value={settings.flatRate} 
            onChange={(e) => handleChange('flatRate', Number(e.target.value))} 
            placeholder="Used for alternative flat-rate calculation"
          />
          <span className="text-xs text-muted">TNEB slab rates are applied separately automatically.</span>
        </div>
        
        <div className="input-group mt-sm">
          <label className="input-label">Consumption Limit Alert (Units)</label>
          <input 
            type="number" 
            min="0" 
            value={settings.limit} 
            onChange={(e) => handleChange('limit', Number(e.target.value))} 
            placeholder="0 for no limit"
          />
        </div>

        <div className="input-group mt-sm">
          <label className="input-label">Expected Change (%)</label>
          <input 
            type="number" 
            value={settings.changePercent} 
            onChange={(e) => handleChange('changePercent', Number(e.target.value))} 
            placeholder="e.g. 15 for increase, -10 for savings"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
