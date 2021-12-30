import Product from "../models/product";
import AppError from "../utils/AppError";
import catchASync from "../utils/catchASync";
import mongoose from 'mongoose';
import uploadImage from "../utils/uploadImage";
import cloudinary from 'cloudinary';
import slugify from "../../utils/slugify";
import Category from "../models/category";

// @route       GET /api/products
// @purpose     Get all products
// @access      public
export const getAllProducts = catchASync(async (req, res) => {
  let { page = 1, limit = 9999, category , name  } = req.query;

  if (!page || !typeof eval(page) === Number)
    throw new AppError(400, "invalid page query. Page must me a number");
  if (!limit || !typeof eval(limit) === Number)
    throw new AppError(400, "invalid limit query. Limit must me a number");

  page = Number(page); 
  limit = Number(limit);

  const skip = limit * (page - 1);
  
  if (category && !mongoose.Types.ObjectId.isValid(category)) throw new AppError(400, 'invalid cateogry input');
    
  if (name) {
    name = new RegExp( name, "i");
  }

  const products =
    category && name
      ? await Product.find({ category, name })
          .skip(skip)
          .limit(limit)
          .populate({ path: "category", model: Category })
          .lean()
      : category
      ? await Product.find({ category })
          .skip(skip)
          .limit(limit)
          .populate({ path: "category", model: Category })
          .lean()
      : name
      ? await Product.find({ name })
          .skip(skip)
          .limit(limit)
          .populate({ path: "category", model: Category })
          .lean()
      : await Product.find()
          .skip(skip)
          .limit(limit)
          .populate({ path: "category", model: Category })
          .lean();
  return res.json({
    status: "success",
    page,
    limit,
    results: products.length,
    products,
  });
});


// @route       POST /api/products
// @purpose     Upload product
// @access      Admin
export const uploadProduct = catchASync(async (req, res) => {
  const { name, sizes, description, category, salePercentage = 0 } = req.body;
  if (!req.file) throw new AppError(400, "image is required");
  if (!name) throw new AppError(400, "name is required");
  if (!sizes) throw new AppError(400, "sizes is required");
  if (!description) throw new AppError(400, " description is required");
  if (!category) throw new AppError(400, "category is required");
  if (!mongoose.Types.ObjectId.isValid(category))
    throw new AppError(400, "catgegory is not valid");

  
  // create slug 
  const slug = slugify(name);

  // create product
  const product = await Product.create({ name, slug, sizes: JSON.parse(sizes), description, category, salePercentage });

  // save image to cloudinary
  const img = await uploadImage({
    buffer: req.file.buffer,
    width: 500,
    folder: "neonshop/img/products",
  });

  // update product image
  product.image = {version: img.version, public_id: img.public_id, url: img.secure_url }

  await product.save(); 


    return res.json({
      status: 'success',
      message: "product uploaded successfully",
      product
    })
})
 

// @route       PATCH /api/products/:id 
// @purpose     Update product
// @access      Admin
export const updateProduct = catchASync(async (req, res) => {
  const { name, description, category, salePercentage = 0 } = req.body;
  let image;
  let sizes = req.body.sizes;
  let slug;
  const id = req.query?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, 'not a valid id');

  // check if product exists 
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'product not found');


  // update image if provided 
  if (req.file) {
    // delete previous image if exists
    if (product.image?.public_id) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.v2.uploader.destroy(product.image.public_id);
    }
    const img = await uploadImage({
      buffer: req.file.buffer,
      width: 500,
      folder: "neonshop/img/products",
    });
    image = {
      version: img.version,
      public_id: img.public_id,
      url: img.secure_url,
    };
  }

  if (sizes) {
    sizes = JSON.parse(sizes); 
  };

  // update slug if name is provided 
  if (name) {
    slug = slugify(name);
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { name, slug, description, sizes, category, image, salePercentage } }, {new: true, runValidators: true});

  return res.json({
    status: "success",
    message: "product updated successfully",
    product: updatedProduct,
  });
});
 
// @route       DELETE /api/products/:id 
// @purpose     delete product
// @access      Admin
export const deleteProduct = catchASync(async (req, res) => {
  const id = req.query?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(400, 'not a valid id');

  // check if product exists 
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'product not found');
  
  // delete product image is exist
  if (product.image?.public_id) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
      await cloudinary.v2.uploader.destroy(product.image.public_id);
    }

  await product.delete()

  return res.json({
    status: "success",
    message: "product deleted" 
  });
});
 


// @route       DELETE /api/products
// @purpose     Delete all products
// @access      Admin
export const deleteAllProducts = catchASync(async (req, res) => {

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });  


  //  delete all products
  await Product.deleteMany();

  //  delete all photos folder 
  try {
   await cloudinary.api.delete_resources_by_prefix("neonshop/img/products");
  } catch (error) { 
  }


  return res.json({
    status: "success",
    message: "product deleted", 
  });
});


// @route       DELETE /api/products/sepcific
// @purpose     Delete specific products
// @access      Admin
export const deleteSpecificProducts = catchASync(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!req.body.ids) throw new AppError(400, 'ids is required');

  const products = await Product.find({ _id: { $in: req.body.ids } }).select('_id image');
  const productIds = products.map(product => product._id);
  //  delete specific products
  await Product.deleteMany({_id: {$in: productIds}});

  // delete images
  try {
    products.forEach( async product => {
      await cloudinary.v2.uploader.destroy(product.image.public_id);
    })
  } catch (error) {}

  return res.json({
    status: "success",
    message: "product deleted",
  });
});
