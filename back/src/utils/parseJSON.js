/**
 * @param {string} json
 * @returns {Result<any, string>}
 */
export function parseJSON(json) {
  try {
    return { ok: JSON.parse(json), err: null };
  } catch (e) {
    return { ok: null, err: "can't parse json" };
  }
}
