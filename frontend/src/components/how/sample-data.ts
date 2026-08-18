export const preprocessingSteps = [
  {
    value: "password",
    trigger: "Input Password",
    steps: [
      { label: "Raw Input", value: "love you 10_000 years" },
      {
        label: "SHA-256 Hash",
        value:
          "5498d10869a9250e2f84342dc5125900a8d5f6336ae48b5f567e2d09554f33ce",
      },
      {
        label: "First 8 Bytes → Seed",
        value: "5498d10869a9250e → 6095851929708602638",
      },
    ],
  },
  {
    value: "message",
    trigger: "Input Secret Message",
    steps: [
      {
        label: "Raw Input",
        value: "Somehow everything comes with an expiry date.",
      },
      { label: "Each character → ASCII code", value: "S(83) o(111) m(109) …" },
      {
        label: "Concatenated Bit Stream",
        value: "01010011 01101111 01101101 …",
      },
    ],
  },
];

export const sampleClassificationMap = [
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const sampleBinaryMessageStream =
  "010100110110111101101101011001010110100001101111011101110010000001100101011101100110010101110010011110010111010001101000011010010110111001100111001000000110001101101111011011010110010101110000001000000111011101101001011101000110100000100000011000010110111000100000011001010111100001110000011010010111001001111001001000000110010001100001011101000110010100101110";
