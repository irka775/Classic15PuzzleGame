const ratingStars = document.querySelectorAll('.rating input');

ratingStars.forEach((star) => {
    star.addEventListener('click', () => {
        // Get the value of the clicked star
        const clickedStar = parseInt(star.value);

        // Change the color of stars based on the rating
        ratingStars.forEach((s, index) => {
            if (index < clickedStar) {
                s.nextElementSibling.style.color = "#ff00ff";  // Color selected stars pink
            } else {
                s.nextElementSibling.style.color = "#f7d22e";  // Color unselected stars yellow
            }
        });
    });
});
