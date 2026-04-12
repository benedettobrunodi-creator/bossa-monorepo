# Bossa Monorepo

Monorepo com os dois sites da Bossa: **Bossa & Co.** (bossaco.com.br) e **Bossa Campo** (bossacampo.com.br).

Stack: Next.js 14 · Turborepo · pnpm · Tailwind · Notion CMS · Resend · Vercel

---

## Estrutura

```
/apps
  /bossaco          → bossaco.com.br (PT/EN, azul institucional)
  /bossacampo       → bossacampo.com.br (PT, verde musgo)
/packages
  /notion-client    → cliente Notion compartilhado (tipado)
  /i18n             → traduções PT/EN (só bossaco usa)
```

---

## Setup local

### 1. Pré-requisitos

```bash
node -v   # >= 18
pnpm -v   # >= 9 (npm i -g pnpm)
```

### 2. Instalar dependências

```bash
cd bossa-monorepo
pnpm install
```

### 3. Variáveis de ambiente

**apps/bossaco/.env.local**
```
NOTION_TOKEN=ntn_...
NOTION_DB_BOSSA_CO=3400f560-c66d-81f2-b82e-e2d8f318644a
RESEND_API_KEY=re_...
CONTACT_EMAIL=contato@bossaco.com.br
```

**apps/bossacampo/.env.local**
```
NOTION_TOKEN=ntn_...
NOTION_DB_BOSSA_CAMPO=3400f560-c66d-812e-9eb0-f09d293ed2f3
RESEND_API_KEY=re_...
CONTACT_EMAIL=contato@bossacampo.com.br
```

### 4. Rodar em desenvolvimento

```bash
# Os dois ao mesmo tempo
pnpm dev

# Só um
cd apps/bossaco && pnpm dev      # → localhost:3000
cd apps/bossacampo && pnpm dev   # → localhost:3001
```

---

## Notion — campos obrigatórios

Cada database precisa ter exatamente estes campos:

| Campo | Tipo | Obrigatório |
|-------|------|------------|
| Título | Title | ✅ |
| Slug | Text | ✅ (ex: `apto-jardins-250m2`) |
| Status | Select | ✅ Ativo / Inativo / Off-Catalog |
| Tipo | Select | ✅ |
| Cidade / Região | Select | ✅ |
| Área | Number | — |
| Quartos | Number | — |
| Vagas | Number | — (só bossaco) |
| Preço / Valor | Number | — (0 = Sob consulta) |
| Descrição | Text | — |
| Fotos | Files & Media | — |
| Destaque | Checkbox | ✅ (aparece na home) |
| Off-Catalog | Checkbox | ✅ |

> **Importante:** depois de criar a integration no Notion, abrir cada database → Share → convidar a integration.

---

## Deploy Vercel

### 1. Subir para GitHub

```bash
git init
git add .
git commit -m "feat: initial monorepo setup"
git remote add origin https://github.com/SEU_USER/bossa-monorepo.git
git push -u origin main
```

### 2. Importar no Vercel (fazer 2x — um por site)

1. vercel.com → Add New Project → importar o repositório
2. **Root Directory:** `apps/bossaco` (ou `apps/bossacampo`)
3. **Framework:** Next.js (detectado automaticamente)
4. **Environment Variables:** copiar as vars do .env.local
5. Deploy

### 3. Domínios

No painel Vercel de cada projeto:
- Settings → Domains → adicionar `bossaco.com.br` e `www.bossaco.com.br`
- Apontar DNS para os servidores Vercel (instruções aparecem no painel)
- SSL é automático

### 4. Resend — verificar domínio

1. resend.com → Domains → Add Domain → `bossaco.com.br`
2. Adicionar os registros DNS (TXT + MX) que o Resend mostrar
3. Aguardar verificação (geralmente < 1h)
4. Atualizar o `from:` na API route: `noreply@bossaco.com.br`

---

## Adicionar imóvel no Notion

1. Abrir a database no Notion
2. "+ New" → preencher os campos
3. **Slug:** usar apenas letras minúsculas, números e hífens (ex: `casa-itu-1200m2`)
4. **Fotos:** fazer upload direto no Notion (Files & Media)
5. **Status:** `Ativo` para aparecer na vitrine, `Off-Catalog` para aparecer em /off-catalog
6. **Destaque:** marcar checkbox para aparecer na home (máx. 3)
7. O site atualiza automaticamente em até 60 segundos

---

## Hero image

Colocar uma foto editorial de alta qualidade em:
- `apps/bossaco/public/hero.jpg` (recomendado: 2560×1440px, < 500KB após compressão)
- `apps/bossacampo/public/hero.jpg` (idem — foto de natureza/campo)

Comprimir em: squoosh.app ou tinypng.com

---

## Personalizar contatos

Buscar e substituir nos dois apps:
- `5511999999999` → número WhatsApp real (só números, com DDI)
- `@bossaco` / `@bossacampo` → handles reais do Instagram
- Endereços na página /sobre e footer

---

## Fase 2 (pós-lançamento)

- [ ] Schema.org RealEstateListing nas páginas de imóvel
- [ ] next-sitemap automático
- [ ] Mapa Google Maps embed na página do imóvel
- [ ] Área do cliente com login para off-catalog protegido
- [ ] CRM: leads salvos no Notion automaticamente
- [ ] Blog/artigos editoriais
