/* 

// 1) Limpa campos do CEP
function limpa_formulario_cep() {
  ['rua','bairro','cidade','estado'].forEach(id => document.getElementById(id).value = "");
}

// 2) Callback do viacep
function meu_callback(conteudo) {
  if (!conteudo.erro) {
    document.getElementById('rua').value    = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('estado').value = conteudo.uf;
  } else {
    limpa_formulario_cep();
    alert("CEP não encontrado.");
    document.getElementById('cep').value = "";
  }
}

// 3) Pesquisa CEP
function pesquisacep(valor) {
  const cep = valor.replace(/\D/g,'');
  if (!cep) return limpa_formulario_cep();
  if (!/^[0-9]{8}$/.test(cep)) {
    limpa_formulario_cep();
    return alert("Formato de CEP inválido.");
  }
  ['rua','bairro','cidade','estado'].forEach(id => document.getElementById(id).value = "...");
  const script = document.createElement('script');
  script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
  document.body.appendChild(script);
}

// 4) Formata telefone
function formatar(mascara, campo) {
  let i = campo.value.length;
  const saida = mascara[0], texto = mascara[i];
  if (texto !== saida) campo.value += texto;
}

// 5) Atualiza valor do banho
function atualizaValor() {
  const m = {
    "Banho Simples":   "R$ 50,00",
    "Banho e Tosa":    "R$ 80,00",
    "Banho com Medicamentos": "R$ 120,00"
  };
  document.getElementById('valorpago').value = m[document.getElementById('tipoBanho').value] || "";
}

// 6) Configura flatpickr guardando ISO em window.dataHoraISO
flatpickr("#horaData", {
  enableTime: true,
  dateFormat: "d/m/Y H:i",
  time_24hr: true,
  locale: { firstDayOfWeek: 1 },
  onClose: selectedDates => {
    // guarda em ISO para o backend
    window.dataHoraISO = selectedDates[0]?.toISOString();
  }
});

// 7) Ao disparar "agendar" monta payload sem 'pago' e com dataHoraISO
document.getElementById("agendar").addEventListener("click", function(event){
  event.preventDefault();

  const payload = {
    nome:       document.getElementById("Nome").value,
    telefone1:  document.getElementById("telefone1").value,
    telefone2:  document.getElementById("telefone2").value,
    email:      document.getElementById("email").value,
    cep:        document.getElementById("cep").value,
    rua:        document.getElementById("rua").value,
    numero:     document.getElementById("numero").value,
    bairro:     document.getElementById("bairro").value,
    cidade:     document.getElementById("cidade").value,
    estado:     document.getElementById("estado").value,
    tipoBanho:  document.getElementById("tipoBanho").value,
    valorPago:  document.getElementById("valorpago").value,
    dataHora:   window.dataHoraISO // ISO ou undefined
  };

  console.log("Payload:", payload);

  fetch("http://localhost:8080/api/clientes", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  })
    .then(r => {
      if (!r.ok) throw new Error(`Erro ${r.status}`);
      return r.json();
    })
    .then(_ => {
      alert("Agendamento criado com sucesso!");
      document.getElementById("formularioCliente").reset();
    })
    .catch(err=>{
      console.error("Erro ao agendar:", err);
      alert("Falha ao agendar. Veja console.");
    });
});

// 8) Cancelar e ver clientes
document.getElementById("Cancelar").addEventListener("click", e=>{
  if (!confirm("Cancelar e apagar dados?")) e.preventDefault();
});
document.getElementById("verClientes").addEventListener("click", ()=>{
  window.location.href = window.location.origin + "clientesAgendados.html";
});

*/

// 1) Limpa campos do CEP
function limpa_formulario_cep() {
  ['rua','bairro','cidade','estado'].forEach(id => document.getElementById(id).value = "");
}

// 2) Callback do viacep
function meu_callback(conteudo) {
  if (!conteudo.erro) {
    document.getElementById('rua').value    = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('estado').value = conteudo.uf;
  } else {
    limpa_formulario_cep();
    alert("CEP não encontrado.");
    document.getElementById('cep').value = "";
  }
}

// 3) Pesquisa CEP
function pesquisacep(valor) {
  const cep = valor.replace(/\D/g,'');
  if (!cep) return limpa_formulario_cep();
  if (!/^[0-9]{8}$/.test(cep)) {
    limpa_formulario_cep();
    return alert("Formato de CEP inválido.");
  }
  ['rua','bairro','cidade','estado'].forEach(id => document.getElementById(id).value = "...");
  const script = document.createElement('script');
  script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
  document.body.appendChild(script);
}

// 4) Formata telefone
function formatar(mascara, campo) {
  let i = campo.value.length;
  const saida = mascara[0], texto = mascara[i];
  if (texto !== saida) campo.value += texto;
}

// 5) Atualiza valor do banho
function atualizaValor() {
  const m = {
    "Banho Simples":   "R$ 50,00",
    "Banho e Tosa":    "R$ 80,00",
    "Banho com Medicamentos": "R$ 120,00"
  };
  document.getElementById('valorpago').value = m[document.getElementById('tipoBanho').value] || "";
}

// 6) Configura flatpickr guardando ISO em window.dataHoraISO
flatpickr("#horaData", {
  enableTime: true,
  dateFormat: "d/m/Y H:i",
  time_24hr: true,
  locale: { firstDayOfWeek: 1 },
  onClose: selectedDates => {
    // guarda em ISO para o backend
    window.dataHoraISO = selectedDates[0]?.toISOString();
  }
});

// 7) Agendamento simulado (sem backend, usando localStorage)
document.getElementById("agendar").addEventListener("click", function(event){
  event.preventDefault();

  const payload = {
    nome:       document.getElementById("Nome").value,
    telefone1:  document.getElementById("telefone1").value,
    telefone2:  document.getElementById("telefone2").value,
    email:      document.getElementById("email").value,
    cep:        document.getElementById("cep").value,
    rua:        document.getElementById("rua").value,
    numero:     document.getElementById("numero").value,
    bairro:     document.getElementById("bairro").value,
    cidade:     document.getElementById("cidade").value,
    estado:     document.getElementById("estado").value,
    tipoBanho:  document.getElementById("tipoBanho").value,
    valorPago:  document.getElementById("valorpago").value,
    dataHora:   window.dataHoraISO || new Date().toISOString()
  };

  console.log("Agendamento simulado:", payload);

  // Salva localmente
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentos.push(payload);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  alert("Agendamento criado com sucesso!");
  document.getElementById("formularioCliente").reset();
});

// 8) Cancelar e ver clientes
document.getElementById("Cancelar").addEventListener("click", e=>{
  if (!confirm("Cancelar e apagar dados?")) e.preventDefault();
});

document.getElementById("verClientes").addEventListener("click", ()=>{
  // Redireciona para a tela de clientes (ajuste se necessário o caminho)
  window.location.href = "clientesAgendados.html";
});
