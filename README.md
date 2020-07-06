# Ebay-search-chalogocartchalo
A webpage that allows users to search items for sale on eBay.com using their API.

**Tools**: Flask, JavaScript, HTML, CSS, HTML DOM, Fetch API, JSON, eBay API

	Backend with Flask framework parses and filters the response from the Ebay “findItemsAdvanced” API.
	It returns the results in JSON format to the frontend written in Vanilla JavaScript.
	JavaScript file traverses through the response and generates HTML.

**Reference video** for this Homework 6 in CSCI 571 class: https://youtu.be/a1uB_MaxRqo

**Steps**:

1. Clone the repository
2. Sign up for a Ebay developer account to obtain the API key. Paste your key in the app.py file, [here](https://github.com/ankitd3/Ebay-search-chalogocartchalo/blob/93588f1efe633e31be3f2a35446054a639990a3e/app.py#L9). Alternatively, you may set it as an environment variable and access it.
3. In the static/index.js file, [here](https://github.com/ankitd3/Ebay-search-chalogocartchalo/blob/93588f1efe633e31be3f2a35446054a639990a3e/static/index.js#L4) instead of the URL "'https://chalogocartchalo-279803.wl.r.appspot.com/" use "https://localhost:5000/" or the URL obtained on deploying it on cloud, say GCP.
4. Test the application locally by running the app.py file to start the Flask server.
5. To deploy it on GCP:
	> You must paste the GCP obtained URL as suggested in step 3.
    1. Create a project
    2. Enable billing
    3. Download [GCloud SDK](https://cloud.google.com/sdk/install) and run "gcloud init" in the cloned repository.
    4. Select project id, region, and complete the initialization.
    5. Run "gcloud app deploy"
