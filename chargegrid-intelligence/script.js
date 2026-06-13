const RATES = { solar: 0.45, grid: 0.75, peak: 1.20 };
const LABELS = { solar: '☀ Solar', grid: '⚡ Fora do pico', peak: '🔴 Horário de pico' };
const SOURCES = { solar: 'Solar fotovoltaica', grid: 'Rede elétrica', peak: 'Rede elétrica (pico)' };
const TARIFF_LABELS = { solar: 'R$ 0,45/kWh (econômico)', grid: 'R$ 0,75/kWh (normal)', peak: 'R$ 1,20/kWh (pico)' };
const BADGE_CLASS = { solar: 'solar', grid: 'grid', peak: 'peak' };

let selectedSource = 'solar';
let interval = null, seconds = 0, kwhAcc = 0;
const POWER_KW = 7.4, BAT_START = 20, BAT_CAP = 60;
let currentId = '';

function selectSource(src) {
  selectedSource = src;
  ['solar', 'grid', 'peak'].forEach(function(s) {
    var el = document.getElementById('btn-' + s);
    el.className = 'source-btn' + (s === src ? ' selected-' + s : '');
  });
}

function genId() { return 'SID-' + Math.random().toString(36).substring(2, 7).toUpperCase(); }
function fmtTime(s) { var m = Math.floor(s / 60), ss = s % 60; return String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0'); }
function fmtCost(n) { return 'R$ ' + n.toFixed(2).replace('.', ','); }
function show(id) {
  ['screenIdle', 'screenActive', 'screenReceipt'].forEach(function(s) {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

function startSession() {
  currentId = genId(); seconds = 0; kwhAcc = 0;
  document.getElementById('sessionId').textContent = currentId;
  var bc = BADGE_CLASS[selectedSource];
  document.getElementById('activeBadge').className = 'badge ' + bc;
  document.getElementById('activeBadge').textContent = LABELS[selectedSource];
  document.getElementById('activeTariffBadge').className = 'badge eco';
  document.getElementById('activeTariffBadge').textContent = TARIFF_LABELS[selectedSource];
  document.getElementById('rateLabel').textContent = '@ ' + TARIFF_LABELS[selectedSource].split(' ')[0] + '/kWh';
  document.getElementById('statusDot').classList.add('active');
  show('screenActive');

  var rate = RATES[selectedSource];
  interval = setInterval(function() {
    seconds++;
    var h = (seconds * 60) / 3600;
    kwhAcc = parseFloat((POWER_KW * h).toFixed(3));
    var bat = Math.min(100, BAT_START + (kwhAcc / BAT_CAP) * 100);
    document.getElementById('kwh').textContent = kwhAcc.toFixed(3);
    document.getElementById('timer').textContent = fmtTime(seconds);
    document.getElementById('cost').textContent = fmtCost(kwhAcc * rate);
    document.getElementById('batBar').style.width = bat.toFixed(1) + '%';
    document.getElementById('batPct').textContent = bat.toFixed(1) + '%';
  }, 1000);
}

function stopSession() {
  clearInterval(interval);
  document.getElementById('statusDot').classList.remove('active');
  var rate = RATES[selectedSource];
  var cost = kwhAcc * rate;
  var costSolar = kwhAcc * RATES.solar;
  var costGrid  = kwhAcc * RATES.grid;
  var costPeak  = kwhAcc * RATES.peak;
  var co2 = (kwhAcc * 0.2).toFixed(2);
  var bat = Math.min(100, BAT_START + (kwhAcc / BAT_CAP) * 100);

  document.getElementById('rSessionId').textContent = currentId;
  document.getElementById('rSource').textContent = SOURCES[selectedSource];
  document.getElementById('rTariff').textContent = TARIFF_LABELS[selectedSource];
  document.getElementById('rTime').textContent = fmtTime(seconds);
  document.getElementById('rKwh').textContent = kwhAcc.toFixed(3) + ' kWh';
  document.getElementById('rCo2').textContent = co2 + ' kg';
  document.getElementById('rTotal').textContent = fmtCost(cost);
  document.getElementById('rSaving').textContent = fmtCost(costPeak - costSolar);
  document.getElementById('rBat').textContent = bat.toFixed(1) + '%';

  document.getElementById('cSolarVal').textContent = fmtCost(costSolar);
  document.getElementById('cGridVal').textContent  = fmtCost(costGrid);
  document.getElementById('cPeakVal').textContent  = fmtCost(costPeak);

  ['cSolar', 'cGrid', 'cPeak'].forEach(function(id) {
    document.getElementById(id).classList.remove('winner');
  });
  var winnerMap = { solar: 'cSolar', grid: 'cGrid', peak: 'cPeak' };
  document.getElementById(winnerMap[selectedSource]).classList.add('winner');

  show('screenReceipt');
}

function resetSession() { show('screenIdle'); }