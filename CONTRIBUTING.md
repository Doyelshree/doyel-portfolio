# Contributing to Doyel Portfolio

Thank you for considering contributing to Doyel Portfolio! This document outlines the standards and guidelines for contributing to this project.

## Project Structure

```
doyel-portfolio/
├── public/              # Static assets
│   ├── assets/         # General assets
│   ├── company/        # Company logos
│   ├── meta/          # Meta images
│   ├── project/       # Project thumbnails
│   └── skills/        # Skill icons
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   │   ├── common/   # Shared components
│   │   ├── mdx/      # Shared MDX renderers
│   │   ├── svgs/     # SVG icons
│   │   ├── technologies/ # Technology icons
│   │   └── ui/       # Shadcn UI components
│   ├── config/       # Configuration files
│   ├── data/         # MDX content
│   │   ├── journey/  # Journey page content
│   │   └── projects/ # Project details
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
```

## Naming Conventions

### Files and Directories

- Use **PascalCase** for:
  - React components: `ProjectCard.tsx`
  - Type definitions: `Project.ts`
  - Component directories: `ProjectComponents/`

- Use **camelCase** for:
  - Utility functions: `formatDate.ts`
  - Hooks: `useMobile.ts`
  - Configuration files: `resume.ts`

### Components

- Component files should be named using PascalCase and include the `.tsx` extension
- Each component should have its own file
- Group related components in a directory named after the feature

Example:

```tsx
// Good
components / projects / ProjectCard.tsx;
components / common / Navbar.tsx;

// Bad
components / projects / projectcard.tsx;
components / common / nav - bar.tsx;
```

### Hooks

- Custom hooks should start with `use` and use camelCase
- Each hook should have its own file

Example:

```tsx
// Good
hooks / useMobile.ts;
hooks / useScrollPosition.ts;

// Bad
hooks / mobile.ts;
hooks / UseScroll.ts;
```

## Styling Conventions

- Use Tailwind CSS classes for styling
- Follow mobile-first approach
- Use CSS variables for theme colors (defined in globals.css)
- Maintain consistent spacing using Tailwind's spacing scale

Example:

```tsx
// Good
<div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">

// Bad
<div style={{ marginTop: '16px', color: '#374151' }}>
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces and types in separate files under `src/types/`
- Use explicit type annotations for function parameters and returns

Example:

```tsx
// types/project.ts
interface Project {
  title: string;
  description: string;
  tags: string[];
}

// components/projects/ProjectCard.tsx
const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  // ...
};
```

### React Components

- Use functional components with hooks
- Props should be typed using interfaces
- Use destructuring for props
- Keep components focused and single-responsibility

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  label,
  onClick,
  variant = 'primary',
}: ButtonProps): JSX.Element => {
  // ...
};
```

## Content Guidelines

### Projects

- Place MDX files in `src/data/projects/`
- Use kebab-case for file names: `my-project.mdx`
- Include required frontmatter:
  ```mdx
  ---
  title: 'My Project'
  description: 'Project description'
  date: '2024-03-20'
  tags: ['react', 'typescript']
  github: 'https://github.com/...'
  live: 'https://...'
  ---
  ```

## Git Workflow

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit using conventional commits:
   ```bash
   # Format: <type>(<scope>): <description>
   feat(projects): add new project card component
   fix(contact): resolve form submission issue
   ```
5. Push to your fork
6. Create a Pull Request

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Testing

- just run `bun run build` if build is successful only then push it.

## Documentation

- Update README.md if adding new features
- Document new components with JSDoc comments
- Update type definitions when adding/modifying interfaces
- Keep configuration examples up to date

## Questions

If you have questions about contributing, please:

1. Check existing issues
2. Create a new issue with the `question` label
3. Join our community discussions

Thank you for contributing to Doyel Portfolio! 🎉
