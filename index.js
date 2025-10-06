const survey = new Survey.Model(json);
survey.applyTheme(themeJson);

survey.onComplete.add((sender, options) => {
    console.log("Dados do formulário:", sender.data); // Opcional: mantém o log para debug

    const powerAutomateUrl = "https://7d907c52becee61eb1b77b0be0ea01.e6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7c793a3cafe647aa8279b76388538262/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uSj4xtnXF6rFZfUJqhaappAOcc1Z2QcBIeiSjxFAioQ";

    fetch(powerAutomateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(sender.data)
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta do servidor não for bem-sucedida, lança um erro
            throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados salvos com sucesso no backend:', data);
        // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de "Obrigado!"
        // Ex: document.getElementById('surveyElement').innerHTML = "<h1>Obrigado por responder!</h1>";
    })
    .catch(error => {
        console.error('Houve um problema ao enviar os dados do questionário:', error);
        // Mostra uma mensagem de erro para o usuário
        // Ex: document.getElementById('surveyElement').innerHTML = "<h1>Ocorreu um erro. Tente novamente.</h1>";
    });
});

// Esta linha continua a mesma
$("#surveyElement").Survey({ model: survey });