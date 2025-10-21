// Enhanced security for registration form with anti-repetitive submission protection
const scriptURL = 'https://script.google.com/macros/s/AKfycbz9yFCtzH9lEw7n4OZkbPW3gTg2FkMbu10vmMivQH_AD7sHEkm_wFFnrFUCvaKw96DU/exec'

// Anti-repetitive submission protection
class FormSubmissionProtector {
    constructor() {
        this.submissionKey = 'autocross_registration_submitted';
        this.lastSubmissionTime = 'autocross_last_submission';
        this.formTokenKey = 'autocross_form_token';
        this.rateLimitMs = 120000; // 2 minutes between submissions
        this.maxSubmissionsPerHour = 5; // Increased to 5 per hour
        this.submissionsKey = 'autocross_submissions_count';
        this.submissionsResetTime = 'autocross_submissions_reset';
    }

    // Generate unique form token
    generateFormToken() {
        const token = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15) + 
                     Date.now().toString();
        sessionStorage.setItem(this.formTokenKey, token);
        return token;
    }

    // Get or create form token
    getFormToken() {
        let token = sessionStorage.getItem(this.formTokenKey);
        if (!token) {
            token = this.generateFormToken();
        }
        return token;
    }

    // Check if form was recently submitted (within 2 minutes)
    isRecentlySubmitted() {
        const lastSubmission = localStorage.getItem(this.lastSubmissionTime);
        if (!lastSubmission) return false;

        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
        return timeSinceLastSubmission < this.rateLimitMs;
    }

    // Mark as submitted (but allow resubmission after cooldown)
    markAsSubmitted() {
        localStorage.setItem(this.lastSubmissionTime, Date.now().toString());
        this.incrementSubmissionCount();
    }

    // Check rate limiting
    isRateLimited() {
        return this.isRecentlySubmitted();
    }

    // Check hourly submission limit
    isHourlyLimitExceeded() {
        const resetTime = localStorage.getItem(this.submissionsResetTime);
        const now = Date.now();
        
        // Reset counter if an hour has passed
        if (!resetTime || (now - parseInt(resetTime)) > 3600000) {
            localStorage.setItem(this.submissionsResetTime, now.toString());
            localStorage.setItem(this.submissionsKey, '0');
            return false;
        }

        const submissionsCount = parseInt(localStorage.getItem(this.submissionsKey) || '0');
        return submissionsCount >= this.maxSubmissionsPerHour;
    }

    // Increment submission counter
    incrementSubmissionCount() {
        const currentCount = parseInt(localStorage.getItem(this.submissionsKey) || '0');
        localStorage.setItem(this.submissionsKey, (currentCount + 1).toString());
    }

    // Reset submission state (for testing or admin use)
    resetSubmissionState() {
        sessionStorage.removeItem(this.formTokenKey);
        localStorage.removeItem(this.lastSubmissionTime);
        localStorage.removeItem(this.submissionsKey);
        localStorage.removeItem(this.submissionsResetTime);
    }

    // Get remaining time until next submission allowed
    getTimeUntilNextSubmission() {
        const lastSubmission = localStorage.getItem(this.lastSubmissionTime);
        if (!lastSubmission) return 0;

        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
        const remainingTime = this.rateLimitMs - timeSinceLastSubmission;
        return Math.max(0, remainingTime);
    }

    // Get submission count for current hour
    getCurrentHourSubmissions() {
        const resetTime = localStorage.getItem(this.submissionsResetTime);
        const now = Date.now();
        
        if (!resetTime || (now - parseInt(resetTime)) > 3600000) {
            return 0;
        }
        
        return parseInt(localStorage.getItem(this.submissionsKey) || '0');
    }
}

// Initialize form protector
const formProtector = new FormSubmissionProtector();

// Input validation and sanitization
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '').trim();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Remove all non-digit characters except +
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Philippine phone number patterns:
    // +639XXXXXXXXX (international format - 13 digits total)
    // 09XXXXXXXXX (local format starting with 09 - 11 digits total)
    // 9XXXXXXXXX (local format without 0 - 10 digits total)
    
    // Check for international format (+639XXXXXXXXX)
    if (cleanedPhone.startsWith('+63') && cleanedPhone.length === 13) {
        return /^\+639\d{9}$/.test(cleanedPhone);
    }
    
    // Check for local format (09XXXXXXXXX)
    if (cleanedPhone.startsWith('09') && cleanedPhone.length === 11) {
        return /^09\d{9}$/.test(cleanedPhone);
    }
    
    // Check for local format without 0 (9XXXXXXXXX)
    if (cleanedPhone.startsWith('9') && cleanedPhone.length === 10) {
        return /^9\d{9}$/.test(cleanedPhone);
    }
    
    return false;
}

function validateForm(formData) {
    const errors = [];
    
    // Required field validation
    const requiredFields = ['full-name', 'mobile-number', 'email', 'birthdate', 'emergency-contact', 'car-make-model', 'car-year', 'engine-size', 'transmission', 'turbo-supercharged', 'experience-level', 'license-number', 'helmet', 't-shirt-size', 'help-organize'];
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            errors.push(`${field.replace('-', ' ')} is required`);
        }
    });
    
    // Email validation
    const email = formData.get('email');
    if (email && !validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phone = formData.get('mobile-number');
    if (phone && !validatePhone(phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Car year validation
    const carYear = parseInt(formData.get('car-year'));
    if (carYear && (carYear < 1900 || carYear > new Date().getFullYear() + 1)) {
        errors.push('Please enter a valid car year (YYYY format, between 1900 and ' + (new Date().getFullYear() + 1) + ')');
    }
    
    // Engine size validation (dropdown format)
    const engineSize = formData.get('engine-size');
    if (!engineSize || engineSize === '') {
        errors.push('Please select an engine size from the dropdown');
    }
    
    return errors;
}

// Enhanced form submission with comprehensive security
const form = document.forms['registration-form'];
let currentStepIndex = 0;

function getSteps() {
    return Array.from(document.querySelectorAll('.form-step'));
}

function getStepperItems() {
    return Array.from(document.querySelectorAll('.stepper .step'));
}

function showStep(index) {
    const steps = getSteps();
    const stepper = getStepperItems();
    currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, i) => {
        step.classList.toggle('active', i === currentStepIndex);
    });

    stepper.forEach((el, i) => {
        el.classList.toggle('current', i === currentStepIndex);
        el.classList.toggle('completed', i < currentStepIndex);
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submit');
    // Keep prev button space so Next stays on the right on step 0
    prevBtn.style.display = 'inline-block';
    if (currentStepIndex === 0) {
        prevBtn.style.visibility = 'hidden';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.visibility = 'visible';
        prevBtn.style.pointerEvents = 'auto';
    }
    const isLast = currentStepIndex === steps.length - 1;
    nextBtn.style.display = isLast ? 'none' : 'inline-block';
    submitBtn.style.display = isLast ? 'inline-block' : 'none';
}

function validateCurrentStep() {
    const steps = getSteps();
    const step = steps[currentStepIndex];
    const requiredFields = step.querySelectorAll('[required]');
    let hasError = false;
    requiredFields.forEach(field => {
        if (!field.value || field.value.trim() === '') {
            field.classList.add('error');
            hasError = true;
        }
    });
    return !hasError;
}

function nextStep() {
    if (!validateCurrentStep()) {
        alert('Please complete the required fields before continuing.');
        return;
    }
    showStep(currentStepIndex + 1);
}

function prevStep() {
    showStep(currentStepIndex - 1);
}

// Initialize form with token
document.addEventListener('DOMContentLoaded', () => {
    // Add form token to hidden input
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'form_token';
    tokenInput.value = formProtector.getFormToken();
    form.appendChild(tokenInput);

    // Show submission status if recently submitted
    if (formProtector.isRecentlySubmitted()) {
        // Delay to ensure DOM is fully loaded
        setTimeout(() => {
            showCooldownMessage();
        }, 100);
    }

    // Update submission status every minute
    setInterval(updateSubmissionStatus, 60000);

    // Wizard nav
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', nextStep);
    if (prevBtn) prevBtn.addEventListener('click', prevStep);
    showStep(0);
});

function showCooldownMessage() {
    const remainingTime = formProtector.getTimeUntilNextSubmission();
    const minutes = Math.ceil(remainingTime / 60000);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'cooldown-notice';
    messageDiv.innerHTML = `
        <i class="fas fa-clock"></i> 
        <strong>Cooldown Active:</strong> You can submit another registration in ${minutes} minute(s).
        <br><small>This helps prevent duplicate submissions.</small>
    `;
    messageDiv.style.cssText = `
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        color: #856404;
        padding: 12px;
        margin: 10px 0;
        border-radius: 6px;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        grid-column: 1 / -1;
    `;
    
    // Remove existing cooldown notice if any
    const existingNotice = document.querySelector('.cooldown-notice');
    if (existingNotice) {
        existingNotice.remove();
    }
    
    // Insert after the security notice
    const securityNotice = document.querySelector('.security-notice');
    if (securityNotice) {
        securityNotice.insertAdjacentElement('afterend', messageDiv);
    } else {
        // Fallback: insert after the title
        const formTitle = document.querySelector('h4');
        if (formTitle) {
            formTitle.insertAdjacentElement('afterend', messageDiv);
        } else {
            // Last fallback: insert at the beginning of the form
            form.insertBefore(messageDiv, form.firstChild);
        }
    }
}

function updateSubmissionStatus() {
    if (formProtector.isRecentlySubmitted()) {
        showCooldownMessage();
    } else {
        // Remove cooldown notice if time has passed
        const cooldownNotice = document.querySelector('.cooldown-notice');
        if (cooldownNotice) {
            cooldownNotice.remove();
        }
    }
}

function showRateLimitMessage() {
    const remainingTime = formProtector.getTimeUntilNextSubmission();
    const minutes = Math.ceil(remainingTime / 60000);
    alert(`Please wait ${minutes} minute(s) before submitting another registration. This helps prevent duplicate submissions.`);
}

function showHourlyLimitMessage() {
    const currentSubmissions = formProtector.getCurrentHourSubmissions();
    const remainingSubmissions = formProtector.maxSubmissionsPerHour - currentSubmissions;
    alert(`You have submitted ${currentSubmissions} registration(s) this hour. You can submit ${remainingSubmissions} more registration(s) in the next hour.`);
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    // Check rate limiting (2-minute cooldown)
    if (formProtector.isRateLimited()) {
        showRateLimitMessage();
        return;
    }
    
    // Check hourly limit
    if (formProtector.isHourlyLimitExceeded()) {
        alert('You have reached the maximum number of submissions per hour (5). Please try again in the next hour.');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submit');
    const originalText = submitBtn.value;
    submitBtn.value = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        
        // Sanitize all inputs
        for (let [key, value] of formData.entries()) {
            if (key !== 'form_token') { // Don't sanitize the token
                formData.set(key, sanitizeInput(value));
            }
        }
        
        // Validate form data
        const errors = validateForm(formData);
        if (errors.length > 0) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            return;
        }
        
        // Add additional security headers
        formData.append('timestamp', Date.now());
        formData.append('session_id', sessionStorage.getItem('session_id') || Date.now().toString());
        
        // Submit with enhanced error handling
        const response = await fetch(scriptURL, { 
            method: 'POST', 
            body: formData,
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Mark as submitted and show cooldown
        formProtector.markAsSubmitted();
        
        alert("Thank you! Your registration form has been submitted successfully.");
        
        // Show cooldown message
        showCooldownMessage();
        
        // Reset form for next submission
        form.reset();
        
        // Re-add the form token
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'form_token';
        tokenInput.value = formProtector.getFormToken();
        form.appendChild(tokenInput);
        
        // Return to Member Info step (step 0)
        showStep(0);
        
        // Ensure cooldown notice is properly positioned after form reset
        setTimeout(() => {
            if (formProtector.isRecentlySubmitted()) {
                showCooldownMessage();
            }
        }, 100);
        
    } catch (error) {
        console.error('Submission error:', error);
        alert('Sorry, there was an error submitting your form. Please try again or contact support.');
    } finally {
        // Reset button state
        submitBtn.value = originalText;
        submitBtn.disabled = false;
    }
});

// Real-time validation
form.addEventListener('input', e => {
    const field = e.target;
    const fieldName = field.name;
    
    // Remove previous error styling
    field.classList.remove('error');
    
    // Real-time validation
    if (fieldName === 'email' && field.value) {
        if (!validateEmail(field.value)) {
            field.classList.add('error');
        }
    }
    
    if (fieldName === 'mobile-number' && field.value) {
        if (!validatePhone(field.value)) {
            field.classList.add('error');
        }
    }
    
    // Car year validation
    if (fieldName === 'car-year' && field.value) {
        const year = parseInt(field.value);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
            field.classList.add('error');
            field.classList.remove('valid');
        } else {
            field.classList.remove('error');
            field.classList.add('valid');
        }
    }
    

});

// Add keyboard shortcut to reset form (Ctrl+Shift+R for admin use)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        if (confirm('Reset form submission state? (Admin function)')) {
            formProtector.resetSubmissionState();
            location.reload();
        }
    }
});

// Add submission counter display (optional)
function showSubmissionCounter() {
    const currentSubmissions = formProtector.getCurrentHourSubmissions();
    const remainingSubmissions = formProtector.maxSubmissionsPerHour - currentSubmissions;
    
    console.log(`Submissions this hour: ${currentSubmissions}/${formProtector.maxSubmissionsPerHour} (${remainingSubmissions} remaining)`);
}

// Call this function to see current submission status
// showSubmissionCounter();
// showSubmissionCounter();