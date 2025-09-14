function initFaqAccordions() {
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
                    if (window.innerWidth <= 639) {
                        item.style.maxHeight = '150px';
                    } else {
                        item.style.maxHeight = '122px';
                    }
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


let ticking = false;

function scrollEvent() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const header = document.querySelector('header');
            if (window.scrollY > 10) {
                header.classList.add('page-scroll');
            } else {
                header.classList.remove('page-scroll');
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', function() {
    scrollEvent()
});

scrollEvent()


const teamFlex = document.querySelector('.team-flex');
const teamItems = document.querySelectorAll('.team-item');
const prevButton = document.querySelector('.swipe-button--left');
const nextButton = document.querySelector('.swipe-button--right');
const paginationDots = document.querySelectorAll('.swipe-pag span');

let currentIndex = 0;
const itemWidth = teamItems[0].offsetWidth;
const totalItems = teamItems.length;

function updateSliderPosition() {
    teamFlex.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`;
    console.log(itemWidth)
    updatePagination();
}

function updatePagination() {
    paginationDots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

nextButton.addEventListener('click', function() {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateSliderPosition();
    }
});

prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
});

paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentIndex = index;
        updateSliderPosition();
    });
});

teamFlex.style.transition = 'transform 0.3s ease-in-out';
teamFlex.style.display = 'flex';
teamFlex.style.flexWrap = 'nowrap';

updatePagination();

window.addEventListener('resize', function() {
    itemWidth = teamItems[0].offsetWidth;
    updateSliderPosition();
});

