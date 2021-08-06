# NearU

![Screenshot](Screenshot.png?raw=true)

NearU is a virtual assistant for tourists. They can interact with the bot to ask information about local cultural events and cuisines. The bot provides complete details about nearby events and visualizes them on a map.

### Backstory
The project was developed as part of a week long hackathon [**Hack-A-Week**](https://www.facebook.com/events/763201820493700/771323996348149) organized as pre-event of LOCUS 2017. It was selected for the category **Art and Culture**.

### Built With

* [Python](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [Leaflet](http://leafletjs.com/)
* [Wit.ai](http://wit.ai)

### Local Development
To install these project on your local machine:
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
* Install all required packages:
```shell
pip install -r requirements.txt
```

* Set the environment variables
```shell
export WIT_ACCESS_TOKEN='Your access token for wit.ai'
export DB_USERNAME='MySQL username'
export DB_PASSWORD='MySQL password'
```

* Fire up your local webserver:
```shell
python app.py
```
* In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! Please not that the terminal window you are running the development site in must stay open while you are using the site.

* When development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```

### Authors:
- [Amit Chaudhary](https://github.com/amitness)
- [Enosh Shrestha](https://github.com/eroj333)
- [Kamal Paneru](https://github.com/Kamalpaneru)

## License

This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details
