import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    let page = 0;
    const limit = 100;
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await fetch(`https://us-central1-mi-catalogo-1f031.cloudfunctions.net/api/variedades_tv_cali/product?storage_id=GEN&custom_order=news&limit=${limit}&page=${page}`)
      const data = await response.json();

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      // truncate images
      // await prisma.images.deleteMany();

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
            name: product.descint,
            price: product.pcia,
            description,
            idReference: product.idref,
            category: {
              connect: {
                id: category.id,
              }
            },
          },
          create: {
            name: product.descint,
            price: product.pcia,
            description,
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
            for (const image of imagesArray) {
              await prisma.images.create({
                data: {
                  url: image.image_url,
                  productId: productDB.id,
                }
              });
            }
          }
        }
      }
      page++;
    }

    res.status(200).json({ message: 'Hello from Next.js! update products' })
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