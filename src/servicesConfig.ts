export const getAllDictsPath = (): string =>
  `/dictionary`;
export const getCurrentDictPath = (oid: string): string =>
  `/dictionary/${oid}`;
export const getCurrentDictDescriptionPath = (oid: string): string =>
  `/dictionary/description/${oid}`;
