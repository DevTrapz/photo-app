import cv2
import requests
import numpy as np
import psycopg2
import os

def dbConnectionSetup():
    dbIP = os.environ.get('DB_IP')
    dbPort = os.environ.get('DB_PORT')
    dbUser = os.environ.get('POSTGRES_USER')
    dbPassword = os.environ.get('POSTGRES_PASSWORD')
    dbConnect = psycopg2.connect(f'postgres://{dbUser}:{dbPassword}@{dbIP}:{dbPort}')
    return dbConnect

def fetchPhotos():
    api_url = "http://192.168.56.1:3000/images"
    response = requests.get(api_url)
    photos = response.json()
    return photos

def extractValue(row):
    return row[0].split("'")[0]

def filterProcessedPhotos(dbConnect, photos):
    db = dbConnect.cursor()

    db.execute(f"SELECT picture FROM pictures WHERE picture = ANY(ARRAY{photos}) ")
    rows = db.fetchall()
    processedPhotos = list(map(extractValue, rows))
    unprocessedPhotos = [photo for photo in photos if photo not in processedPhotos]
    db.close()
    return unprocessedPhotos

def extractFaces(file_name):
    alg = "haarcascade_frontalface_default.xml"
    haar_cascade = cv2.CascadeClassifier(alg)
    img = cv2.imread(file_name, 0)
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    faces = haar_cascade.detectMultiScale(
        gray_img, scaleFactor=1.01, minNeighbors=15, minSize=(150, 150)
    )

    return faces, img

def storeFaces(faces, img):
    faceCount = 0
    for x, y, w, h in faces:
        cropped_image = img[y : y + h, x : x + w]
        target_file_name = 'stored-faces/' + str(faceCount) + '.jpg'
        cv2.imwrite(
            target_file_name,
            cropped_image,
        )
        faceCount = faceCount + 1;
    return faceCount

def processPhotos(dbConnect, photos):
    db = dbConnect.cursor()
    faceCount = 0
    for photo in photos:
        file_name = "/app/data/Reddit/" + photo
        faces, img = extractFaces(file_name)
        faceCount = faceCount + storeFaces(faces, img)


       
        
        # Generate and store embedding
        img = Image.open(file_name)
        ibed = imgbeddings()
        embeddings = ibed.to_embeddings(img)
        for embedding in embeddings:
            db.execute("INSERT INTO pictures values (%s,%s)", (photo, embedding.tolist()))
            dbConnect.commit()
        print(f'{file_name:<{65}}  {len(faces)} faces detected')
    db.close()
    print(f'\nFace detection Complete!\n{len(photos)} images scanned\n{faceCount} faces detected')

dbConnect = dbConnectionSetup()
photos = fetchPhotos()
unprocessedPhotos = filterProcessedPhotos(dbConnect, photos[:100])
processPhotos(dbConnect, unprocessedPhotos)
