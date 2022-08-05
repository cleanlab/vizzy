import json
import glob, os

# data_dir = os.getcwd()
IMAGES_DIR = os.path.join(os.getcwd(), "updated_images", "vizzy_images")
list_imgs = glob.glob(os.path.join(IMAGES_DIR, "/**/*.JPEG"))

from torchvision import datasets, transforms
import torch

tc = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor()              
])

image_datasets = datasets.ImageFolder(IMAGES_DIR, transform=tc)
dloader = torch.utils.data.DataLoader(image_datasets, batch_size=10, shuffle=False)
images = dloader.sampler.data_source.imgs #contains information on the path of the image


model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=True)


# Select the desired layer
layer = model._modules.get('avgpool')


def copy_embeddings(m, i, o):
    """Copy embeddings from the penultimate layer.
    """
    o = o[:, :, 0, 0].detach().numpy().tolist()
    outputs.append(o)

    
outputs = []
# attach hook to the penulimate layer
_ = layer.register_forward_hook(copy_embeddings)
model.eval() # Inference mode


# Generate image's embeddings for all images in dloader and saves 
# them in the list outputs
for X, y in dloader:
    _ = model(X)
    
    
# flatten list of embeddings to remove batches
list_embeddings = [item for sublist in outputs for item in sublist]


# Reduce dimensionality to 32
from sklearn.decomposition import TruncatedSVD

svd = TruncatedSVD(n_components=32, random_state=42)
image_embeddings_reduced = svd.fit_transform(list_embeddings)


out = {}
with open('input_data_before_embeddings.json') as json_file:
    out = json.load(json_file)
    
# Add embeddings to output json
for i in range(len(image_embeddings_reduced)):
    out[os.path.basename(images[i][0])[:-5]]["embedding"] = list(image_embeddings_reduced[i])

# write to output file -> frontend uses this directly
with open('output_data_embeddings_32.json', 'w') as f:
    json.dump(out, f)


