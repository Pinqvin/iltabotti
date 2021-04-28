import { YLE_ARTICLE } from "./regexp";

describe("Yle regular expression", () => {
  it("should match a valid Yle article link", () => {
    const testString = "https://yle.fi/uutiset/3-11904039";

    const matches = testString.match(YLE_ARTICLE);

    expect(matches).not.toBe(null);
    expect(matches!.length).toBe(1);
    expect(matches![0]).toBe(testString);
  });

  it("should match multiple valid links from a string", () => {
    const firstLink = "https://www.yle.fi/uutiset/3-11898345";
    const secondLink = "https://yle.fi/uutiset/3-11904039";

    const testString = `What the frick ${firstLink}? The frick the what ${secondLink}`;

    const matches = testString.match(YLE_ARTICLE);

    expect(matches).not.toBe(null);
    expect(matches!.length).toBe(2);
    expect(matches![0]).toBe(firstLink);
    expect(matches![1]).toBe(secondLink);
  });

  it("shouldn't match non-Yle links", () => {
    const testString = "https://twitter.com/home";

    const matches = testString.match(YLE_ARTICLE);

    expect(matches).toBe(null);
  });
});
