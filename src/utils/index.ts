import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { ORIENTATIONS, SIDES } from "@/constants";
import * as cheerio from "cheerio";

export function parseMortyName(name = "") {
  const $ = cheerio.load(name);
  const nameText = $("a").text().trim();

  return nameText;
}

export function parseMortyType(type = "") {
  const $ = cheerio.load(type);
  const typeText = $("span").text().trim();

  return typeText;
}

export function parseMortyRarity(rarity = "") {
  const $ = cheerio.load(rarity);
  const rarityText = $("span").text().trim();

  return rarityText;
}

export function getMortyPortraits(assetid?: string) {
  if (!assetid) {
    return [];
  }
  return ORIENTATIONS.map((o) => `${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}${o}.png`);
}

export function getMortySprites(assetid?: string) {
  if (!assetid) {
    return [];
  }
  return SIDES.flatMap((s) =>
    Array.from({ length: 4 }).map((_, i) => `${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}${s}_${i + 1}.png`)
  );
}

export function parseAttackName(name = "") {
  const $ = cheerio.load(name);
  const nameText = $("a").text().trim();

  return nameText;
}

export function parseAttackNumber(number = "") {
  const $ = cheerio.load(number);
  const numberText = $("div").text().trim();

  return numberText;
}
