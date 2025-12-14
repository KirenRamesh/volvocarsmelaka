document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar Effect ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu (UPDATED) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // This line enables the bars-to-'X' CSS animation:
            hamburger.classList.toggle('is-open'); 
        });
    }

    // --- Scroll Reveal Animation (Intersection Observer) ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- PDF Modal Logic (FIXED & IMPROVED) ---
    const modal = document.getElementById('pdfModal');
    const closeBtn = document.querySelector('.close');
    const pdfNameDisplay = document.getElementById('pdfName');
    const pdfViewerContainer = document.getElementById('pdfViewerContainer');
    
    window.openPdf = function(projectName, pdfPath) {
        pdfNameDisplay.innerText = projectName;
        
        // Clear previous content and insert the new iframe
        pdfViewerContainer.innerHTML = `<iframe src="${pdfPath}" style="width: 100%; height: 100%; border: none;"></iframe>`;

        modal.style.display = 'block';
    }
    
    // Close modal via the X button
    if(closeBtn) {
        closeBtn.addEventListener('click', () => { 
            modal.style.display = 'none'; 
            pdfViewerContainer.innerHTML = ''; // Clear iframe content when closing
        });
    }

    // Close modal when user clicks outside the modal content area
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            pdfViewerContainer.innerHTML = ''; // Clear iframe content when closing
        }
    });


    // --- DSR Calculator Logic ---
    const calculateBtn = document.getElementById('calculateDsr');
    if(calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const income = parseFloat(document.getElementById('income').value);
            const commitments = parseFloat(document.getElementById('commitments').value);
            const resultBox = document.getElementById('dsrResult');

            if(!income || !commitments) {
                alert("Please complete the financial fields.");
                return;
            }

            const dsr = (commitments / income) * 100;
            const roundedDsr = dsr.toFixed(2);

            resultBox.style.display = 'block';
            let message = '';
            let color = '';

            if(dsr <= 70) {
                color = '#4ade80'; // Green
                message = `<h4 style="color:${color}">Eligible (DSR: ${roundedDsr}%)</h4><p>Your financial health meets standard requirements.</p><br><a href="contact.html" class="btn-luxury">Proceed to Consultation</a>`;
            } else {
                color = '#f87171'; // Red
                message = `<h4 style="color:${color}">Requires Assistance (DSR: ${roundedDsr}%)</h4><p>Your DSR is high, but our financial team has specific structures to assist approval.</p><br><a href="https://wa.me/601188887202" class="btn-luxury">Speak to an Expert</a>`;
            }
            resultBox.innerHTML = message;
        });
    }

    // --- Auto-update Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
});
