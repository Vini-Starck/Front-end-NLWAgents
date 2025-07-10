# 🚀 NLW Agents

Este projeto foi desenvolvido durante o evento **Next Level Week (NLW) da Rocketseat** 🧑‍🚀, uma imersão prática para acelerar o aprendizado em tecnologias modernas de desenvolvimento web.

## ✨ Propósito

O NLW Agents é uma aplicação web para criação e participação em salas de perguntas e respostas em tempo real, focada em acessibilidade, performance e experiência do usuário.

---

## 🚩 Funcionalidades

- 🏠 Criação de salas de Q&A (perguntas e respostas)
- 🔑 Entrada em salas por código/ID
- 📱 Interface responsiva e acessível
- ⚡ Gerenciamento de estado assíncrono com React Query
- 🧭 Navegação SPA com React Router
- 🧩 Componentes reutilizáveis e estilização customizada

---

## 🛠️ Tecnologias e Bibliotecas Principais

- ⚛️ **React 19** – Biblioteca principal para construção da interface
- ⚡ **Vite** – Bundler e servidor de desenvolvimento rápido
- 🟦 **TypeScript** – Tipagem estática para maior segurança
- 🎨 **TailwindCSS** – Utilitário para estilização rápida e responsiva
- 🔄 **@tanstack/react-query** – Gerenciamento de dados assíncronos
- 🛣️ **React Router DOM** – Gerenciamento de rotas SPA
- 🖼️ **Lucide React** – Ícones SVG
- 🧱 **Radix UI** – Componentes acessíveis
- 🏷️ **Class Variance Authority, clsx, tailwind-merge** – Utilitários para composição de classes CSS
- 💫 **tw-animate-css** – Animações com Tailwind
- 🧹 **Biome** – Linter e formatter para JavaScript/TypeScript

---

## 📁 Estrutura do Projeto

```
src/
  components/      # Componentes reutilizáveis (ex: ui/button)
    ui/            # Componentes de UI (ex: button)
  pages/           # Páginas principais (ex: create-room, room)
  lib/             # Funções utilitárias
  app.tsx          # Configuração de rotas e providers globais
  main.tsx         # Ponto de entrada da aplicação
  index.css        # Estilos globais e configuração do Tailwind
```

- 🗂️ **Alias de importação**: Utilize `@/` para importar da raiz de `src` (configurado no Vite e TypeScript).

---

## 🧩 Arquitetura e Padrões

- 🧱 **Componentização**: Separação clara entre componentes de UI e páginas.
- 🌐 **Providers globais**: Uso de `QueryClientProvider` (React Query) e `BrowserRouter` (React Router) em `app.tsx`.
- 🛣️ **Rotas**: Definidas em `app.tsx` usando React Router.
- 🔄 **Gerenciamento de estado assíncrono**: React Query.
- 🎨 **Estilização**: TailwindCSS com customizações em `index.css`.
- 🧹 **Lint/Format**: Biome configurado para padronização de código.

---

## ⚙️ Setup do Projeto

1. 📥 **Clone o repositório**
   ```bash
   git clone <url-do-repo>
   cd web
   ```

2. 📦 **Instale as dependências**
   ```bash
   npm install
   ```

3. 🏃 **Rode o projeto em modo desenvolvimento**
   ```bash
   npm run dev
   ```

4. 🏗️ **Build de produção**
   ```bash
   npm run build
   ```

---

## 🧹 Lint e Format

- 🧼 **Rodar linter/formatter (Biome):**
  ```bash
  npx biome check src
  npx biome format src --write
  ```

---

## 🎨 Customização de Tema

- 🖌️ O projeto utiliza TailwindCSS e permite customização de temas e variáveis em `src/index.css`.
- 🌙 Suporte a modo escuro via classe `dark` no `<html>`.

---

## 🤝 Como Contribuir

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature/ajuste: `git checkout -b minha-feature`
3. 💾 Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. 🚀 Push para a branch: `git push origin minha-feature`
5. 📬 Abra um Pull Request

---

## 📚 Créditos e Links Úteis

- 🚀 [Rocketseat](https://rocketseat.com.br/)
- ⚡ [Documentação do Vite](https://vitejs.dev/)
- ⚛️ [Documentação do React](https://react.dev/)
- 🎨 [Documentação do TailwindCSS](https://tailwindcss.com/)
- 🔄 [TanStack React Query](https://tanstack.com/query/latest)
- 🧹 [Biome](https://biomejs.dev/)

---

Desenvolvido com 💜 durante o NLW da Rocketseat.
