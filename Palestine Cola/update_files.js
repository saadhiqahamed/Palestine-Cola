const fs = require('fs');
const path = require('path');

const files = ['products.html', 'about.html', 'mission.html', 'faq.html', 'contact.html', 'login.html', 'register.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add CSS link
    if (!content.includes('inner-pages-premium.css')) {
        content = content.replace(/(<link[^>]+href="style\.css"[^>]*>)/i, '$1\n    <link rel="stylesheet" href="inner-pages-premium.css" />');
    }

    // Add animation classes generically (e.g. section titles fade up)
    content = content.replace(/class="([^"]*section-heading[^"]*)"/g, 'class="$1 ip-fade-up"');
    content = content.replace(/class="([^"]*page-hero-title[^"]*)"/g, 'class="$1 ip-fade-up"');
    content = content.replace(/class="([^"]*product-row [^"]*)"/g, 'class="$1 ip-fade-up"');
    content = content.replace(/class="([^"]*pillar-card[^"]*)"/g, 'class="$1 ip-fade-up"');
    
    // Add specific auth classes
    if (file === 'login.html' || file === 'register.html') {
        content = content.replace(/class="([^"]*auth-left[^"]*)"/g, 'class="$1 auth-left-premium"');
        content = content.replace(/class="([^"]*auth-card[^"]*)"/g, 'class="$1 auth-card-premium ip-fade-up"');
        content = content.replace(/class="([^"]*auth-img[^"]*)"/g, 'class="$1 auth-can-img"');
    }

    // Add specific FAQ modifications
    if (file === 'faq.html') {
        let qNum = 1;
        const badges = ['badge-product', 'badge-company', 'badge-distribution', 'badge-foundation'];
        const badgeNames = ['Product', 'Company', 'Distribution', 'Foundation'];
        
        content = content.replace(/<button class="faq-question">\s*<span>(.*?)<\/span>/g, (match, text) => {
            if(text.includes('faq-num')) return match; // already modified
            const numStr = qNum.toString().padStart(2, '0');
            const badgeIdx = qNum % 4;
            const res = `<button class="faq-question">\n              <span><em class="faq-num">Q${numStr}</em>${text}</span>\n              <span class="faq-badge ${badges[badgeIdx]}">${badgeNames[badgeIdx]}</span>`;
            qNum++;
            return res;
        });
    }

    // Contact form inputs modification
    if (file === 'contact.html') {
        content = content.replace(/class="([^"]*contact-info-card[^"]*)"/g, 'class="$1 contact-info-card ip-fade-left"');
        content = content.replace(/class="([^"]*contact-icon[^"]*)"/g, 'class="$1 contact-icon-circle"');
        content = content.replace(/class="([^"]*form-group[^"]*)"/g, 'class="$1 premium-input-group"');
        content = content.replace(/class="([^"]*btn-submit[^"]*)"/g, 'class="$1 btn-premium-submit"');
    }
    
    // Products page modifications
    if (file === 'products.html') {
        let pNum = 1;
        content = content.replace(/<div class="product-info-side">/g, match => {
            const numStr = pNum.toString().padStart(2, '0');
            const res = `<div class="product-info-side">\n            <div class="product-number">${numStr}</div>`;
            pNum++;
            return res;
        });
        
        content = content.replace(/<h2 class="product-row-name">(.*?)<\/h2>/g, '<h2 class="product-row-name">$1</h2>\n            <div class="product-accent-line"></div>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

// Update script.js
let scriptContent = fs.readFileSync('script.js', 'utf8');
if (!scriptContent.includes('ip-revealed')) {
    const observerCode = `
// Premium Inner Pages Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const ipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ip-revealed');
                ipObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.ip-fade-up, .ip-fade-left, .ip-fade-right, .ip-scale-in').forEach(el => {
        ipObserver.observe(el);
    });
});
`;
    fs.writeFileSync('script.js', scriptContent + observerCode, 'utf8');
}
console.log('Update complete.');
