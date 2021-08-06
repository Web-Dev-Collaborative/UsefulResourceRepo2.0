import requests
from bs4 import BeautifulSoup

payload = {
    'keyword': '20403105',
    'slug': 'SearchResult'
}

response = requests.post('http://www.neb.gov.np/result/search', data=payload)

soup = BeautifulSoup(response, 'lxml')

# Gives output like: Congratulation!! FirstName LastName ,
h1_text = soup.find('h1', {'class': 'text-success text-center'}).text

# Extract only name from that text
print (h1_text.lstrip('Congratulation!! ').rstrip(', '))
