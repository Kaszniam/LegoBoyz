import time
import board
import busio
import adafruit_ltr390
import adafruit_sht4x
import socket
import json
import uuid
from datetime import datetime

config_file = open('data.json')

env_data = json.load(config_file)

HOST = env_data['hostname']
PORT = env_data['port']
RFID = env_data['rfid']

config_file.close()


def init():
    i2c = busio.I2C(board.SCL, board.SDA)
    ltr = adafruit_ltr390.LTR390(i2c)
    sht = adafruit_sht4x.SHT4x(i2c)
    return (ltr, sht)


def read_data(ltr, sht):
    ltr_uuid = uuid.uuid4()
    sht_uuid = uuid.uuid4()
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        while True:
            ltr_payload = {
                'rfid': RFID,
                'guid': str(ltr_uuid),
                'datetime': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                'uv': ltr.uvi,
                'light': ltr.lux
            }
            ready_ltr_payload = json.dumps(ltr_payload)
            sock.sendall(ready_ltr_payload.encode())

            sht_payload = {
                'rfid': RFID,
                'guid': str(sht_uuid),
                'datetime': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                'temperature': sht.temperature,
                'humidity': sht.relative_humidity
            }
            ready_sht_payload = json.dumps(sht_payload)
            sock.sendall(ready_sht_payload.encode())
            time.sleep(0.5)


(ltr, sht) = init()
read_data(ltr, sht)
