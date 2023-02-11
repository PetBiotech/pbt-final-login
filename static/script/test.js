const selectCheckBox=(n)=>{
    let id = "checkboxId"+n;
    let checkBox = document.getElementById(id);
    let labelCard=document.getElementById("checkbox"+n);
    setTimeout(function(){
        // alert("Yes");
        if (checkBox.checked) {
            labelCard.style.border = "3px dashed rgba(0, 174, 0,1)";
            labelCard.style.backgroundColor = "rgb(190, 255, 190,0.1)";
        } else {
            labelCard.style.border = "3px dashed rgba(0,0,0,0)";
            labelCard.style.backgroundColor = "rgb(255,255,255)";
        }
    }, 100);
};
let selectedItemCount;

const submitTestForm = () => {
    let cb1 = document.getElementById("checkboxId1");
    let cb2 = document.getElementById("checkboxId2");
    let cb3 = document.getElementById("checkboxId3");
    let cb4 = document.getElementById("checkboxId4");
    let cb5 = document.getElementById("checkboxId5");
    let cb6 = document.getElementById("checkboxId6");
    let cb7 = document.getElementById("checkboxId7");
    let cb8 = document.getElementById("checkboxId8");
    let cb9 = document.getElementById("checkboxId9");
    let cb10 = document.getElementById("checkboxId10");
    let cb11 = document.getElementById("checkboxId11");
    let cb12 = document.getElementById("checkboxId12");
    let cb13 = document.getElementById("checkboxId13");
    let cb14 = document.getElementById("checkboxId14");
    let cb15 = document.getElementById("checkboxId15");
    let cb16 = document.getElementById("checkboxId16");
    let cb17 = document.getElementById("checkboxId17");
    let cb18 = document.getElementById("checkboxId18");
    let cb19 = document.getElementById("checkboxId19");
    let cb20 = document.getElementById("checkboxId20");
    let cb21 = document.getElementById("checkboxId21");
    let cb22 = document.getElementById("checkboxId22");
    let cb23 = document.getElementById("checkboxId23");
    let cb24 = document.getElementById("checkboxId24");
    let selecetdItem = "";
    if (cb1.checked) selecetdItem += "ct_id1|";
    if (cb2.checked) selecetdItem += "ct_id2|";
    if (cb3.checked) selecetdItem += "ct_id3|";
    if (cb4.checked) selecetdItem += "ct_id4|";
    if (cb5.checked) selecetdItem += "ct_id5|";
    if (cb6.checked) selecetdItem += "ft_id1|";
    if (cb7.checked) selecetdItem += "ft_id2|";
    if (cb8.checked) selecetdItem += "ft_id3|";
    if (cb9.checked) selecetdItem += "ft_id4|";
    if (cb10.checked) selecetdItem += "at_id1|";
    if (cb11.checked) selecetdItem += "at_id2|";
    if (cb12.checked) selecetdItem += "at_id3|";
    if (cb13.checked) selecetdItem += "at_id4|";
    if (cb14.checked) selecetdItem += "at_id5|";
    if (cb15.checked) selecetdItem += "at_id6|";
    if (cb16.checked) selecetdItem += "at_id7|";
    if (cb17.checked) selecetdItem += "at_id8|";
    if (cb18.checked) selecetdItem += "at_id9|";
    if (cb19.checked) selecetdItem += "at_id10|";
    if (cb20.checked) selecetdItem += "at_id11|";
    if (cb21.checked) selecetdItem += "at_id12|";
    if (cb22.checked) selecetdItem += "at_id13|";
    if (cb23.checked) selecetdItem += "at_id14|";
    if (cb24.checked) selecetdItem += "at_id15|";
    selecetdItem = selecetdItem.substring(0, selecetdItem.length - 1);
    sessionStorage.setItem('selectedTests', selecetdItem);
    let items = sessionStorage.getItem('selectedTests').split("|");
    //console.log(items);
    selectedItemCount = items.length;
    //console.log(selectedItemCount);
    // submit form
    let cart = document.getElementById("cartIcon");
    var json_items = JSON.stringify(items);
    // cart.href = "/showCart/" + selectedItemCount +"/ "+items;
    cart.href = "/showCart/" + selectedItemCount + "/ " + json_items;
}
const checkValid=()=>{
    let flag=0;
    let formElement = document.getElementById("addressForm");
    for (let i = 0; i < formElement.length-1;i++){
        if(i!=5){
            if(formElement.elements[i].value.length==0){
                formElement.elements[i].classList.remove("is-valid");
                formElement.elements[i].classList.add("is-invalid");
                flag=1;
            }else{
                formElement.elements[i].classList.remove("is-invalid");
                formElement.elements[i].classList.add("is-valid");
            }
        }
    }
    if (formElement.elements[2].value.length < 10 || formElement.elements[2].value.length>10) {
        formElement.elements[2].classList.remove("is-valid");
        formElement.elements[2].classList.add("is-invalid");
        flag=1;
    }
    if (formElement.elements[3].value <=0) {
        formElement.elements[3].classList.remove("is-valid");
        formElement.elements[3].classList.add("is-invalid");
        flag = 1;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formElement.elements[1].value)) {
        formElement.elements[1].classList.remove("is-invalid");
        formElement.elements[1].classList.add("is-valid");
    }else{
        formElement.elements[1].classList.remove("is-valid");
        formElement.elements[1].classList.add("is-invalid");
        flag=1;
    }
    if (formElement.elements[9].checked==true){
        formElement.elements[9].classList.remove("is-invalid");
        formElement.elements[9].classList.add("is-valid");
    }else{
        formElement.elements[9].classList.remove("is-valid");
        formElement.elements[9].classList.add("is-invalid");
        flag = 1;
    }
    if(flag==0){
        document.getElementById("addressForm").submit();
    }
}

var diapbleScrollChange1 = document.getElementById("inputPhno4");
diapbleScrollChange1.addEventListener("mousewheel",
    function (event) {
        this.blur()
    });
var diapbleScrollChange2 = document.getElementById("inputAmount4");
diapbleScrollChange2.addEventListener("mousewheel",
    function (event) {
        this.blur()
    });