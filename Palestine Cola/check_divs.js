const fs = require('fs');
const files = ['products.html', 'about.html', 'mission.html', 'faq.html', 'contact.html', 'login.html', 'register.html'];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const openDivs = (content.match(/<div/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    console.log(`${file}: <div count=${openDivs}, </div> count=${closeDivs}, diff=${openDivs - closeDivs}`);
    if (openDivs !== closeDivs) {
        console.error(`ERROR: Div mismatch in ${file}`);
    }
});
