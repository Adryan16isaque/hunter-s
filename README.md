<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,50:1a0033,100:4a0080&height=140&section=header&text=⚔️%20HUNTER-S&fontSize=42&fontColor=c084fc&fontAlignY=55&animation=fadeIn" width="100%"/>
</div>

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=18&pause=1000&color=C084FC&center=true&vCenter=true&width=600&lines=Sistema+de+Gest%C3%A3o+da+Guilda+dos+Ca%C3%A7adores;Constru%C3%ADdo+com+TypeScript+%E2%9A%94%EF%B8%8F;Tipos%2C+Interfaces+e+Classes+em+combate+real;Zero+bugs+de+runtime.+Zeros+baixas+inesperadas." alt="Typing SVG" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-a78bfa?style=for-the-badge"/>
</div>

---

## 📖 A Missão

> *"O sistema antigo entrou em colapso. Bugs de runtime devastavam os reinos. Era preciso uma nova magia — mais rígida, mais precisa, mais poderosa."*

**Hunter-S** é um simulador de gerenciamento de uma Guilda de Caçadores, desenvolvido inteiramente em **TypeScript**. O projeto nasce de uma missão prática com temática de RPG e vai além: missão e criação de personagem **dinâmicos**, configuráveis em tempo de execução.

A proposta central é simples e poderosa — demonstrar na prática como a **tipagem estática** do TypeScript elimina a categoria inteira de erros de runtime que o JavaScript puro não consegue prever.

---

## ⚔️ Funcionalidades

- **🧬 Criação dinâmica de personagens** — atributos configuráveis em tempo de execução
- **🏰 Guilda com encapsulamento** — array privado protegido de acesso externo
- **📋 Registro formal de caçadores** — contratos via Interface TypeScript
- **👇 Opção de escolha** — evento permitindo escolha do tipo de missão pelo usuário 
- **🗡️ Missão dinâmica** — dificuldade variável definida na execução
- **⚡ Simulador de missão** — combate baseado em poder de batalha vs dificuldade
- **📜 Mural dos vivos** — relatório em tempo real de membros ativos
- **🎖️ Sistema de Ranks** — hierarquia E → D → C → B → A → S via Enum imutável

---

## 🛠️ Tecnologias & Conceitos Aplicados

| Conceito TypeScript | Aplicação no Projeto |
|---|---|
| `Enum` | Hierarquia de Ranks (E ao S) |
| `Interface` | Contrato de dados do Caçador |
| `Class` | Estrutura da Guilda |
| `private` / `public` | Encapsulamento do array de caçadores |
| `Arrays Tipados` | Armazenamento seguro de membros |
| `.filter()` / `.forEach()` | Filtragem e exibição de ativos |
| `tsc` | Compilação TypeScript → JavaScript |
| `Eventos (Node.js)` | Captura de input do usuário via terminal utilizando evento |

---

## 📂 Estrutura do Projeto

```
hunter-s/
├── src/
│   └── index.ts        # Lógica principal do sistema
├── package.json        # Dependências e scripts
├── package-lock.json
└── tsconfig.json       # Configuração do compilador TypeScript
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- TypeScript instalado (`npm install -g typescript`)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Adryan16isaque/hunter-s.git

# Entre na pasta
cd hunter-s

# Instale as dependências
npm install
```

### Execução

```bash
# Compile o TypeScript
tsc

# Caso já compilado execute com
node src/index.js

OU

# Execute o projeto
node dist/index.js
```

---

## 🧪 Exemplo de Uso

```typescript
const minhaGuilda = new Guilda();

const cacador = {
  nome: "Sung Jin-Woo",
  idade: 20,
  rank: Rank.S,
  poderDeBatalha: 10000,
  vivo: true,
  armaEspecial: "Espada das Sombras"
};

minhaGuilda.registrarCaçador(cacador);
minhaGuilda.enviarParaMissao("Sung Jin-Woo", 5000); // true ✅
minhaGuilda.exibirMembrosAtivos();
```

---

## 🧠 Por que TypeScript?

```
JavaScript puro   →  Erro só aparece em RUNTIME  →  💀 Sistema quebra em produção
TypeScript        →  Erro aparece no EDITOR       →  ✅ Corrigido antes de rodar
```

O TypeScript atua como um escudo de proteção — a "armadura de tipos" captura falhas antes que elas cheguem ao usuário. Ao compilar, os tipos são removidos, resultando em JavaScript puro e otimizado.

---

## 👨‍💻 Autor

Desenvolvido por **[Ádryan Isaque](https://github.com/Adryan16isaque) e [Tatiana Cared](https://https://github.com/TCaredT)** como parte da formação do Senac - DF.

<div align="center">
  <a href="https://www.linkedin.com/in/adryan-isaque-de-oliveira-teixeira-4479a1321/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <a href="mailto:adryanisaque@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
</div>
<!-- ARRUMAR LINKEDIN DA TATI -->
<div align="center">
<a href="https://www.linkedin.com/in/tatiana-cared-74480398/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4a0080,50:1a0033,100:0d0d0d&height=100&section=footer" width="100%"/>
</div>
