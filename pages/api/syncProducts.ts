import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next'

import * as xlsx from 'xlsx';

import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils';

import { downloadAndSaveImages } from './updateProducts';

type ResponseData = {
  message: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(200).json({ message: 'This endpoint is disabled in production' });
    }

    const data = [];
    const currentDate = new Date();
    const buffer = fs.readFileSync(path.join(process.cwd(), 'pages/api', 'input.xlsx'));
    const workbook = xlsx.read(buffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const range = xlsx.utils.decode_range(worksheet['!ref'] as string);

    for (let row = range.s.r; row <= range.e.r; row++) {
      if (row === 0) {
        continue;
      }
      const categoryName = worksheet[xlsx.utils.encode_cell({ r: row, c: 3 })]?.v ?? 'Sin categoría'.split('/')[0].trim();
      data[row-1] = {
        ref: worksheet[xlsx.utils.encode_cell({ r: row, c: 1 })]?.v ?? '',
        name: worksheet[xlsx.utils.encode_cell({ r: row, c: 2 })]?.v ?? '',
        images: [
          worksheet[xlsx.utils.encode_cell({ r: row, c: 3 })]?.v ?? '',
          worksheet[xlsx.utils.encode_cell({ r: row, c: 4 })]?.v ?? '',
          worksheet[xlsx.utils.encode_cell({ r: row, c: 5 })]?.v ?? '',
        ],
        category: categoryName,
        description: worksheet[xlsx.utils.encode_cell({ r: row, c: 14 })]?.v.trim() || '',
        price: worksheet[xlsx.utils.encode_cell({ r: row, c: 16 })]?.v ?? '',
        profit: worksheet[xlsx.utils.encode_cell({ r: row, c: 17 })]?.v ?? '',
      }
    }
    data.forEach(async (product) => {
      if (product.ref === '' || product.price === '') return;
      const existingProduct = await prisma.products.findFirst({
        where: {
          idReference: product.ref
        }
      });

      if (existingProduct) {
        await prisma.products.update({
          where: {
            id: existingProduct.id
          },
          data: {
            ...(product.description !== '' && { description: product.description }), // only update description if it exists (not empty)
            price: product.price,
            profit: product.profit,
            updatedDate: currentDate,
          }
        });
      } else {
        // get or create categories
        // let category = await prisma.categories.findFirst({
        //   where: {
        //     name: product.category,
        //   }
        // });

        // if (!category) {
        //   category = await prisma.categories.create({
        //     data: {
        //       name: product.category,
        //       slug: slugify(product.category)
        //     }
        //   });
        // }

        // const productDB = await prisma.products.create({
        //   data: {
        //     idReference: product.ref,
        //     name: product.name,
        //     description: product.description,
        //     price: product.price,
        //     profit: product.profit,
        //     category: {
        //       connect: {
        //         id: category.id,
        //       }
        //     }
        //   }
        // });

        // if (productDB) {
        //   const imagesArray = product?.images.filter((image: string) => image !== '') ?? [];
        //   if (imagesArray.length > 0) {
        //     // download images to public/products folder
        //     await downloadAndSaveImages(imagesArray, path.join(process.cwd(), 'public', 'products'), productDB);
        //   }
        // }
      }
    });
    return res.status(200).json({ message: 'Ready' });

  } catch (error) {
    res.status(500).json({ message: `Error ${error}` })
  }
}