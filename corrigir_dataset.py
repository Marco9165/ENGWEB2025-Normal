import json
import unicodedata

def normalize_key(key):
    # Remove acentos e converte para lowercase com underscores
    nk = unicodedata.normalize('NFKD', key).encode('ASCII', 'ignore').decode('utf-8')
    return nk.replace(" ", "_").replace("-", "_").lower()

def normalize_song(song):
    # Campos que queremos garantir em cada música
    keys = ["id", "link", "titulo", "pais", "compositor", "interprete", "letra"]
    normalized = {}

    for key in song:
        new_key = normalize_key(key)
        normalized[new_key] = song[key]

    # Adiciona campos em falta com valor None
    for k in keys:
        if k not in normalized:
            normalized[k] = None

    return normalized

def normalize_dataset(dataset):
    edicoes = []
    for ed_key, ed_val in dataset.items():
        nova_edicao = {
            "id": ed_val.get("id", ed_key),
            "ano_edicao": ed_val.get("anoEdição", None),
            "organizacao": ed_val.get("organizacao", None),
            "vencedor": ed_val.get("vencedor", None),
            "musicas": [normalize_song(m) for m in ed_val.get("musicas", [])]
        }
        edicoes.append(nova_edicao)
    return edicoes

# Carregamento e normalização
with open("dataset.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

normalized_data = normalize_dataset(raw_data)

# Grava num novo ficheiro
with open("eurovision_normalizado.json", "w", encoding="utf-8") as f:
    json.dump(normalized_data, f, indent=2, ensure_ascii=False)

print(" Dataset normalizado com sucesso em 'eurovision_normalizado.json'")
