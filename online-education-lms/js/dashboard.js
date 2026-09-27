document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  const editButton = document.getElementById('editProfileButton');
  const cancelButton = document.getElementById('cancelProfileEdit');

  if (profileForm) {
    const defaultProfile = {
      name: 'Amina Shah',
      email: 'amina@onlineeducation.com',
      bio: 'I’m a passionate learner focused on building modern digital products and improving my web development skills with practical project experience.',
      skills: 'HTML, CSS, JavaScript, React',
    };

    let savedProfile = null;
    const storedProfile = localStorage.getItem('onlineEducationProfile');
    if (storedProfile) {
      try {
        savedProfile = JSON.parse(storedProfile);
      } catch (error) {
        console.warn('Ignoring invalid saved profile.', error);
      }
    }
    savedProfile = savedProfile || defaultProfile;
    const fields = ['profileName', 'profileEmail', 'profileBio', 'profileSkills'];
    const profileSummary = {
      name: document.getElementById('profileNameDisplay'),
      email: document.getElementById('profileEmailDisplay'),
      bio: document.getElementById('profileBioDisplay'),
      skills: document.getElementById('profileSkillsDisplay'),
      avatar: document.getElementById('profileAvatar'),
    };

    const renderProfileSummary = (profile) => {
      if (profileSummary.name) profileSummary.name.textContent = profile.name;
      if (profileSummary.email) profileSummary.email.textContent = profile.email;
      if (profileSummary.bio) profileSummary.bio.textContent = profile.bio;
      if (profileSummary.avatar) {
        profileSummary.avatar.textContent = profile.name
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0].toUpperCase())
          .join('') || 'AS';
      }
      if (profileSummary.skills) {
        const tags = profile.skills.split(',').map((skill) => skill.trim()).filter(Boolean);
        profileSummary.skills.replaceChildren(
          ...tags.map((skill) => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = skill;
            return tag;
          }),
        );
      }
    };

    fields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      const mappedKey = fieldId.replace('profile', '').toLowerCase();
      const key = mappedKey === 'name' ? 'name' : mappedKey === 'email' ? 'email' : mappedKey === 'bio' ? 'bio' : 'skills';
      field.value = savedProfile[key] ?? defaultProfile[key];
    });
    renderProfileSummary({
      name: document.getElementById('profileName')?.value ?? defaultProfile.name,
      email: document.getElementById('profileEmail')?.value ?? defaultProfile.email,
      bio: document.getElementById('profileBio')?.value ?? defaultProfile.bio,
      skills: document.getElementById('profileSkills')?.value ?? defaultProfile.skills,
    });

    if (editButton) {
      editButton.addEventListener('click', () => {
        const inputs = profileForm.querySelectorAll('input, textarea');
        inputs.forEach((input) => input.focus());
        window.showToast?.('Profile editing enabled.');
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        const fieldsToReset = fields.map((fieldId) => document.getElementById(fieldId));
        fieldsToReset.forEach((field) => {
          if (!field) return;
          const key = field.id.replace('profile', '').toLowerCase();
          const normalizedKey = key === 'name' ? 'name' : key === 'email' ? 'email' : key === 'bio' ? 'bio' : 'skills';
          field.value = savedProfile[normalizedKey] ?? defaultProfile[normalizedKey];
        });
        window.showToast?.('Changes were not saved.');
      });
    }

    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const profile = {
        name: document.getElementById('profileName')?.value.trim() ?? defaultProfile.name,
        email: document.getElementById('profileEmail')?.value.trim() ?? defaultProfile.email,
        bio: document.getElementById('profileBio')?.value.trim() ?? defaultProfile.bio,
        skills: document.getElementById('profileSkills')?.value.trim() ?? defaultProfile.skills,
      };

      localStorage.setItem('onlineEducationProfile', JSON.stringify(profile));
      savedProfile = profile;
      renderProfileSummary(profile);
      window.showToast?.('Profile updated successfully.');
    });
  }

  const progressItems = document.querySelectorAll('.progress-item');
  if (progressItems.length) {
    const defaultProgress = {
      'Web Development': 75,
      'Python Programming': 45,
      'Artificial Intelligence': 30,
    };

    let savedProgress = null;
    const storedProgress = localStorage.getItem('onlineEducationProgress');
    if (storedProgress) {
      try {
        savedProgress = JSON.parse(storedProgress);
      } catch (error) {
        console.warn('Ignoring invalid saved course progress.', error);
      }
    }
    savedProgress = savedProgress || defaultProgress;

    progressItems.forEach((item) => {
      const label = item.querySelector('header span:first-child')?.textContent?.trim();
      const fill = item.querySelector('.progress-fill');
      const storedPercent = Number(savedProgress[label]);
      const percent = Number.isFinite(storedPercent) ? Math.min(Math.max(storedPercent, 0), 100) : 0;

      if (fill) {
        fill.style.width = `${percent}%`;
      }

      const numbers = item.querySelector('header span:last-child');
      if (numbers) {
        numbers.textContent = `${percent}%`;
      }
    });
  }
});
