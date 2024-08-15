import cv2
import requests
import numpy as np
import psycopg2
import os

dbIP = os.environ.get('DB_IP')
dbPort = os.environ.get('DB_PORT')
dbUser = os.environ.get('POSTGRES_USER')
dbPassword = os.environ.get('POSTGRES_PASSWORD')

db = psycopg2.connect(f'postgres://{dbUser}:{dbPassword}@{dbIP}:{dbPort}')

api_url = "http://192.168.56.1:3000/images"
response = requests.get(api_url)
response = response.json()

shortList = []
for x in range(10):
    shortList.append(response[x])

faceCount = 0
for photo in shortList:
    alg = "haarcascade_frontalface_default.xml"
    haar_cascade = cv2.CascadeClassifier(alg)
    file_name = "/app/data/Reddit/" + photo
    img = cv2.imread(file_name, 0)
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    faces = haar_cascade.detectMultiScale(
        gray_img, scaleFactor=1.01, minNeighbors=15, minSize=(150, 150)
    )
    
    # Store photos of each face detected
    for x, y, w, h in faces:
        # crop the image to select only the face
        cropped_image = img[y : y + h, x : x + w]
        # loading the target image path into target_file_name variable  - replace <INSERT YOUR TARGET IMAGE NAME HERE> with the path to your target image
        target_file_name = 'stored-faces/' + str(faceCount) + '.jpg'
        cv2.imwrite(
            target_file_name,
            cropped_image,
        )
        faceCount = faceCount + 1;

    print(f'{file_name:<{65}}  {len(faces)} faces detected')
print(f'\nFace detection Complete!\n{len(shortList)} images scanned\n{faceCount} faces detected')