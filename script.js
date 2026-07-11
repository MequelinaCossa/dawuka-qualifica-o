/* =========================
   FORMULÁRIO DE QUALIFICAÇÃO — Dawuka Construções
   FLUXO EM 2 ETAPAS:
   1) Dados Básicos (nome, telefone, email) -> envia e-mail -> mostra modal -> abre etapa 2
   2) Sobre o Projecto / Visão -> envia e-mail com todos os dados -> mostra modal final
========================= */

emailjs.init("O8HaLxAMrkpVDjt_g");

const step1Form   = document.getElementById('dados-basicos-form');
const step2Form   = document.getElementById('projeto-form');
const step1Modal  = document.getElementById('step1Success');
const finalModal  = document.getElementById('formSuccess');
const submitBtn1  = document.getElementById('submitBtnStep1');
const submitBtn2  = document.getElementById('submitBtn');
const stepDot1    = document.getElementById('stepDot1');
const stepDot2    = document.getElementById('stepDot2');

// Guarda os dados básicos já enviados na etapa 1,
// para serem incluídos no e-mail final da etapa 2.
let dadosBasicos = {
    nome: '',
    telefone: '',
    email: ''
};

/* -----------------------------------------
   ETAPA 1 — DADOS BÁSICOS
----------------------------------------- */
if (step1Form) {
    step1Form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome     = step1Form.querySelector('input[name="nome"]').value.trim();
        const telefone = step1Form.querySelector('input[name="telefone"]').value.trim();
        const email    = step1Form.querySelector('input[name="email"]').value.trim();

        if (!nome)     { alert('Por favor, indique o seu nome completo.'); return; }
        if (!telefone) { alert('Por favor, indique o seu número de telefone.'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Por favor, indique um e-mail válido.'); return; }

        dadosBasicos = { nome, telefone, email };

        submitBtn1.disabled = true;
        submitBtn1.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';

        const templateParams = {
            nome, telefone, email,
            etapa: 'Dados Básicos',
            servico: '—', tipo_projecto: '—', pisos: '—', terreno: '—',
            localizacao: '—', descricao_projecto: '—',
            orcamento_projeto: '—', orcamento_obra: '—', inicio: '—',
            motivacao: '—', indispensavel: '—', preocupacoes: '—', quem_participa: '—'
        };

        emailjs.send("service_u10nrgl", "template_tj4jr0f", templateParams)
            .then(() => {
                submitBtn1.disabled = false;
                submitBtn1.innerHTML = 'CONTINUAR';
                if (step1Modal) step1Modal.style.display = 'flex';

                if (typeof fbq === 'function') {
                    fbq('track', 'Lead');
                }
            })
            .catch((error) => {
                submitBtn1.disabled = false;
                submitBtn1.innerHTML = 'CONTINUAR';
                alert('Erro ao enviar. Tente novamente.');
                console.error(error);
            });
    });
}

// Fecha o modal da etapa 1 e abre automaticamente o formulário principal
function fecharStep1Modal() {
    if (step1Modal) step1Modal.style.display = 'none';
    irParaEtapa2();
}

function irParaEtapa2() {
    if (step1Form) step1Form.style.display = 'none';
    if (step2Form) step2Form.style.display = '';
    if (stepDot1) stepDot1.classList.remove('active');
    if (stepDot2) stepDot2.classList.add('active');

    if (step2Form) {
        step2Form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Botão "Voltar aos dados básicos" — presente em vários pontos do formulário
function voltarDadosBasicos() {
    if (step2Form) step2Form.style.display = 'none';
    if (step1Form) step1Form.style.display = '';
    if (stepDot2) stepDot2.classList.remove('active');
    if (stepDot1) stepDot1.classList.add('active');

    if (step1Form) {
        step1Form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* -----------------------------------------
   ETAPA 2 — SOBRE O PROJECTO / VISÃO
   (nenhum campo é obrigatório)
----------------------------------------- */
if (step2Form) {
    step2Form.addEventListener('submit', function (e) {
        e.preventDefault();

        submitBtn2.disabled = true;
        submitBtn2.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';

        const val = (selector) => {
            const el = step2Form.querySelector(selector);
            return (el && el.value.trim()) ? el.value.trim() : '—';
        };

        const radioVal = (name) => {
            const checked = step2Form.querySelector(`input[name="${name}"]:checked`);
            return checked ? checked.value : '—';
        };

        const templateParams = {
            nome:               dadosBasicos.nome,
            telefone:           dadosBasicos.telefone,
            email:              dadosBasicos.email,
            etapa:              'Projecto Completo',
            servico:            radioVal('servico'),
            tipo_projecto:      radioVal('tipo_projecto'),
            pisos:              radioVal('pisos'),
            terreno:            radioVal('terreno'),
            localizacao:        val('input[name="localizacao"]'),
            descricao_projecto: val('input[name="descricao_projecto"]'),
            orcamento_projeto:  radioVal('orcamento_projeto'),
            orcamento_obra:     radioVal('orcamento_obra'),
            inicio:             radioVal('inicio'),
            motivacao:          val('textarea[name="motivacao"]'),
            indispensavel:      val('textarea[name="indispensavel"]'),
            preocupacoes:       val('textarea[name="preocupacoes"]'),
            quem_participa:     val('textarea[name="quem_participa"]')
        };

        emailjs.send("service_u10nrgl", "template_tj4jr0f", templateParams)
            .then(() => {
                step2Form.reset();
                submitBtn2.disabled = false;
                submitBtn2.innerHTML = 'QUERO SER ANALISADO PELA EQUIPA';
                if (finalModal) finalModal.style.display = 'flex';

                if (typeof fbq === 'function') {
                    fbq('track', 'Lead');
                }
            })
            .catch((error) => {
                submitBtn2.disabled = false;
                submitBtn2.innerHTML = 'QUERO SER ANALISADO PELA EQUIPA <i class="fas fa-paper-plane"></i>';
                alert('Erro ao enviar. Tente novamente.');
                console.error(error);
            });
    });
}

/* -----------------------------------------
   LINKS/BOTÕES DO SITE QUE LEVAM AO CONTACTO
   Sempre reabrem a etapa "Dados Básicos"
----------------------------------------- */
document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', function () {
        // Pequeno atraso para permitir o scroll suave até a secção
        setTimeout(voltarDadosBasicos, 300);
    });
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}