import indicoio, sys
import json

indicoio.config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

path = (sys.stdin).readline().rstrip()

a = json.dumps(indicoio.pdf_extraction(path))

print(a)