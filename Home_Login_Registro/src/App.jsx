import { useState } from 'react'
import Navbar from './Componentes/Navbar';
import Herosection from './Componentes/Herosection';
import Features from './Componentes/Features';
import Footer from './Componentes/Footer';
import Login from './Componentes/Login';
import Register from './Componentes/Register';

function App() {
  // estado para controlar qual está aberto: login, registro ou nenhum
  const [activeModal, setActiveModal] = useState(null);

  // atualiza o estado
  const handleOpenLogin = () => setActiveModal('login');
  const handleOpenRegister = () => setActiveModal('register');
  const handleCloseModal = () => setActiveModal(null);

  const switchToRegister = () => {
    handleCloseModal();
    handleOpenRegister();
  };

  const switchToLogin = () => {
    handleCloseModal();
    handleOpenLogin();
  };


  return (
    <>
      <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />
      <main>
        <Herosection onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />
        <Features />
      </main>
      <Footer />

      {/* renderização condicional */}
      {activeModal === 'login' && <Login onClose={handleCloseModal} onSwitchToRegister={switchToRegister} />}
      {activeModal === 'register' && <Register onClose={handleCloseModal} onSwitchToLogin={switchToLogin} />}
      
      {/* fundo escuro quando um modal está aberto */}
      {activeModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default App;