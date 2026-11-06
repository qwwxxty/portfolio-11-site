// Липка кнопка «Записатися»: ховаємо, коли видно форму запису.
const sticky = document.querySelector('.sticky');
const watch = [document.querySelector('.hero'), document.querySelector('#book')];
if (sticky && 'IntersectionObserver' in window) {
  const seen = new Set();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    sticky.classList.toggle('is-hidden', seen.size > 0);
  }, { threshold: 0.35 });
  watch.forEach((el) => el && io.observe(el));
}
// Відправка форми без перезавантаження (Formspree приймає fetch з Accept: application/json).
const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const ok = form.querySelector('.form__ok');
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.reset(); ok.textContent = 'Дякуємо! Ми передзвонимо.';
    } catch { ok.textContent = 'Не вийшло надіслати. Зателефонуйте нам, будь ласка.'; }
    ok.hidden = false;
  });
}
