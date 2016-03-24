<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	
	//80번 포트로 접근했을 때, 질문 리스트 반환
    public function index()
    {
	
      	return questionsList();
       
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    //post값으로 NG를 체크한 질문의 벨류값을 받은 경우
    public function store()
    {
        
    	//NG가 체크된 질문의 번호
      	$question = $_POST['request'];
       
      	switch($question){
      		case 1:      	
      			//질문 1번이 NG인 경우
      			return $this->jsonData($question);
      			 
      			break;
      			 
      		case 2:
      			return $this->jsonData($question);
      			 
      			break;
      	
      		case 3:
      			return $this->jsonData($question);
      			 
      			break;
      			 
      		case 4:
      			return $this->jsonData($question);
     			 
      			break;
      			 
      		case 5:
      			return $this->jsonData($question);
      			 
      			break;
      				
      		case 6:
      			return $this->jsonData($question);
      	
      			break;
      	
      		case 7:
      			return $this->jsonData($question);
      	
      			break;
      		case 8:
      			return $this->jsonData($question);
      	
      			break;
      				
      		case 9:
      			return $this->jsonData($question);
      	
      			break;
      	}
      	
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    /*
     * @param  int  	$que
     *      
     */
    public function jsonData($que){
    
    	$response = array(
    			"data" => "{$que}번을 ".comment()
    	);
    
    	return json_encode($response);
    
    }

}
