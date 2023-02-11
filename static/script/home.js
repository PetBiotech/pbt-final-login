window.onresize = function () {
    if (window.innerWidth > 950) {
        document.getElementById("navRight").style.display = "block";
        document.getElementById("hamNav").style.display = "none";
        document.getElementById("crossNav").style.display = "none";
        document.getElementById("navCutBody").style.display = "none";
    } else {
        document.getElementById("navRight").style.display = "none";
        document.getElementById("hamNav").style.display = "block";
        document.getElementById("crossNav").style.display = "none";
        document.getElementById("navCutBody").style.display = "none";
    }
}
window.onscroll=function(){
    let cartIcon=document.getElementById("cartIcon");
    let moveUpIcon = document.getElementById("moveUpIcon");
    let counterBody = document.getElementById("counterBody");
    let counterBodyY = counterBody.offsetTop;
    if (window.scrollY < 100) {
        cartIcon.style.animationName = "moveDown";
        moveUpIcon.style.animationName = "slideOut";
        setTimeout(500, function () {
            moveUpIcon.style.display = "none";
        })
    }
    if (window.scrollY > 50) {
        cartIcon.style.animationName="moveUp";
        moveUpIcon.style.display="block";
        moveUpIcon.style.animationName="slideIn";
        if (window.scrollY > counterBodyY - (window.innerHeight / 2)) {
            playNumbers1();
            playNumbers2();
            playNumbers3();
            playNumbers4();
        }
    }
}

window.onload=function(){
    document.getElementById("loadingScreen").style.display = "none";
    let items = sessionStorage.getItem('selectedTests').split("|");
    //console.log(items);
    let selectedItemCount = items.length;
    //console.log(selectedItemCount);
    let itemId='';
    for(let n=0;n<items.length;n++){
        if(items[n].substring(0,1)=='c'){
            itemId=items[n].substring(5,items[n].length);
            let id = "checkboxId" + itemId;
            document.getElementById(id).checked=true;
            document.getElementById("checkbox" + itemId).style.border = "3px dashed rgba(0, 174, 0,1)";
            document.getElementById("checkbox" + itemId).style.backgroundColor = "rgb(190, 255, 190,0.1)";
        } else if (items[n].substring(0, 1) == 'f') {
            let falseId = items[n].substring(5, items[n].length);
            itemId=parseInt(falseId)+5;
            let id = "checkboxId" + itemId;
            document.getElementById(id).checked = true;
            document.getElementById("checkbox" + itemId).style.border = "3px dashed rgba(0, 174, 0,1)";
            document.getElementById("checkbox" + itemId).style.backgroundColor = "rgb(190, 255, 190,0.1)";
        } else if (items[n].substring(0, 1) == 'a') {
            let falseId = items[n].substring(5, items[n].length);
            itemId = parseInt(falseId) + 9;
            let id = "checkboxId" + itemId;
            document.getElementById(id).checked = true;
            document.getElementById("checkbox" + itemId).style.border = "3px dashed rgba(0, 174, 0,1)";
            document.getElementById("checkbox" + itemId).style.backgroundColor = "rgb(190, 255, 190,0.1)";
        }
    }
}
//Smooth scroll Affect

$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                    scrollTop: $(hash).offset().top
                },
                500,
                function () {
                    // window.location.hash = hash - 72;
                    window.location.hash = hash + 0;
                }
            );
        }
    });
});