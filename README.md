# IN'CODE 4.0 APP

Ferramenta de criptografia com visual de terminal. Funciona offline e pode ser instalada como app (PWA).

**Acesse:**
- Netlify: https://incode3.netlify.app

## Estrutura

```
cripto/
├── index.html      ← app IN'CODE 4.0 (HTML, CSS e JS em um único arquivo)
├── manifest.json   ← configuração do PWA
├── icon.svg        ← ícone do app
├── sw.js           ← service worker (cache para uso offline)
├── netlify.toml    ← configuração de deploy do Netlify
└── v2/             ← versão anterior (TERMINAL CRIPTO v2.0), acessível em /v2/
    ├── index.html
    ├── style.css
    └── script.js
```

## Rodar localmente

É um site estático, sem build. Para o service worker funcionar, sirva a pasta por HTTP, por exemplo:

```bash
npx serve .
```

## Versões

- **4.0**: versão atual, na raiz do repositório.
- **2.0**: TERMINAL CRIPTO, em [`v2/`](v2/), com Cifra de César, Vigenère, Base64, Código Morse e Binário.
