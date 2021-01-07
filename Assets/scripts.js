var mealPlan = 0;
var deliverydate;
var cartItemsCount = 0;
var availableDeliverDate;
var mealsCartArray = [];
var selectedMealsCartArray = [];

function showMeals(mealsPlan) {
    let i, tabcontent, tablinks;
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
    $('[data-toggle="tooltip"]').tooltip(); 
    $(".accordion").addClass("d-block");  
}); 

$(".cart-next-btn").click(function()
{
  $("#meal-plan").text(mealPlan);
  setAvailableDeliveryDates();
  showselectedMealCartContent();
  $(".accordion").removeClass("d-none");
  $(".accordion").addClass("d-block");
  $("#step-next-btn").click();
});

$('#mealSteps').steps({
});

$(".plans-card").click(function(){
  mealPlan = $(this).find(".choose-menu-btn").attr('id');
  loadMealsPage(mealPlan);
});

$('body').on('click', "#clear-all", function()
{
  selectedMealsCartArray.length = 0;
  $("#cart").empty();
  $("#getting-started").removeClass("d-none");
  $("#getting-started").addClass("d-block");
  $("#total-selected-meals").text(0);
  $("#total-selected-meals").addClass("text-danger");
  cartItemsCount = 0;
  $(".continue-meals").text("Add "+mealPlan+" meals to continue");
});

function loadMealsPage(){
  datesOrganizer();
  $("#step-next-btn").click();
  
}

$('body').on('click', ".btnAdd", function() {
  let id, img, title, desc;
  cartItemsCount++;
  $("#getting-started").addClass("d-none");
  $("#total-selected-meals").text(cartItemsCount);
  id = $(this).parents(".card-item").attr('data-id');
  img = $(this).parents(".card-item").find(".card-img").attr('src');
  title = $(this).parents(".card-item").find(".card-title").text();
  desc = $(this).parents(".card-item").find("#card-desc").text();
  showCartMealsContent(id, img, title);
  addMealItemsInArray(id, img, desc, title);
  cartViewHandler();
});

$(".choose-menu-btn-small").click(function(){
  mealPlan = $(this).find(".choose-menu-btn-small").attr('id');
  loadMealsPage(mealPlan);
});

function addMealItemsInArray(id, img, desc, title){
  let flag = false;
  let index ;
  for(let i = 0 ;i < selectedMealsCartArray.length; i++){
    if(selectedMealsCartArray[i]["id"] === id){
      flag = true;
      index= i;
    }
  }
  if(flag){
    selectedMealsCartArray[index]["count"] +=1;
  }
  else{
    selectedMealsCartArray.push({
      "id":id,
      "title":title,
      "desc":desc,
      "img":img,
      "count":1
    })
  }
}

function cartViewHandler(){
  if(cartItemsCount == 0)
  {
    $(".continue-meals").text("Add "+mealPlan+" meals to continue");
    $("#getting-started").show();
  }
  else if(cartItemsCount == mealPlan)
  {
    $(".cart-next-btn").removeClass("disabled-btn");
    $(".cart-next-btn").addClass("enabled-btn d-block ml-4");
    enable("cart-next-btn");
    $(".continue-meals").text("All Set");
    $(".exclamation-icon").hide();
    $(".success-icon").removeClass("d-none");
    $("#total-selected-meals").removeClass("text-danger");
  }
  else
  {
    $(".exclamation-icon").show();
    $(".success-icon").addClass("d-none");
    $("#total-selected-meals").addClass("text-danger");
    disable("cart-next-btn");
    $(".cart-next-btn").addClass("disabled-btn");
    if(cartItemsCount > mealPlan){
      $(".continue-meals").text("Remove "+ (cartItemsCount - mealPlan) + " Meals to continue");
    }
    else{
      $(".continue-meals").addClass("d-block");
      $(".continue-meals").text("Add "+ ( mealPlan - cartItemsCount ) + " meals to continue");
      $("#getting-started").hide();
    }
      
  }
}

function removeMealItemsFromArray(id){
  for(let i = 0; i < selectedMealsCartArray.length; i++){
    if(selectedMealsCartArray[i]['id'] === id){
      if(selectedMealsCartArray[i]['count'] === 1){
        let index = selectedMealsCartArray.indexOf(id);
          selectedMealsCartArray.splice(index, 1);
      }
      else{
        selectedMealsCartArray[i]['count'] -=1;
      }
    }
  }
}

$('body').on('click', ".remove-cart-btn", function(){

  let id = $(this).parents(".meal-cart").attr('data-id');
  $(this).parents(".meal-cart").remove();
  removeMealItemsFromArray(id);
  cartItemsCount--;
  $("#total-selected-meals").text(cartItemsCount);
  cartViewHandler();
});

$(".select-day-btn").click(function()
{
  let meals = fetchMeals();
  showContent(meals);
  $(".cart-next-btn").addClass("disabled-btn");
  $("#delivery-date").text(deliverydate);
  $(".selected-meal-qty").text(mealPlan);
  $("#total-selected-meals").text(0);
  $("#total-meals").text(mealPlan);
  $(".accordion").removeClass("d-block");
  $(".accordion").addClass("d-none");
  $("#step-next-btn").click();
});

function datesOrganizer()
{
  let strong, strongText, span, spanText, listGroupItem, today;
  today = getAvailableDeliveryDate();

  for(let i = 0; i < 10; i++){
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
      let clickedObjId=$(this).find("strong").attr('id');
      deliverydate = $("#"+(clickedObjId)).html();
      deliverydate = deliverydate+($("#"+($(this).find("span").attr('id'))).html());
      $("#selected-delivery-date").text(deliverydate);

    });
    if(i == 0){
      listGroupItem.className = "list-group-item selected";
      strongText = document.createTextNode(moment.utc(today).format('dddd'));
      spanText = document.createTextNode(moment.utc(today).format(' , MMM D'));
      $("#selected-delivery-date").text(strongText.nodeValue+spanText.nodeValue);
      deliverydate = strongText.nodeValue+spanText.nodeValue;
      availableDeliverDate=moment.utc(today).format('dddd , MMM D');
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

$(".list-group-item").click(function()
{
  $(this).css('border','2px solid green');
  this.className="selected list-group-item";
  $(this).siblings().removeClass("selected");
  $(this).siblings().css('border','1px solid rgba(0,0,0,.125)');
  let clickedObjId=$(this).find("strong").attr('id');
  deliverydate=$("#"+(clickedObjId)).html();
  deliverydate=deliverydate+($("#"+($(this).find("span").attr('id'))).html());
  $("#selected-delivery-date").text(deliverydate);
});

$(".promo-code-btn").click(function(){
  $(this).addClass("d-none");
  $(".promo-code").removeClass("d-none");
})

function showCartMealsContent(id, img, title) {
    let temp, clone;
    temp = document.getElementsByClassName("meal-cart-template")[0];
    temp.content.getElementById("cart-title").innerHTML = title;
    temp.content.getElementById("cart-img").src = img;
    temp.content.getElementById("meal-cart").setAttribute("data-id", id);
    clone = temp.content.cloneNode(true);
    document.getElementById("cart").appendChild(clone);
}

function showselectedMealCartContent() {
  let temp, clone;
  for(let i=0; i<selectedMealsCartArray.length; i++){
    temp = document.getElementsByClassName("selected-meals-cart-template")[0];
    temp.content.getElementById("meals-qty").innerHTML = selectedMealsCartArray[i]['count'];
    temp.content.getElementById("card-title").innerHTML = selectedMealsCartArray[i]['title'];
    temp.content.getElementById("card-text").innerHTML = selectedMealsCartArray[i]['desc'];
    temp.content.getElementById("selected-meal-img").src = selectedMealsCartArray[i]['img'];
    clone = temp.content.cloneNode(true);
    document.getElementById("my-meals").appendChild(clone);
  }
    
}

function showContent(meals) {
  let clone, temp;
  temp = document.getElementsByClassName("card-template")[0];
  for(let i = 0; i<meals.length; i++)
  {
    temp.content.getElementById("card-item").setAttribute("data-id",meals[i]['id']);
    temp.content.getElementById("card-title").innerHTML = meals[i]['title'];
    temp.content.getElementById("card-desc").innerHTML = meals[i]['desc'];
    temp.content.getElementById("card-img").src = meals[i]['img'];
    clone = temp.content.cloneNode(true);
    document.getElementById("all-meals").appendChild(clone);
  }
}

function setAvailableDeliveryDates(){
  let today=getAvailableDeliveryDate();
  $("#available-delivery-dates").append('<option>' + moment.utc(today).format('dddd , MMM D') + '</option>');
  for(let i = 0; i < 9; i++)
  {
    $("#available-delivery-dates").append('<option>' + moment(today).add(i,'days').format('dddd , MMM D') + '</option>');
  }
}

$("#confirm-address-checkbox").click(function(){
  $(".confirm-address").hide();
  enable("fullname");
  $("#fullname").removeClass("fullname");
  $("#confirm-address-checkbox").addClass("d-none")
});

function getAvailableDeliveryDate(){
  let today;
  const dayINeed = 1;
  today = moment().isoWeekday();
  if (today <= dayINeed) { 
    today=moment().isoWeekday(dayINeed);
  }
  if (today <= dayINeed) { 
    today=moment().isoWeekday(dayINeed);
  } 
  else {
    today=moment().add(1, 'weeks').isoWeekday(dayINeed);
  }
  return today;
}

function enable(name) {
  document.getElementById(name).disabled = false;
}

function disable(name) {
  document.getElementById(name).disabled = true;
}

function fetchMeals(){
  let meals = [ 
  {id:"steak-peppercorn", title:"STEAK PEPPERCORN", desc:"with Sautéed Carrots & French Green Beans", img:"Assets/images/STEAK PEPPERCORN.jpg"},
  {id:"BOLOGNESE", title:"CAULIFLOWER BEEF BOLOGNESE", desc:"with Nonna’s Soffritto & Italian Cheeses", img:"Assets/images/CAULIFLOWER SHELL BEEF BOLOGNESE1.jpg"},
  {id:"chicken-parm", title:"PROTEIN-PACKED CHICKEN PARM", desc:"with Mozzarella & Garlicky Broccoli", img:"Assets/images/PROTEIN-PACKED CHICKEN PARM.jpg"},
  {id:"homestyle-chicken", title:"HOMESTYLE CHICKEN", desc:"with Masterful Mac & Cheese", img:"Assets/images/HOMESTYLE CHICKEN.jpg"},
  {id:"CHICKEN-TIKKA", title:"CHICKEN TIKKA MASALA", desc:"with Seven-Spice Vegetable Biryani", img:"Assets/images/CHICKEN TIKKA MASALA.jpg"},
  {id:"PULLED-PORK", title:"PULLED PORK AL PASTOR", desc:"with Cotija Cheese & Mexican-Style Corn", img:"Assets/images/PULLED PORK AL PASTOR.jpg"},
  {id:"CHICKEN-MASH", title:"GOLDEN OVEN-FRIED CHICKEN & MASH", desc:"with Roasted Sweet Corn", img:"Assets/images/GOLDEN OVEN-FRIED CHICKEN & MASH.jpg"},
  {id:"SIERRA-CHICKEN-", title:"SIERRA CHICKEN BOWL", desc:"with Cilantro-Lime Sauce", img:"Assets/images/SIERRA CHICKEN BOWL.jpg"},
  {id:"OLÉ-CHICKEN", title:"OLÉ CHICKEN & SMOKY CHILE SAUCE", desc:"with Veggie Sauté & Sofrito Rice", img:"Assets/images/OLÉ CHICKEN & SMOKY CHILE SAUCE.jpg"},
  {id:"WHITE-BEAN", title:"WHITE BEAN TURKEY CHILI BOWL", desc:"with Basmati Rice & Cheddar Cheese", img:"Assets/images/WHITE BEAN TURKEY CHILI.jpg"},
  {id:"BBQ-BEEF", title:"DUE SOUTH BBQ BEEF", desc:"with Masterful Mac & Cheese", img:"Assets/images/DUE SOUTH BBQ BEEF.jpg"},
  ]
  return meals;
}


