import React, { useState, useEffect } from 'react';

function Register({ onClose, onSwitchToLogin }) {
  // variavel para cada estado para controlar os campos do formulário
  const [userType, setUserType] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [studentLevel, setStudentLevel] = useState('');
  const [teacherArea, setTeacherArea] = useState('');
  const [teacherLevel, setTeacherLevel] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // estado para validar o formulário
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect observa as variáveis e recalcula se o formulário é válido
  useEffect(() => {
    const commonFieldsValid = name && email && phone && password && agreeTerms;
    let specificFieldsValid = false;

    if (userType === 'student') {
      specificFieldsValid = studentLevel !== '';
    } else if (userType === 'teacher') {
      specificFieldsValid = teacherArea !== '' && teacherLevel !== '';
    }
    
    setIsFormValid(commonFieldsValid && specificFieldsValid);

  }, [name, email, phone, password, agreeTerms, userType, studentLevel, teacherArea, teacherLevel]);

  //caso algum campo não for preenchido, se for aceita
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const formData = { userType, name, email, phone };
    console.log("Dados do Cadastro:", formData);
    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}!`);
    onClose();
  };


  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fas fa-user-plus me-2"></i>Cadastrar no EduCollab</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold">Você é:</label>
                <div className="user-type-selector">
                  <div 
                    className={`user-type-card ${userType === 'student' ? 'active' : ''}`}
                    onClick={() => setUserType('student')}
                  >
                    <i className="fas fa-user-graduate fa-2x mb-2"></i>
                    <h6>Aluno</h6>
                  </div>
                  <div
                    className={`user-type-card ${userType === 'teacher' ? 'active' : ''}`}
                    onClick={() => setUserType('teacher')}
                  >
                    <i className="fas fa-chalkboard-teacher fa-2x mb-2"></i>
                    <h6>Professor</h6>
                  </div>
                </div>
              </div>

              {/* Campos Comuns */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Senha</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>

              {/* Campos Condicionais de Aluno */}
              {userType === 'student' && (
                <div className="conditional-fields show">
                  <select className="form-select" value={studentLevel} onChange={e => setStudentLevel(e.target.value)} required>
                    <option value="">Selecione seu nível</option>
                    <option value="ensino-medio">Ensino Médio</option>
                    <option value="graduacao">Graduação</option>
                  </select>
                </div>
              )}

              {/* Campos Condicionais de Professor */}
              {userType === 'teacher' && (
                <div className="conditional-fields show">
                    <h6 className="fw-bold mb-3"><i className="fas fa-chalkboard-teacher me-2"></i>Informações do Professor</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="teacherArea" className="form-label">Área de Ensino</label>
                      <select className="form-select" id="teacherArea" value={teacherArea} onChange={e => setTeacherArea(e.target.value)} required>
                        <option value="">Selecione sua área</option>
                        <option value="matematica">Matemática</option>
                        <option value="portugues">Português</option>
                        <option value="historia">História</option>
                        <option value="geografia">Geografia</option>
                        <option value="biologia">Biologia</option>
                        <option value="quimica">Química</option>
                        <option value="fisica">Física</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="teacherLevel" className="form-label">Onde leciona</label>
                      <select className="form-select" id="teacherLevel" value={teacherLevel} onChange={e => setTeacherLevel(e.target.value)} required>
                        <option value="">Selecione o nível</option>
                        <option value="ensino-medio">Ensino Médio</option>
                        <option value="graduacao">Graduação</option>
                        <option value="ambos">Ambos</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-3 form-check mt-3">
                <input type="checkbox" className="form-check-input" id="agreeTerms" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} required />
                <label className="form-check-label" htmlFor="agreeTerms">
                  Concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
                <i className="fas fa-user-plus me-2"></i>Criar Conta
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0">Já tem uma conta? <a href="#" onClick={onSwitchToLogin}>Entre aqui</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;