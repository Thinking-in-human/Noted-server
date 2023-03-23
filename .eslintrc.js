module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js"] }],
    "no-param-reassign": 0,
  },
  "prettier/prettier": [
    "error",
    {
      endOfLine: "auto",
    },
  ],
};
