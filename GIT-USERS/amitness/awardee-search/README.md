# awardee-search

![Screenshot](screenshots/searchpage.png?raw=true)

### Backstory
The project was developed on Open Data Day Hackathon 2017 to solve the challenge **Enabling Awardee Search** under the theme **Public Procurement**.

> **Challenge:**
> **Enabling Awardee Search**

> Type of challenge: Visualization  

> Description of challenge  
> Awardee in every procurement includes those who wins/gets the contract. They are the suppliers that may lie in the form of companies, joint ventures (J.V.). They have a legal status i.e. registered according to law and pay taxes to the government.

> The objective of the challenge is to build a powerful tool that can keep track on the contract winning companies of J.V. in particular. The following issues would be important to look into at:
> - General Info
> - Frequency of bidding and winning the bids along with nature of work, date etc
> - Legal status of such a company. For e.g. look further into who owns the company (beneficial ownership) in real
> - Search if the awardee company has been a party in any cases in the court of law or blacklisted in the past.  

> Look for
> - Name of the winning bidder (the company or the joint venture (JV)); frequency of the winning can be seen if available
> - Other Company Related Data could be assessed with the list of blacklisted companies by PPMO or Nepal Kanoon Patrika, Supreme Court of Nepaland some data related to the companies

### Built With

* [Python](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [Highcharts](http://www.highcharts.com/)

### Features  
![Screenshot](screenshots/company-details.png?raw=true)

- Verified tickmark for companies that are registered with [Office of the Company Registrar](http://www.ocr.gov.np/index.php/en/).
- Complete details
- Rating
- Winning vs Applied bids
- Bidding streak

### Local Development
* Clone this repository to your local machine.
* In the directory where you placed the cloned repo, create a virtual environment for Python and project dependencies in a directory called "venv":
```shell
pip install virtualenv 
virtualenv venv
```
* Activate your virtual environment
```shell
source venv/bin/activate
```
* Install Flask and all required packages:
```shell
pip install -r requirements.txt
```

* Fire up your local webserver:
```shell
python app.py
```
* In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! Please not that the terminal window you are running the development site in must stay open while you are using the site.
* When daily development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```

### Authors
- [Amit Chaudhary](https://github.com/amitness)
- [Satkar Dhakal](https://github.com/Satcar77)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
