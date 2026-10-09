import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
    ...nextVitals,
    {
        rules: {
            'react/no-unescaped-entities': 'off',
            'react/jsx-no-comment-textnodes': 'off',
            'react/display-name': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/purity': 'off',
            'react-hooks/static-components': 'off',
            'react-hooks/immutability': 'off',
            'react-hooks/refs': 'off',
        },
    },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
