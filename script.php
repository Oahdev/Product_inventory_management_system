<?php
$response = [];
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(
        isset($_POST["productName"]) &&
        !(empty($_POST["QuantityInStock"])) &&
        !(empty($_POST["PricePerItem"]))
    ){
        $product_name = $_POST["productName"];
        $quantity_in_stock = intval($_POST["QuantityInStock"]);
        $price_per_item = intval($_POST["PricePerItem"]);
        $date_time = date("Y-m-d h:i:s");
        $total_value_number = ($quantity_in_stock * $price_per_item);
        
        $inp = file_get_contents("./product-detail.json");
        $tempArray = json_decode($inp);
        
        $response["status"] = true;
        $json_data = [
            "Product"=>$product_name,
            "Quantity"=>$quantity_in_stock,
            "Price"=>$price_per_item,
            "Date"=>$date_time,
            "Total"=>$total_value_number
        ]; 
        if($_POST["editRow"] < 0){
            array_push($tempArray, $json_data);
        }else{
            $row = $_POST["editRow"];
            $tempArray[$row] = $json_data;
        }
        $jsonData = json_encode($tempArray);
        file_put_contents("./product-detail.json", $jsonData);
    }else{
        $response["status"] = false;
        $response["body"] = "required field missing"; 
    }
}else{
    $response["status"] = false;
    $response["body"] = "invalid request method"; 
}

echo json_encode($response);

?>