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
    const currentActiveTab = document.querySelector('.steps-tab.active');
    const newTab = tabs[clickedIndex];
    
    if (currentActiveTab === newTab || !newTab) return;
    
    if (currentActiveTab) {
        currentActiveTab.classList.remove('active');
        currentActiveTab.classList.add('leaving');
        
        setTimeout(() => {
            currentActiveTab.classList.remove('leaving');
        }, 500);
    }
    
    tabButtons.forEach(button => button.classList.remove('active'));
    tabButtons[clickedIndex].classList.add('active');
    
    newTab.classList.add('active');
    
    const items = newTab.querySelectorAll('.steps-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 100);
            item.style.transition = 'all 0.4s ease';
        });
    }, 50);
}

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('active')) {
            switchTab(index);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        setTimeout(() => {
            const items = tabs[0].querySelectorAll('.steps-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100 + 100);
                item.style.transition = 'all 0.4s ease';
            });
        }, 100);
    }

    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
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


// Функция для инициализации свайпера
function initSwiper(container) {
    const contFlex = container.querySelector('.js-swiper-container');
    const teamItems = container.querySelectorAll('.js-swipe-slide');
    const prevButton = container.querySelector('.swipe-button--left');
    const nextButton = container.querySelector('.swipe-button--right');
    const paginationDots = container.querySelectorAll('.swipe-pag span');
    
    let currentIndex = 0;
    const totalItems = teamItems.length;

    function updateSliderPosition() {
        if (teamItems.length === 0) return;
        
        const itemWidth = teamItems[0].offsetWidth;
        contFlex.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`;
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

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }

    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSliderPosition();
        });
    });

    contFlex.style.transition = 'transform 0.3s ease-in-out';

    updatePagination();

    window.addEventListener('resize', function() {
        updateSliderPosition();
    });

    return {
        update: updateSliderPosition,
        goNext: function() {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        },
        goPrev: function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        },
        goTo: function(index) {
            if (index >= 0 && index < totalItems) {
                currentIndex = index;
                updateSliderPosition();
            }
        }
    };
}

const swipers = [];

const swiperContainers = document.querySelectorAll('.js-swiper');

swiperContainers.forEach((container, index) => {
    const swiper = initSwiper(container);
    swipers.push({
        container: container,
        instance: swiper,
        id: index
    });
});

window.addEventListener('load', function() {
    swipers.forEach(swiper => {
        swiper.instance.update();
    });
});