from indicoio import *

config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

job_desc = "You must have experience with two of the following: HMTL, JavaScript and CSS, and typical UI libraries such as Angular IO, Bootstrap, etc. Java and typical Java libraries such as Spring Boot, JPA/Hibernate, JHipster, etc. Analyzing and querying relational databases Experience with the following is beneficial: Linux Common development tools, such as Maven, Git, Jenkins, etc. Any RAD or Agile development methodology"
resume = "Muyun(Vicky) Lyum3lyu@edu.uwaterloo.ca 226-201-4422 2A Computer Engineering | University of Waterloo ID#20664422 Summary of Qualifications Experienced with C++, JAVA, strengthened by projects and related courses Experienced with Android application development and object-oriented programming in work place and related courses Familiar with Python, MySQL and PHP by self-stud"
shit_words = ['experience','Experienced','Proficient','engineering','efficient','Qualifications','Engineering','courses','work','Summary','University','university','University of Waterloo']

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



