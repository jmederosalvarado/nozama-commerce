const twconfigFilters = {
  theme: {
    filter: {
      // defaults to {}
    },
    backdropFilter: {
      // defaults to {}
      none: "none",
      blur: "blur(2px)",
    },
  },
  variants: {
    filter: ["responsive"], // defaults to ['responsive']
    backdropFilter: ["responsive"], // defaults to ['responsive']
  },
};

const twconfigAspectRatio = {
  theme: {
    aspectRatio: {
      // defaults to {}
      none: 0,
      square: [1, 1],
      "16/9": [16, 9],
      "4/3": [4, 3],
      "21/9": [21, 9],
      "5/4": [5, 4],
    },
  },
  variants: {
    aspectRatio: ["responsive"], // defaults to ['responsive']
  },
};

const twconfigBackgroundImg = {
  theme: {
    backgroundImage: (theme) => ({
      hero: "url('/img/hero.jpg')",
    }),
  },
};

const twconfigBorderWidthVariants = {
  variants: {
    borderWidth: ["responsive", "hover"],
  },
};

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      ...twconfigFilters.theme,
      ...twconfigAspectRatio.theme,
      ...twconfigBackgroundImg.theme,
    },
  },
  variants: {
    ...twconfigFilters.variants,
    ...twconfigAspectRatio.variants,
    ...twconfigBorderWidthVariants.variants,
  },
  plugins: [
    require("tailwindcss-filters"),
    require("tailwindcss-aspect-ratio"),
  ],
};
