#phonenumbers library helps to determine country of origin based on country code
import phonenumbers
from phonenumbers import geocoder
#from test import number
#generates map centred on retrieved coordinates and places marker on that location
import folium

Key = "9c54d0897e3e401997a35bf587af57a3"
number = input("Enter phone number with country code: ")
check_number = phonenumbers.parse(number)
number_location = geocoder.description_for_number(check_number, "en")
print(number_location)

#retrieves carrier service of the phone number
from phonenumbers import carrier
service_provider = phonenumbers.parse(number)
print(carrier.name_for_number(service_provider, "en"))

#opencage geocode api to convert location name to coordinates
from opencage.geocoder import OpenCageGeocode
geocoder = OpenCageGeocode(Key)
query = str(number_location)
results = geocoder.geocode(query)
lat = results[0]['geometry']['lat']
lng = results[0]['geometry']['lng']
print(lat,lng)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('mylocation.html')

if __name__ == '__main__':
    app.run(debug=True)

map_location = folium.Map(location = [lat,lng], zoom_start=9)
folium.Marker([lat,lng], popup=number_location).add_to(map_location)
map_location.save("mylocation.html")
