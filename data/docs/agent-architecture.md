---
title: Agent Architecture Standards
summary: The architectural standards Garrell Tech Solutions applies to every codebase, written for retrieval by coding agents. Covers abstracted set operations, one owner per rule, core entities with boundary translation, and minimal comments.
date: '2026-08-21'
lastmod: '2026-10-08'
---

## Scope

These standards apply to every service, application, and automation Garrell Tech Solutions builds or maintains. They bind human contributors and AI coding agents equally.

An agent working in a Garrell Tech Solutions repository should treat each standard below as a hard constraint on the code it produces, and should reject or revise a plan that violates one rather than implementing it.

## Standard: Abstracted Set Operations

### 1. Principle: separation of intention from execution

When dealing with large collections of entities, the definition of how data should be ordered, filtered, or paginated is a business rule. However, the execution of those operations must occur at the persistence layer for performance and memory efficiency.

To satisfy both Clean Architecture boundaries and systemic performance requirements, systems must strictly separate the **Intention** (Domain) from the **Execution** (Infrastructure).

### 2. The pattern: domain specifications

The system must never fetch bulk, unoptimized datasets into application memory to perform sorting, filtering, or pagination. Instead, it must use the Specification (or Criteria) pattern to push these operations down to the storage mechanism without leaking storage-specific syntax into the core application.

| Layer          | Owns                                                                 | Must not                                          |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| Domain         | The rules of precedence, filtering boundaries, and pagination limits | Know anything about the storage mechanism         |
| Application    | Assembly of specifications and the call across the output port       | Re-sort, re-filter, or paginate results in memory |
| Infrastructure | Translation of a specification into native storage operations        | Leak storage concepts back across the port        |

#### The Domain layer (intention)

- **Responsibility:** Defines the rules of precedence, filtering boundaries, and pagination limits using pure business concepts.
- **Implementation:** Exposes abstract value objects or data structures, such as `SortSpecification` or `FilterCriteria`.
- **Constraint:** These objects must describe what is desired in domain terminology, for example "sort by task urgency". They must be entirely ignorant of the underlying storage mechanism.

#### The Application layer (orchestration)

- **Responsibility:** Coordinates the workflow by assembling the domain specifications based on the input request.
- **Implementation:** Passes the specification objects through an output port (an interface).
- **Constraint:** The application layer must trust that the port returns the data pre-sorted and pre-filtered according to the specification. It must not attempt to re-sort or manually paginate the returned collection in memory.

#### The Infrastructure layer (execution)

- **Responsibility:** Interacts with the actual storage medium, such as a relational data store, flat CSV files, or an external API.
- **Implementation:** Implements the output port. It receives the pure domain specification and translates it into the native syntax or operational logic the storage medium requires.
- **Constraint:** This is the only layer permitted to know how a domain concept maps to a storage concept, for example translating "task urgency" into a specific column index, a file parsing routine, or an API query parameter.

### 3. Strict invariants

1. **No storage syntax in the core.** The domain and application layers must never contain query language strings, file traversal logic, or storage-specific data types.
2. **No in-memory bulk operations.** The application layer must never load an entire collection into memory to perform slicing or reordering that the underlying persistence mechanism can handle natively.
3. **Opaque data retrieval.** The mechanism of retrieval must remain completely opaque to the application layer. The application must not know whether the sorting was achieved by a highly optimized indexing engine or by linearly scanning flat text files.

## Standard: One Owner per Rule

### 1. Principle: place logic by role, not by runtime

Every piece of logic has exactly one legal home, chosen by the role it plays rather than by which runtime runs it or when the work happens. The test: for any new rule, a contributor can name its single owner without discussion. A rule duplicated across runtimes or languages is a placement error, never a necessity.

### 2. Roles and their homes

| Role            | What it is                                                                                   | Lives in                                          |
| --------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Facts           | What happened; its meaning never changes                                                     | Database tables                                   |
| Retrieval       | Assembles facts into the shape a decision needs, with no conditionals over configuration     | Database views and queries                        |
| Configuration   | Tunable values that policy reads                                                             | Config tables or environment, never code literals |
| Policy          | Decides what facts mean and what should happen; pure, no I/O                                 | Application policy modules                        |
| Mechanism       | Makes an effect happen exactly once; decides nothing                                         | Database transactions, queues, unique constraints |
| Effect          | The outward action                                                                           | Application code or workers                       |
| Inbound adapter | Turns an external arrival into a use-case call; validation and auth only                     | Webhook routes, scheduled handlers                |
| Use case        | The named operation; orchestrates Retrieval, Policy, Mechanism, and Effect, deciding nothing | Domain use-case modules                           |
| Presentation    | How a decision looks; formatting only                                                        | UI components                                     |
| View state      | Local interaction state such as expanded, pending, or draft                                  | UI components and hooks                           |

### 3. Strict invariants

1. **The Effect's runtime owns its Policy.** Only Policy and Effect need a runtime owner. Whichever runtime performs an effect owns the policy behind it. There is no shared policy service.
2. **No shared logic across languages.** A rule is implemented once, in one runtime. Mirroring it elsewhere (for example, a SQL view and a Rust function) is a violation.
3. **The database holds no Policy.** Being reachable by every runtime does not make the database the owner. The one exception is row-level security, kept as defense-in-depth.
4. **The UI renders decisions; it never makes them.** If a product decision could change the output, it is Policy, not Presentation.
5. **Enforce by shape, not prose.** CI checks the system against a declared role-to-home map instead of pattern-matching for bad code.
6. **Migrate with a ratchet.** Known violations live in a register that can only shrink: every unit of work removes at least one entry and adds none.

## Standard: Core Entities and Boundary Translation

### 1. Principle: the core speaks only business language

Core business entities sit at the center of the system and know nothing about how they are stored or shown. Data flows back end to core to front end, and back again, with an explicit translation at each crossing: between storage (a database, flat files, an in-memory store, an external API) and the core, and between the core and presentation (a UI, standard output, an HTTP response, a report).

### 2. The shape

| Zone                     | Owns                                                                                     | Must not                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Core entities            | Identity, state, invariants, and behavior, in domain terms                               | Reference storage, transport, framework, or display types |
| Persistence translation  | Mapping entities to and from storage records (rows, lines, documents, cached objects)    | Hold business rules or pass storage records inward        |
| Presentation translation | Mapping entities and results to and from view models, DTOs, request payloads, and output | Hold business rules or hand raw entities to the edge      |

### 3. Strict invariants

1. **No bypass.** Storage never feeds presentation directly. Every path between the back end and the front end passes through core entities.
2. **Dependencies point inward.** Translators depend on the core. The core never depends on a translator, storage driver, framework, or UI type.
3. **Entities guard their own invariants.** An entity cannot be built or changed into an invalid state. Validity is never left to a database constraint or a form.
4. **No storage shapes in the core.** ORM models, rows, file records, and query results become entities at the boundary and never travel inward.
5. **No entities at the edge.** Output receives purpose-built view models or DTOs, never entities. Input is parsed into domain types before it reaches a use case.
6. **Translation is mechanical.** Mappers change shape and representation (names, units, formats, nullability) and make no business decisions. A branch that changes meaning is Policy and belongs in the core.
7. **Edges are swappable.** Replacing the database with flat files or memory, or the UI with standard output, changes only translators and adapters. Core entities and use cases stay untouched and keep passing their tests.

## Standard: Names Before Comments

To prevent context sprawl, code explains itself through the names of its modules, classes, functions, and arguments. A comment is allowed only where good naming cannot carry the detail: a non-obvious reason, a constraint imposed from outside the code, or a workaround and its cause.

1. **Rename before commenting.** If a comment restates what the code does, improve the names and delete the comment.
2. **Explain why, never what.** A surviving comment records intent or context that the code cannot express.
3. **No narration.** No change logs, authorship notes, or commented-out code. Version control holds history.
