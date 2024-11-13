import json

def getTipoUsers():
    # Abrir e carregar o ficheiro JSON
    with open('/Users/pedromiguel/Desktop/App/App/backend/data/Utilizadores/TiposUser.json', 'r') as file:
        dados = json.load(file)

    # Extrair distritos únicos
    tipos = sorted({item["tipo"] for item in dados})  # Usando set comprehension para distritos únicos
    # Converter para uma lista se quiser uma lista de distritos
    tipos = list(tipos)
    
    return  [(tipo, tipo) for tipo in tipos]