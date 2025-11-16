# Documentação: Global Solution - SkillUpPlus 2030+

**Alunos:** Enzo Rodrigues RM553377, Rafael Cristofali RM553521 e Hugo Santos RM553266.
**Curso:** Engenharia de Software
**Disciplina:** Mobile Development & IoT
**Tema:** O Futuro do Trabalho e a Requalificação Digital com React Native

---

## 1. Introdução ao Projeto

O aplicativo **SkillUpPlus 2030+** é uma plataforma móvel fictícia desenvolvida para a Global Solution da FIAP. O seu objetivo principal é atuar como uma ferramenta de requalificação profissional (reskilling), ajudando trabalhadores e estudantes a se adaptarem às novas demandas do mercado de trabalho impostas pela tecnologia.

O app oferece trilhas de aprendizado personalizadas (IA, Soft Skills, Sustentabilidade), alinhando-se diretamente aos **Objetivos de Desenvolvimento Sustentável (ODS) da ONU**, especialmente o ODS 4 (Educação de Qualidade) e o ODS 8 (Trabalho Decente).

Este documento detalha a arquitetura técnica, o fluxo de navegação, os componentes e os códigos-fonte principais utilizados na construção do aplicativo.

---

## 2. Prints das Telas do Aplicativo

Abaixo estão as telas principais do aplicativo, executadas em um emulador Android, demonstrando o fluxo de navegação e as funcionalidades implementadas.

**[TODO: Insira seus prints de tela aqui]**

1.  **Print 1: Tela de Login** (`app/login.tsx`)
    *(Cole aqui o print da tela de login)*

2.  **Print 2: Tela Home - Trilhas de Aprendizado** (`app/(app)/(tabs)/index.tsx`)
    *(Cole aqui o print da tela home, mostrando os cards dos cursos)*

3.  **Print 3: Tela de Perfil - Autoavaliação** (`app/(app)/(tabs)/profile.tsx`)
    *(Cole here o print da tela de perfil, mostrando o componente Picker)*

4.  **Print 4: Menu Lateral - Drawer Navigation** (`app/(app)/_layout.tsx`)
    *(Cole aqui o print do app com o menu lateral (gaveta) aberto)*

5.  **Print 5: Tela de Configurações** (`app/(app)/settings.tsx`)
    *(Cole aqui o print da tela de configurações, mostrando o botão "Sair")*

6.  **Print 6: Tela de Detalhes do Curso - Stack Navigation** (`app/(app)/course-detail/[id].tsx`)
    *(Cole aqui o print da tela de detalhes de um curso, que é "empilhada" sobre as tabs)*

---

## 3. Estrutura de Diretórios da Aplicação

O projeto foi desenvolvidoSNR/ 0/SkillUpPlus2030/
├── app/                  # (Obrigatório) Todas as rotas/telas do Expo Router
│   ├── (app)/            # (Grupo de Rota) Telas protegidas por login
│   │   ├── (tabs)/       # (Grupo) Define a navegação por Abas (Tabs)
│   │   │   ├── _layout.tsx # Configuração das Abas (Home, Perfil)
│   │   │   ├── index.tsx   # Tela Home/Trilhas (Aba 1)
│   │   │   └── profile.tsx # Tela Perfil/Autoavaliação (Aba 2)
│   │   ├── _layout.tsx   # Configuração do Drawer (Menu Lateral)
│   │   ├── course-detail/[id].tsx # Rota dinâmica (Stack) para Detalhes
│   │   └── settings.tsx  # Tela de Configurações (Item do Drawer)
│   ├── _layout.tsx       # Layout Raiz (Stack Principal)
│   ├── index.tsx         # Tela "Gatekeeper" (Porteiro) para Auth
│   └── login.tsx         # Tela de Login (fora do grupo (app))
│
├── components/           # Componentes reutilizáveis (ex: CourseCard.tsx)
├── constants/            # Dados estáticos (ex: Mock dos Cursos)
├── context/              # Contexto global (AuthContext.tsx)
└── styles/               # Estilos globais (GlobalStyles.ts)


---

## 4. Fluxo de Navegação e Justificativas de Design

O aplicativo implementa a **navegação híbrida** solicitada (Stack, Drawer e Tabs) de forma eficiente utilizando o **Expo Router** e um Contexto de Autenticação.

### 4.1. Fluxo de Autenticação (O "Gatekeeper")

O fluxo de login/logout é o núcleo do app e foi resolvido com um padrão de "Gatekeeper" (Porteiro) para evitar "race conditions":

1.  **`app/_layout.tsx` (Raiz):** Configura o `AuthProvider` e o `<Stack>` principal, que define as três rotas de nível superior: `index`, `login` e `(app)`. Ele não possui lógica de navegação.
2.  **`app/index.tsx` (Porteiro):** É a primeira tela que o app carrega. Ela usa o `useAuth()` para verificar o estado `user`:
    * Se `user === true`, redireciona para `/(app)`.
    * Se `user === false`, redireciona para `/login`.
    * Se `user === null` (carregando), exibe um `ActivityIndicator`.
3.  **`app/login.tsx`:** O usuário insere as credenciais. Ao clicar em "Entrar", a função `signIn()` é chamada (atualizando o Contexto) e o `router.replace('/(app)')` é acionado manualmente, levando o usuário para a home.
4.  **`app/(app)/_layout.tsx` (Segurança):** Este layout (o Drawer) possui um `useEffect` que "assiste" ao estado `user`. Se o usuário fizer logout (em Configurações), o estado `user` muda para `false`, e este `useEffect` o "expulsa" de volta para `/login`.

### 4.2. Justificativa da Navegação Híbrida

A estrutura de navegação cumpre todos os requisitos do PDF:
* **Stack (Navegação em Pilha):** Usada como base em `app/_layout.tsx` para gerenciar as telas de Login e o grupo do App. Também é usada pelo Expo Router para "empilhar" a tela de `course-detail/[id]` por cima das Tabs, permitindo um fluxo sequencial.
* **Drawer (Menu Lateral):** Usada em `app/(app)/_layout.tsx` como o container principal pós-login. Permite acesso fácil às seções "Início" e "Configurações".
* **Tabs (Abas Inferiores):** Usada em `app/(app)/(tabs)/_layout.tsx` para alternar rapidamente entre as funcionalidades centrais: "Trilhas" (Home) e "Perfil" (Autoavaliação).

---

## 5. Códigos-Fonte Principais e Componentes

Os principais arquivos de lógica e interface estão listados abaixo. O CSS foi modularizado no `styles/GlobalStyles.ts` usando `StyleSheet`, conforme solicitado.

### 5.1. Lógica de Autenticação e Navegação
* **`context/AuthContext.tsx`:** Gerencia o estado global de autenticação (`user`, `signIn`, `signOut`) usando `createContext`, `useState` e `useContext`. É o "cérebro" do estado de login.
* **`app/index.tsx`:** O "Gatekeeper" que usa `useAuth()` e `<Redirect>` para rotear o usuário no carregamento inicial do app.
* **`app/(app)/_layout.tsx`:** Contém o "segurança" de logout, usando `useEffect` e `useRouter` para redirecionar se `user === false`.
* **`app/login.tsx`:** Usa `useState` para gerenciar os formulários e `useRouter` para redirecionar no clique do botão "Entrar".

### 5.2. Componentes Utilizados (Conforme Requisitos)

| Componente | Aplicação no APP | Arquivo de Exemplo |
| :--- | :--- | :--- |
| **`View`** | Estrutura das telas (containers) | `app/login.tsx` |
| **`ScrollView`** | Exibição da lista de cursos | `app/(app)/(tabs)/index.tsx` |
| **`TextInput`** | Formulário de login (email, senha) | `app/login.tsx` |
| **`Text`** | Rótulos, títulos e descrições | `app/login.tsx`, `components/CourseCard.tsx` |
| **`Button`** | Ações de "Entrar" e "Sair" | `app/login.tsx`, `app/(app)/settings.tsx` |
| **`Image`** | Logotipo do app e banners dos cursos | `app/login.tsx`, `components/CourseCard.tsx` |
| **`StyleSheet`** | Organização modular de todos os estilos | `styles/GlobalStyles.ts` |
| **`TouchableOpacity`** | Criação dos cards de curso clicáveis | `components/CourseCard.tsx` |
| **`Alert`** | Mensagem de erro de login inválido | `app/login.tsx` |
| **`Picker`** | Seleção de áreas de interesse | `app/(app)/(tabs)/profile.tsx` |
| **Hooks** | `useState`, `useEffect`, `useContext` (via `useAuth`), `useRouter` | `context/AuthContext.tsx`, `app/login.tsx` |

---

## 6. Conexão com os ODS da ONU

O projeto se conecta diretamente com os Objetivos de Desenvolvimento Sustentável:
* **ODS 4 (Educação de Qualidade):** Democratiza o acesso à capacitação tecnológica.
* **ODS 8 (Trabalho Decente e Crescimento Econômico):** Fomenta a empregabilidade e a requalificação contínua.
* **ODS 9 (Indústria, Inovação e Infraestrutura):** Incentiva o uso de tecnologias acessíveis.
* **ODS 10 (Redução das Desigualdades):** Inclui públicos vulneráveis no aprendizado digital.

