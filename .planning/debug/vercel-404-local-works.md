---
status: investigating
trigger: Hospedei na vercel porem ao acessar o link loja-premium-pi.vercel.app deu os erros 404: NOT_FOUND e Failed to load resource: the server responded with a status of 404 ()
created: 2026-05-08
updated: 2026-05-08
slug: vercel-404-local-works
---

## Symptoms

1. **Expected behavior**: Site carrega normalmente na Vercel como no localhost
2. **Actual behavior**: 404 NOT_FOUND na Vercel
3. **Error messages**: 
   - `404: NOT_FOUND Code: NOT_FOUND`
   - `Failed to load resource: the server responded with a status of 404 ()`
4. **Timeline**: Sempre funcionou no localhost, nunca funcionou na Vercel
5. **Reproduction**: Acessar https://loja-premium-pi.vercel.app/

## Environment Context

- **Local**: http://localhost:3000 funciona normalmente
- **Vercel**: https://loja-premium-pi.vercel.app/ retorna 404
- **Deploy**: Automático (push triggers deploy)
- **Build**: Completa com sucesso (Route / detectada)

## Current Focus

- **Hypothesis**: Falta de arquivos críticos no deploy ou cache corrompido na Vercel
- **next_action**: gather initial evidence