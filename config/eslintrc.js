// ES Linter Rules
// http://eslint.org/docs/rules/
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesnâ€™t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
// https://github.com/yannickcr/eslint-plugin-react/issues/21

let lintObj = {
  "parser": "babel-eslint",
  "ecmaFeatures":{
    "classes": true,
    "jsx": true
  },
  "plugins":[
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": 'module'
  },
  "extends": "eslint:recommended",
  "rules": {
    "react/jsx-uses-vars": 1,
    "guard-for-in": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-console": 0,
    "no-unused-vars": 1,
    "no-alert": 0,
    "no-bitwise": [1, { allow: ["~"] }],    //== Allow ~str.indexOf()
    "camelcase": 0,
    "curly": 1,
    "eqeqeq": 0,
    "no-debugger": 1,
    "no-extra-semi": 1,
    "comma-dangle": 0,
    "no-empty": 0,
    "no-unused-vars": [1, {"args": "none" }]  //== Don't check function args
  },
  "globals": {
    "$": 0,
    io: 0,
    "gup": 0,
    "videojs": 0,
    "Modernizr": 0,
    "ReactDOM": 0,
    "React": 0,
    "_": 0,
    "Vue": 0,
    "firebase": 0,
  },
  "env":{
    "browser": 1,
    "es6": 1,
    "jquery": 1,
    "node": 1
  }
};



module.exports = lintObj;