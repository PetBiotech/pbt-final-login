const openNav = (n,m) => {
    let navBody = document.getElementById("navRight");
    let hamburger = document.getElementById("hamNav");
    let cross = document.getElementById("crossNav");
    let navCut = document.getElementById("navCutBody");
    if (m == 2) {
        let checkIfHamUsed = getComputedStyle(hamburger);
        let checkIfCrossUsed = getComputedStyle(cross);
        if (checkIfHamUsed.display == "none" && checkIfCrossUsed.display == "none") {
            return;
        }
    }
    if (!n) {
        navBody.style.animationName = "slideOut";
        // setTimeout(500, function () {
        //     navBody.style.display = "none";
        // });
        navBody.style.display = "none";
        hamburger.style.display = "Block";
        cross.style.display = "none";
        navCut.style.display = "none";
    } else {
        navBody.style.animationName = "slideIn";
        navBody.style.display = "block";
        hamburger.style.display = "none";
        cross.style.display = "block";
        navCut.style.display = "block";
    }
};