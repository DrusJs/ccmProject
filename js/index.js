function initFaqAccordions() {
    const faqFlex = document.querySelector('.faq-flex');
    const accordions = document.querySelectorAll('.faq-accordion');
    const showMoreBtn = document.querySelector('.faq-show-more');
    
    accordions.forEach((accordion, index) => {
        if (index >= 5) {
            accordion.style.display = 'none';
        }
    });

    showMoreBtn.addEventListener('click', () => {
        const isShowingAll = showMoreBtn.classList.contains('active');
        
        if (!isShowingAll) {
            accordions.forEach((accordion, index) => {
                if (index >= 5) {
                    accordion.style.display = 'flex';
                }
            });
            showMoreBtn.classList.add('active');
            showMoreBtn.textContent = 'СКРЫТЬ ↑'; 
        } else {
            accordions.forEach((accordion, index) => {
                if (index >= 5) {
                        accordion.style.display = 'none';
                }
            });
            showMoreBtn.classList.remove('active');
            showMoreBtn.textContent = 'ПОКАЗАТЬ БОЛЬШЕ ↓'; 
        }
    });
    
    accordions.forEach(item => {
        const head = item.querySelector('.faq-accordion-head');

        item.style.transition = 'max-height 300ms ease-in-out';
        
        head.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                item.style.maxHeight = '122px';
                item.classList.remove('active');
            } else {
                item.classList.add('active');
                item.style.maxHeight = item.scrollHeight + 'px';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFaqAccordions);


const tabButtons = document.querySelectorAll('.steps-tab-button');
const tabs = document.querySelectorAll('.steps-tab');


function switchTab(clickedIndex) {
    tabButtons.forEach(button => button.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    tabButtons[clickedIndex].classList.add('active');
    tabs[clickedIndex].classList.add('active');
}

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('active')) {
            switchTab(index);
        }
    });
});

const burgerButton = document.querySelector('.burger-button')
const burgerMenu = document.querySelector('.header-inner-nav')
const headerLinks = document.querySelectorAll('.header-link')

burgerButton.addEventListener('click', ()=>{
    burgerButton.classList.toggle('active')
    burgerMenu.classList.toggle('active')
})

headerLinks.forEach(el=>{
    el.addEventListener('click', ()=>{
        burgerButton.classList.remove('active')
        burgerMenu.classList.remove('active')
    })
})

