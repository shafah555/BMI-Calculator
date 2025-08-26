function parseHeightToInches(input) {
  if (!input) return NaN;
  const s = String(input).trim().toLowerCase().replace(/[^0-9'\"]+/g, ' ').replace(/\s+/g, ' ').trim();
  let feet = 0;
  let inches = 0;

  const feetMatch = s.match(/(\d+)\s*'/);
  const inchMatch = s.match(/(\d+)(?=\s*\"|\s*in\b)/);

  if (feetMatch) feet = Number(feetMatch[1]);
  if (inchMatch) inches = Number(inchMatch[1]);

  if (!feetMatch && !inchMatch) {
    const parts = s.split(' ').filter(Boolean);
    if (parts.length === 2) {
      feet = Number(parts[0]);
      inches = Number(parts[1]);
    } else if (parts.length === 1) {
      const single = Number(parts[0]);
      if (!Number.isNaN(single)) {
        if (single > 10) {
          return single;
        } else {
          feet = single;
        }
      }
    }
  }

  return feet * 12 + inches;
}

function parseWeightToPounds(input) {
  if (!input) return NaN;
  const s = String(input).toLowerCase().replace(/[^0-9.]/g, '');
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function calculateBmi(heightInches, weightPounds) {
  if (!Number.isFinite(heightInches) || heightInches <= 0) return NaN;
  if (!Number.isFinite(weightPounds) || weightPounds <= 0) return NaN;
  const bmi = (weightPounds / (heightInches * heightInches)) * 703;
  return Math.round(bmi * 10) / 10;
}

function categorizeBmi(bmi) {
  if (!Number.isFinite(bmi)) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.9) return 'Normal weight';
  if (bmi < 29.9) return 'Overweight';
  return 'Obesity';
}

function formatBmi(value) {
  if (!Number.isFinite(value)) return '—';
  return value.toFixed(1).replace(/\.0$/, '.0');
}

function init() {
  const form = document.getElementById('bmi-form');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const resultValue = document.getElementById('bmi-value');
  const resultCategory = document.getElementById('bmi-category');

  // Set default values to match the image
  heightInput.value = "5' 8\"";
  weightInput.value = '150 lbs';

  function update() {
    const inches = parseHeightToInches(heightInput.value);
    const pounds = parseWeightToPounds(weightInput.value);
    const bmi = calculateBmi(inches, pounds);
    resultValue.textContent = formatBmi(bmi);
    resultCategory.textContent = categorizeBmi(bmi);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    update();
  });

  heightInput.addEventListener('input', update);
  weightInput.addEventListener('input', update);

  update();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
} 