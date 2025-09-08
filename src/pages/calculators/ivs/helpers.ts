/**
 * 参考自: https://pocketmortys.net/media/com_pocketmortys/js/calculator-functions.js
 * 有少量改动
 */

function strip(number) {
  return Number(parseFloat(number).toPrecision(12));
}

export function getIVs({
  hpStat,
  atkStat,
  defStat,
  spdStat,
  hpBase,
  atkBase,
  defBase,
  spdBase,
  hpEV,
  atkEV,
  defEV,
  spdEV,
  lvl,
}) {
  var hpMinFound = false;
  var atkMinFound = false;
  var defMinFound = false;
  var spdMinFound = false;
  var hpMin = -1;
  var hpMax = -1;
  var atkMin = -1;
  var atkMax = -1;
  var defMin = -1;
  var defMax = -1;
  var spdMin = -1;
  var spdMax = -1;

  if (
    (!hpStat || Number.isInteger(hpStat)) &&
    (!atkStat || Number.isInteger(atkStat)) &&
    (!defStat || Number.isInteger(defStat)) &&
    (!spdStat || Number.isInteger(spdStat)) &&
    Number.isInteger(hpBase) &&
    Number.isInteger(atkBase) &&
    Number.isInteger(defBase) &&
    Number.isInteger(spdBase) &&
    Number.isInteger(hpEV) &&
    Number.isInteger(atkEV) &&
    Number.isInteger(defEV) &&
    Number.isInteger(spdEV) &&
    Number.isInteger(lvl) &&
    lvl <= 100 &&
    lvl >= 0
  ) {
    for (let i = 0; i <= 16; i++) {
      // Hitpoints calculations
      if (!hpMinFound) {
        if (Math.floor(strip((i + hpBase + Math.floor(Math.sqrt(hpEV) / 4) + 50) * (lvl / 50))) + 10 == hpStat) {
          hpMin = i;
          hpMinFound = true;
        }
      }
      if (Math.floor(strip((i + hpBase + Math.floor(Math.sqrt(hpEV) / 4) + 50) * (lvl / 50))) + 10 == hpStat) {
        hpMax = i;
      }
      // Attack calculations
      if (!atkMinFound) {
        if (Math.floor(strip((i + atkBase + Math.floor(Math.sqrt(atkEV) / 4) + 0) * (lvl / 50))) + 5 == atkStat) {
          atkMin = i;
          atkMinFound = true;
        }
      }
      if (Math.floor(strip((i + atkBase + Math.floor(Math.sqrt(atkEV) / 4) + 0) * (lvl / 50))) + 5 == atkStat) {
        atkMax = i;
      }
      // Defense calculations
      if (!defMinFound) {
        if (Math.floor(strip((i + defBase + Math.floor(Math.sqrt(defEV) / 4) + 0) * (lvl / 50))) + 5 == defStat) {
          defMin = i;
          defMinFound = true;
        }
      }
      if (Math.floor(strip((i + defBase + Math.floor(Math.sqrt(defEV) / 4) + 0) * (lvl / 50))) + 5 == defStat) {
        defMax = i;
      }
      // Speed calculations
      if (!spdMinFound) {
        if (Math.floor(strip((i + spdBase + Math.floor(Math.sqrt(spdEV) / 4) + 0) * (lvl / 50))) + 5 == spdStat) {
          spdMin = i;
          spdMinFound = true;
        }
      }
      if (Math.floor(strip((i + spdBase + Math.floor(Math.sqrt(spdEV) / 4) + 0) * (lvl / 50))) + 5 == spdStat) {
        spdMax = i;
      }
    }

    var result = {
      hp: hpStat,
      atk: atkStat,
      def: defStat,
      spd: spdStat,
      level: lvl,
      hpMin: hpMin,
      hpMax: hpMax,
      atkMin: atkMin,
      atkMax: atkMax,
      defMin: defMin,
      defMax: defMax,
      spdMin: spdMin,
      spdMax: spdMax,
    };

    return result;
  }

  return undefined;
}

// e.g. { 5: 21, 6: 23 }
function getPerfectHPArray(hpBase: number) {
  var hpStat = -1;
  const hpIV = 16;
  const hpEV = 0;
  let result = {};
  for (let level = 5; level <= 100; level++) {
    hpStat = Math.floor(strip((hpIV + hpBase + Math.floor(Math.sqrt(hpEV) / 4) + 50) * (level / 50))) + 10;
    result[level] = hpStat;
  }
  return result;
}

export function getPerfectAtkDefSpdArray(base: number): Record<number, number> {
  var stat = -1;
  const IV = 16;
  const EV = 0;
  let result = {};
  for (let level = 5; level <= 100; level++) {
    stat = Math.floor(strip((IV + base + Math.floor(Math.sqrt(EV) / 4)) * (level / 50))) + 5;
    result[level] = stat;
  }
  return result;
}

export type PerfectIVs = {
  level: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;
};

// 根据某个莫蒂的基础值得到他的完美表格数据
export function getPerfectIVsTableData({ hpBase, atkBase, defBase, spdBase }) {
  const perfectHPArray = getPerfectHPArray(Number(hpBase));
  const perfectAtkArray = getPerfectAtkDefSpdArray(Number(atkBase));
  const perfectDefArray = getPerfectAtkDefSpdArray(Number(defBase));
  const perfectSpdArray = getPerfectAtkDefSpdArray(Number(spdBase));

  const result: PerfectIVs[] = [];
  for (let level = 5; level <= 100; level++) {
    result.push({
      level,
      hp: perfectHPArray[level],
      atk: perfectAtkArray[level],
      def: perfectDefArray[level],
      spd: perfectSpdArray[level],
    });
  }
  return result;
}
