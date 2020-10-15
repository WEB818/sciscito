export const countType = (spells = [], type) =>
  spells.filter((spell) => spell["type"] === type).length;
