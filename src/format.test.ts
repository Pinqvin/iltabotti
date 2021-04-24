import { formatComments } from "./format";

describe("Format comments", () => {
  it("should combine multiple comments into a single string", () => {
    const comments = [
      {
        username: "asd",
        content: "text content",
      },
      {
        username: "asdq",
        content: "testings me",
      },
    ];

    const result = formatComments(comments);

    expect(result).toMatch("_asd_");
    expect(result).toMatch("text content");

    expect(result).toMatch("_asdq_");
    expect(result).toMatch("testings me");
  });

  it("should escape forbidden characters", () => {
    const comments = [
      {
        username: "asd.",
        content: "text content",
      },
    ];

    const result = formatComments(comments);

    expect(result).toMatch("_asd\\._");
    expect(result).toMatch("text content");
  });
});
