

/* =========================
   FORMULÁRIO DE QUALIFICAÇÃO — Dawuka Construções
========================= */

emailjs.init("O8HaLxAMrkpVDjt_g");

const qualForm = document.getElementById('contact-form');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (qualForm) {
    qualForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validação dos campos obrigatórios
        const nome = qualForm.querySelector('input[name="nome"]').value.trim();
        const telefone = qualForm.querySelector('input[name="telefone"]').value.trim();
        const email = qualForm.querySelector('input[name="email"]').value.trim();
        const servico = qualForm.querySelector('select[name="servico"]').value;
        const tipo_projecto = qualForm.querySelector('select[name="tipo_projecto"]').value;

        if (!nome)          { alert('Por favor, indique o seu nome completo.'); return; }
        if (!telefone)      { alert('Por favor, indique o seu número de telefone.'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Por favor, indique um e-mail válido.'); return; }
        if (!servico)       { alert('Por favor, selecione o serviço que pretende contratar.'); return; }
        if (!tipo_projecto) { alert('Por favor, selecione o tipo de projecto.'); return; }

        // Estado de carregamento
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';

      const templateParams = {
    nome:                  qualForm.querySelector('input[name="nome"]').value,
    telefone:              qualForm.querySelector('input[name="telefone"]').value,
    email:                 qualForm.querySelector('input[name="email"]').value,
    servico:               qualForm.querySelector('select[name="servico"]').value,
    tipo_projecto:         qualForm.querySelector('select[name="tipo_projecto"]').value,
    pisos:                 qualForm.querySelector('select[name="pisos"]').value || '—',
    terreno:               qualForm.querySelector('select[name="terreno"]').value || '—',
    localizacao:           qualForm.querySelector('input[name="localizacao"]').value || '—',
    compartimentacao:      qualForm.querySelector('input[name="compartimentacao"]').value || '—',
    orcamento_projeto:     qualForm.querySelector('select[name="orcamento_projeto"]').value || '—',
    orcamento_obra:        qualForm.querySelector('select[name="orcamento_obra"]').value || '—',
    investimento_projeto:  qualForm.querySelector('select[name="investimento_projeto"]').value || '—',
    investimento_obra:     qualForm.querySelector('select[name="investimento_obra"]').value || '—',
    urgencia:              qualForm.querySelector('select[name="urgencia"]').value || '—',
    inicio:                qualForm.querySelector('select[name="inicio"]').value || '—',
    motivacao:             qualForm.querySelector('textarea[name="motivacao"]').value || '—',
    visao_final:           qualForm.querySelector('textarea[name="visao_final"]').value || '—',
    indispensavel:         qualForm.querySelector('textarea[name="indispensavel"]').value || '—',
    porque_empresa:        qualForm.querySelector('textarea[name="porque_empresa"]').value || '—',
    preocupacoes:          qualForm.querySelector('textarea[name="preocupacoes"]').value || '—',
    evitar:                qualForm.querySelector('textarea[name="evitar"]').value || '—',
    impacto:               qualForm.querySelector('textarea[name="impacto"]').value || '—',
    info_extra:            qualForm.querySelector('textarea[name="info_extra"]').value || '—',
};

        emailjs.send("service_u10nrgl", "template_tj4jr0f", templateParams)
            .then(() => {
    qualForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'QUERO SER ANALISADO PELA EQUIPA';
    const modal = document.getElementById('formSuccess');
    modal.style.display = 'flex';
})
            .catch((error) => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'QUERO SER ANALISADO PELA EQUIPA <i class="fas fa-paper-plane"></i>';
                alert('Erro ao enviar. Tente novamente.');
                console.error(error);
            });
    });
}