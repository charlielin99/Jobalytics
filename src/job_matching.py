import indicoio, os, codecs

indicoio.config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

'''
skills_matcher is the parent function, which takes 2 arguments job_desc (str) and resume (str)
The flow is:

1. resume + job desc -> skills_matcher()
2. call to analyzer() and job_matcher(), creating two arrays
3. algorithm creates a dictionary linking keywords (str) to relative scores (float)
4. call to direct_matcher() to correct direct matches in resume 
5. updates dictionary (skills_dictionary) to account for direct matches (review direct_matcher())
6. generates a skills dictionary with keys being the skills relevant to job and values being your relevance to them
7. returns a list of dictionaries where the 1st element is good points for the resume and 2nd element is room for improvement
'''

fileDir = os.path.dirname(os.path.realpath('__file__'))
resume = codecs.open(os.path.join(fileDir, "data/resume.txt"), encoding='utf8').read()
job_desc = open(os.path.join(fileDir, "data/jobDescr.txt"), encoding='utf8').read()

def analyzer(job_desc):
	shordy = indicoio.keywords(job_desc, threshold = 0.15)
	return [ a for a in shordy.keys() ]

def summarizer(resume):
	return indicoio.summarization(resume) 

def job_matcher(job_desc, resume):
	return indicoio.relevance(list(summarizer(resume)), analyzer(job_desc))

def direct_matcher(resume):
	direct_dictionary = {}
	test_words = analyzer(job_desc)
	resume = resume.lower()
	for m in test_words:
		if m.lower() in resume:
			direct_dictionary[m] = '100'
	return direct_dictionary

def skills_matcher(job_desc, resume):
	list_of_keywords = analyzer(job_desc)
	probabilities = job_matcher(job_desc, resume)
	probabilities = probabilities[0]
	skills_dictionary = {}
	
	i = 0
	while i < len(list_of_keywords):
		skills_dictionary[(list_of_keywords[i])] = round (100 * ((probabilities[i]) ** 2), 1)
		i += 1

	direct_dictionary_call = direct_matcher(resume)
	for r in direct_dictionary_call.keys():
		skills_dictionary[r] = round (float(direct_dictionary_call[r]), 1)

	good_dict = {i:skills_dictionary[i] for i in skills_dictionary.keys() if skills_dictionary[i] >= 50}
	bad_dict = {i:skills_dictionary[i] for i in skills_dictionary.keys() if skills_dictionary[i] < 50}
	
	pros_file = open(os.path.join(fileDir, "data/pros.txt"),"w")
	cons_file = open(os.path.join(fileDir, "data/cons.txt"),"w")
	for i in good_dict.keys():
		text = "You are good at: " + str(i) + "! You scored a " + str(good_dict[i]) + "% match!"
		print(text)
		pros_file.write(text)
	for j in bad_dict.keys():
		text = "You you need to improve at: " + str(j) + ". You scored a " + str(bad_dict[j]) + "% match."
		print(text)
		cons_file.write(text)
	pros_file.close()
	cons_file.close()

if __name__ == '__main__':	
	skills_matcher(job_desc, resume)