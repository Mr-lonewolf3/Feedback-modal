// write your JavaScript here
const ratingContainer = document.getElementById('rating');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const containerBox = document.getElementById('modalBox');
const overlay = document.getElementById('overlay');
const popupMessage = document.getElementById('popup-message');

//Store the selected rating
let selectedRating = null;

// Create rating buttons 1-10
for (let i = 1; i <= 10; i++) {
  const btn = document.createElement('button');
  btn.classList.add('rating-btn');
  btn.textContent = i;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedRating = i;
  });
  ratingContainer.appendChild(btn);
}

// Show popup
function showPopup(message, isSuccess = true) {
  popupMessage.textContent = message;
  popupMessage.style.backgroundColor = isSuccess ? 'white' : '#f8d7da';
  popupMessage.style.color = isSuccess ? 'black' : '#842029';
  popupMessage.style.display = 'block';
  popupMessage.classList.add('fade-in');

  setTimeout(() => {
    popupMessage.style.display = 'none';
    popupMessage.classList.remove('fade-in');
  }, 2000);
}

function closeModal() {
  containerBox.classList.add('animate-out');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400);
}

// Button Events
submitBtn.addEventListener('click', () => {
  if (selectedRating !== null) {
    localStorage.setItem('feedbackRating', selectedRating);
    showPopup(`Thanks! You rated us ${selectedRating}/10.`);
    setTimeout(closeModal, 1500);
  } else {
    showPopup(`⚠️ Please select a rating before submitting.`, false);
  }
});

//Cancel and Close button to fully close
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Click outside modal to close
overlay.addEventListener('click', (e) => {
  if (!containerBox.contains(e.target)) {
    closeModal();
  }
});
