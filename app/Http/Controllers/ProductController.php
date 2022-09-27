<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::select(['id', 'name', 'description', 'photo', 'type', 'price', 'quantity'])->get();
        return response()->json([
            'products' => $products
        ], ResponseAlias::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required|numeric|min:0',
        ]);


        try {
            DB::beginTransaction();
            $path_image = null;
            if ($request->image != "") {
                // search first place to appear ';'
                $strpos = strpos($request->image, ";");
                $sub = substr($request->image, 0, $strpos);
                // get extension of file
                $ex = explode("/", $sub)[1];
                $name = time() . "." . $ex;
                $img = Image::make($request->image)->resize(117, 100);
                $upload_path = public_path() . "/upload/";
                $img->save($upload_path . $name);
                $path_image = $name;
            }

            Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'quantity' => $request->quantity,
                "type" => $request->type,
                "photo" => $path_image,
            ]);

            DB::commit();

            return response()->json(['name' => $request->name], ResponseAlias::HTTP_OK);

        } catch (\Exception $exception) {
            if (!$validator) {
                return response()->json($validator->messages(), ResponseAlias::HTTP_BAD_REQUEST);
            } else {
                return response()->json([
                    'errors' => [
                        'message' => $exception->getMessage(),
                    ]
                ], ResponseAlias::HTTP_BAD_REQUEST);
            }
        }
    }

    public function edit(Product $product)
    {
        return response()->json([
            'productDetails' => $product
        ], ResponseAlias::HTTP_OK);
    }

    public function update(Request $request, Product $product)
    {
        $validator = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
        ]);


        try {
            DB::beginTransaction();
            $path_image = $product->photo;
            if ($request->image != "" && $product->photo != $request->image) {
                // search first place to appear ';'
                $strpos = strpos($request->image, ";");
                $sub = substr($request->image, 0, $strpos);
                // get extension of file
                $ex = explode("/", $sub)[1];
                $name = time() . "." . $ex;
                $img = Image::make($request->image)->resize(117, 100);
                $upload_path = public_path() . "/upload/";
                $img->save($upload_path . $name);
                $path_image = $name;
            }

            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->quantity = $request->quantity;
            $product->type = $request->type;
            $product->photo = $path_image;
            $product->save();

            DB::commit();

            return response()->json(['name' => $request->name], ResponseAlias::HTTP_OK);

        } catch (\Exception $exception) {
            if (!$validator) {
                return response()->json($validator->messages(), ResponseAlias::HTTP_BAD_REQUEST);
            } else {
                return response()->json([
                    'errors' => [
                        'message' => $exception->getMessage(),
                    ]
                ], ResponseAlias::HTTP_BAD_REQUEST);
            }
        }
    }

    public function delete(Product $product)
    {
        try {
            DB::beginTransaction();
            $image = public_path() . '/upload/' . $product->photo;
            if (file_exists($image)) {
                unlink($image);
            }
            $product->delete();
            DB::commit();

            return response()->json([], ResponseAlias::HTTP_OK);

        } catch (\Exception $exception) {
            return response()->json([
                'errors' => [
                    'message' => $exception->getMessage(),
                ]
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

}
