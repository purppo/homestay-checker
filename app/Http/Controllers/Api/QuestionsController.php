<?php

namespace App\Http\Controllers\Api;

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
       $list = array();      
       
       $list[] = array(
     		               'no'=>1,
                	       'q'=>'외국인을 대상으로 민박업을 하시겠습니까?'
                    		);
      
       $list[] = array(
       				'no'=>2,
       				'q'=>'외국어 서비스가 가능한 체계를 갖추고 계십니까?',
       				);
        
       $list[] = array(
       				'no'=>3,
       				'q'=>'수동식 소화기 1조 이상 구비되어 있습니까?',
       				);
       
       $list[] = array(
       				'no'=>4,
       				'q'=>'객실마다 단독경보형감지기가 있습니까?',
       				);
       
       $list[] = array(
       				'no'=>5,
       				'q'=>'업무용시설, 근린생활시설에 포함되어 있습니까?',
       				);
       
       $list[] = array(
       				'no'=>6,
       				'q'=>'공동주택인 경우, 공동주택관리규약에 위반되는 사항은 없습니까?',
       				);
       
       $list[] = array(
       				'no'=>7,
       				'q'=>'해당 거주지를 분리하여 일정 면적만을 대상으로 사업하실 겁니까?',
       				);
       
       $list[] = array(
       				'no'=>8,
       				'q'=>'한국가정문화를 체험하기 위한 위생 상태를 갖추고 있습니까?',
       				);
       
       $list[] = array(
       				'no'=>9,
       				'q'=>'해당 주택이 위반 건축물이 아니며, 훼손되거나 붕괴 그 밖의 안전사고가 우려있는 건물이 아닙니까?'
       				);
       
       return json_encode($list);
       
       
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
      			return $this->jsonData($question, comment());
      			 
      			break;
      			 
      		case 2:
      			return $this->jsonData($question, comment());
      			 
      			break;
      	
      		case 3:
      			return $this->jsonData($question, comment());
      			 
      			break;
      			 
      		case 4:
      			return $this->jsonData($question, comment());
     			 
      			break;
      			 
      		case 5:
      			return $this->jsonData($question, comment());
      			 
      			break;
      				
      		case 6:
      			return $this->jsonData($question, comment());
      	
      			break;
      	
      		case 7:
      			return $this->jsonData($question, comment());
      	
      			break;
      		case 8:
      			return $this->jsonData($question, comment());
      	
      			break;
      				
      		case 9:
      			return $this->jsonData($question, comment());
      	
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
     * @param  string	$comm
     *      
     */
    public function jsonData($que, $comm){
    
    	$response = array(
    			"data" => "{$que}번을 {$comm}"
    	);
    
    	return json_encode($response);
    
    }

}
