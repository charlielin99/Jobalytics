import indicoio

indicoio.config.api_key = '27df1eee04c5b65fb3113e9458d1d701'

'''Takes an inputted resume (string) and outputs an array with ordered 
probabilities of the 16 Myers-Briggs personality traits
'''



def briggs_test(resume):
	myers_array = []
	briggs_dict = indicoio.personas(resume)
	for prob in briggs_dict.values():
		myers_array.append(prob)
	return myers_array

if __name__ == '__main__':
	briggs_test()
