import indicoio, os, json

indicoio.config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

fileDir = os.path.dirname(os.path.realpath('__file__'))
fileResumeTxt = open(os.path.join(fileDir, "data/resume.txt"), 'w')

resume = "data/resumePDF.pdf"
print(json.dumps(indicoio.pdf_extraction(resume)))