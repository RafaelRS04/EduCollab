document.addEventListener('DOMContentLoaded', function() {

    // User type selection
    const userTypeCards = document.querySelectorAll('.user-type-card');
    const studentFields = document.getElementById('studentFields');
    const teacherFields = document.getElementById('teacherFields');
    const registerBtn = document.getElementById('registerBtn');
    let selectedUserType = null;

    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            userTypeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedUserType = this.dataset.type;

            if (selectedUserType === 'student') {
                studentFields.classList.add('show');
                teacherFields.classList.remove('show');
            } else if (selectedUserType === 'teacher') {
                teacherFields.classList.add('show');
                studentFields.classList.remove('show');
            }

            checkFormValidity();
        });
    });

    // Form validation
    function checkFormValidity() {
        const agreeTerms = document.getElementById('agreeTerms');
        const hasUserType = selectedUserType !== null;
        const termsAccepted = agreeTerms.checked;
        let specificFieldsValid = true;

        if (hasUserType) {
            if (selectedUserType === 'student') {
                const studentLevel = document.getElementById('studentLevel').value;
                if (studentLevel === '') specificFieldsValid = false;
            } else if (selectedUserType === 'teacher') {
                const teacherArea = document.getElementById('teacherArea').value;
                const teacherLevel = document.getElementById('teacherLevel').value;
                if (teacherArea === '' || teacherLevel === '') specificFieldsValid = false;
            }
        } else {
            specificFieldsValid = false;
        }

        registerBtn.disabled = !(hasUserType && termsAccepted && specificFieldsValid);
    }

    document.getElementById('agreeTerms').addEventListener('change', checkFormValidity);
    document.getElementById('studentLevel').addEventListener('change', checkFormValidity);
    document.getElementById('teacherArea').addEventListener('change', checkFormValidity);
    document.getElementById('teacherLevel').addEventListener('change', checkFormValidity);

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            userType: selectedUserType,
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            password: document.getElementById('registerPassword').value
        };

        if (selectedUserType === 'student') {
            formData.level = document.getElementById('studentLevel').value;
        } else if (selectedUserType === 'teacher') {
            formData.area = document.getElementById('teacherArea').value;
            formData.teachingLevel = document.getElementById('teacherLevel').value;
        }

        console.log('Dados do cadastro:', formData);
        alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${formData.name}!\nTipo: ${selectedUserType === 'student' ? 'Aluno' : 'Professor'}`);

        // Redireciona conforme tipo
        if (selectedUserType === 'teacher') {
            window.location.href = "home_professor.html";
        } else {
            window.location.href = "index.html";
        }
    });

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        alert(`Login realizado com sucesso!\nEmail: ${email}`);

        // Direcionar para home do professor (exemplo)
        window.location.href = "home_professor.html";

        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
