---
layout: single  
title: "Using Mermaid in Jekyll Posts"
date: 2025-11-22
categories: [Mermaid, markdown]
tags: [flow chart, Jekyll]
excerpt: "Mermaid the easy way to draw chart on markdown"
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/Blog-header.jpg
author_profile: true
mermaid: true
mathjax: true
---

# Using Mermaid in Jekyll Posts

Mermaid support has been successfully added to your Jekyll site!

## How to Use Mermaid Diagrams

In your markdown posts, simply use fenced code blocks with `mermaid` language identifier:

### Example 1: Flowchart

```
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

### Example 2: Sequence Diagram

```
sequenceDiagram
    participant User
    participant System
    User->>System: Request
    System-->>User: Response
```

```mermaid
sequenceDiagram
    participant User
    participant System
    User->>System: Request
    System-->>User: Response
```

### Example 3: Class Diagram

```
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog
```

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +bark()
    }
    Animal <|-- Dog
```

### Example 4: State Diagram

```
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start
    Processing --> Success: Complete
    Processing --> Failed: Error
    Success --> [*]
    Failed --> Idle: Retry
```

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start
    Processing --> Success: Complete
    Processing --> Failed: Error
    Success --> [*]
    Failed --> Idle: Retry
```

### Example 5: Gantt Chart

```
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1 :a1, 2025-01-01, 30d
    Task 2 :after a1, 20d
    section Phase 2
    Task 3 :2025-02-15, 25d
```

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1 :a1, 2025-01-01, 30d
    Task 2 :after a1, 20d
    section Phase 2
    Task 3 :2025-02-15, 25d
```

## Supported Diagram Types

- Flowchart
- Sequence Diagram
- Class Diagram
- State Diagram
- Entity Relationship Diagram
- User Journey
- Gantt Chart
- Pie Chart
- Git Graph
- And more!

## More Information

For complete documentation, visit: https://mermaid.js.org/
