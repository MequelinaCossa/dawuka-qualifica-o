const form = document.getElementById('leadForm');

form.addEventListener('submit', function(e){

    e.preventDefault();

    alert('Solicitação enviada com sucesso!');

    form.reset();

});