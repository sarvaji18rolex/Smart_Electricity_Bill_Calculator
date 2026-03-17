import React from 'react';

const ResultsDashboard = ({ calculations, settings }) => {
  const { monthlyUnits, bimonthlyUnits, bimonthlyCost, monthlyCost } = calculations;

  // Apply limit styles if limit is exceeded
  const isOverLimit = settings.limit > 0 && bimonthlyUnits > settings.limit;

  return (
    <div className="card" style={{ background: 'linear-gradient(to bottom right, var(--bg-surface), #0f172a)' }}>
      <h2 className="mb-lg text-2xl" style={{ color: 'var(--secondary-accent)' }}>Bill Summary</h2>

      <div className="grid grid-cols-2 gap-md mb-lg">
        <div className="p-md" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: isOverLimit ? '1px solid var(--danger)' : '1px solid var(--border-color)' }}>
          <p className="text-sm text-muted mb-xs">Monthly Consumption</p>
          <p className="text-xl font-bold">
            <span style={{ color: isOverLimit ? 'var(--danger)' : 'var(--text-primary)' }}>
              {monthlyUnits} 
            </span>
            <span className="text-sm text-muted font-normal ml-xs">Units (kWh)</span>
          </p>
        </div>
        <div className="p-md" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
          <p className="text-sm text-muted mb-xs">Bi-monthly Consumption</p>
          <p className="text-xl font-bold">{bimonthlyUnits} <span className="text-sm text-muted font-normal">Units</span></p>
        </div>
      </div>

      <div className="mb-lg p-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <h3 className="text-lg mb-sm text-center">Estimated TNEB Bill (Bi-monthly)</h3>
        <p className="text-3xl font-bold text-center" style={{ color: 'var(--secondary-accent)' }}>
          ₹ {bimonthlyCost.toLocaleString('en-IN')}
        </p>
        <p className="text-center text-sm text-muted mt-xs">Approx. ₹ {monthlyCost.toLocaleString('en-IN')} / month</p>
      </div>

      {isOverLimit && (
        <div className="p-md mb-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--danger)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
          <p className="text-sm text-danger font-semibold">⚠️ Alert: Consumption exceeds your set limit of {settings.limit} units.</p>
        </div>
      )}

      {settings.flatRate > 0 && (
        <div className="mb-md">
          <h4 className="text-sm text-muted mb-xs">Alternative Flat Rate Calculation</h4>
          <div className="flex justify-between items-center p-sm" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
            <span className="text-sm text-muted">@ ₹{settings.flatRate}/unit </span>
            <span className="font-semibold text-lg">₹ {(bimonthlyUnits * settings.flatRate).toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      <div className="mt-lg pt-lg" style={{ borderTop: '1px solid var(--border-color)' }}>
         <h4 className="text-sm text-muted mb-sm">Important TNEB Notes:</h4>
         <ul className="text-xs text-muted" style={{ paddingLeft: 'var(--spacing-md)' }}>
           <li className="mb-xs">First 100 units are totally free across all slabs.</li>
           <li className="mb-xs">Calculation includes 0% fixed charges as fixed charges depend on exact connected load and meter type.</li>
           <li>Actual bill may vary slightly based on precise meter readings and government revisions.</li>
         </ul>
      </div>
    </div>
  );
};

export default ResultsDashboard;
