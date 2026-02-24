import requests
import os

# Configurações
PROJECT_ID = "prj_Ng4vTArnI3mZHd6hx9hC1geVxUSr"
TEAM_ID = "team_uLN1tg1sg1HmN9dV6n6PkfwI"
ENV_KEY = "VITE_GEMINI_API_KEY"
ENV_VALUE = "AIzaSyDoSZcJ13TRky0B_j9CVu4TLWL4mkntgpM"

# O token do Vercel deve estar disponível no ambiente se o MCP estiver configurado
# Como não temos acesso direto ao token, vamos tentar usar o comando 'vercel' se estiver instalado
# Ou informar ao usuário que a configuração manual pode ser necessária se a API falhar.

def set_env_via_api():
    # Nota: Este script assume que você tem um token de acesso. 
    # Em um ambiente Manus, o MCP gerencia isso, mas para chamadas diretas de API precisamos do token.
    # Vou tentar verificar se existe algum token disponível.
    token = os.environ.get("VERCEL_TOKEN")
    if not token:
        print("Erro: VERCEL_TOKEN não encontrado no ambiente.")
        return False

    url = f"https://api.vercel.com/v10/projects/{PROJECT_ID}/env?teamId={TEAM_ID}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    data = {
        "key": ENV_KEY,
        "value": ENV_VALUE,
        "type": "plain",
        "target": ["production", "preview", "development"]
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code in [200, 201]:
        print(f"Sucesso: Variável {ENV_KEY} adicionada ao Vercel.")
        return True
    else:
        print(f"Falha ao adicionar variável: {response.status_code}")
        print(response.text)
        return False

if __name__ == "__main__":
    # Como não temos o token direto, vamos sugerir o uso do MCP ou informar o usuário.
    print("Tentando configurar variável de ambiente...")
    # set_env_via_api() # Comentado pois provavelmente não temos o token bruto
