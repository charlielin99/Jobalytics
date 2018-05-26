from indicoio import *
import wolframalpha
import json
import urllib
import ssl

appid = '2AH23L-WHVXG98WWL'
client = wolframalpha.Client(appid)


config.api_key = '27df1eee04c5b65fb3113e9458d1d701'



'''Takes an inputted resume (string) and outputs an array with ordered 
probabilities of the 16 Myers-Briggs personality traits
'''

resume = "Muyun(Vicky) Lyum3lyu@edu.uwaterloo.ca 226-201-4422 2A Computer Engineering | University of Waterloo ID#20664422 Summary of Qualifications Experienced with C++, JAVA, strengthened by projects and related courses Experienced with Android application development and object-oriented programming in work place and related courses Familiar with Python, MySQL and PHP by self-stud"

def briggs_test(resume):
	myers_array = []
	briggs_dict = personas(resume)
	briggs_dict = {i:briggs_dict[i] for i in briggs_dict if briggs_dict[i] > 0.075}
	briggs_keys = list(briggs_dict.keys())
	briggs_values = list(briggs_dict.values())
	for i in range(len(briggs_values)):
		briggs_values[i] = round(float(briggs_values[i]),3)
	briggs_keys = json.dumps(briggs_keys)
	briggs_keys = str(briggs_keys).replace("[","{")
	briggs_keys = str(briggs_keys).replace("]","}")
	briggs_values = str(briggs_values).replace("[","{{")
	briggs_values = str(briggs_values).replace("]","}}")
	print([briggs_values,briggs_keys])
	return [briggs_values,briggs_keys]










if __name__ == '__main__':
	briggs_test(resume)


