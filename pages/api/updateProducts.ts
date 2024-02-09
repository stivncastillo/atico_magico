import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next'

import { products } from '@prisma/client';
import { put } from '@vercel/blob';

import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils';

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
    if (process.env.NODE_ENV !== 'development') {
      return res.status(200).json({ message: 'This endpoint is disabled in production' });
    }

    let page = 0;
    const limit = 100;
    let hasMoreData = true;
    const currentDate = new Date();

    // remove new products
    await prisma.products.updateMany({
      where: {
        newProduct: true,
      },
      data: {
        newProduct: false,
      }
    });

    while (hasMoreData) {
      const response = await fetch(`${process.env.CATALOG_URL}?storage_id=GEN&custom_order=news&limit=${limit}&page=${page}`)
      const data = await response.json();

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      for (const product of data) {
        console.log("👻 ~ product:", product.idref);
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
            newProduct: true,
            updatedDate: currentDate,
            category: {
              connect: {
                id: category.id,
              }
            },
          },
          include: {
            images: true,
          }
        });

        if (productDB.images.length === 0) {
          const imagesArray = custom?.images ?? [{image_url: product.url_imagen}];
          // download images to public/products folder
          await downloadAndSaveImages(imagesArray, path.join(process.cwd(), 'public', 'products'), productDB);
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

export async function downloadAndSaveImages(images: Image[], saveDirectory: string, product: products): Promise<void> {
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
        // save to vercel blob
        const blob = await put(imageName as string, await response.blob(), { access: 'public'});

        await prisma.images.create({
          data: {
            url: blob.url,
            productId: product.id,
          }
        });
        console.log("👻 ~ save image:", imageName);
      } else {
        console.error(`Failed to download image: ${imageName} (Status: ${response.status})`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}