# Hero com "fita que torce": spec

**Data:** 2026-11-13
**Escopo:** só o hero da home (`src/app/page.tsx`, componente `Hero`) e o comportamento da navbar sobre ele.
**Opção aprovada:** B, fita que torce. A prévia está em `public/hero-opcoes.html`, que é temporária.

## Objetivo

O hero preto/laranja ganha uma segunda curva. As duas linhas se desenham na entrada da página e se cruzam duas vezes. A faixa entre elas é uma fita que vira a cada cruzamento: frente creme, verso laranja-claro. A ideia é que o hero tenha cara própria e se ligue ao resto do site, que tem fundo creme.

## Composição

- **Fundo:** o laranja `#F97316` ocupa a maior parte. O preto `#0A0A0A` fica acima da curva A, que é a divisão atual.
- **Curva A (atual):** começa à esquerda em ~50% da altura e sobe forte no meio, perto do alto à direita.
- **Curva B (nova):** cruza A em ~33% da largura (embaixo) e em ~75% (no alto). À esquerda ela fica abaixo de A; no meio, acima; à direita, abaixo de novo.
- **Fita (área entre A e B):** são 3 gomos com cores alternadas.
  - Esquerda, do início até o 1º cruzamento: creme `#FAF1E6`.
  - Meio, entre os cruzamentos: laranja-claro `#FB8A3C`.
  - Direita, depois do 2º cruzamento: creme `#FAF1E6`.
- **Linhas:** traço de 1.25px em pêssego `#FFC9A0`, com a mesma espessura em qualquer tamanho de tela (`non-scaling-stroke`).
- **Texto:** continua todo branco, sem nenhuma palavra alterada. A fita creme não pode passar atrás do título nem do subtítulo. Para isso a curva B é ajustada para que o gomo esquerdo termine antes da área do texto. A verificação é visual em 1280px, 1440px e 375px.
- **Cantos inferiores** arredondados, como hoje.

## Animação (só na entrada, não depende da rolagem)

| Tempo | O que acontece |
|---|---|
| 0,25s → 1,85s | A linha A se desenha da esquerda para a direita (`stroke-dashoffset`, easing suave) |
| 0,6s → 2,2s | A linha B se desenha logo atrás da A |
| 1,7s → 2,8s | A fita ganha cor da esquerda para a direita (varredura por máscara) |
| 2,2s em diante | O conteúdo entra com o blur+fade em cascata que já existe hoje |

- Quem tem `prefers-reduced-motion` ativado vê tudo pronto, sem animação.
- Só usa CSS e SVG: `transform`, `opacity` e `stroke-dashoffset`. Não entra nenhuma biblioteca nova.

## Implementação

- O SVG de fundo usa `viewBox 0 0 160 100` com `preserveAspectRatio="none"`. Os paths ficam em constantes no topo do `Hero`.
- A fita é um `clipPath` com `clip-rule="evenodd"`, que junta a área acima de A com a área acima de B. Dentro dela ficam 3 retângulos com as cores dos gomos.
- A área preta continua sendo um path, e o recorte antigo por `clip-path` do HTML é removido.
- A navbar continua com as zonas claras e escuras que já tem hoje (`heroDark.left/mid/right`), recalibradas para a curva A.

## Fora do escopo

- As outras seções e páginas, que terão specs próprias, e o design system completo.
- Animação ligada à rolagem.

## Como aprovar

1. O resultado visual bate com a prévia B e a fita não fica atrás do texto em 1280, 1440 e 375px.
2. A animação roda uma vez na carga, sem travar, e respeita a redução de movimento.
3. `tsc` passa e o lint não ganha nenhum erro novo.
4. O arquivo `public/hero-opcoes.html` é removido.

## Ajustes feitos na implementação

- **Verso da fita:** passou de laranja-claro `#FB8A3C` para laranja-queimado `#9A3412`. O gomo do meio passa atrás do título, e branco sobre laranja-claro não tinha contraste. Sobre o queimado, o branco lê bem.
- **Geometria separada para mobile (< 768px):** no mobile o texto ocupa quase toda a largura. A curva começa baixa, deixando o gomo creme abaixo dos botões, e sobe cedo para o laranja continuar maior que o preto. As frações usadas pela navbar ficam em `src/lib/hero-zones.ts`.
- **Tempo da animação encurtado:** as linhas se desenham de 0,15s a 1,45s, a fita ganha cor de 1,0s a 1,8s e o texto começa a entrar em 0,9s. Esperar 2,2s pelo título atrasava demais a leitura.
- **Contraste:** um degradê radial `#E2560A` escurece o laranja atrás do texto. O subtítulo passou para peso 500 e 17px, com uma sombra leve.
- **Decorações removidas:** saíram as linhas diagonais e os brilhos do hero anterior, para deixar a fita como único elemento de destaque.
- **Cores invertidas e fita só em laranja (pedido posterior):** o laranja fica acima da curva A e o preto embaixo. A frente da fita passou de creme para laranja-vivo `#FB923C`, e o verso continua `#9A3412`. As curvas desceram (desktop `y' = 38 + 0,55y`, mobile `y' = 20 + 0,8y`), e o laranja passou a ocupar a maior parte do hero. O CTA principal ficou branco, para aparecer sobre o preto.
- **Só duas cores (pedido posterior):** a fita deixou de ter tons próprios. Os gomos entre A e B invertem laranja `#F97316` e preto `#0A0A0A`, e a borda final passa a ser a curva B. As linhas são desenhadas na cor oposta ao fundo em que estão (preta sobre laranja, laranja sobre preto), então o cruzamento aparece sem nenhum tom extra. O degradê radial de contraste foi removido. As zonas da navbar seguem a curva B.
- **Texto no alto, linhas brancas no rodapé e onda (pedido posterior):** o conteúdo do hero começa no alto (`justify-start`, `pt` de 80px + 8vh no mobile e 80px + 11vh no desktop). As curvas desceram para o rodapé do hero (desktop ~72–95%, mobile ~81–97%) e não passam pelo texto. As linhas ficaram brancas (`rgba(255,255,255,.85)`). Depois de desenhadas, ondulam devagar: uma senoide viaja pelas curvas em ciclos de 9s, animando o atributo `d` (SMIL). As áreas de cor acompanham a onda. Quem pede menos movimento vê tudo parado. As zonas da navbar foram recalculadas para a nova curva B.
- **Branco nos espaços entre as linhas e curvas mais altas (pedido posterior):** os gomos entre A e B passaram a ser brancos `#FFFFFF`. O fundo ficou laranja acima das linhas, branco entre elas e preto embaixo. As curvas e o preto subiram 7 unidades no desktop e 3 no mobile, e continuam abaixo dos botões. As zonas da navbar usam a curva mais baixa das duas, onde o preto começa.
- **Preto maior (pedido posterior):** as curvas subiram mais 5 unidades no desktop e 3 no mobile. O texto também subiu um pouco (pt 80px + 7vh no desktop e 80px + 5vh no mobile) para as linhas continuarem abaixo dos botões. As zonas da navbar foram ajustadas.
- **Entrada nova (pedido posterior):** a onda inteira (preto, branco e linhas) sobe 14% a partir do rodapé com fade, em 1,4s e easing suave, enquanto as linhas se desenham e o branco é varrido. O texto mantém o blur + fade do site, mas cada linha é revelada da esquerda para a direita (recorte `inset` + deslocamento de -28px), com intervalo de 0,14s entre linhas. Ele começa em 0,45s, no mesmo sentido da varredura da onda. Quem pede menos movimento vê tudo pronto.
