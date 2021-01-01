var mealPlan = 0;
var deliverydate;
var mealArray = [];
var cartItemsCount = 0;

function showMeals(evt, mealsPlan) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(mealsPlan).style.display = "block";
    $(this).className += " active";
}

$("#default-open").click();

$(document).ready(function() {

}); 

$('#mealSteps').steps({
  onFinish: function () {}
});

$(".list-group-item").click(function()
{
  console.log("clicked");
  $(this).css('border','2px solid green');
  this.className="selected list-group-item";
  console.log(("#"+($(this).find("strong").attr('id'))));
  $(this).siblings().removeClass("selected");
  $(this).siblings().css('border','1px solid rgba(0,0,0,.125)');
  var clickedObjId=$(this).find("strong").attr('id');
  deliverydate=$("#"+(clickedObjId)).html();
  deliverydate=deliverydate+($("#"+($(this).find("span").attr('id'))).html());
  $("#selected-delivery-date").text(deliverydate);
 
});

$("#clear-all").click(function()
{
  mealArray.length = 0;
  $(".cart-item-div").css("display","none");
  $("#getting-started").css('display','block');
  $("#total-selected-meals").text(0);
  cartItemsCount = 0;
  $(".continue-meals").css('display','block');
  $(".selected-meal-qty").text(mealPlan);
})

$(".choose-menu-btn").click(function(){
  mealPlan=$(this).attr('id');
  $("#step-next-btn").click();
  datesOrganizer();
});

$(".choose-menu-btn-small").click(function()
{
  mealPlan=$(this).attr('id');
  $("#step-next-btn").click();
  datesOrganizer();
});

$(".btnAdd").click(function()
{
  $("#getting-started").css('display','none');
  var selectedItemDiv, selectedItemImg, selectedItemTitle, selectedItemTitleText, titleText, delButton, delIcon, imgSrc;

  cartItemsCount++;
  $("#total-selected-meals").text(cartItemsCount);

  var id = $(this).parents(".card").children().attr('id');

  selectedItemDiv = document.createElement("div");
  $(selectedItemDiv).css('display','block');
  selectedItemDiv.className = "mb-2 cart-item-div";

  selectedItemImg = document.createElement("img");
  selectedItemImg.className = "p-2";
  imgSrc = $("#"+id).find(".card-img").attr('src');
  selectedItemImg.src = imgSrc;
  $(selectedItemImg).css('max-height','40px');

  selectedItemTitle = document.createElement("span");
  $(selectedItemTitle).css( {"font-size":"11px" } );
  titleText = $("#"+id).find(".card-title").text();
  selectedItemTitleText = document.createTextNode(titleText);
  
  delButton = document.createElement("button");
  $(delButton).css('border','none');
  delButton.className = "deleteBtn mr-1 mt-2";
  delIcon = document.createElement("i");
  delIcon.className = "fas fa-times";
  $(delButton).css("float","right");
  delButton.appendChild(delIcon);

  //Remove cart
  delButton.addEventListener("click",function()
  {
    selectedItemDiv.remove();
    const index = mealArray.indexOf(id);
    if (index > -1) {
      mealArray.splice(index, 1);
    }
    console.log(mealArray);
    cartItemsCount--;
    $("#total-selected-meals").text(cartItemsCount);
    $(".selected-meal-qty").text(mealPlan-cartItemsCount);
    $(".cart-next-btn").attr("disabled" ,  true);
    $(".cart-next-btn").css('cursor' , 'no-drop');
    // $(".continue-meals").css('display','block');
    $("#getting-started").css('display' , 'none');

    if(mealArray.length == 0)
    {
      console.log("len==0");
      $(".continue-meals").text("Add "+mealPlan+" Meals to continue");
      $("#getting-started").css('display' , 'block');
    }
    else if(cartItemsCount == mealPlan)
    {
      console.log("len "+mealArray.length);
      $(".cart-next-btn").attr("disabled" , false);
      $(".cart-next-btn").css('cursor','pointer');
     // $(".all-set").text("All Set");
    // $(".all-set").css('display','block');
    $(".exclamation-icon").css("display","none");
    $(".continue-meals").text("All Set");
    // $("#all-set").css("padding","15px");
    }
    else
    {
      $(".cart-next-btn").attr("disabled", true);
      $(".cart-next-btn").css('cursor','no-drop');
      $(".all-set").css('display','none');
      if(mealArray.length > mealPlan){
        $(".continue-meals").text("Remove "+ (cartItemsCount - mealPlan) + " Meals to continue");
        $(".selected-meal-qty").text(cartItemsCount - mealPlan);
      }
      else{
        console.log("<");
        $(".continue-meals").css("display" , "block");
        $(".continue-meals").text("Add "+ ( mealPlan - mealArray.length ) + " Meals to continue");
        $("#getting-started").css("display","none");
      }
      
    }
  })
  
  selectedItemTitle.appendChild(selectedItemTitleText);
  selectedItemDiv.appendChild(selectedItemImg);
  selectedItemDiv.appendChild(selectedItemTitle);
  selectedItemDiv.appendChild(delButton);
  document.getElementById("cart").appendChild(selectedItemDiv);
  
  mealArray.push(id);

  $(".selected-meal-qty").text(mealPlan-cartItemsCount);
  
  if(mealArray.length == mealPlan)
  {
    $(".cart-next-btn").attr("disabled", false);
    $(".cart-next-btn").css('cursor','pointer');
    // $(".all-set").text("All Set");
    // $(".all-set").css('display','block');
    $(".exclamation-icon").css("display","none");
    $(".continue-meals").text("All Set");
    // $("#all-set").css("padding","15px");
  }
  else
  {
    $(".cart-next-btn").attr("disabled", true);
    $(".cart-next-btn").css('cursor','no-drop');
    $(".all-set").css('display','none');
    if( cartItemsCount > mealPlan )
    {
      $(".continue-meals").css("display" , "block");
      $(".continue-meals").text("Remove "+(cartItemsCount-mealPlan)+" Meals to continue");
      $("#getting-started").css("display" , "none");
    }
    else
    {
      $(".continue-meals").css("display" , "block");
      $(".continue-meals").text("Add "+ ( mealPlan - mealArray.length ) + " Meals to continue");
      $("#getting-started").css("display","none");
    } 
  }
})

$(".select-day-btn").click(function()
{
  $(".cart-next-btn").attr("disabled", true);
  $(".cart-next-btn").css('cursor','no-drop');
  $("#delivery-date").text(deliverydate);
  $(".selected-meal-qty").text(mealPlan);
  $("#total-selected-meals").text(0);
  $("#total-meals").text(mealPlan);
  $("#step-next-btn").click();
});

function datesOrganizer()
{
  var strong, strongText, span, spanText, listGroupItem, today;
  
  const dayINeed = 1;
  today = moment().isoWeekday();
  if (today <= dayINeed) { 
    today=moment().isoWeekday(dayINeed);
  } else {
    today=moment().add(1, 'weeks').isoWeekday(dayINeed);
  }

  for(var i = 0; i < 10; i++){
    listGroupItem = document.createElement("li");
    listGroupItem.className = "list-group-item";
    strong = document.createElement("strong");
    strong.id = "day" + ( i + 1 );
    span = document.createElement("span");
    span.className = "delivery-day-section";
    span.id = "delivery-date" + ( i + 1 );

    listGroupItem.addEventListener("click" , function()
    { 
      $(this).css('border','2px solid green');
      this.className="selected list-group-item";
      console.log(("#"+($(this).find("strong").attr('id'))));
      $(this).siblings().removeClass("selected");
      $(this).siblings().css('border','1px solid rgba(0,0,0,.125)');
      var clickedObjId=$(this).find("strong").attr('id');
      deliverydate=$("#"+(clickedObjId)).html();
      deliverydate=deliverydate+($("#"+($(this).find("span").attr('id'))).html());
      $("#selected-delivery-date").text(deliverydate);

    });
    if(i == 0){
      listGroupItem.className = "list-group-item selected";
      strongText = document.createTextNode(moment.utc(today).format('dddd'));
      spanText = document.createTextNode(moment.utc(today).format(' , MMM D'));
      $("#selected-delivery-date").text(strongText.nodeValue+spanText.nodeValue);
      deliverydate = strongText.nodeValue+spanText.nodeValue;
    }
    else
    {
      strongText = document.createTextNode(moment(today).add(i,'days').format('dddd'));
      spanText = document.createTextNode(moment(today).add(i,'days').format(' , MMM D'));
    }
    strong.appendChild(strongText);
    span.appendChild(spanText);
    listGroupItem.appendChild(strong);
    listGroupItem.appendChild(span);
    document.getElementById("listGroup").appendChild(listGroupItem);
  }
}

$(".cart-next-btn").click(function(){
  $("#step-next-btn").click();
});