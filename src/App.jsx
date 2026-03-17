import { useState, useEffect, useMemo } from 'react';
import ApplianceList from './components/ApplianceList';
import SettingsPanel from './components/SettingsPanel';
import ResultsDashboard from './components/ResultsDashboard';
import { calculateMonthlyConsumption, calculateTNEBBill, HOUSE_TYPES, SEASONS } from './utils/calculator';
import './index.css';

function App() {
  const [appliances, setAppliances] = useState([
    { id: 'app_1', name: 'Ceiling Fan', watts: 75, quantity: 2, hoursPerDay: 10 },
    { id: 'app_2', name: 'Refrigerator', watts: 150, quantity: 1, hoursPerDay: 24 }
  ]);

  const [settings, setSettings] = useState({
    houseType: 'STANDARD',
    season: 'NORMAL',
    flatRate: 0,
    limit: 0,
    changePercent: 0
  });

  const calculations = useMemo(() => {
    const seasonMultiplier = SEASONS[settings.season].multiplier;
    const houseMultiplier = HOUSE_TYPES[settings.houseType].baselineMultiplier;
    
    // Calculate raw consumption
    let monthlyUnits = calculateMonthlyConsumption(appliances, seasonMultiplier);
    
    // Apply house type multiplier and expected change
    monthlyUnits = monthlyUnits * houseMultiplier;
    if (settings.changePercent !== 0) {
      monthlyUnits = monthlyUnits * (1 + (settings.changePercent / 100));
    }

    return calculateTNEBBill(monthlyUnits);
  }, [appliances, settings]);

  return (
    <div className="container">
      <header className="app-header flex justify-between items-center">
        <div>
          <h1 className="app-title">SmartElectricity</h1>
          <p className="app-subtitle">TNEB Domestic Tariff Calculator</p>
        </div>
      </header>
      
      <main className="dashboard-layout">
        <div className="flex-col gap-xl">
          <ApplianceList 
            appliances={appliances} 
            setAppliances={setAppliances} 
          />
          <SettingsPanel 
            settings={settings} 
            setSettings={setSettings} 
          />
        </div>
        
        <div style={{ position: 'sticky', top: 'var(--spacing-xl)', height: 'fit-content' }}>
          <ResultsDashboard 
            calculations={calculations} 
            settings={settings} 
          />
        </div>
      </main>
      
      <footer className="mt-xl text-center text-sm text-muted pb-lg" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-lg)' }}>
        <p>Built for estimating Tamil Nadu Electricity Board (TNEB) domestic consumption.</p>
        <p>Not affiliated with TNEB. Values are approximate.</p>
      </footer>
    </div>
  );
}

export default App;
