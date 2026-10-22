// 엔터시스템 홈페이지 공통 동작 (모든 페이지)
(function () {
  // 휴대폰 메뉴: 링크를 누르거나, 바깥을 누르거나, Esc를 누르면 닫기
  var m = document.querySelector('.mnav');
  if (m) {
    m.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) m.removeAttribute('open'); });
    document.addEventListener('click', function (e) { if (m.hasAttribute('open') && !m.contains(e.target)) m.removeAttribute('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !m.hasAttribute('open')) return;
      m.removeAttribute('open');
      var s = m.querySelector('summary');
      if (s) s.focus(); // 닫은 뒤 포커스가 사라지지 않게 메뉴 버튼으로 돌려놓기
    });
  }
})();

// 설치 현장 사진·모니터링 화면 캡처: 누르면 크게 보기 (사진이 있는 페이지에서만 동작)
(function () {
  var btns = document.querySelectorAll('.photo button, .shot button');
  if (!btns.length) return;
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', '크게 보기');
  lb.tabIndex = -1;
  lb.innerHTML = '<img alt=""><button type="button" class="close" aria-label="닫기">&times;</button>';
  document.body.appendChild(lb);
  var im = lb.querySelector('img'), last = null;
  function off() {
    if (!lb.classList.contains('on')) return;
    lb.classList.remove('on');
    document.body.style.overflow = '';
    if (last) last.focus(); // 닫은 뒤 포커스를 눌렀던 사진으로 돌려놓기
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var s = b.querySelector('img');
      im.src = s.src;
      im.alt = s.alt;
      last = b;
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
      lb.focus();
    });
  });
  lb.addEventListener('click', off);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') off(); });
})();
