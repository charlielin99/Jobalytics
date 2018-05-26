from indicoio import *

config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

'''

skills_matcher is the parent function, which takes 2 arguments job_desc (str) and resume (str)
The flow is:

1. resume + job desc -> skills_matcher()
2. call to analyzer() and job_matcher() , creating two arrays
3. algorithm creates a dictionary linking keywords (str) to relative scores (float)
4. call to direct_matcher() to correct direct matches in resume 
5. updates dictionary (skills_dictionary) to account for direct matches (review direct_matcher())
6. prints completed skills dictionary (dict)

'''

job_desc = ""
resume = ""
def analyzer(job_desc):
	shordy = keywords(job_desc, threshold = 0.15)
	return [ a for a in shordy.keys() ]


def summarizer(resume):
	return summarization(resume) 

def job_matcher(job_desc, resume):
	return relevance(list(summarizer(resume)), analyzer(job_desc))

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
	i=0
	while i < len(list_of_keywords):
		skills_dictionary[(list_of_keywords[i])] = 100 * round(((probabilities[i]) ** 2), 1)
		i += 1
	direct_dictionary_call = direct_matcher(resume)
	for r in direct_dictionary_call.keys():
		skills_dictionary[r] = round(float(direct_dictionary_call[r]), 1)
	print(skills_dictionary)

if __name__ == '__main__':
	skills_matcher(job_desc, resume)



