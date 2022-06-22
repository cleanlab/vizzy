#Modifies the embeddings.json file to include parent folder of each image in the imagenet dataset

import os, json, glob
with open("embeddings.json", "r") as jsonFile:
     data = json.load(jsonFile)

rootdir = os.getcwd()
for it in os.scandir(rootdir):
    images = glob.glob(os.path.join(it, "*.JPEG"))
    for i in images:
        if i[-28:-5] in data:
            data[i[-28:-5]]["src"] = i[-38:]
    
with open("embeddings.json", "w") as jsonFile:
    json.dump(data, jsonFile)
