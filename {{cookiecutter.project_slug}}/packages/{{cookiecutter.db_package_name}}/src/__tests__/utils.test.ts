import { isValidEmail, formatDate, capitalize } from "../utils";

describe("Utils", () => {
  describe("isValidEmail", () => {
    it("should return true for valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@domain.co.uk")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
    });
  });

  describe("formatDate", () => {
    it("should format date as YYYY-MM-DD", () => {
      const date = new Date("2024-01-15T10:30:00Z");
      expect(formatDate(date)).toBe("2024-01-15");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter and lowercase rest", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("WORLD")).toBe("World");
      expect(capitalize("tEsT")).toBe("Test");
    });

    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
    });
  });
});
