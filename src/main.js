import './style.css'
import { supabase } from './supabase.js'

/**
 * Form Wizard Logic (Candidate Portal)
 */
window.nextStep = (stepNumber) => {
  const currentStep = stepNumber - 1;
  const currentStepEl = document.getElementById(`step${currentStep}`);
  
  if (currentStepEl) {
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    let isValid = true;
    inputs.forEach(input => {
      if(input.hasAttribute('required') && !input.value) {
        input.reportValidity();
        isValid = false;
      }
    });

    if(!isValid) return;

    hideAllSteps();
    const step = document.getElementById(`step${stepNumber}`);
    if(step) {
      step.classList.remove('hidden');
      updateIndicators(stepNumber);
    }
  }
};

window.prevStep = (stepNumber) => {
  hideAllSteps();
  const step = document.getElementById(`step${stepNumber}`);
  if(step) {
    step.classList.remove('hidden');
    updateIndicators(stepNumber);
  }
};

function hideAllSteps() {
  document.querySelectorAll('.form-step').forEach(step => {
    step.classList.add('hidden');
  });
}

function updateIndicators(activeStep) {
  document.querySelectorAll('.indicator').forEach((ind, index) => {
    if (index + 1 <= activeStep) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });
}

/**
 * Handle Form Submission (Sovereign Integration & Supabase Storage)
 */
window.handleFormSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log("ELITE CANDIDATE DATA COLLECTED:", data);

  // Attempt Supabase storage
  if (supabase) {
    try {
      const { error } = await supabase
        .from('candidates')
        .insert([data]);
      
      if (error) {
        console.error("Supabase storage error:", error.message);
      } else {
        console.log("Successfully integrated candidate data into The Estate database.");
      }
    } catch (err) {
      console.error("Critical submission error:", err);
    }
  } else {
    console.warn("Supabase not configured. Data only recorded in local session.");
  }

  // Show Success Portal UI
  const form = document.getElementById('screeningForm');
  const success = document.getElementById('successMessage');
  const indicators = document.querySelector('.form-step-indicator');

  if (form) form.classList.add('hidden');
  if (indicators) indicators.classList.add('hidden');
  if (success) success.classList.remove('hidden');
};
