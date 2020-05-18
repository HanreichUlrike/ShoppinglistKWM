<?php

namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Shoppinglist;
use App\Article;

class ShoppinglistController extends Controller
{

    public function index(){
        $shoppinglists = Shoppinglist::with(['articles', 'user'])->get();
        return $shoppinglists;
    }


    public function show($shoppinglist){
        $shoppinglist = Shoppinglist::find($shoppinglist);
        return view('shoppinglists.show', compact('shoppinglist'));
    }


    public function findByID(string $id):Shoppinglist{
        $shoppinglist = Shoppinglist::where('id', $id)
            ->with(['articles', 'user'])->first();
        return $shoppinglist;
    }

    public function checkID(string $id){

        $shoppinglist = Shoppinglist::where('id', $id)->first();

        return $shoppinglist != null ? response()->json('Shoppinglist number '.$id.' exists.', 200) :
            response()->json('Shoppinglist number '.$id.' does not exists.', 404);

    }


    public function findBySearchTerm(string $searchTerm){

        $shoppinglist = Shoppinglist::with ([ 'articles' , 'user' ])
            ->where('user_id','LIKE','%'.$searchTerm.'%')
            ->orWhere('helper_id', 'LIKE', '%'.$searchTerm.'%')
            /*user*/
            ->orWhereHas('user', function ($query) use ($searchTerm){
                $query->where('firstName', 'LIKE','%'.$searchTerm.'%')
                    ->orWhere('lastName', 'LIKE','%'.$searchTerm.'%');
            })->get();

        return $shoppinglist;
    }


    /*Create new Shoppinglist*/

    public function save (Request $request) : JsonResponse {
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try{

            $shoppinglist = Shoppinglist::create($request->all());

            if(isset($request['articles']) && is_array($request['articles'])){
                foreach($request['articles'] as $art){
                    $pivotData = $art['pivot'];
                    $article = Article::firstOrNew(['term'=>$art['term'], 'id'=> $art['id'], ]);
                    $shoppinglist->articles()->save($article);
                    $shoppinglist->articles()->updateExistingPivot($article, ['unit'=>$pivotData['unit'],
                      'max_price' => $pivotData['max_price']]);
                }
            }

            DB::commit();
            return response()->json($shoppinglist, 201);
        }
        catch (\Exception $e){

            DB::rollback();
            return response()->json("Saving Shoppinglist failed: ". $e->getMessage(), 420);
        }

    }

    /*Update Shoppinglist*/

    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $shoppinglist = Shoppinglist::with(['articles', 'user'])
                ->where('id', $id)->first();
            if ($shoppinglist != null) {
                $request = $this->parseRequest($request);
                $shoppinglist->update($request->all());

                //update articles

                $ids = [];
                if (isset($request['articles']) && is_array($request['articles'])) {
                    foreach ($request['articles'] as $art) {
                        array_push($ids, $art['id']);
                    }
                }
                $shoppinglist->articles()->sync($ids);
                $shoppinglist->save();
            }
            DB::commit();
            $shoppinglist1 = Shoppinglist::with(['articles', 'user'])
                ->where('id', $id)->first();
            // return a valid http response
            return response()->json($shoppinglist1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating shoppinglist failed: " . $e->getMessage(), 420);
        }
    }


    public function delete(string $id) : JsonResponse
    {
        $shoppinglist = Shoppinglist::where('id', $id)->first();
        if ($shoppinglist != null) {
            $shoppinglist->delete();
        }
        else
            throw new \Exception("shoppinglist couldn't be deleted - it does not exist");
        return response()->json('shoppinglist nr. (' . $id . ') successfully deleted', 200);

    }

    /*Modify values if needed*/

    private function parseRequest(Request $request):Request{
        //get date and convert it - ISO 8601, e.g., "2020-01-01T21:00:00"
        $date = new \DateTime($request->until);
        $request['until'] = $date;
        return $request;
    }
}
