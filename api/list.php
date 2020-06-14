<?php

$num_rec_per_page = 5;

if (isset($_GET["page"])) { $page  = $_GET["page"]; } else { $page=1; };

$start_from = ($page-1) * $num_rec_per_page;

$sqlTotal = 11;

$db = [
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

$c = 0;
foreach ($db as $key => $value) {
  if ($c >= $start_from && $c < ($page * $num_rec_per_page)) {
    $json[] = $value;
  };
  $c++;
}

$data['data'] = $json;
$data['total'] = 11;
$data['page'] = $page;
$data['start_from'] = $start_from;

echo json_encode($data);
