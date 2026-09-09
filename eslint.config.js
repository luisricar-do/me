import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * no-unused-vars não enxerga referências dentro de JSX (<Icon />, <motion.div />),
 * o que gera falsos positivos. Esta regra local marca esses identificadores como
 * usados — mesmo papel do react/jsx-uses-vars, sem puxar o plugin inteiro.
 */
const jsx = {
  rules: {
    'uses-vars': {
      meta: { type: 'problem', schema: [] },
      create(context) {
        return {
          JSXOpeningElement(node) {
            let name = node.name
            while (name.type === 'JSXMemberExpression') name = name.object
            if (name.type !== 'JSXIdentifier') return
            context.sourceCode.markVariableAsUsed(name.name, node)
          },
        }
      },
    },
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { jsx },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // injetados pelo define do Vite
        __BUILD_SHA__: 'readonly',
        __BUILD_REF__: 'readonly',
        __BUILT_AT__: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'jsx/uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
