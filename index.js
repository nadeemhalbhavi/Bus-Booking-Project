function handleFilter(event){
    event.preventDefault();
    const filter = document.getElementById("filter").value;
    const bookings = document.getElementsByClassName("booking-li")

    if (filter === "all"){
        axios.get("https://crudcrud.com/api/7ed6993edcb045e3a9869401257f59fc/bookingData")
        .then((res)=>{

            for(var i = 0; i<res.data.length; i++){
                displayOnScreen(res.data[i])
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    else{
        for (i=0; i < bookings.length; i++){

            if (bookings[i].innerHTML.includes(filter)){
                bookings[i].style.display = 'block'
            }
            
            else{
                bookings[i].style.display = 'none'
            }
        }  
    }

      

}




window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/7ed6993edcb045e3a9869401257f59fc/bookingData")
    .then((res)=>{

        for(var i = 0; i<res.data.length; i++){
            displayOnScreen(res.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})



function handleFormSubmit(event){
    event.preventDefault();
    
    const bookingDetails = {
        name : event.target.name.value,
        email : event.target.email.value,
        phone : event.target.phone.value,
        carNumber : event.target.carNumber.value
    }
    axios
    .post("https://crudcrud.com/api/7ed6993edcb045e3a9869401257f59fc/bookingData",bookingDetails)
    .then((response)=>{
        displayOnScreen(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })


    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    

}


function displayOnScreen(data){
    const ul = document.querySelector("ul")
    const userItem = document.createElement("li");
    userItem.className = "booking-li"
    userItem.appendChild(
        document.createTextNode(`${data.name} ${data.email} ${data.phone} ${data.carNumber}`)
    )
    const deleteBtn = document.createElement("button");
    deleteBtn.value = "Delete"
    deleteBtn.innerHTML = "Delete"
    userItem.appendChild(deleteBtn)

    const editBtn = document.createElement("button");
    editBtn.value = "edit"
    editBtn.innerHTML = "Edit"
    userItem.appendChild(editBtn)
    
    ul.appendChild(userItem)


    deleteBtn.addEventListener("click",(event)=>{
        axios.delete(`https://crudcrud.com/api/7ed6993edcb045e3a9869401257f59fc/bookingData/${data._id}`)
        .then((res)=>{

            ul.removeChild(event.target.parentElement)
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    editBtn.addEventListener("click",(event)=>{
        axios.delete(`https://crudcrud.com/api/7ed6993edcb045e3a9869401257f59fc/bookingData/${data._id}`)
        .then((res)=>{

            ul.removeChild(event.target.parentElement)
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;

        })
        .catch((err)=>{
            console.log(err)
        })
    })

   
}











    


