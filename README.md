# Jobalytics: _Using Machine Learning to Perfect Your Resume_

> Your resume has six seconds to grab a recruiter's attention. Make it count.

[UWaterloo ENGHACK18](http://enghack.uwaterloo.ca/) project developed initially in 24 hours, using pre-trained NLP algorithms/APIs to perform transfer learning in Jupyter Notebook to build a tailored resume screening web application. 

This project won the award for "Best Use of Machine Learning" as awarded by [Indico](https://indico.io/), as well as the "Wolfram Challenge" as awarded by [Wolfram Research](http://www.wolfram.com/).

### Key Features
<!--- Add GIF of Feature Screen  -->
1. Job Match
   - Adjusted Word2Vec model to classify based off keywords w/ a sieve to catch blacklisted words
2. What Works & What Doesn't
   - Adjusted unsupervised neural network to cluster based on word morphology
3. Frequent Words
   - Built a tf-idf model to perform k means clustering 
4. Personality Radials Classification
   - Regularized algorithm to correct for variance

### Web Architecture
<img src="https://github.com/charlielin99/Jobalytics/screenshots/Analysis.png?raw=true" height="280px"></img></br>
<sup>_f2: Personality radials identifying a high confidence for logician and architect types; displayed with Wolfram One_</sup>

Server runs on the Express framework in Node.JS with ML algorithms called upon through [python-shell](https://www.npmjs.com/package/python-shell). The 6 pronged analysis is visualized using Wolfram One's cloud computation platform for a friendly user experience. The front end design was inspired by the interactivity of Google's Cardview template. 

### Potential Future Additions
- Sentiment analysis to better align with company culture
- Facial recognition to identify emotion in interviews
- MongoDB to allow for multiple resumes/account
- JSON Web Tokens to form secure resume editing groups
