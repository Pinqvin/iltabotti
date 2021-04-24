import { getTopComments } from "./comments";

describe("Iltalehti comments", () => {
  it("should return most liked comment for an article", async () => {
    const result = await getTopComments([
      "https://www.iltalehti.fi/khl/a/d949e971-6579-4f67-a15f-fd3578b5ecde",
    ]);

    expect(result.length).toBe(1);
    expect(result[0].username).toBe("Lahtelaista");
    expect(result[0].content).toBe(
      "Pelicansin talous kuntoon hyvällä siirtokorvauksella? Josko KHL osallistuisi osakeantiin. "
    );
  });

  it("should return most liked comments for multiple URLs", async () => {
    const result = await getTopComments([
      "https://www.iltalehti.fi/kotimaa/a/6e040098-3b16-4f0a-8659-854518d9ab29",
      "https://www.iltalehti.fi/kotimaa/a/02dc93d5-79df-4200-a3af-eb7ccb0f54f3",
    ]);

    expect(result.length).toBe(2);

    expect(result[0].username).toBe("Kikkihiiti");
    expect(result[0].content).toBe("Trumpin kannattajille voimia");

    expect(result[1].username).toBe("Jons8");
    expect(result[1].content).toBe(
      "Äkkiä bensan ja sähkön verotusta korkeammalle, sillä ilmasto pelastuu. Luonto ymmärtää korkeita veroja."
    );
  });

  it("should return an empty array for non-existing article URL", async () => {
    const result = await getTopComments([
      "https://www.iltalehti.fi/kotimaa/a/238f53f6-dbe4-4c84-b9ff-be9f942ea2cb",
    ]);

    expect(result.length).toBe(0);
  });

  it("should return an empty array if no URLs were provided", async () => {
    const result = await getTopComments([]);

    expect(result.length).toBe(0);
  });
});
