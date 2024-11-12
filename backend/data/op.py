import json

def getDistritos():
    import locale

    # Definir a localização para português
    locale.setlocale(locale.LC_ALL, 'pt_PT.UTF-8')

    # Abrir e carregar o ficheiro JSON
    with open('/Users/pedromiguel/Desktop/App/App/backend/data/Distritos_Concelhos.json', 'r') as file:
        dados = json.load(file)

    # Extrair distritos únicos
    distritos = sorted({item["distrito"] for item in dados}, key=locale.strxfrm)  # Usando set comprehension para distritos únicos
    # Converter para uma lista se quiser uma lista de distritos
    distritos = list(distritos)
    
    return distritos

def getConcelhos(distrito):
    import locale

    locale.setlocale(locale.LC_ALL, 'pt_PT.UTF-8')
    
    with open('/Users/pedromiguel/Desktop/App/App/backend/data/Distritos_Concelhos.json', 'r') as file:
        dados = json.load(file)

    concelhos = sorted({item["concelho"] for item in dados if item["distrito"]==distrito}, key=locale.strxfrm)
    concelhos = list(concelhos)
    
    return concelhos