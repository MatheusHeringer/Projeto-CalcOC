document.getElementById("osForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const tipoRecibo = document.getElementById("reciboSelect").value;

  const proposta = parseFloat(document.getElementById("proposta").value) || 0;
  const recibo = parseFloat(document.getElementById("recibo").value) || 0;
  const osB = parseFloat(document.getElementById("osb").value) || 0;
  const agio = parseFloat(document.getElementById("agio").value) || 0;
  const impostoPercent = parseFloat(document.getElementById("imposto").value) || 0;

  const propostaCalculada = proposta * 1.30;
  let reciboCalculado = recibo * (1 + (agio / 100));
  let divisorImposto = 1 - (impostoPercent / 100);

  if (divisorImposto === 0) {
    document.getElementById("resultado").innerHTML = "Erro: Imposto não pode ser 100%!";
    return;
  }

  reciboCalculado = reciboCalculado / divisorImposto;
  let mensagem = "";

  if (tipoRecibo === "nao") {
    // Código normal
    if (reciboCalculado <= propostaCalculada) {
      const diferencaOSAvulsa = reciboCalculado - osB;
      if (diferencaOSAvulsa > 0) {
        mensagem = `Criar OS avulsa de repasse ao transportador.<br>
                    VALOR DE PAGAMENTO A FORNECEDOR = ${diferencaOSAvulsa.toFixed(2)}`;
      } else {
        mensagem = "Não é necessário criar OS avulsa, orientar fornecedor a cobrar valor total na OS B.";
      }
    } else {
      const saldo = reciboCalculado - propostaCalculada;
      const repasse = saldo * 1.30;
      const diferencaOSAvulsa = reciboCalculado - osB; // cálculo da diferençaOSAvulsa
    
      mensagem = `Criar OS de repasse ao cliente.<br>
                  
                  Valor de repasse = ${repasse.toFixed(2)}<br>
                  Diferença OS Avulsa = ${diferencaOSAvulsa.toFixed(2)}<br>
                  `;
    }
  } else {
    // Cliente exige recibo
    const repasse = recibo - proposta;
    const diferencaOSAvulsa = reciboCalculado - osB; // diferença real usando reciboCalculado
  
    if (repasse > 0) {
      mensagem = `VALOR DE REPASSE AO CLIENTE = ${repasse.toFixed(2)}<br>
                  Diferença OS Avulsa = ${diferencaOSAvulsa.toFixed(2)}`;
    } else {
      mensagem = "Não é necessário criar OS avulsa, orientar fornecedor a cobrar valor total na OS B.";
    }
  }

  document.getElementById("resultado").innerHTML = mensagem;
});

// Botão limpar
document.getElementById("limpar").addEventListener("click", function() {
  document.getElementById("osForm").reset();
  document.getElementById("resultado").innerHTML = "";

  // Resetar o select para o padrão
  document.getElementById("reciboSelect").value = "nao";
});
