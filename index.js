const survey = new Survey.Model(json);
survey.applyTheme(themeJson);

// ESTA É A PARTE QUE PRECISAMOS MUDAR
survey.onComplete.add((sender, options) => {
    console.log("Dados do formulário:", sender.data); // Opcional: mantém o log para debug

    // Envia os resultados para a sua nova API de backend
    fetch('https://api.cortix.info/post', {
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