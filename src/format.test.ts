import { formatComments } from "./format";

describe("Format comments", () => {
  it("should combine multiple comments into a single string", () => {
    const comments = [
      {
        title: "test",
        username: "asd",
        content: "text content",
      },
      {
        title: "test 2",
        username: "asdq",
        content: "testings me",
      },
    ];

    const result = formatComments(comments);

    expect(result).toMatch("asd kommentoi:");
    expect(result).toMatch("text content");

    expect(result).toMatch("asdq kommentoi:");
    expect(result).toMatch("testings me");
  });

  it("should escape forbidden characters", () => {
    const comments = [
      {
        title: "test.",
        username: "asd",
        content: "text content",
      },
    ];

    const result = formatComments(comments);

    expect(result).toMatch("asd kommentoi:");
    expect(result).toMatch("text content");
  });
});
