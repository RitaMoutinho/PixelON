  // Navbar Mobile
  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
  }


  // Carrosel
  let cont = 1; // Inicia com o botão de rádio 1 ativo

  // Define o primeiro botão de rádio como "checked" no início
  document.getElementById('radio1').checked = true;

  // Configura o intervalo para trocar as imagens a cada 5 segundos
  setInterval(() => {
    proximaImg();
  }, 5000);

  function proximaImg() {
    cont++;

    // Reinicia o contador se ultrapassar o número de imagens
    if (cont > 3) {
      cont = 1;
    }

    // Define o botão de rádio correspondente como "checked"
    document.getElementById('radio' + cont).checked = true;
  }


  //Roleta
  // Verifica se o popup já foi exibido nesta sessão
  if (!sessionStorage.getItem('popupShown')) {
    document.getElementById("popup").style.display = "flex"; 
    document.body.classList.add("popup-open");
    sessionStorage.setItem('popupShown', 'true'); // Salva na sessão
  }

  document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
    document.body.classList.remove("popup-open");
  });

  const sectors = [
    { color: "#020204", text: "#fff", label: "10% de desconto" },
    { color: "#46229f", text: "#fff", label: "20% de desconto" },
    { color: "#020204", text: "#fff", label: "25% de desconto" },
    { color: "#46229f", text: "#fff", label:  "30% de desconto" },
    { color: "#020204", text: "#fff", label: "35% de desconto" },
    { color: "#46229f", text: "#fff", label: "40% de desconto" },
    { color: "#020204", text: "#fff", label: "45% de desconto" },
    { color: "#46229f", text: "#fff", label: "50% de desconto" },
  ];

  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;

  let angVel = 0;
  let ang = 0;
  let spinButtonClicked = false;

  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 25px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    ctx.restore();
  }

  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    spinEl.textContent = !angVel ? "GIRAR" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  }

  function frame() {
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      document.getElementById("winMessage").textContent = `Parabéns, você ganhou ${finalSector.label}!`;
      document.getElementById("winMessage").style.visibility = "visible"; // Torna a mensagem visível

      setTimeout(() => {
        document.getElementById("popup").style.display = "none"; 
        document.body.classList.remove("popup-open");
      }, 2000);

      spinButtonClicked = false;
      return;
    }

    angVel *= 0.991;
    if (angVel < 0.002) angVel = 0;
    ang += angVel;
    ang %= TAU;
    rotate();
  }


  function engine() {
    frame();
    requestAnimationFrame(engine);
  }

  function init() {
    sectors.forEach(drawSector);
    rotate();
    engine();
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
  }

  init();

  // Card produtos
  // Selecionar todos os elementos com a classe "card"
  // Efeito hover
  const cards = document.querySelectorAll(".card");


  cards.forEach(card => {
    card.onmousemove = e => updateMousePosition(e, card);
  });

  // Função para atualizar as propriedades CSS com as coordenadas do mouse
  function updateMousePosition(event, card) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }


