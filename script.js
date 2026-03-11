// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== SUPABASE INITIALIZATION ====================
const SUPABASE_URL = 'https://ytrqexmpsmkptkjyofgt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cnFleG1wc21rcHRranlvZmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDYxNDUsImV4cCI6MjA1NzI4MjE0NX0.P7hbHmHeYq4rXY2z5P6i_l3kIepyEShR9E39W4k4U3c';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== CONTACT FORM HANDLER ====================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: contactForm.name.value.trim(),
            email: contactForm.email.value.trim(),
            phone: contactForm.phone.value.trim() || null,  // optional
            message: contactForm.message.value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            formStatus.innerHTML = '<p style="color: red;">Please fill in all required fields.</p>';
            return;
        }

        // Disable button during submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Insert into Supabase table 'quote_requests'
            const { error } = await supabase
                .from('quote_requests')
                .insert([formData]);

            if (error) throw error;

            // Success message
            formStatus.innerHTML = '<p style="color: green;">✓ Thank you! We’ll get back to you soon.</p>';
            contactForm.reset();
        } catch (error) {
            console.error('Supabase error:', error);
            formStatus.innerHTML = '<p style="color: red;">✗ Something went wrong. Please try again later.</p>';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
    });
}