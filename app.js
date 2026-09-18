const form = document.querySelector('#validationForm');
const input = document.querySelector('#codigo');
const result = document.querySelector('#result');
const copyButton = document.querySelector('#copyDemo');
const DEMO_CODE = '616052cf-d84b-4e75-8158-e1837928f9db';

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    input.value = DEMO_CODE;
    input.focus();

    try {
      await navigator.clipboard.writeText(DEMO_CODE);
      copyButton.querySelector('b').textContent = 'Copiado!';
    } catch {
      copyButton.querySelector('b').textContent = 'Preenchido';
    }

    setTimeout(() => {
      copyButton.querySelector('b').textContent = 'Copiar';
    }, 1600);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const code = input.value.trim().toLowerCase();
  const isValid = code === DEMO_CODE.toLowerCase();
  input.setAttribute('aria-invalid', String(!isValid));

  if (!code) {
    result.innerHTML = '<p class="status-message error" role="alert">Digite o código demonstrativo para continuar.</p>';
    input.focus();
    return;
  }

  if (!isValid) {
    result.innerHTML = '<p class="status-message error" role="alert">Código não encontrado neste protótipo.</p>';
    return;
  }

  result.innerHTML = `<article class="document-card"><header class="result-banner"><span aria-hidden="true">✓</span><div><strong>Exemplo localizado</strong><small>Resultado gerado localmente para demonstração</small></div><b class="demo-stamp">SEM VALIDADE OFICIAL</b></header><div class="document-grid"><div class="data-item"><strong>CERTIDÃO DEMONSTRATIVA</strong><span>TIPO DE DOCUMENTO</span></div><div class="data-item"><strong>30/09/2026 14:30</strong><span>DATA DE EXEMPLO</span></div><div class="data-item"><strong>DEMO-20685/2026</strong><span>Nº FICTÍCIO</span></div><div class="data-item"><strong>NÃO APLICÁVEL</strong><span>VALIDADE</span></div><div class="data-item"><strong>EMISSOR FICTÍCIO</strong><span>EMISSOR DEMONSTRATIVO</span></div></div><p class="fiction-note">Todos os dados acima são fictícios. Este resultado não comprova registro, habilitação, formação ou autenticidade documental.</p></article>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
