from flask import Flask, render_template, request
import phonenumbers
from phonenumbers import geocoder


app = Flask("Name")


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/render')
def render_pages():
    Key = "9c54d0897e3e401997a35bf587af57a3"
    number = f"+91 {request.args.get('num')}"
    check_number = phonenumbers.parse(number)
    number_location = geocoder.description_for_number(check_number, "en")
    print(number_location)

    # retrieves carrier service of the phone number
    from phonenumbers import carrier
    service_provider = phonenumbers.parse(number)
    print(carrier.name_for_number(service_provider, "en"))

    # opencage geocode api to convert location name to coordinates
    from opencage.geocoder import OpenCageGeocode
    geocoder_da = OpenCageGeocode(Key)
    query = str(number_location)
    results = geocoder_da.geocode(query)
    lat = results[0]['geometry']['lat']
    lng = results[0]['geometry']['lng']
    return render_template('mylocation.html', lat=lat, long=lng)


if __name__ == '__main__':
    app.run(debug=True)
