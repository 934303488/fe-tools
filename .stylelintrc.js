module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['/^global$/', '/^local$/'],
      },
    ],
    'no-descending-specificity': null,
  },
};
