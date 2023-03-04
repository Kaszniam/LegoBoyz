import time
import board
import busio
import adafruit_ltr390
import adafruit_sht4x
import requests
import json
import uuid
from datetime import datetime

config_file = open('config.json')

env_data = json.load(config_file)

HOST = env_data['hostname']
PORT = env_data['port']
RFID = env_data['rfid']
URL = 'http://' +HOST +":" + str(PORT)+"/measurements"

config_file.close()


def init():
    i2c = busio.I2C(board.SCL, board.SDA)
    ltr = adafruit_ltr390.LTR390(i2c)
    sht = adafruit_sht4x.SHT4x(i2c)
    return (ltr, sht)


def read_data(ltr, sht):
    while True:
        try:
            ltr_uuid = uuid.uuid4()
            ltr_payload = {
                'rfid': RFID,
                'guid': str(ltr_uuid),
                'datetime': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                'uv': ltr.uvi,
                'light': ltr.lux,
                'temperature': sht.temperature,
                'humidity': sht.relative_humidity
            }
            res=requests.post(URL, json = ltr_payload, verify=False)
            time.sleep(0.5)
        except requests.exceptions.ConnectionError as e:
            pass



(ltr, sht) = init()
read_data(ltr, sht)
