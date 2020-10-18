import { ILTALEHTI_ARTICLE } from "./regexp";

describe("Iltalehti regular expressions", () => {
  test("it should match a valid Iltalehti article link", () => {
    const testString =
      "https://www.iltalehti.fi/viihdeuutiset/a/3489ca07-0961-459b-ae9b-cac129d7a690";
    const matches = testString.match(ILTALEHTI_ARTICLE);

    expect(matches).not.toBe(null);
    expect(matches!.length).toBe(1);
    expect(matches![0]).toBe(testString);
  });

  test("it should return multiple valid matches from a string", () => {
    const firstLink =
      "https://www.iltalehti.fi/ruoka-artikkelit/a/db242ea0-6111-4f99-8597-bde134f19260";
    const secondLink =
      "https://www.iltalehti.fi/autouutiset/a/c3394597-4e60-4ce4-8685-9c7eaaeb57c8";

    const testString = `Hei, testilinkki ${firstLink}. Mut mites tää toinen ${secondLink}?`;
    const matches = testString.match(ILTALEHTI_ARTICLE);

    expect(matches).not.toBe(null);
    expect(matches!.length).toBe(2);
    expect(matches![0]).toBe(firstLink);
    expect(matches![1]).toBe(secondLink);
  });

  test("it shouldn't match text with no valid iltalehti links", () => {
    const link = "https://www.is.fi/autot/art-2000006672379.html";

    const testString = `Onpas hassu juttu ${link}.`;
    const matches = testString.match(ILTALEHTI_ARTICLE);

    expect(matches).toBe(null);
  });
});
