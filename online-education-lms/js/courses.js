document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('courseSearch');
  const filterButtons = document.querySelectorAll('.filter-chip');
  const courseCards = document.querySelectorAll('.course-card');

  if (!searchInput || !filterButtons.length || !courseCards.length) {
    return;
  }

  let activeCategory = 'all';

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    courseCards.forEach((card) => {
      const category = (card.dataset.category || '').toLowerCase();
      const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
      const matchesCategory = activeCategory === 'all' || category.includes(activeCategory);
      const matchesQuery = !query || title.includes(query);
      const visible = matchesCategory && matchesQuery;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    if (!visibleCount) {
      window.showToast?.('No courses match your current search.');
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((chip) => chip.classList.toggle('active', chip === button));
      activeCategory = button.dataset.category || 'all';
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);

  const grid = document.getElementById('courseGrid');
  if (grid) {
    const count = courseCards.length;
    grid.setAttribute('data-course-count', count);
  }
});
