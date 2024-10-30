function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const response = document.getElementById('formResponse');

    if (name && email) {
        response.innerHTML = `Thank you, ${name}! We will contact you at ${email}.`;
    } else {
        response.innerHTML = "Please fill out all fields.";
    }
}
