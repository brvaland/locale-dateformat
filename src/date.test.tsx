import { getLocaleDateFormat, parseDateString } from "./date";

describe("getLocaleDateFormat Test", () => {
  let languageGetter: jest.SpyInstance<string, []>;

  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });

  it("should return uk locale format", () => {
    languageGetter.mockReturnValue("en-GB");
    const dateFormat = getLocaleDateFormat();
    expect(dateFormat).toBe("dd/MM/yyyy");
  });

  it("should return us locale format", () => {
    languageGetter.mockReturnValue("en-US");
    const dateFormat = getLocaleDateFormat();
    expect(dateFormat).toBe("MM/dd/yyyy");
  });
});

describe("parseDateString Tests", () => {
  it("should return date for uk date format string", () => {
    const result = parseDateString("", "01/01/2021", "dd/MM/yyyy");
    expect(result).toBeInstanceOf(Date);
  });

  it("should return date for us date format string", () => {
    const result = parseDateString("", "12/31/2021", "MM/dd/yyyy");
    expect(result).toBeInstanceOf(Date);
  });
});
