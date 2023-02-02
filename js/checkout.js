// Exercise 7
function validate() {
	let error = 0;
	const form = document.getElementById('form')

	form.addEventListener('submit', (e) => {
		e.preventDefault()
		
		// Get the input fields
		let fName = document.getElementById("fName");
		let fLastN = document.getElementById("fLastN")
		let fEmail = document.getElementById("fEmail");
		let fPhone = document.getElementById("fPhone")
		let fPassword = document.getElementById("fPassword");
		
		// Get the error elements
		let errorName = document.getElementById("errorName");
		let errorEmail = document.getElementById("errorEmail");
		let errorLastN = document.getElementById("errorLastN");
		let errorPhone = document.getElementById("errorPhone");
		let errorPassword = document.getElementById("errorPassword");
		
		// Validate fields entered by the user: name, phone, password, and email
		if(fName.value == "" || fName.value.lenght < 3 || fName == /^[A-Za-z]+$/){
			error++;
			errorName.style.display = 'block';
			fName.style.border = 'solid #ff0000'
		}
		
		if(fLastN.value == "" || fLastN.value.lenght < 3 || fLastN == /^[A-Za-z]+$/){
			error++;
			errorLastN.style.display = 'block'
			fLastN.style.border = 'solid #ff0000'
		}

		if(fEmail.value == ""){
			error++;
			errorEmail.style.display= 'block'
			fEmail.style.border = 'solid #ff0000'
		}
		
		if(fPhone.value.lenght < 9 ||  fPhone != /^[0-9]+$/){
			error++;
			errorPhone.style.display = 'block'
			fPhone.style.border = 'solid #ff0000'
		}
		
		if(fPassword.value.lenght < 3 || fPassword != /^[A-Za-z0-9]*$/){
			error++
			errorPassword.style.display = 'block'
			fPassword.style.border = 'solid #ff0000'
		}
		
		if(error>0){
			alert("Error");
			
		}else{
			alert("OK");
		}
		
	})
}
