// ============================================================
// APEX SAFETY NETS — site scripts
// ============================================================

const APEX = {
  phone: '+919493547222',
  phoneDisplay: '094935 47222',
  phone2: '+919493548222',
  whatsappNumber: '919493547222',
  address: '#185, NSK Salai Road, Vadapalani, Chennai, Tamil Nadu 600026',
  buildWhatsAppUrl(msg){
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
};

// ---------- Mobile nav toggle ----------
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.mobile-toggle');
  const nav=document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      toggle.classList.toggle('open');
      nav.classList.toggle('mobile-open');
    });
  }

  // ---------- Mobile nav dropdown toggle ----------
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownParent = document.querySelector('.dropdown');
  if(dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      if(window.innerWidth <= 960) {
        e.preventDefault();
        dropdownParent.classList.toggle('mobile-active');
      }
    });
  }

  // ---------- Booking form → WhatsApp ----------
  document.querySelectorAll('form.booking-form').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const name=(data.get('name')||'').toString().trim();
      const phone=(data.get('phone')||'').toString().trim();
      const area=(data.get('area')||'').toString().trim();
      const service=(data.get('service')||'').toString().trim();
      const message=(data.get('message')||'').toString().trim();

      if(!name || !phone){
        alert('Please enter your name and phone number.');
        return;
      }

      const lines=[
        '*New Booking Enquiry — Apex Safety Nets*',
        '',
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
      ];
      if(area) lines.push(`📍 *Area:* ${area}`);
      if(service) lines.push(`🔧 *Service:* ${service}`);
      if(message) lines.push(`📝 *Message:* ${message}`);
      lines.push('','Please contact me for a free site inspection.');

      window.open(APEX.buildWhatsAppUrl(lines.join('\n')),'_blank');
      const btn=form.querySelector('button[type=submit]');
      if(btn){
        const orig=btn.innerHTML;
        btn.innerHTML='✓ Redirecting to WhatsApp…';
        btn.disabled=true;
        setTimeout(()=>{btn.innerHTML=orig;btn.disabled=false;form.reset();},2500);
      }
    });
  });

  // ---------- Area search and filter directory ----------
  const searchInput = document.getElementById('area-search');
  const directoryItems = document.querySelectorAll('.directory-item');
  const gridContainer = document.querySelector('.directory-grid');
  
  if (searchInput && directoryItems.length > 0 && gridContainer) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'directory-empty';
    emptyMsg.style.display = 'none';
    emptyMsg.innerHTML = '🔍 No covered areas or pincodes match your search. Call us directly, we cover all of Chennai!';
    gridContainer.appendChild(emptyMsg);
    
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      let matchCount = 0;
      
      directoryItems.forEach(item => {
        const name = (item.getAttribute('data-name') || '').toLowerCase();
        const pincode = (item.getAttribute('data-pincode') || '');
        if (name.includes(q) || pincode.includes(q)) {
          item.style.display = 'flex';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      if (matchCount === 0) {
        emptyMsg.style.display = 'block';
      } else {
        emptyMsg.style.display = 'none';
      }
    });

    // Handle clicks on non-link chips
    directoryItems.forEach(item => {
      if (!item.classList.contains('is-link')) {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const name = item.getAttribute('data-name');
          const pincode = item.getAttribute('data-pincode');
          
          const areaInput = document.getElementById('bf-area');
          const form = document.querySelector('form.booking-form');
          
          if (areaInput) {
            areaInput.value = `${name} (${pincode})`;
            areaInput.style.transition = 'none';
            areaInput.style.backgroundColor = '#ffedd5';
            areaInput.style.borderColor = 'var(--orange)';
            setTimeout(() => {
              areaInput.style.transition = 'background-color 0.5s ease, border-color 0.5s ease';
              areaInput.style.backgroundColor = '';
              areaInput.style.borderColor = '';
            }, 50);
          }
          
          if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const nameInput = document.getElementById('bf-name');
            if (nameInput) {
              setTimeout(() => nameInput.focus(), 600);
            }
          }
        });
      }
    });
  }

  // ---------- Gallery lightbox (very simple) ----------
  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('click',()=>{
      // no-op stub; real lightbox out of scope for static demo
    });
  });
});
