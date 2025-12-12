function submitFeedback() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let email = document.getElementById('email').value;
    let job = document.getElementById('job').value;
    let designation = document.getElementById('designation').value;
    let productType = document.getElementById('productType').value;
    let feedback = document.getElementById('feedbackText').value;

    if (name === '' || age === '' || email === '' || job === '' || designation === '' || productType === '' || feedback === '') {
        alert('Please fill all the fields before submitting the feedback.');
        return;
    }

    alert('Thank you for your valuable feedback')

    document.getElementById('userName').innerHTML = name;
    document.getElementById('userAge').innerHTML = age;
    document.getElementById('userEmail').innerHTML = email;
    document.getElementById('userJob').innerHTML = job;
    document.getElementById('userDesignation').innerHTML = designation;
    document.getElementById('userProductChoice').innerHTML = productType;
    document.getElementById('userFeedback').innerHTML = feedback;

    document.getElementById('userInfo').style.display = 'block';
}

const submitButton = document.getElementById('submitBtn');
submitButton.onclick = submitFeedback;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitFeedback();
    }
})
