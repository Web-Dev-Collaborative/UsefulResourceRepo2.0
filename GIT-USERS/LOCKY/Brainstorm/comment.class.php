<?php

class Comment{
	private $data = array();
	
	public function __construct($row){
		/*The constructor*/
		$this->data = $row;
	}

	public static function validate(&$arr){
		/*
		/	This method is used to validate the data sent via AJAX.
		/	It return true/false depending on whether the data is valid, and populates
		/	the $arr array passed as a paremter (notice the ampersand above) with
		/	either the valid input data, or the error messages.
		*/		
		$errors = array();
		$data	= array();
		$count  = filter_input(INPUT_POST,'count',FILTER_DEFAULT);
		// Using the filter_input function introduced in PHP 5.2.0
		//this is used to create the database.
		$data['count'] = $count;
		$data['URI'] = filter_input(INPUT_POST,'URI',FILTER_DEFAULT);
		$data['r'] = filter_input(INPUT_POST,'r',FILTER_DEFAULT);
		$data['t'] = filter_input(INPUT_POST,'t',FILTER_DEFAULT);
		$data['o'] = filter_input(INPUT_POST,'o',FILTER_DEFAULT);
		$data['time'] = filter_input(INPUT_POST,'time',FILTER_DEFAULT);

		if($data['o']==6){
			$data['gender'] = filter_input(INPUT_POST,'q1',FILTER_DEFAULT);
			$data['education'] = filter_input(INPUT_POST,'q2',FILTER_DEFAULT);
			$data['age'] = filter_input(INPUT_POST,'age',FILTER_DEFAULT);			
			$data['language'] = filter_input(INPUT_POST,'language',FILTER_DEFAULT);
			$data['residency'] = filter_input(INPUT_POST,'residency',FILTER_DEFAULT);
			$data['citizenship'] = filter_input(INPUT_POST,'citizenship',FILTER_DEFAULT);
			$data['ethnicity'] = filter_input(INPUT_POST,'q7',FILTER_DEFAULT);

			// $data['occupation'] = filter_input(INPUT_POST,'occupation',FILTER_DEFAULT);
			// debug($data['gender']);			
			
			if($data['gender']==false){
				$errors['gender'] = 'Please select a gender.';
			}else{
				if($data['gender']==Other && !($data['occupation'] = filter_input(INPUT_POST,'gender-other',FILTER_CALLBACK,array('options'=>'Comment::validate_text')))){
					$errors['gender'] = 'Please specify your gender.';
				}
			}

			if($data['education']==false){
				$errors['education'] = '<br/>Please select your education.';
			}
			
			if(!($data['age'] = filter_input(INPUT_POST,'age',FILTER_CALLBACK,array('options'=>'Comment::validate_text'))))
			{
				$errors['age'] = 'Please enter your age.';
			}


			if(!($data['language'] = filter_input(INPUT_POST,'language',FILTER_CALLBACK,array('options'=>'Comment::validate_text'))))
			{
				$errors['language'] = 'Please enter your language.';
			}
			// Using the filter with a custom callback function:
			if(!($data['residency'] = filter_input(INPUT_POST,'residency',FILTER_CALLBACK,array('options'=>'Comment::validate_text'))))
			{
				$errors['residency'] = 'Please enter your residency.';
			}

			if(!($data['citizenship'] = filter_input(INPUT_POST,'citizenship',FILTER_CALLBACK,array('options'=>'Comment::validate_text'))))
			{
				$errors['citizenship'] = 'Please enter your citizenship.';
			}

			if($data['ethnicity']==false){
				$errors['ethnicity'] = 'Please select an ethnicity.';
			}else{
				if($data['ethnicity']==7 && !($data['ethnicity'] = filter_input(INPUT_POST,'ethnicity-other',FILTER_CALLBACK,array('options'=>'Comment::validate_text')))){
					$errors['ethnicity'] = 'Please specify your ethnicity.';
				}
			}
			
		}else if($data['o']==2){
			$data['q1'] = filter_input(INPUT_POST,'q1',FILTER_DEFAULT);
			$data['q2'] = filter_input(INPUT_POST,'q2',FILTER_DEFAULT);
			$data['reward'] = filter_input(INPUT_POST,'reward',FILTER_DEFAULT);
			if($data['q1']==false){
				$errors['q1'] = 'Please select.';
			}
			if($data['q2']==false){
				$errors['q2'] = 'Please select.';
			}else if($data['q2']==true){
				if($data['q2']==2 && !($data['q2'] = filter_input(INPUT_POST,'reward',FILTER_CALLBACK,array('options'=>'Comment::validate_text')))){
					$errors['q2'] = 'Please specify your reward.';
				}
			}
		}else if($data['o']==3){
			for($i=1;$i<22;$i++){
				$index = 'q'.$i;
				$data[$index] = filter_input(INPUT_POST,$index,FILTER_DEFAULT);
				if($data[$index]==false){
					$errors['part2'] = '<br/>Please finish all the questions.';
					break;
				}

			}
		}else if($data['o']==4){
			for($i=1;$i<14;$i++){
				$index = 'q'.$i;
				$data[$index] = filter_input(INPUT_POST,$index,FILTER_DEFAULT);
				if($data[$index]==false){
					$errors['part3'] = '<br/>Please finish all the questions.';
					break;
				}

			}
		}else if($data['o']==5){
			for($i=1;$i<17;$i++){
				$index = 'q'.$i;
				$data[$index] = filter_input(INPUT_POST,$index,FILTER_DEFAULT);
				if($data[$index]==false){
					$errors['part4'] = '<br/>Please finish all the questions.';
					break;
				}

			}
		}


		if($count>0){
			$i = 1;
			$index = 'dynamic'.$i;
			$data['dynamic'] = filter_input(INPUT_POST,$index,FILTER_CALLBACK,array('options'=>'Comment::validate_text'));
		}
		for($i=2;$i<=$count;$i++){
			$index = 'dynamic'.$i;
			$data['dynamic'] .= '_'.filter_input(INPUT_POST,$index,FILTER_CALLBACK,array('options'=>'Comment::validate_text'));
			/*if(!($data['dynamic'] .= ','.filter_input(INPUT_POST,$index,FILTER_CALLBACK,array('options'=>'Comment::validate_text'))))
			{
				$errors['idea'] = 'Please enter ideas you added.';
			}*/
		}
		// debug($data['dynamic']);	
		if(!empty($errors)){
			// If there are errors, copy the $errors array to $arr:
			$arr = $errors;
			return false;
		}
		
		// If the data is valid, sanitize all the data and copy it to $arr:
		
		foreach($data as $k=>$v){
			$arr[$k] = mysql_real_escape_string($v);
		}
		// Ensure that the email is lower case:
		// $arr['email'] = strtolower(trim($arr['email']));
		
		return true;
		
	}

	private static function validate_select($num, $part){

	}

	private static function validate_text($str){
		/*
		/	This method is used internally as a FILTER_CALLBACK
		*/
		
		if(mb_strlen($str,'utf8')<1)
			return false;
		
		// Encode all html special characters (<, >, ", & .. etc) and convert
		// the new line characters to <br> tags:
		
		$str = nl2br(htmlspecialchars($str));
		
		// Remove the new line characters that are left
		$str = str_replace(array(chr(10),chr(13)),'',$str);
		
		return $str;
	}

}

?>