import json
from collections import defaultdict

# Abrir e carregar o ficheiro JSON
with open('/Users/pedromiguel/Desktop/App/App/backend/data/DistritosConcelhos/Distritos_Concelhos2.json', 'r') as file:
    dados = json.load(file)

# Criar um dicionário onde cada valor é um set (conjunto) para garantir que os concelhos sejam únicos
mapa_distrito = defaultdict(set)

# Preencher o dicionário
for item in dados:
    distrito = item.get("Distrito_DT")
    designacao = item.get("Designacao_CC")
    if distrito and designacao:  # Verifica se as chaves existem
        mapa_distrito[distrito].add(designacao)

# Criar a estrutura final desejada
resultado = []
for distrito, concelhos in mapa_distrito.items():
    for concelho in concelhos:
        resultado.append({
            "distrito": distrito,
            "concelho": concelho,
            "ativo": 0  # Adiciona a chave "ativo" com valor 0
        })

# Salvar o resultado no ficheiro JSON
with open('/Users/pedromiguel/Desktop/App/App/backend/data/DistritosConcelhos/Distritos_Concelhos1.json', 'w') as file:
    json.dump(resultado, file, indent=4,ensure_ascii=False)

# Exibir o conteúdo do ficheiro gerado
print(json.dumps(resultado, indent=4))