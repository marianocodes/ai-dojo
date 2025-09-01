---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git commit:*)
description: "Generate semantic commit messages by analyzing staged changes and create conventional commits automatically"
model: claude-3-5-haiku-20241022
---

# Semantic Commit Generator

Generate well-formatted conventional commit messages by analyzing staged changes in your repository and automatically execute the commit.

## Process

1. **Check Git Status**: First, verify there are staged changes ready for commit
2. **Analyze Changes**: Review the staged diff to understand what was modified
3. **Categorize**: Determine the appropriate commit type and scope
4. **Generate Message**: Create a conventional commit message
5. **Execute Commit**: Automatically commit with the generated message

## Commit Types

- **feat**: New features or functionality
- **fix**: Bug fixes
- **docs**: Documentation changes  
- **style**: Code formatting, missing semicolons, etc.
- **refactor**: Code restructuring without behavior changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **perf**: Performance improvements
- **ci**: CI/CD pipeline changes

## Message Format

Follow conventional commits: `type(scope): description`

For complex changes, use bullet points:
```
type(scope): brief description

- Detail 1
- Detail 2
- Detail 3
```

## Examples

### Feature Addition
```
feat(auth): add social login integration

- Implement OAuth2 flow for Google and GitHub
- Add user profile synchronization
- Create callback handlers with error management
- Update user model for OAuth provider data
```

### Bug Fix
```
fix(api): resolve race condition in session validation

Prevents concurrent session updates from causing authentication failures
```

### Refactoring
```
refactor(components): restructure form validation logic

- Extract validation rules into reusable utilities
- Consolidate error handling across form components
- Remove duplicate validation code
- Improve type safety for validation rules
```

### Performance Improvement
```
perf(database): optimize user search queries

Reduces query execution time from 2.3s to 45ms by adding proper indexing
```

### Documentation
```
docs(api): update authentication endpoint documentation

Add comprehensive examples for OAuth2 flow and token refresh handling
```

### Testing
```
test(auth): add comprehensive login flow test coverage

Includes success scenarios, validation errors, and edge cases
```

### CI/CD Changes
```
ci(deploy): add automated database migration step

Ensures schema updates are applied before application deployment
```

### Style Changes
```
style(components): apply consistent formatting and linting fixes

Resolves ESLint warnings and improves code readability
```

### Maintenance/Dependencies
```
chore(deps): update React ecosystem to latest stable versions

Includes security patches and performance improvements
```

## Instructions

Execute these steps in order:

1. **Check staged changes exist:**
   ```
   !git status
   ```

2. **Analyze the staged changes:**
   ```
   !git diff --staged
   ```

3. **Based on the diff output, determine:**
   - Primary change type (feat, fix, docs, etc.)
   - Affected scope/component
   - Complexity level (simple description vs bullet points)

4. **Generate and execute commit using this format:**
   ```
   !git commit -m "$(cat <<'EOF'
   type(scope): description

   Optional details:
   - Point 1
   - Point 2
   EOF
   )"
   ```

5. **Confirm success:**
   ```
   !git status
   ```

## Guidelines

- Focus on **what** changed and **why** it matters
- Use present tense ("add feature" not "added feature")
- Be specific about the impact or benefit
- Keep the first line under 72 characters
- Use bullet points for multi-part changes
- Maintain professional, descriptive language
- Include scope when changes affect specific components

The commit message should clearly communicate the change without revealing the generation method.

## Important Notes
- **Do NOT include** any mention of Claude Code or AI generation in commit messages
- **Do NOT add** footers like "Generated with Claude Code" or "Co-Authored-By: Claude"
- Keep commit messages clean and professional without revealing the automation