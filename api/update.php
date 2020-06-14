<?php

$post = $_POST;

$data = [
  ['id'=>1,'title'=>'title1','description'=>'desc1'],
  ['id'=>2,'title'=>'title2','description'=>'desc2'],
  ['id'=>3,'title'=>'title3','description'=>'desc3'],
  ['id'=>4,'title'=>'title4','description'=>'desc4'],
  ['id'=>5,'title'=>'title5','description'=>'desc5'],
  ['id'=>6,'title'=>'title6','description'=>'desc6'],
  ['id'=>7,'title'=>'title7','description'=>'desc7'],
  ['id'=>8,'title'=>'title8','description'=>'desc8'],
  ['id'=>9,'title'=>'title9','description'=>'desc9'],
  ['id'=>10,'title'=>'title10','description'=>'desc10'],
  ['id'=>11,'title'=>'title11','description'=>'desc11'],
];


foreach ($data as $key => $item) {
  if ($item['id'] == $id) {
    $item['title'] = $post['title'];
    $item['description'] = $post['description'];
  }
}

echo json_encode($data);
