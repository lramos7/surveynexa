// index.js

// --- Início da Configuração da MSAL ---

const msalConfig = {
    auth: {
        clientId: "ef313835-ecb8-416b-9676-3e338048c7f2",
        authority: "https://login.microsoftonline.com/f1bf4227-8124-4223-b331-9a7bbd1fb855",
        redirectUri: "https://forms.cortix.info"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
//msalInstance.initialize();

// URL do seu fluxo do Power Automate
const powerAutomateUrl = "https://7d907c52becee61eb1b77b0be0ea01.e6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7c793a3cafe647aa8279b76388538262/triggers/manual/paths/invoke?api-version=1";

// CORREÇÃO AQUI: O escopo deve ser apenas a "origem" da URL do serviço, seguida de "/.default".
// Este código extrai a origem automaticamente da URL acima.
const powerAutomateScope = {
    scopes: [`${new URL(powerAutomateUrl).origin}/.default`]
};


async function login() {
    try {
        await msalInstance.loginPopup(powerAutomateScope);
    } catch (error) {
        console.error("Erro durante o login popup:", error);
    }
}

async function getToken() {
    let account = msalInstance.getAllAccounts()[0];
    if (!account) {
        // Se não houver conta, a lógica de login inicial deve ser acionada.
        // Retornar nulo é mais seguro do que forçar um novo login aqui.
        return null;
    }

    const tokenRequest = {
        scopes: powerAutomateScope.scopes,
        account: account
    };

    try {
        const response = await msalInstance.acquireTokenSilent(tokenRequest);
        return response.accessToken;
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            console.log("Token silencioso falhou, tentando com popup...");
            try {
                const response = await msalInstance.acquireTokenPopup(tokenRequest);
                return response.accessToken;
            } catch (popupError) {
                console.error("Erro ao adquirir token com popup:", popupError);
                return null;
            }
        }
        console.error("Erro não interativo ao adquirir token:", error);
        return null;
    }
}

// --- Fim da Configuração da MSAL ---


const survey = new Survey.Model(json);
survey.applyTheme(themeJson);


survey.onComplete.add(async (sender, options) => {
    console.log("Dados do formulário:", sender.data);

    try {
        const accessToken = await getToken(); // Obtém token de acesso

        if (!accessToken) {
            // Se não conseguir o token, informa o usuário e interrompe o envio.
            throw new Error("Não foi possível obter o token de acesso. Por favor, faça o login novamente.");
        }

        // Envia a requisição com o token no cabeçalho de Autorização
        const response = await fetch(powerAutomateUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Cabeçalho de autenticação
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(sender.data)
        });

        if (!response.ok) {
            // Captura mais detalhes do erro da resposta
            const errorBody = await response.text();
            throw new Error(`Erro na rede: ${response.status} ${response.statusText}. Detalhes: ${errorBody}`);
        }

        // Se a resposta for OK mas não tiver um corpo JSON, trate aqui
        if (response.headers.get("content-length") === "0" || response.status === 204) {
             console.log('Dados salvos com sucesso no backend (sem conteúdo de resposta).');
        } else {
            const responseData = await response.json();
            console.log('Dados salvos com sucesso no backend:', responseData);
        }
        
    } catch (error) {
        console.error('Houve um problema ao enviar os dados do questionário:', error);
        // Mostra uma mensagem de erro mais clara para o usuário
        alert(`Ocorreu um erro ao enviar: ${error.message}`);
    }
});


$("#surveyElement").Survey({ model: survey });


// Garante que o usuário esteja logado antes de mostrar o formulário
(async () => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
       console.log("Nenhum usuário logado. Solicitando login.");
       await login();
    } else {
       console.log("Usuário já está logado:", accounts[0].username);
    }
})();

