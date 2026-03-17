import React from 'react';
import { COMMON_APPLIANCES } from '../utils/calculator';

const ApplianceList = ({ appliances, setAppliances }) => {

  const addAppliance = () => {
    const newId = `custom_${Date.now()}`;
    setAppliances([...appliances, { 
      id: newId, 
      name: 'New Appliance', 
      watts: 100, 
      quantity: 1, 
      hoursPerDay: 5 
    }]);
  };

  const addPreset = (presetId) => {
    const preset = COMMON_APPLIANCES.find(a => a.id === presetId);
    if (!preset) return;
    
    // Check if it already exists to avoid duplicates, just increase qty
    const existingIndex = appliances.findIndex(a => a.name === preset.name);
    
    if (existingIndex >= 0) {
      const updated = [...appliances];
      updated[existingIndex].quantity += 1;
      setAppliances(updated);
    } else {
      setAppliances([...appliances, {
        id: `preset_${Date.now()}_${preset.id}`,
        name: preset.name,
        watts: preset.watts,
        quantity: preset.defaultQuantity,
        hoursPerDay: preset.defaultHours
      }]);
    }
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(appliances.map(app => {
      if (app.id === id) {
        return { ...app, [field]: value };
      }
      return app;
    }));
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-md">
        <h2>Your Appliances</h2>
        <button className="btn btn-primary" onClick={addAppliance}>+ Add Custom</button>
      </div>

      <div className="mb-lg">
        <label className="input-label">Quick Add Preset:</label>
        <select 
          className="w-full mt-xs" 
          onChange={(e) => {
            if(e.target.value) {
              addPreset(e.target.value);
              e.target.value = ''; // Reset select
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>-- Select Appliance to Add --</option>
          {COMMON_APPLIANCES.map(app => (
            <option key={app.id} value={app.id}>{app.name} ({app.watts}W)</option>
          ))}
        </select>
      </div>

      <div className="flex-col gap-sm">
        {appliances.length === 0 ? (
          <p className="text-muted text-center p-md">No appliances added yet. Add some to calculate your bill.</p>
        ) : (
          appliances.map(app => (
            <div key={app.id} className="card p-md" style={{ backgroundColor: 'var(--bg-color)' }}>
              <div className="flex justify-between items-center mb-sm">
                <input 
                  type="text" 
                  value={app.name} 
                  onChange={(e) => updateAppliance(app.id, 'name', e.target.value)}
                  className="font-semibold text-lg p-xs"
                  style={{ border: 'none', backgroundColor: 'transparent', flexGlow: 1 }}
                />
                <button 
                  className="btn-danger btn-icon" 
                  onClick={() => removeAppliance(app.id)}
                  title="Remove Appliance"
                >×</button>
              </div>
              
              <div className="grid grid-cols-3 gap-sm">
                <div className="input-group">
                  <label className="input-label">Power (Watts)</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={app.watts}
                    onChange={(e) => updateAppliance(app.id, 'watts', Number(e.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={app.quantity}
                    onChange={(e) => updateAppliance(app.id, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Hrs / Day</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="24" 
                    step="0.5"
                    value={app.hoursPerDay}
                    onChange={(e) => updateAppliance(app.id, 'hoursPerDay', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplianceList;
