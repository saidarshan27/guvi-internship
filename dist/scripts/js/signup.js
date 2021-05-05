const signupForm = $(".signup-form");
const createAccountBtn = $(".create-account");

const creatingAccSpan = $(".creating-account-span");
const createAccSpan = $(".create-account-span");


signupForm.submit(function(e){
    e.preventDefault();
    if(signupForm.valid()){
        createAccSpan.addClass("hide");
        creatingAccSpan.removeClass("hide");
        creatingAccSpan.addClass("show");

        const url = $(this).attr("action");
        const formData = createFormData(".signup-form");
        
        fetchPost(url,formData).then(res=>{
            if(res.ok){
                res.json();
            }else{
                throw new Error(res.statusText);
            }
        })
        .then(data=>{
            signupSuccess();
        })
        .catch(e=>console.error(e))
    } 
})


function createFormData(formClassname){
    const inputFields = $(formClassname+" input");
    const formData = new FormData();
    inputFields.each(function(index,element){
        if(element.value){
            formData.append(element.name,element.value);
        }
    })
    return formData;
}

async function fetchPost(url,data){
    const response = await fetch(url,{
        method:"POST",
        mode:"same-origin",
        body:data
    });

    return response;
}

function showSnackbar() {
    const snackbar = document.querySelector(".signup-container .snackbar");
    snackbar.classList.add("show");
    setTimeout(() => snackbar.classList.remove("show"), 3000);
}

function signupSuccess(){
    const createAccountHTML = createAccountBtn.html();
    const errorIndingIcons =  document.querySelectorAll(".invalid-input-indicator i");

    // reset create account btn
    createAccSpan.removeClass("hide");
    createAccSpan.addClass("show");
    creatingAccSpan.addClass("hide");
    createAccountBtn.blur();
    
    // reset the form
    signupForm[0].reset();
    // remove error indicators
    errorIndingIcons.forEach(icon=>icon.remove());
    // show success message
    showSnackbar();
}