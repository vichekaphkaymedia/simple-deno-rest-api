import { Bson,MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { ProductSchema } from "../types.ts";

const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const client = new MongoClient();
try {
  await client.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("deno-rest-api");
const Product = db.collection<ProductSchema>("products");

// @description: GET all products
// @route GET /api/quotes
const allProducts = async ({ response }: { response: any }) => {
  try {
    const allProducts = await Product.find({}).toArray();
      response.status = 200;
      response.body = {
        success: true,
        data: allProducts,
      };
  } catch (err) {
    response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

// @description: GET single products
// @route GET /api/products/:id
const getSingleProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  try {
    const product = await Product.findOne({ _id: new Bson.ObjectID(params.id) });
    if (product) {
        response.status = 200;
        response.body = {
        success: true,
        data: product,
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "404 Not Found",
        };
    }
  } catch (err) {
    response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

// @description: ADD single product
// @route POST /api/products
const createProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No Data",
      };
    } else {
      const body = await request.body();
      const quote = await body.value;
      await Product.insertOne(quote);
      response.status = 201;
      response.body = {
        success: true,
        data: quote,
      };
    }
  } catch (err) {
    response.status = 500
    response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

// @description: UPDATE single product
// @route PUT /api/products/:id
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body().value;
    let {modifiedCount} = await Product.updateOne(
      { _id: new Bson.ObjectID(params.id)},
      { $set: {name: body.name,description: body.description,price:body.price} }
    );
    if(modifiedCount === 1){
        const updatedProduct = await Product.findOne({ _id: new Bson.ObjectID(params.id) });
        response.status = 200;
        response.body = {
            success: true,
            data: updatedProduct,
        };
    }else {
        response.status = 404;
        response.body = {
            success: false,
            message: '404 Not Found',
        };
    }
  } catch (err) {
    response.status = 500
    response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

// @description: DELETE single product
// @route DELETE /api/products/:id
const deleteProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    await Product.deleteOne({ _id: new Bson.ObjectID(params.id) });
    response.status = 204;
  } catch (err) {
    response.status = 500
    response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

export { allProducts,getSingleProduct, createProduct, updateProduct, deleteProduct };
