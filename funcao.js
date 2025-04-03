document.getElementById("osForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Obter os valores dos inputs e converter para número
    const proposta = parseFloat(document.getElementById("proposta").value) || 0;
    const recibo = parseFloat(document.getElementById("recibo").value) || 0;
    const osB = parseFloat(document.getElementById("osb").value) || 0;
    const agio = parseFloat(document.getElementById("agio").value) || 0;
    const impostoPercent = parseFloat(document.getElementById("imposto").value) || 0;
  
    // Cálculos:
    // 1. Proposta com acréscimo de 30%
    const propostaCalculada = proposta * 1.30;
  
    // 2. Cálculo do recibo com ágio: primeiro aplica o percentual do ágio
    let reciboCalculado = recibo * (1 + (agio / 100));
    
    // 3. Ajuste do imposto: dividir por (1 - imposto)
    let divisorImposto = 1 - (impostoPercent / 100);
    if (divisorImposto === 0) {
      document.getElementById("resultado").innerHTML = "Erro: Imposto não pode ser 100%!";
      return;
    }
    reciboCalculado = reciboCalculado / divisorImposto;
  
    let mensagem = "";
  
    // Se o valor do recibo calculado não ultrapassar o valor da proposta calculada:
    if (reciboCalculado <= propostaCalculada) {
      const diferencaOSAvulsa = reciboCalculado - osB;
      mensagem = `Criar OS avulsa de repasse ao transportador.<br>
                  OS avulsa da diferença = ${diferencaOSAvulsa.toFixed(2)}`;
    } else {
      // Caso o recibo calculado ultrapasse o valor da proposta calculada:
      const saldo = reciboCalculado - propostaCalculada;
      const repasse = saldo * 1.30;
      mensagem = `Criar OS de repasse ao cliente.<br>
                  Saldo a cobrar do cliente = ${saldo.toFixed(2)}<br>
                  Valor de repasse = ${repasse.toFixed(2)}<br>
                  (Cálculo: ${saldo.toFixed(2)} + 30% de ${saldo.toFixed(2)} = ${repasse.toFixed(2)})`;
    }
    
    document.getElementById("resultado").innerHTML = mensagem;
  });
  
  // Evento para o botão "Limpar Campos"
  document.getElementById("limpar").addEventListener("click", function() {
    document.getElementById("osForm").reset();
    document.getElementById("resultado").innerHTML = "";
  });