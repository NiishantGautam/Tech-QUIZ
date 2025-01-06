# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Integrated Expo Router for type-safe navigation and routing
  - Set up file-based routing structure in src/app directory
  - Configured _layout.tsx for root navigation container
- Implemented header component with profile image, greeting, and menu icon
- Created StreakCard component for tracking daily progress
- Created PracticeCard component with question counter badge
- Created ReviewCard component for previously attempted questions
- Created ExploreCard component with vertically scrollable chapter grid
- Added theme configuration with new color palette (peach and teal)
- Set up ESLint with Prettier for consistent code formatting
- Added ScrollView for better content scrolling
- Enhanced header interactions with Pressable components
  - Added haptic feedback to profile and menu buttons
  - Implemented consistent hover effects with teal borders
  - Added Android ripple effects for better cross-platform experience
- Added haptic feedback to menu button interactions for better user experience

### Changed

- Updated ESLint configuration for better code consistency
- Improved project structure with new components directory
- Enhanced dark theme implementation
- Added proper component organization with separate files
- Improved UI layout with consistent spacing and margins
- Converted horizontal chapter list to vertical grid with peek effect
- Enhanced scrolling experience with hidden indicators

### Technical

- Added proper TypeScript types for components
- Implemented modular component architecture
- Set up SafeAreaView for better iOS support
- Added TypeScript interfaces for component props
- Implemented TouchableOpacity for interactive cards
- Optimized scroll views with maxHeight constraints
- Added peek effect for better content discovery

## [0.2.0] - 2025-01-04

### Added

- Implemented new project structure with src directory
- Created organized folder hierarchy:
  - src/app for main application code
  - src/components for reusable components
  - src/constants for app constants
  - src/types for TypeScript definitions
  - src/utils for helper functions
- Added comprehensive README.md with project documentation

### Changed

- Updated welcome message to show version 0.2
- Improved import paths to reflect new structure

## [0.1.0] - 2025-01-04

### Added

- Initial project setup with Expo React Native
- Basic TypeScript configuration
- ESLint and Prettier setup for code formatting
- Husky and lint-staged for Git hooks
- Basic app structure with welcome message
- Version display in welcome message
- A shared theme file for consistent styling

### Changed

- Updated welcome message to show version number
- Configured lint-staged to handle all TypeScript and JavaScript files

### References

- [Expo Documentation](https://docs.expo.dev/)
- [ESLint Setup Guide](https://docs.expo.dev/guides/using-eslint/)
- [Prettier Setup Guide](https://prettier.io/docs/en/install)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)
- [Expo Router](https://docs.expo.dev/router/introduction/)

[Unreleased]: https://github.com/username/tech-quiz/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/username/tech-quiz/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/username/tech-quiz/releases/tag/v0.1.0
