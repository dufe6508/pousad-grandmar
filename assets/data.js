/* Dados do site da Pousada Grandmar (Maragogi/AL).
   Tudo aqui foi conferido em fontes públicas: a página oficial da pousada na
   Booking.com (descrição, categorias de quarto, comodidades, regras da casa,
   notas e comentários de hóspedes), a ficha do Tripadvisor e a bio oficial do
   Instagram @pousadagrandmarmaragogi.

   Regra do projeto: o que não pôde ser confirmado não entra. Preços, número de
   pessoas por categoria além do que a Booking informa e horário do café da manhã
   não são divulgados publicamente — nesses pontos o site convida a consultar
   pelo WhatsApp em vez de arriscar um número errado.

   As fotos vêm da galeria oficial da pousada na Booking.com. Como a galeria não
   identifica a qual categoria pertence cada quarto, as imagens mostram as
   acomodações da pousada de modo geral, e a página diz isso ao visitante. */

/* Comodidades reutilizáveis (id do ícone no sprite + rótulo) */
const A = {
  varanda:  ['wind', 'Varanda'],
  mar:      ['waves', 'Vista para o mar'],
  lateral:  ['waves', 'Vista lateral do mar'],
  ar:       ['thermometer-simple', 'Ar-condicionado'],
  tv:       ['television', 'TV de tela plana'],
  frigobar: ['drop', 'Frigobar'],
  banheiro: ['bathtub', 'Banheiro privativo com chuveiro'],
  armario:  ['house-line', 'Guarda-roupa'],
  wifi:     ['wifi-high', 'Wi-Fi gratuito'],
};

/* ------------------------------------------------------------- acomodações
   Os nomes são exatamente os que a pousada usa na Booking. São 9 unidades ao
   todo, distribuídas nestas seis categorias. A Booking informa a composição de
   camas de cada categoria; a capacidade numérica só é declarada na Família. */
const ACOMODACOES = [
  {
    id: 'duplo-vista-mar',
    nome: 'Duplo com Varanda e Vista do Mar',
    kind: 'Para duas pessoas',
    cover: 'quarto-11',
    resumo: 'Cama de casal grande e varanda voltada para a faixa de areia. A janela emoldura o mar de frente, sem nada no caminho.',
    meta: [['users', 'Casal'], ['bed', '1 cama de casal grande']],
    destaque: 'É o quarto de quem acorda com o barulho da maré e toma o café olhando a água.',
    itens: [A.mar, A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-11', 'quarto-03', 'quarto-10', 'varanda-01', 'banheiro-05'],
  },
  {
    id: 'duplo-vista-lateral',
    nome: 'Duplo com Varanda e Vista Lateral do Mar',
    kind: 'Para duas pessoas',
    cover: 'quarto-42',
    resumo: 'Mesma estrutura do duplo de frente, com o mar aparecendo de lado a partir da varanda. Costuma ser a opção mais em conta para casais.',
    meta: [['users', 'Casal'], ['bed', '1 cama de casal grande']],
    destaque: 'Varanda com mesinha — o canto certo para o fim de tarde depois do passeio.',
    itens: [A.lateral, A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-42', 'quarto-45', 'quarto-32', 'varanda-02', 'banheiro-02'],
  },
  {
    id: 'triplo-standard-vista-mar',
    nome: 'Triplo Standard com Varanda e Vista do Mar',
    kind: 'Para três pessoas',
    cover: 'quarto-01',
    resumo: 'Cama de casal grande e uma de solteiro, com varanda de frente para o mar. Boa saída para três amigos ou casal com um filho.',
    meta: [['users', 'Até 3 hóspedes'], ['bed', '1 casal grande + 1 solteiro']],
    destaque: 'Vista de frente para a praia sem abrir mão da terceira cama.',
    itens: [A.mar, A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-01', 'quarto-06', 'quarto-09', 'vista-mar-01', 'banheiro-06'],
  },
  {
    id: 'triplo-vista-lateral',
    nome: 'Triplo com Varanda e Vista Lateral do Mar',
    kind: 'Para três pessoas',
    cover: 'quarto-21',
    resumo: 'Casal grande mais solteiro, varanda com o mar de lado e bastante espaço de circulação entre as camas.',
    meta: [['users', 'Até 3 hóspedes'], ['bed', '1 casal grande + 1 solteiro']],
    destaque: 'A categoria com mais unidades disponíveis — costuma ser a que sobra em alta temporada.',
    itens: [A.lateral, A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-21', 'quarto-17', 'quarto-24', 'area-estar-05', 'banheiro-03'],
  },
  {
    id: 'triplo-varanda',
    nome: 'Triplo com Varanda',
    kind: 'Para três pessoas',
    cover: 'quarto-07',
    resumo: 'Casal grande e solteiro, com varanda voltada para o jardim e o gramado da pousada. Sossegado e mais protegido do sol da tarde.',
    meta: [['users', 'Até 3 hóspedes'], ['bed', '1 casal grande + 1 solteiro']],
    destaque: 'Sai da varanda e o pé já está na grama, a poucos metros da piscina.',
    itens: [A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-07', 'quarto-02', 'quarto-19', 'area-estar-03', 'banheiro-04'],
  },
  {
    id: 'familia-vista-mar',
    nome: 'Quarto Família com Vista do Mar',
    kind: 'Para quatro pessoas',
    cover: 'quarto-28',
    resumo: 'A maior acomodação da pousada: duas camas de solteiro e uma de casal grande, com vista para o mar. Pensada para família com crianças.',
    meta: [['users', 'Até 4 hóspedes'], ['bed', '1 casal grande + 2 solteiros']],
    destaque: 'A pousada não dispõe de berço nem de cama extra, então essa é a opção para quem vem em quatro.',
    itens: [A.mar, A.varanda, A.ar, A.tv, A.frigobar, A.banheiro, A.armario, A.wifi],
    fotos: ['quarto-28', 'quarto-29', 'quarto-37', 'quarto-30', 'banheiro-07'],
  },
];

/* ---------------------------------------------------------------- estrutura */
const ESTRUTURA = [
  ['waves', 'Pé na areia', 'A pousada fica na beira da praia de Maragogi: da varanda ao mar são poucos passos, sem rua para atravessar.'],
  ['swimming-pool', 'Piscina no gramado', 'Piscina ao ar livre entre o jardim e a praia, com mesas e espreguiçadeiras à sombra dos coqueiros.'],
  ['umbrella', 'Quiosque e churrasqueira', 'Quiosque coberto e churrasqueira na área externa, de frente para o mar.'],
  ['coffee', 'Café da manhã continental', 'Servido todas as manhãs, com bolo saindo do forno, pães, frutas e frios. É o item mais elogiado pelos hóspedes.'],
  ['car', 'Estacionamento gratuito', 'Vagas na própria pousada, sem custo adicional e sem necessidade de reserva.'],
  ['wifi-high', 'Wi-Fi em toda a pousada', 'Internet sem fio gratuita nas acomodações e nas áreas comuns.'],
  ['tree', 'Jardim e terraço', 'Área verde com mesas e cadeiras entre os quartos, o quiosque e a praia.'],
  ['users', 'Quartos para famílias', 'Categorias triplas e um quarto família com vista do mar para quem vem em quatro.'],
];

/* --------------------------------------------------------------- galeria */
const GALERIA_FILTROS = [
  ['todas', 'Todas'],
  ['areas', 'Áreas comuns'],
  ['quartos', 'Acomodações'],
  ['cafe', 'Café da manhã'],
  ['praia', 'Praia e vista'],
];

/* [arquivo, categoria, legenda] */
const GALERIA = [
  ['praia-natureza-05', 'praia', 'A praia de Maragogi vista da varanda da pousada'],
  ['piscina-03', 'areas', 'Piscina ao ar livre no gramado da pousada'],
  ['quarto-11', 'quartos', 'Quarto de casal com a janela voltada para o mar'],
  ['praia-natureza-01', 'praia', 'A pousada vista do jardim, com os coqueiros e o mar ao fundo'],
  ['cafe-manha-05', 'cafe', 'Prato do café da manhã servido na pousada'],
  ['varanda-03', 'areas', 'Varanda de madeira com vista para a praia e a piscina'],
  ['quarto-28', 'quartos', 'Quarto família, com camas de casal e de solteiro'],
  ['praia-natureza-02', 'praia', 'Vista do mar a partir do terraço coberto'],
  ['piscina-04', 'areas', 'A pousada e a piscina no fim da tarde'],
  ['cafe-manha-02', 'cafe', 'Pães e bolos na mesa do café da manhã'],
  ['quarto-01', 'quartos', 'Quarto triplo com vista para o mar'],
  ['jardim-03', 'areas', 'Espreguiçadeiras no gramado, de frente para a praia'],
  ['praia-natureza-06', 'praia', 'Mesas do quiosque com o mar de Maragogi ao fundo'],
  ['quarto-14', 'quartos', 'Cama de casal com a janela aberta para o mar'],
  ['cafe-manha-03', 'cafe', 'Mesa do café da manhã montada na sala'],
  ['area-estar-05', 'areas', 'Área de estar com saída para a varanda'],
  ['praia-natureza-07', 'praia', 'Quiosque de palha no gramado à beira-mar'],
  ['quarto-07', 'quartos', 'Quarto triplo com varanda voltada para o jardim'],
  ['jardim-01', 'areas', 'Fachada da pousada vista do jardim'],
  ['cafe-manha-04', 'cafe', 'Buffet do café da manhã'],
  ['quarto-42', 'quartos', 'Quarto de casal com vista lateral do mar'],
  ['praia-natureza-08', 'praia', 'Coqueiros e mesas entre a pousada e a praia'],
  ['area-estar-01', 'areas', 'Terraço com mesas à noite'],
  ['quarto-21', 'quartos', 'Quarto triplo com cama de casal e de solteiro'],
  ['vista-mar-02', 'praia', 'A faixa de areia em frente à pousada'],
  ['piscina-01', 'areas', 'A piscina iluminada ao anoitecer'],
  ['quarto-37', 'quartos', 'Quarto com três camas'],
  ['banheiro-05', 'quartos', 'Banheiro privativo com chuveiro'],
  ['jardim-02', 'areas', 'Rede e jardim na área externa'],
  ['area-estar-06', 'areas', 'Mesas do café da manhã na área coberta'],
  ['praia-natureza-04', 'praia', 'A pousada entre os coqueiros, de frente para o mar'],
  ['quarto-30', 'quartos', 'Quarto família, com espaço de estar junto às camas'],
];

/* ------------------------------------------------------------ avaliações
   [nota, escala, plataforma/critério, detalhe, link] */
const AVALIACOES = [
  ['9,1', '/10', 'Booking.com', '693 avaliações de hóspedes', 'https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html'],
  ['9,5', '/10', 'Localização', 'Subnota no Booking.com', 'https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html'],
  ['9,4', '/10', 'Atendimento', 'Subnota no Booking.com', 'https://www.booking.com/hotel/br/grandmarsuitesmaragogi.pt-br.html'],
  ['4,3', '/5', 'Tripadvisor', '18 avaliações', 'https://www.tripadvisor.com/Hotel_Review-g644400-d23376530-Reviews-Grandmar_Suites_Maragogi-Maragogi_State_of_Alagoas.html'],
];

/* Comentários reais publicados por hóspedes na Booking.com, sem edição. */
const DEPOIMENTOS = [
  ['Localização excelente!!! Quarto confortável de frente ao mar, limpeza. Tudo ótimo!! Café da manhã cortesia muito bom!', 'Nelbia', 'Booking.com'],
  ['Pousada linda, aconchegante, limpeza tudo no seu devido lugar, área externa bem cuidada, pessoal educado desde a recepção até pessoal da cozinha, café simples mas feito de coração, bolo quentinho na hora', 'Raquel', 'Booking.com'],
  ['Nossa estadia foi inesquecível! A pousada tem ótima localização e acordar com a vista do mar tornou a experiência ainda mais especial.', 'Juliana', 'Booking.com'],
  ['Segunda vez que eu e meu esposo fomos para a pousada. Pousada pé na areia, com privacidade. Quartos sempre limpos e confortáveis!', 'Andressa', 'Booking.com'],
  ['Do acolhimento, aconchego, da gentileza, das dicas dos pontos turísticos. Enfim, super recomendo, o lugar é lindo.', 'De', 'Booking.com'],
  ['O atendimento foi excelente, e o fato de o dono sempre estar presente fez a experiência ficar bem melhor.', 'Onildo', 'Booking.com'],
];

/* ------------------------------------------------------------------- faq
   Regras da casa e informações publicadas pela pousada na Booking.com. */
const FAQ = [
  ['Qual o horário de check-in e de check-out?', 'O check-in é das 14h às 22h e o check-out das 12h às 12h30. Se você chegar fora desse intervalo, avise pelo WhatsApp para combinarmos.'],
  ['A pousada é mesmo pé na areia?', 'Sim. A Grandmar fica na beira da praia de Maragogi, sem rua entre o jardim e a faixa de areia. As varandas dos quartos são voltadas para o mar, de frente ou de lado.'],
  ['Como funciona o café da manhã?', 'É um café da manhã continental servido pela própria equipe da pousada, com bolo feito na hora, pães, frutas e frios. Para saber se ele está incluído na sua tarifa, confirme com a gente antes de fechar a reserva.'],
  ['Tem estacionamento?', 'Sim, estacionamento gratuito na própria pousada, sem necessidade de reserva.'],
  ['Aceitam animais de estimação?', 'Não. A pousada não aceita animais de estimação.'],
  ['Há berço ou cama extra?', 'Não temos berços nem camas extras. Crianças são bem-vindas em qualquer idade e, a partir dos 7 anos, são contadas como adultos na ocupação do quarto. Para quatro pessoas, a indicação é o Quarto Família com Vista do Mar.'],
  ['Vocês ajudam a organizar os passeios?', 'Sim. A recepção orienta sobre os passeios da região, entre eles as piscinas naturais das Galés, a cerca de 4,7 km da pousada, e indica quem contratar.'],
  ['Quais são as regras da casa?', 'Não é permitido fumar nem realizar festas ou eventos. O horário de silêncio é das 21h às 8h. A idade mínima para o check-in é 18 anos.'],
];
