const json = {
  "locale": "pt-br",
  "title": "Atendimento",
  "logo": "data:image/png;base64,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",
  "logoHeight": "80px",
  "completedHtml": {
    "pt-br": "<h1>Obrigado pelo seu envio!</h1></br>Sua participação é fundamental para que possamos oferecer soluções cada vez mais alinhadas às suas necessidades.</br>Nossa equipe está analisando as informações fornecidas e, em breve, entraremos em contato para os próximos passos.</br>Nosso compromisso é garantir uma experiência excepcional, pautada pela excelência no atendimento e na qualidade dos serviços prestados.</br>Enquanto isso, convidamos você a conhecer mais sobre nossas iniciativas e novidades atravės do nosso site e redes sociais.</br>"
  },
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question1",
          "title": "Nome completo",
          "isRequired": true,
          "requiredErrorText": {
            "pt-br": "Por favor, preencha esse campo."
          },
          "placeholder": {
            "pt-br": "Digite seu nome completo."
          }
        },
        {
          "type": "text",
          "name": "question2",
          "title": "E-mail corporativo",
          "isRequired": true,
          "requiredErrorText": {
            "pt-br": "Por favor, preencha esse campo."
          },
          "inputType": "email",
          "placeholder": {
            "pt-br": "Digite seu e-mail corporativo."
          }
        },
        {
          "type": "text",
          "name": "question3",
          "title": "Telefone de contato",
          "inputType": "tel",
          "maskType": "pattern",
          "maskSettings": {
            "pattern": "(99) 9999 99999"
          },
          "placeholder": {
            "pt-br": "Digite seu telefone"
          }
        },
        {
          "type": "dropdown",
          "name": "question4",
          "title": "Departamento",
          "isRequired": true,
          "requiredErrorText": {
            "pt-br": "Por favor, selecione uma opção."
          },
          "choices": [
            {
              "value": "Comercial",
              "text": {                
                "pt-br": "Comercial"
              }
            },
            {
              "value": "Delivery Infrastruture Platform (DIP)",
              "text": {                
                "pt-br": "Delivery Infrastruture Platform (DIP)"
              }
            },
            {
              "value": "Field Service",
              "text": {                
                "pt-br": "Field Service"
              }
            },
            {
              "value": "Financeiro",
              "text": {
                "pt-br": "Financeiro"
              }
            },
            {
              "value": "Governança ITSMO",
              "text": {
                "pt-br": "Governança ITSMO"
              }
            },
            {
              "value": "Managed Service Cisco",
              "text": {
                "pt-br": "Managed Service Cisco"
              }
            },
            {
              "value": "PMO",
              "text": {
                "pt-br": "PMO"
              }
            },
            {
              "value": "Qualidade",
              "text": {
                "pt-br": "Qualidade"
              }
            },
            {
              "value": "RH",
              "text": {
                "pt-br": "RH"
              }
            },
            {
              "value": "Service Desk",
              "text": {
                "pt-br": "Service Desk"
              }
            },
            {
              "value": "Smart Center",
              "text": {
                "pt-br": "Smart Center"
              }
            },
            {
              "value": "Suporte Especializado",
              "text": {
                "pt-br": "Suporte Especializado"
              }
            }
          ]
        },
        {
          "type": "comment",
          "name": "question5",
          "title": "Solicitação",
          "isRequired": true,
          "requiredErrorText": {
            "pt-br": "Por favor, preencha esse campo."
          },
          "maxLength": 200,
          "placeholder": {
            "pt-br": "Digite a sua solicitação"
          }
        }
      ]
    }
  ],
  "showPageTitles": false,
  "completeText": {
    "pt-br": "Enviar"
  },
  "headerView": "advanced"
}