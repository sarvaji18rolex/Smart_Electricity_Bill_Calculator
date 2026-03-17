// TNEB Tariff Slabs for Domestic Consumers
const TNEB_SLABS = [
  { max: 100, rate: 0 },
  { max: 400, rate: 4.50 },
  { max: 500, rate: 6.00 },
  { max: 600, rate: 8.00 },
  { max: 800, rate: 9.00 },
  { max: 1000, rate: 10.00 },
  { max: Infinity, rate: 11.00 }
];

// Fixed charges are usually applied bimonthly in TN based on total units consumed
const getFixedCharges = (units) => {
  if (units <= 100) return 0; // Completely free
  if (units <= 400) return 0; // Usually zero for up to 400 in current TN slabs, depending on revisions
  return 0; // Simplify for now, focus on variable rates.
};

export const calculateMonthlyConsumption = (appliances, seasonMultiplier = 1) => {
  let dailyWattsHours = 0;
  
  appliances.forEach(app => {
    dailyWattsHours += (app.watts * app.quantity * app.hoursPerDay);
  });
  
  // Convert Wh to kWh (Units), and monthly (30 days)
  const monthlyUnits = (dailyWattsHours / 1000) * 30 * seasonMultiplier;
  return monthlyUnits;
};

// TNEB is usually Bi-Monthly (60 days)
export const calculateTNEBBill = (monthlyUnits) => {
  // Bi-monthly units for TNEB calculation
  const bimonthlyUnits = monthlyUnits * 2;
  
  // Calculate total bi-monthly cost
  let totalCost = 0;
  
  if (bimonthlyUnits <= 100) {
    totalCost = 0; // First 100 units free across board
  } else {
    // According to recent TNEB tariff structure changes,
    // if total > 100 but <= 400
    if (bimonthlyUnits <= 400) {
       totalCost = (bimonthlyUnits - 100) * 4.50;
    } 
    // if total > 400 but <= 500
    else if (bimonthlyUnits <= 500) {
       totalCost = (300 * 4.50) + ((bimonthlyUnits - 400) * 6.00);
    }
    // if total > 500
    else {
      // Rates change drastically if consumption > 500
      totalCost = (300 * 4.50) + (100 * 6.00) + (100 * 8.00); // Base up to 600
      let remaining = bimonthlyUnits - 600;
      
      if (remaining > 0) {
        if (remaining <= 200) {
          totalCost += remaining * 9.00;
        } else if (remaining <= 400) { // Up to 1000
          totalCost += (200 * 9.00) + ((remaining - 200) * 10.00);
        } else {
          totalCost += (200 * 9.00) + (200 * 10.00) + ((remaining - 400) * 11.00);
        }
      }
    }
  }

  // Cost per month is half the bi-monthly cost
  return {
    monthlyUnits: Math.round(monthlyUnits),
    bimonthlyUnits: Math.round(bimonthlyUnits),
    bimonthlyCost: Math.round(totalCost),
    monthlyCost: Math.round(totalCost / 2)
  };
};

export const HOUSE_TYPES = {
  STANDARD: { label: 'Standard House', baselineMultiplier: 1 },
  ENERGY_EFFICIENT: { label: 'Energy Efficient', baselineMultiplier: 0.85 },
  LARGE: { label: 'Large House / Villa', baselineMultiplier: 1.25 }
};

export const SEASONS = {
  NORMAL: { label: 'Normal Season', multiplier: 1 },
  SUMMER: { label: 'Summer Season', multiplier: 1.25 }, // AC usage spikes
  WINTER: { label: 'Winter / Monsoon', multiplier: 0.9 }
};

export const COMMON_APPLIANCES = [
  { id: 'a1', name: 'Ceiling Fan', watts: 75, defaultQuantity: 3, defaultHours: 12 },
  { id: 'a2', name: 'LED Tube Light', watts: 20, defaultQuantity: 4, defaultHours: 6 },
  { id: 'a3', name: 'Refrigerator (250L)', watts: 150, defaultQuantity: 1, defaultHours: 24 }, // Avg running load
  { id: 'a4', name: 'Air Conditioner (1.5 Ton)', watts: 1500, defaultQuantity: 1, defaultHours: 8 },
  { id: 'a5', name: 'Television (LED)', watts: 100, defaultQuantity: 1, defaultHours: 5 },
  { id: 'a6', name: 'Washing Machine', watts: 500, defaultQuantity: 1, defaultHours: 1 },
  { id: 'a7', name: 'Water Heater (Geyser)', watts: 2000, defaultQuantity: 1, defaultHours: 1 },
  { id: 'a8', name: 'Mixer Grinder', watts: 500, defaultQuantity: 1, defaultHours: 0.5 },
  { id: 'a9', name: 'Laptop / PC', watts: 65, defaultQuantity: 1, defaultHours: 8 },
];
