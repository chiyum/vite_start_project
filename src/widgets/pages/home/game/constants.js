import chess from "@/assets/images/game/api_placeholder_boardgame.png";
import chess_rec from "@/assets/images/game/api_placeholder_boardgame_single.png";
import live from "@/assets/images/game/api_placeholder_casino.png";
import live_rec from "@/assets/images/game/api_placeholder_casino_single.png";
import esport from "@/assets/images/game/api_placeholder_esport.png";
import esport_rec from "@/assets/images/game/api_placeholder_esport_single.png";
import lottery from "@/assets/images/game/api_placeholder_lottery.png";
import lottery_rec from "@/assets/images/game/api_placeholder_lottery_single.png";
import electronic from "@/assets/images/game/api_placeholder_slot.png";
import electronic_rec from "@/assets/images/game/api_placeholder_slot_single.png";
import fish from "@/assets/images/game/api_placeholder_fishing.png";
import fish_rec from "@/assets/images/game/api_placeholder_fishing_single.png";
import sport from "@/assets/images/game/api_placeholder_sport.png";
import sport_rec from "@/assets/images/game/api_placeholder_sport_single.png";

import { map, keys } from "ramda";

const CATEGORY = {
  SPORT: "sport",
  LIVE: "live",
  CHESS: "chess",
  ESPORT: "esport",
  LOTTERY: "lottery",
  ELECTRONIC: "electronic",
  FISH: "fish",
};

const CATEGORY_ICON = {
  SPORT: "football",
  LIVE: "realMan",
  CHESS: "cards",
  ESPORT: "gaming",
  LOTTERY: "lottery",
  ELECTRONIC: "electronic",
  FISH: "fishing",
};

export const categories = map(
  (key) => ({
    id: CATEGORY[key],
    icon: CATEGORY_ICON[key],
  }),
  keys(CATEGORY)
);

export const defaultImages = [
  {
    [CATEGORY.SPORT]: sport_rec,
    [CATEGORY.LIVE]: live_rec,
    [CATEGORY.CHESS]: chess_rec,
    [CATEGORY.ESPORT]: esport_rec,
    [CATEGORY.LOTTERY]: lottery_rec,
    [CATEGORY.ELECTRONIC]: electronic_rec,
    [CATEGORY.FISH]: fish_rec,
  },
  {
    [CATEGORY.SPORT]: sport,
    [CATEGORY.LIVE]: live,
    [CATEGORY.CHESS]: chess,
    [CATEGORY.ESPORT]: esport,
    [CATEGORY.LOTTERY]: lottery,
    [CATEGORY.ELECTRONIC]: electronic,
    [CATEGORY.FISH]: fish,
  },
];
