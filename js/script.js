/*
 * client‑seitige Skripte für die Fahrschule‑Seyis‑Website
 *
 * Dieses JavaScript implementiert das responsive Navigationsmenü
 * sowie eine einfache Formularvalidierung mit Live‑Rückmeldung.
 */

// Navigationstoggler steuert das Öffnen und Schließen des Mobilmenüs
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle?.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('active');
  });

  // Schließe das Menü, wenn ein Link geklickt wird (nur mobil)
  navMenu?.addEventListener('click', event => {
    if (event.target.matches('a')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Formularvalidierung
  const form = document.getElementById('contact-form');
  const responseEl = document.querySelector('.form-response');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    // Prüfe die HTML5‑Validität der Felder
    if (!form.checkValidity()) {
      responseEl.textContent = 'Bitte fülle alle Pflichtfelder korrekt aus.';
      responseEl.style.color = '#d12b2b';
      form.classList.add('was‑invalid');
      return;
    }
    // Formulardaten abrufen
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();
    // Mailto‑Link konstruieren für den Versand per E‑Mail
    const subject = 'Kontakt über Website Fahrschule Seyis';
    const body = `Name: ${name}\nE‑Mail: ${email}\nNachricht: ${message}`;
    const mailtoLink = `mailto:keremfs@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Browser öffnen Mailprogramm
    window.location.href = mailtoLink;
    // Erfolgsmeldung anzeigen
    responseEl.style.color = '#2a7c2a';
    responseEl.textContent =
      'Vielen Dank für deine Nachricht! Dein Mailprogramm wurde geöffnet.';
    // Formulardaten zurücksetzen
    form.reset();
    form.classList.remove('was‑invalid');
  });
});
