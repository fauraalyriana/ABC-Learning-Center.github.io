$("span.addnew").on("click", function () {
    document.querySelector(".popup").classList.add("active");
});

$(".close-btn").on("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

if (localStorage.getItem("formData") != null) {
    let jsonFormData = JSON.parse(localStorage.getItem("formData"));

    let table = `<tr>`;
    jsonFormData.map((value, index) => {
        table += `<td style="text-align: center;">${index + 1}</td>
  <td>${value.name}</td>
  <td>${value.email}</td>
  <td>${value.contactNumber}</td>
  <td>${value.nation}</td>
  <td>${value.course}</td>
  <td>${value.typeclass}</td>
  <td><button id="${index}" class="edit">Edit</button></td>
  <td><button id="${index}" class="delete">Delete</button></td>
  </tr>`;
    });

    document.getElementById("data-table").insertAdjacentHTML("beforeend", table);
}

if (
    localStorage.getItem("formData") == "[]" ||
    localStorage.getItem("formData") == null
) {
    const noContent = `<tr><td colspan="8" align="center">No Data</td></tr>`;
    document
        .getElementById("data-table")
        .insertAdjacentHTML("beforeend", noContent);
}

$(".close-btn2").on("click", function () {
    event.preventDefault();
    popup.classList.remove("active2");
    formEditData.reset();
});

// add
const formAddData = document.querySelector(".leadRegistration");

formAddData.addEventListener("submit", (event) => {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email-register").val();
    var contactNumber = $("#phone").val();
    var nation = $("#nation").val();
    var course = $("#course").val();
    var typeclass = $("#typeclass").val();

    if  (name === "" || email === "" || contactNumber === "" || nation === "" ||
        course === null || typeclass === null) {
        alert('Please fill all the forms!');
        addValidate();
    } else {
        addRegister();
        popup.classList.remove("active2");
        formAddData.reset();
        location.reload();
    }
});

// edit
const formEditData = document.querySelector(".leadEdit");
const popup = document.querySelector(".popup2");

if (localStorage.getItem("formData") != null) {
    const btnEdit = document.getElementsByClassName("edit");

    for (let btn of btnEdit) {
        btn.addEventListener("click", (event) => {
            popup.classList.add("active2");
            const dataID = event.target.id;

            editData(dataID);
        });
    }
}

function editData(ID) {
    let storedData = JSON.parse(localStorage.getItem("formData"));

    const {
        name,
        email,
        contactNumber,
        nation,
        course,
        typeclass
    } =
    storedData[ID];

    $(".editName").val(name);
    $(".editEmail").val(email);
    $(".editContact").val(contactNumber);
    $(".editNation").val(nation);
    $(".editCourse").val(course);
    $(".editTypeclass").val(typeclass);

    formEditData.addEventListener("submit", (event) => {
        event.preventDefault();
        var name = $(".editName").val();
        var email = $(".editEmail").val();
        var contactNumber = $(".editContact").val();
        var nation = $(".editNation").val();
        var course = $(".editCourse").val();
        var typeclass = $(".editTypeclass").val();

        if (name === "" || email === "" || contactNumber === "" || nation === "") {
            alert('Please fill all the forms!');
            editValidate();
        } else {
            storedData[ID] = {
                name: $(".editName").val(),
                email: $(".editEmail").val(),
                contactNumber: $(".editContact").val(),
                nation: $(".editNation").val(),
                course: $(".editCourse").val(),
                typeclass: $(".editTypeclass").val(),
            };

            localStorage.setItem("formData", JSON.stringify(storedData));
            popup.classList.remove("active2");
            formEditData.reset();
            location.reload();
        }
    });
}

// delete
if (localStorage.getItem("formData") != null) {
    const btnDelete = document.getElementsByClassName("delete");

    for (let btn of btnDelete) {
        btn.addEventListener("click", (event) => {
            const dataID = event.target.id;
            deleteData(dataID);
        });
    }
}

function deleteData(ID) {
    let storedData = JSON.parse(localStorage.getItem("formData"));
    storedData.splice(ID, 1);
    localStorage.setItem("formData", JSON.stringify(storedData));
    location.reload();
}

function addRegister() {
    if (localStorage.getItem("formData") === null) {
      let formData = [];
  
      formData.push({
        name: $("#name").val(),
        email: $("#email-register").val(),
        contactNumber: $("#phone").val(),
        nation: $("#nation").val(),
        course: $("#course").val(),
        typeclass: $("#typeclass").val(),
      });
  
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      let storedData = JSON.parse(localStorage.getItem("formData"));
  
      const formData = {
        name: $("#name").val(),
        email: $("#email-register").val(),
        contactNumber: $("#phone").val(),
        nation: $("#nation").val(),
        course: $("#course").val(),
        typeclass: $("#typeclass").val(),
      };
  
      storedData.push(formData);
      localStorage.setItem("formData", JSON.stringify(storedData));
    }
  }

jQuery.validator.addMethod("noSpace", function (value, element) {
    return value == '' || value.trim().length != 0;
}, "No space please and don't leave it empty");

jQuery.validator.addMethod("customEmail", function (value, element) {
    return this.optional(element) ||
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
}, "Please enter valid email address!");

jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
}, "Please specify a valid phone number");

$.validator.addMethod("alphanumeric", function (value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");

function addValidate(){
    var $leadRegistrationForm = $('#leadRegistration');

    if ($leadRegistrationForm.length) {
        $leadRegistrationForm.validate({
            rules: {
                email: {
                    required: true,
                    customEmail: true
                },
                name: {
                    required: true
                },
                phone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                nation: {
                    required: true
                },
                course: {
                    required: true
                },
                typeclass: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Please enter email!',
                    email: 'Please enter valid email!'
                },
                name: {
                    required: 'Please enter full name!'
                },
                phone: {
                    required: 'Please enter contact number!'
                },
                nation: {
                    required: 'Please enter your nation!'
                },
                course: {
                    required: 'Please select course!'
                },
                typeclass: {
                    required: 'Please select type class!'
                },
                submitHandler: function(form) {
                    form.submit();
                }
            } 
        });
    }
}

function editValidate() {
    var $leadEditForm = $('#leadEdit');

    if ($leadEditForm.length) {
        $leadEditForm.validate({
            rules: {
                email: {
                    required: true,
                    customEmail: true
                },
                name: {
                    required: true
                },
                phone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                nation: {
                    required: true
                },
                course: {
                    required: true
                },
                typeclass: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Please enter email!',
                    email: 'Please enter valid email!'
                },
                name: {
                    required: 'Please enter full name!'
                },
                phone: {
                    required: 'Please enter contact number!'
                },
                nation: {
                    required: 'Please enter your nation!'
                },
                course: {
                    required: 'Please select course!'
                },
                typeclass: {
                    required: 'Please select type class!'
                },
            }
        });
    }
}