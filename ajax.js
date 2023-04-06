
function load_products(){
    var xhr = new XMLHttpRequest();
            
    xhr.open('POST','product-detail.json',true);
            
    xhr.onload = function(){
      if(xhr.status == 200){
        var products = JSON.parse(xhr.responseText);
        var output = "";
        var totalVal = 0;
        for(var i in products){
            totalVal += parseInt(products[i].Total); 
            output += "<tr id='"+i+"'>"+
            "<td>"+products[i].Product+"</td>"+
            "<td>"+products[i].Quantity+"</td>"+
            "<td>$"+products[i].Price+"</td>"+
            "<td>"+products[i].Date+"</td>"+
            "<td>$"+products[i].Total+"</td>"+
            "<td  onclick='remov("+i+")'>Delete</td>"+
            "<td  onclick='edit("+i+")'>Edit</td>"+
            "</tr>"
        }
        
        output += "<tr><td>Sum of total value:     $"+totalVal+"</td></tr>";
        $("#table_body").html(output);
      }
    }
    xhr.send();
}

function remov(val){
    $.ajax({
        type: "post",
        url: "./delete.php",
        data: {row: val},
        success: function (response) {     
            load_products();
        }
    });
}
function edit(val){
    $("#Er").val(parseInt(val));
    $("#Pn").val($("#"+val+" td:first").html());
    $("#QiS").val($("#"+val+" td:nth-child(2)").html());
    $("#PpI").val($("#"+val+" td:nth-child(3)").html().split("$")[1]);      
}


$("document").ready(function(){
    
    load_products();
    
    $("#postForm").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "./script.php",
            data: $(this).serialize(),
            success: function (response) {
                var response = JSON.parse(response);
                var output = "";
                if(response["status"] == false){
                    var error_msg = "<a class='close' href='#''>x</a>"+"<p>"+response["body"]+"</p>";
                    $("#response").html(error_msg);
                    $("#response").addClass("alert-message error");
                    $("#response").fadeIn(1500);
                }else{
                    $("#Er").val("");
                    $("#Pn").val("");
                    $("#QiS").val("");
                    $("#PpI").val("");      
                    $("#response").fadeOut(1500);
                    load_products();
                }
            }
        });
    })
    
    
});