document.addEventListener('DOMContentLoaded', () => {
  const lessonData = [
    {
      title: 'Introduction',
      meta: 'Module 1 • 02 minutes',
      description: 'Welcome to the course. This introductory module provides the overall roadmap, learning goals, and expected outcomes for your web development journey.',
    },
    {
      title: 'HTML Basics',
      meta: 'Module 2 • 08 minutes',
      description: 'Learn the building blocks of web pages, semantic structure, and how HTML helps organize meaningful content for users and browsers.',
    },
    {
      title: 'CSS Basics',
      meta: 'Module 3 • 12 minutes',
      description: 'Understand layout, spacing, colors, and responsive styling techniques that create polished interfaces and user-friendly experiences.',
    },
    {
      title: 'JavaScript Fundamentals',
      meta: 'Module 4 • 15 minutes',
      description: 'Build interactive experiences with variables, functions, event handling, and logic that bring pages to life and improve usability.',
    },
    {
      title: 'Final Project',
      meta: 'Module 5 • 18 minutes',
      description: 'Apply the practical skills from the course to build a complete interface or project and build confidence in your final output.',
    },
  ];

  let savedProgress = null;
  const storedProgress = localStorage.getItem('onlineEducationLessonProgress');
  if (storedProgress) {
    try {
      savedProgress = JSON.parse(storedProgress);
    } catch (error) {
      console.warn('Ignoring invalid saved lesson progress.', error);
    }
  }

  const savedCompleted = Array.isArray(savedProgress?.completed) ? savedProgress.completed : [];
  const lessonState = {
    currentIndex: Number.isInteger(savedProgress?.currentIndex)
      ? Math.min(Math.max(savedProgress.currentIndex, 0), lessonData.length - 1)
      : 0,
    completed: lessonData.map((_, index) => savedCompleted[index] === true),
  };

  const lessonItems = document.querySelectorAll('.lesson-item');
  const titleEl = document.getElementById('lessonTitle');
  const metaEl = document.getElementById('lessonMeta');
  const descriptionEl = document.getElementById('lessonDescription');
  const progressBadge = document.getElementById('progressBadge');
  const prevButton = document.getElementById('prevLesson');
  const nextButton = document.getElementById('nextLesson');
  const markCompleteButton = document.getElementById('markComplete');

  if (
    !lessonItems.length ||
    !titleEl ||
    !metaEl ||
    !descriptionEl ||
    !progressBadge ||
    !prevButton ||
    !nextButton ||
    !markCompleteButton
  ) {
    return;
  }

  const saveProgress = () => {
    localStorage.setItem('onlineEducationLessonProgress', JSON.stringify(lessonState));
  };

  const renderProgress = () => {
    const finished = lessonState.completed.filter(Boolean).length;
    const percent = Math.round((finished / lessonData.length) * 100);
    progressBadge.textContent = `Progress: ${percent}%`;
    markCompleteButton.textContent = lessonState.completed[lessonState.currentIndex] ? 'Completed' : 'Mark as Complete';
  };

  const updateLessonView = () => {
    const lesson = lessonData[lessonState.currentIndex];
    titleEl.textContent = lesson.title;
    metaEl.textContent = lesson.meta;
    descriptionEl.textContent = lesson.description;

    lessonItems.forEach((item, index) => {
      item.classList.toggle('active', index === lessonState.currentIndex);
    });

    prevButton.disabled = lessonState.currentIndex === 0;
    nextButton.textContent = lessonState.currentIndex === lessonData.length - 1 ? 'Finish Course' : 'Next Lesson';
    renderProgress();
    saveProgress();
  };

  lessonItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      lessonState.currentIndex = index;
      updateLessonView();
    });
  });

  prevButton?.addEventListener('click', () => {
    if (lessonState.currentIndex > 0) {
      lessonState.currentIndex -= 1;
      updateLessonView();
    }
  });

  nextButton?.addEventListener('click', () => {
    if (lessonState.currentIndex < lessonData.length - 1) {
      lessonState.currentIndex += 1;
      updateLessonView();
      return;
    }

    if (!lessonState.completed.every(Boolean)) {
      window.showToast?.('Complete all lessons before finishing the course.');
      return;
    }

    window.showToast?.('Course completed! Great work.');
  });

  markCompleteButton?.addEventListener('click', () => {
    lessonState.completed[lessonState.currentIndex] = true;
    updateLessonView();
    window.showToast?.(`${lessonData[lessonState.currentIndex].title} marked as complete.`);
  });

  updateLessonView();
});
