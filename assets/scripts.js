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

  // ---------- Gallery lightbox (very simple) ----------
  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('click',()=>{
      // no-op stub; real lightbox out of scope for static demo
    });
  });
});
