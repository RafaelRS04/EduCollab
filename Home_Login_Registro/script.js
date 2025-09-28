document.addEventListener('DOMContentLoaded', function() {
            // tipo de usuario
            const userTypeCards = document.querySelectorAll('.user-type-card');
            const studentFields = document.getElementById('studentFields');
            const teacherFields = document.getElementById('teacherFields');
            const registerBtn = document.getElementById('registerBtn');
            let selectedUserType = null;

            userTypeCards.forEach(card => {
                card.addEventListener('click', function() {
                    // garante que só um seja ativo
                    userTypeCards.forEach(c => c.classList.remove('active'));
                    
                    // aciona somente o que foi selecionado
                    this.classList.add('active');
                    
                    // guarda qual tipo de usuario foi selecionado
                    selectedUserType = this.dataset.type;
                    
                    // condições
                    if (selectedUserType === 'student') {
                        studentFields.classList.add('show');
                        teacherFields.classList.remove('show');
                    } else if (selectedUserType === 'teacher') {
                        teacherFields.classList.add('show');
                        studentFields.classList.remove('show');
                    }
                    
                    // botap de registro só ativa se todos as condições estiverem feitas
                    checkFormValidity();
                });
            });

            function checkFormValidity() {
                const agreeTerms = document.getElementById('agreeTerms');
                const hasUserType = selectedUserType !== null;
                const termsAccepted = agreeTerms.checked;

                let specificFieldsValid = true;

                if (hasUserType) {
                    if (selectedUserType === 'student') {
                        const studentLevel = document.getElementById('studentLevel').value;
                        // Verifica se o campo do aluno está vazio
                        if (studentLevel === '') {
                            specificFieldsValid = false;
                        }
                    } else if (selectedUserType === 'teacher') {
                        const teacherArea = document.getElementById('teacherArea').value;
                        const teacherLevel = document.getElementById('teacherLevel').value;
                        // Verifica se os campos do professor estão vazios
                        if (teacherArea === '' || teacherLevel === '') {
                            specificFieldsValid = false;
                        }
                    }
                } else {
                    specificFieldsValid = false;
                }
                
                registerBtn.disabled = !(hasUserType && termsAccepted && specificFieldsValid);
            }

            // sensivel a qualquer mudança no botão de aceitar os termos
            document.getElementById('agreeTerms').addEventListener('change', checkFormValidity); //verifica sempre que o botao é selecionado

            // Adiciona ouvintes para os campos específicos de Aluno e Professor
            document.getElementById('studentLevel').addEventListener('change', checkFormValidity);
            document.getElementById('teacherArea').addEventListener('change', checkFormValidity);
            document.getElementById('teacherLevel').addEventListener('change', checkFormValidity);

            // processo de login (simulação)
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault(); //evita que a pagina recarregue
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                alert(`Login realizado com sucesso!\nEmail: ${email}`);
                
                //fecha o modulo
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
            });

            // processo de registro (simulação)
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
                
                const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                registerModal.hide();
                
                // reseta para um novo cadastro
                this.reset();
                userTypeCards.forEach(c => c.classList.remove('active'));
                studentFields.classList.remove('show');
                teacherFields.classList.remove('show');
                selectedUserType = null;
                registerBtn.disabled = true;
            });

            // apenas para suavizar a navegação
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
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