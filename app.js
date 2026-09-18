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
    result.innerHTML = '<p class="status-message error" role="alert">Digite o código para continuar.</p>';
    input.focus();
    return;
  }

  if (!isValid) {
    result.innerHTML = '<p class="status-message error" role="alert">Código não encontrado.</p>';
    return;
  }

  result.innerHTML = `<article class="document-card"><div class="document-grid"><div class="data-item"><strong>CERTIDÃO DE REGULARIDADE - PESSOA FÍSICA</strong><span>TIPO DE DOCUMENTO</span></div><div class="data-item"><strong>30/09/2026 14:30</strong><span>DATA DO DOCUMENTO</span></div><div class="data-item"><strong>20685/2026</strong><span>Nº DOCUMENTO</span></div><div class="data-item"><strong>31/12/2026</strong><span>DATA VALIDADE</span></div><div class="data-item"><strong>CONSELHO REGIONAL DE BIOMEDICINA - 7ª REGIÃO</strong><span>CONSELHO EMISSOR</span></div></div><p class="fiction-note"></p></article>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
