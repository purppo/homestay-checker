<?php

if(! function_exists('questionsList')) {
	/**
	 * Questions return
	 *
	 * @return string
	 */
	function questionsList() {

		$list = array();
 
		$list[] = array(
				'no'=>1,
				'q'=>'객실마다 단독경보형감지기가 있습니까?'
		);
		
		$list[] = array(
				'no'=>2,
				'q'=>'외국인을 대상으로 민박업을 하시겠습니까?'
		);
		
		$list[] = array(
				'no'=>3,
				'q'=>'수동식 소화기 1조 이상 구비되어 있습니까?'
		);
		 
		$list[] = array(
				'no'=>4,
				'q'=>'업무용시설, 근린생활시설에 포함되어 있습니까?'			
		);
		 
		$list[] = array(
				'no'=>5,
				'q'=>'외국어 서비스가 가능한 체계를 갖추고 계십니까?'
		);
		 
		$list[] = array(
				'no'=>6,
				'q'=>'한국가정문화를 체험하기 위한 위생 상태를 갖추고 있습니까?'
		);
		 
		$list[] = array(
				'no'=>7,
				'q'=>'공동주택인 경우, 공동주택관리규약에 위반되는 사항은 없습니까?'				
		);
		 
		$list[] = array(
				'no'=>8,
				'q'=>'사업자의 거주지(방)를 포함하며, 전체 면적을 대상으로 사업하실 겁니까?'
		);
		 
		$list[] = array(
				'no'=>9,
				'q'=>'해당 주택이 위반 건축물이 아니며, 훼손되거나 붕괴 그 밖의 안전사고가 우려있는 건물이 아닙니까?'
		);
		 
		return json_encode($list);
			
	}
}

?>