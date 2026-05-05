import { describe, it, expect } from "vitest";
import { hexToBytes, le64, concat, receiptDigest } from "../digest";

describe("hexToBytes", () => {
  it("converts hex string", () => {
    expect(hexToBytes("0xdeadbeef")).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
  });

  it("handles without 0x prefix", () => {
    expect(hexToBytes("ff00")).toEqual(new Uint8Array([255, 0]));
  });

  it("throws on odd length", () => {
    expect(() => hexToBytes("abc")).toThrow("odd-length");
  });
});

describe("le64", () => {
  it("encodes zero", () => {
    expect(le64(0)).toEqual(new Uint8Array(8));
  });

  it("encodes small number in little-endian", () => {
    const result = le64(256);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
  });
});

describe("concat", () => {
  it("concatenates arrays", () => {
    const a = new Uint8Array([1, 2]);
    const b = new Uint8Array([3, 4, 5]);
    expect(concat(a, b)).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });
});

describe("receiptDigest", () => {
  it("returns 32-byte hash", () => {
    const digest = receiptDigest("1000", 300000000, "0x" + "ab".repeat(32));
    expect(digest.length).toBe(32);
  });

  it("is deterministic", () => {
    const a = receiptDigest("100", 1, "0xaa");
    const b = receiptDigest("100", 1, "0xaa");
    expect(a).toEqual(b);
  });

  it("changes with different answer", () => {
    const a = receiptDigest("100", 1, "0xaa");
    const b = receiptDigest("200", 1, "0xaa");
    expect(a).not.toEqual(b);
  });
});
