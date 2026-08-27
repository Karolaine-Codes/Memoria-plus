# 🧠 Memória+

Um jogo da memória educativo premium, pensado para aprender brincando em navegador e celular, com foco em experiência moderna, progressão e desafio inteligente.

## 🎮 Sobre o projeto

O Memória+ foi pensado como uma experiência premium de aprendizagem por meio de jogos. O projeto combina interface moderna, design mobile-first, ranking competitivo e mecânicas de memória com foco em reforço do conhecimento.

## 🏷️ Identidade final de lançamento

Nome oficial: Memória+

Tagline: Desafie sua mente. Aprenda com diversão.

Direção visual: premium educacional, moderna, elegante, mobile-first.

Capa para campanha e compartilhamento:
- foco em aprendizado com diversão
- visual premium, moderno e amigável
- elementos de jogo, memória e conhecimento
- uso de gradientes vibrantes e ilustrações de educação

Mensagem principal:
- "Jogo da memória premium para aprender, competir e evoluir."
- "Estude com diversão, em qualquer lugar, no navegador ou no celular."
- "Memória+ combina educação, desafio e gameplay envolvente."

## 🎯 Objetivo do Projeto

Criar um jogo da memória educativo, simples e intuitivo, que possa ser utilizado por diferentes públicos e categorias de conhecimento.

A primeira fase tem como foco construir a **base funcional do jogo**, incluindo:

- Seleção de categoria;
- Seleção de dificuldade;
- Embaralhamento das cartas;
- Formação de pares;
- Sistema de pontuação;
- Contagem de tentativas;
- Sistema de vidas;
- Sistema de combo;
- Cronômetro;
- Detecção de vitória;
- Detecção de derrota;
- Interface responsiva.

---

## 🧩 Categorias

O jogo possui quatro categorias iniciais:

| Categoria | Conteúdo |
|---|---|
| 🐶 Animais | Animais e elementos relacionados |
| ➕ Matemática | Números e símbolos matemáticos |
| 🌎 Geografia | Mapas, lugares e elementos geográficos |
| 🔬 Ciências | Ciência, natureza e tecnologia |

---

## 🎚️ Níveis de Dificuldade

O jogador pode escolher entre três níveis:

### 🟢 Fácil

- 4 pares;
- 8 cartas no tabuleiro.

### 🟡 Médio

- 6 pares;
- 12 cartas no tabuleiro.

### 🔴 Difícil

- 8 pares;
- 16 cartas no tabuleiro.

A quantidade de cartas aumenta de acordo com o nível escolhido, tornando a atividade progressivamente mais desafiadora.

---

## 🎮 Como Funciona

1. O jogador escolhe uma categoria.
2. Escolhe o nível de dificuldade.
3. Inicia a partida.
4. As cartas são embaralhadas automaticamente.
5. O jogador seleciona duas cartas.
6. Se forem iguais, o par permanece encontrado.
7. Se forem diferentes, as cartas são viradas novamente.
8. Uma tentativa é contabilizada a cada combinação realizada.
9. O sistema atualiza a pontuação, vidas e combo.
10. O cronômetro registra o tempo da partida.
11. Ao encontrar todos os pares, o jogador recebe sua pontuação final.
12. Se todas as vidas forem perdidas, a partida é encerrada.

---

## 🚀 Funcionalidades

- 🐶 Categoria Animais
- ➕ Categoria Matemática
- 🌎 Categoria Geografia
- 🔬 Categoria Ciências
- 🟢 Nível Fácil
- 🟡 Nível Médio
- 🔴 Nível Difícil
- 🃏 Sistema de cartas
- 🎯 Sistema de pontuação
- ❤️ Sistema de vidas
- 🔥 Sistema de combo
- 🏆 Melhor combo
- 🔢 Contador de tentativas
- ⏱️ Cronômetro
- 🏆 Tela de vitória
- 💔 Tela de Game Over
- 🔄 Jogar novamente
- 📱 Interface responsiva

## 🏆 Sistema de Pontuação

O sistema de pontuação recompensa o jogador pela identificação correta dos pares. A pontuação também considera o **combo**, incentivando uma sequência de acertos.

Exemplo:

```text
1º par → +100 pontos
2º par → +125 pontos
3º par → +150 pontos
4º par → +175 pontos
```

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript

## 🌐 Publicar e usar na web e no celular

O projeto já foi preparado para funcionar como PWA (Progressive Web App), o que permite:

- abrir o jogo pelo navegador em desktop;
- abrir o mesmo link no celular;
- instalar o jogo na tela inicial do celular como um app.

### Como publicar no Netlify (passo a passo)

1. Acesse o Netlify e clique em **Add new site** → **Import an existing project**.
2. Conecte sua conta do GitHub ou escolha a opção de upload da pasta.
3. Se estiver usando GitHub, selecione o repositório do projeto e clique em **Deploy site**.
4. Se estiver enviando a pasta manualmente, arraste a pasta do projeto para o Netlify e aguarde a publicação.
5. O Netlify gera uma URL pública do tipo `https://nome-do-projeto.netlify.app`.
6. Depois do deploy, abra a URL e teste no navegador.
7. Para celular, basta abrir esse link no Chrome/Edge e escolher **Adicionar à Tela Inicial**.

### Ranking mundial real com Supabase

O jogo já foi preparado para conectar com Supabase. Antes do deploy, preencha as credenciais no arquivo `index.html`:

```js
window.MEMORIA_PLUS_SUPABASE = {
  url: "https://SEU_PROJETO.supabase.co",
  anonKey: "SUA_CHAVE_ANON"
};
```

Depois, crie a tabela no Supabase:

```sql
create table public.leaderboard (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  score integer not null default 0,
  category text,
  difficulty text,
  created_at timestamptz default now()
);

alter table public.leaderboard enable row level security;

create policy "Permitir leitura pública"
on public.leaderboard
for select
using (true);

create policy "Permitir envio público"
on public.leaderboard
for insert
with check (true);
```

Se as chaves não estiverem preenchidas, o jogo usa o ranking local do navegador como fallback.

### Como instalar no celular

No navegador mobile (Chrome ou Edge), abra o link do site e escolha a opção:

- "Adicionar à tela inicial"
- ou "Instalar app"

Assim, o jogo funciona como um aplicativo sem precisar da Play Store.

---

## 📚 Conceitos praticados

Durante o desenvolvimento foram praticados conceitos como:

- Lógica de programação
- Manipulação do DOM
- Eventos JavaScript
- Arrays
- Funções
- Estruturas condicionais
- Manipulação de estado
- Criação dinâmica de elementos
- Responsividade
- Organização de projeto

## 🎯 Objetivo

O projeto faz parte da minha jornada de aprendizagem e desenvolvimento de portfólio na área de tecnologia.

A ideia é continuar evoluindo o Memória+ com novas funcionalidades e melhorias de experiência.

## 🔮 Próximas etapas

- 💾 Sistema de recordes
- 📊 Estatísticas de desempenho
- 🏅 Ranking
- 🎨 Novas categorias
- ⚙️ Personalização da experiência
- 🤖 Exploração de recursos de Inteligência Artificial

## 👩‍💻 Desenvolvido por

**Karolaine Sampaio**

Estudante de Inteligência Artificial e em formação na área de tecnologia.

---

⭐ Projeto desenvolvido para fins de aprendizado e portfólio.

