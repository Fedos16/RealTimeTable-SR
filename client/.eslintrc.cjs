/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        "prettier/prettier": [
            "warn",
            {
                "printWidth": 100,
                "tabWidth": 2,
                "tabs": false,
                "semi": false,
                "singleQuote": true,
                "quoteProps": "as-needed",
                "endOfLine": "auto",
                "trailingComma": "all",
                "bracketSpacing": true,
                "jsxBracketSameLine": false,
                "arrowParens": "avoid"
            }
        ]
    }
}
