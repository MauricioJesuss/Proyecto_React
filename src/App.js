import React, { useState, useRef } from 'react';
import '../src/style.css';

const LandingPage = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(true); // Variable de estado para validar el correo electrónico
  const formRef = useRef(null);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const nombre = formData.get('nombre');
    const mensaje = formData.get('mensaje');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    
    // Validación del correo electrónico
    if (emailValid && (nombre.trim() === '' || mensaje.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (emailValid && /^[^\s@]+@(gmail\.com|hotmail\.com)$/.test(email) && !telefono.startsWith('0') && telefono.length === 10 && !/(.)\1{2,}|0{3}/.test(telefono)) {
      fetch('http://localhost/landing/insertar.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        setFormSubmitted(true);
        formRef.current.reset();
        setTimeout(() => setFormSubmitted(false), 5000);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
    } else if (emailValid) {
      if (!/^[^\s@]+@(gmail\.com|hotmail\.com)$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido de Gmail o Hotmail.');
      } else if (telefono.startsWith('0')) {
        alert('El número de teléfono no puede empezar con cero.');
      } else if (telefono.length !== 10) {
        alert('El número de teléfono debe tener 10 dígitos.');
      } else if (/(.)\1{3,}|0{3}/.test(telefono)) {
        alert('El número de teléfono no puede contener más de dos números repetidos consecutivos o tres ceros consecutivos.');
      }
    }
  };

  const validateEmail = (email) => {
    // Validación de longitud de palabras en el email
    const emailLetters = email.split('@')[0].replace(/[^a-zA-Z]/g, '');
    if (emailLetters.length < 5 || email.startsWith('.') || email.startsWith('@') || email.includes('.@') || email.includes('@.') || email.match(/^[.@]/) || email.includes('/') || /[+*/=%$&!#|<>]/.test(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  return (
    <div className="landing-page">
      {/* Menú de navegación */}
      <nav className="navigation">
        <ul>
          <li id="inicio-nav" className="nav-item"><a href="#inicio">Inicio</a></li>
          <li id="ofertas-nav" className="nav-item"><a href="#ofertas">Ofertas</a></li>
          <li id="quienes-somos-nav" className="nav-item"><a href="#quienes-somos">Quiénes somos</a></li>
          <li id="contacto-nav" className="nav-item"><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* Flecha hacia arriba */}
      {showScroll && (
        <div className="scroll-to-top" onClick={scrollTop}>
          <i className="fas fa-arrow-up"></i>
        </div>
      )}

      {/* Fondo difuminado */}
      <div className="background-overlay"></div>

      {/* Sección de Inicio */}
      <section id="inicio" className="section inicio-section">
        <div className="section-content">
          <div style={{ position: 'relative' }}>
            <img src="https://queplan.mx/sites/default/files/inline-images/megacable-internet-paquetes.jpg" alt="Banner" className="banner-image" />
            <h1 className="banner-text">Bienvenido a MegaCable</h1>
          </div>
          <p>La mejor opción para tus servicios de televisión por cable, internet y telefonía.</p>
        </div>
      </section>

      {/* Sección de Ofertas */}
      <section id="ofertas" className="section ofertas-section">
        <div className="section-content">
          <h2>Nuestras Ofertas</h2>
          <div className="offer-card">
            <img src="https://www.megacable.com.mx/images/disney/banner-pasos-combo.jpg" alt="Paquete de TV por cable" />
            <p>Paquete de TV por cable: $XX/mes</p>
          </div>
          <div className="offer-card">
            <img src="https://i.gifer.com/ML7C.gif" alt="Internet de alta velocidad" />
            <p>Internet de alta velocidad: $XX/mes</p>
          </div>
          <div className="offer-card">
            <img src="https://i.ytimg.com/vi/Tj0TxEYN4hw/maxresdefault.jpg" alt="Paquete de telefonía" />
            <p>Paquete de telefonía: $XX/mes</p>
          </div>
        </div>
      </section>


      <section id="quienes-somos" className="section quienes-somos-section">
        <div className="section-content">
          <h2>Quiénes Somos</h2>
          <p>MegaCable es una empresa líder en la provisión de servicios de comunicación en todo el país. Con años de experiencia, estamos comprometidos a ofrecer la mejor calidad y atención a nuestros clientes.</p>
          <div className="team-carousel">
            <div className="carousel-item">
              <img src="https://comparaiso.mx/sites/comparaiso.mx/files/styles/_default/public/megacable-adultos-825x293.png" alt="Equipo MegaCable" />
            </div>
            <div className="carousel-item">
              <img src="https://inversionistas.megacable.com.mx/images/bg/servicios_.jpg" alt="Equipo MegaCable" />
            </div>
            <div className="carousel-item">
              <img src="https://internetencasa.mx/sites/internetencasa.mx/files/styles/article_hero/public/fibra-optica-megacanle-825x293_0.png?itok=VnG8Cc4F" alt="Equipo MegaCable" />
            </div>
            {/* Agrega más imágenes según sea necesario */}
          </div>
          <p>¡Contamos con los premios y certificaciones más prestigiosos!</p>
        </div>
      </section>


      {/* Sección de Contacto */}
      <section id="contacto" className="section contacto-section">
        <div className="section-content">
          <h2>Contacto</h2>
          <p>Para más información, contáctanos:</p>   
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" />
            <input type="email" name="email" placeholder="Email" onBlur={(e) => validateEmail(e.target.value)} />
            {!emailValid && <p className="error-message">Por favor, ingresa un correo electrónico válido.</p>} {/* Mostrar mensaje de error si el correo no es válido */}
            <input type="tel" name="telefono" placeholder="Teléfono" pattern="[0-9]{10}" />
            <textarea name="mensaje" placeholder="Mensaje"></textarea>
            <button type="submit" className="btn">{formSubmitted ? 'Formulario enviado' : 'Enviar mensaje'}</button>
          </form>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Contacto</h4>
          <p>Empresa: MegaCable</p>
          <p>Número de teléfono: +1 234 567 890</p>
          <p>Correo electrónico: info@megacable.com</p>
          {/* Agrega aquí más información de contacto si es necesario */}
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;











