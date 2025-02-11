const navLinks = document.querySelectorAll('nav li');
const sections = document.querySelectorAll('main section');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        link.classList.add('active');
        const sectionId = link.dataset.section;
        document.getElementById(sectionId).classList.add('active');
    });
});

document.querySelector('nav li[data-section="home"]').click();
