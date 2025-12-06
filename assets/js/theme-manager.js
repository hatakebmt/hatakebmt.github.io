/**
 * ThemeManager - Production-ready dark mode implementation
 * Supports three modes: light, dark, and auto (follows system preference)
 * Includes FOUC prevention, localStorage persistence, and accessibility features
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';
  const THEME_AUTO = 'auto';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  class ThemeManager {
    constructor() {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.preference = this.getStoredPreference();
      this.init();
    }

    /**
     * Get stored theme preference or default to auto
     */
    getStoredPreference() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === THEME_LIGHT || stored === THEME_DARK || stored === THEME_AUTO) {
          return stored;
        }
      } catch (e) {
        console.warn('Failed to read theme preference from localStorage:', e);
      }
      return THEME_AUTO;
    }

    /**
     * Calculate the effective theme (light or dark) based on preference and system
     */
    getEffectiveTheme() {
      if (this.preference === THEME_AUTO) {
        return this.mediaQuery.matches ? THEME_DARK : THEME_LIGHT;
      }
      return this.preference;
    }

    /**
     * Apply theme to the document
     */
    applyTheme(theme) {
      const effectiveTheme = theme === THEME_AUTO
        ? (this.mediaQuery.matches ? THEME_DARK : THEME_LIGHT)
        : theme;

      // Set data-theme attribute for CSS styling
      document.documentElement.setAttribute('data-theme', effectiveTheme);

      // Set preference attribute for toggle UI state
      document.documentElement.setAttribute('data-theme-preference', theme);

      // Update color-scheme for browser UI
      document.documentElement.style.colorScheme = effectiveTheme;
    }

    /**
     * Save preference to localStorage
     */
    savePreference(preference) {
      try {
        localStorage.setItem(STORAGE_KEY, preference);
      } catch (e) {
        console.warn('Failed to save theme preference to localStorage:', e);
      }
    }

    /**
     * Set new theme preference
     */
    setPreference(newPreference) {
      if (newPreference !== THEME_LIGHT && newPreference !== THEME_DARK && newPreference !== THEME_AUTO) {
        console.warn('Invalid theme preference:', newPreference);
        return;
      }

      this.preference = newPreference;
      this.savePreference(newPreference);
      this.applyTheme(newPreference);
      this.updateToggleUI();
      this.announceThemeChange();
    }

    /**
     * Cycle through theme preferences: light → auto → dark → light
     */
    cycleTheme() {
      const cycleOrder = [THEME_LIGHT, THEME_AUTO, THEME_DARK];
      const currentIndex = cycleOrder.indexOf(this.preference);
      const nextIndex = (currentIndex + 1) % cycleOrder.length;
      this.setPreference(cycleOrder[nextIndex]);
    }

    /**
     * Watch for system preference changes
     */
    watchSystemPreference() {
      // Listen for system theme changes
      this.mediaQuery.addEventListener('change', (e) => {
        console.log('System preference changed:', e.matches ? 'dark' : 'light');
        if (this.preference === THEME_AUTO) {
          const newEffectiveTheme = e.matches ? THEME_DARK : THEME_LIGHT;
          document.documentElement.setAttribute('data-theme', newEffectiveTheme);
          document.documentElement.style.colorScheme = newEffectiveTheme;
          this.updateToggleUI();

          // Announce change
          this.announceThemeChange();
        }
      });
    }

    /**
     * Create theme toggle button
     */
    createToggleButton() {
      const button = document.createElement('button');
      button.id = 'theme-toggle';
      button.type = 'button';
      button.className = 'theme-toggle';
      button.setAttribute('aria-label', 'Toggle theme');

      // Create icon span
      const icon = document.createElement('span');
      icon.className = 'theme-toggle__icon';
      icon.setAttribute('aria-hidden', 'true');

      // Create label span
      const label = document.createElement('span');
      label.className = 'theme-toggle__label';

      button.appendChild(icon);
      button.appendChild(label);

      button.addEventListener('click', () => this.cycleTheme());

      return button;
    }

    /**
     * Update toggle button UI based on current preference
     */
    updateToggleUI() {
      const button = document.getElementById('theme-toggle');
      if (!button) return;

      const icon = button.querySelector('.theme-toggle__icon');
      const label = button.querySelector('.theme-toggle__label');

      const effectiveTheme = this.getEffectiveTheme();

      // Update icon and label based on preference
      const config = {
        [THEME_LIGHT]: {
          icon: '☀️',
          label: 'Light',
          ariaLabel: 'Switch to auto theme'
        },
        [THEME_AUTO]: {
          icon: effectiveTheme === THEME_DARK ? '🌓' : '🌗',
          label: 'Auto',
          ariaLabel: 'Switch to dark theme (currently using ' + effectiveTheme + ')'
        },
        [THEME_DARK]: {
          icon: '🌙',
          label: 'Dark',
          ariaLabel: 'Switch to light theme'
        }
      };

      const currentConfig = config[this.preference];
      if (icon) icon.textContent = currentConfig.icon;
      if (label) label.textContent = currentConfig.label;
      button.setAttribute('aria-label', currentConfig.ariaLabel);
      button.setAttribute('data-theme-preference', this.preference);
    }

    /**
     * Announce theme change to screen readers
     */
    announceThemeChange() {
      const effectiveTheme = this.getEffectiveTheme();
      const message = this.preference === THEME_AUTO
        ? `Theme set to auto, currently using ${effectiveTheme} mode`
        : `Theme changed to ${this.preference} mode`;

      // Create or update live region
      let announcer = document.getElementById('theme-announcer');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'theme-announcer';
        announcer.className = 'visually-hidden';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
      }

      announcer.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }

    /**
     * Add keyboard shortcut (Ctrl+Shift+D or Cmd+Shift+D)
     */
    addKeyboardShortcut() {
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.cycleTheme();
        }
      });
    }

    /**
     * Initialize theme manager
     */
    init() {
      // Log initialization
      console.log('ThemeManager initializing with preference:', this.preference);
      console.log('System prefers dark:', this.mediaQuery.matches);
      console.log('Effective theme will be:', this.getEffectiveTheme());

      // Apply current theme immediately
      this.applyTheme(this.preference);

      // Wait for DOM to be ready before creating UI
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initUI());
      } else {
        this.initUI();
      }

      // Watch for system preference changes
      this.watchSystemPreference();

      // Add keyboard shortcut
      this.addKeyboardShortcut();
    }

    /**
     * Initialize UI components
     */
    initUI() {
      // Find masthead navigation or create fallback container
      const masthead = document.querySelector('.greedy-nav');
      const searchToggle = document.querySelector('.search__toggle');

      if (masthead) {
        const button = this.createToggleButton();

        // Insert before search button if it exists, otherwise append
        if (searchToggle) {
          searchToggle.parentNode.insertBefore(button, searchToggle);
        } else {
          masthead.appendChild(button);
        }

        this.updateToggleUI();
      }
    }
  }

  // Initialize theme manager
  window.themeManager = new ThemeManager();

  // Expose API for external use
  window.setTheme = function(preference) {
    window.themeManager.setPreference(preference);
  };

})();
