import fs from 'fs';
import path from 'path';


import type { NextApiRequest, NextApiResponse } from 'next'

import { products } from '@prisma/client';
import { put } from '@vercel/blob';

import prisma from '@/lib/prisma'

type ResponseData = {
  message: string
}
interface Image {
  image_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    let page = 0;
    const limit = 100;
    let hasMoreData = true;
    const currentDate = new Date();

    while (hasMoreData) {
      const response = await fetch(`https://us-central1-mi-catalogo-1f031.cloudfunctions.net/api/variedades_tv_cali/product?storage_id=GEN&custom_order=news&limit=${limit}&page=${page}`)
      const data = await response.json();

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      for (const product of data) {
        // get or create categories
        const categoryName = product.categorias ? product.categorias.split('/')[0].trim() : 'Sin categoría';
        let category = await prisma.categories.findFirst({
          where: {
            name: categoryName,
          }
        });
        if (!category) {
          category = await prisma.categories.create({
            data: {
              name: categoryName,
              slug: slugify(categoryName)
            }
          });
        };
        const custom = JSON.parse(product.custom);
        const description = custom?.description ?? "--";

        const productDB = await prisma.products.upsert({
          where: {
            idReference: product.idref,
          },
          update: {
            updatedDate: currentDate,
          },
          create: {
            name: product.descint,
            price: product.pcia,
            profit: 1.5,
            description,
            slug: slugify(product.descint),
            idReference: product.idref,
            category: {
              connect: {
                id: category.id,
              }
            },
          },
        });

        if (productDB) {
          // get or create images
          const images = await prisma.images.findMany({
            where: {
              productId: productDB.id,
            }
          });

          if (images.length === 0) {
            const imagesArray = custom?.images ?? [{image_url: product.url_imagen}];
            // download images to public/products folder
            await downloadAndSaveImages(imagesArray, path.join(process.cwd(), 'public', 'products'), productDB);
          }
        }
      }
      page++;
    }

    // set outOfStock to products not updated
    await prisma.products.updateMany({
      where: {
        updatedDate: {
          lt: currentDate,
        }
      },
      data: {
        outOfStock: true,
      }
    });


    res.status(200).json({ message: 'Products has been updated' })
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` })
  }
}

const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function downloadAndSaveImages(images: Image[], saveDirectory: string, product: products): Promise<void> {
  try {
    // Create save directory if it doesn't exist
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    // Iterate through images and download/save each one
    for (const image of images) {
      const imageUrl = image.image_url;
      const imageName = path.basename(imageUrl).split("?").shift();
      const imagePath = path.join(saveDirectory, imageName as string);

      // Download image using fetch
      const response = await fetch(imageUrl);

      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Get the image data as ArrayBuffer
        // const buffer = await response.arrayBuffer();

        // Save image to local file
        // fs.writeFileSync(imagePath, Buffer.from(buffer));

        // save to vercel blob
        const blob = await put(imageName as string, fs.readFileSync(imagePath), { access: 'public'});

        await prisma.images.create({
          data: {
            url: blob.url,
            productId: product.id,
          }
        });
      } else {
        console.error(`Failed to download image: ${imageName} (Status: ${response.status})`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}