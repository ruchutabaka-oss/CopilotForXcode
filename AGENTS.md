# AGENTS.md

This repository is GitHub Copilot for Xcode, a macOS app that integrates an Xcode source editor extension, a background service, and shared Swift packages. The important design boundary is: the app UI and extension send requests through local service/bridge layers, while most reusable logic lives in the Swift packages under `Core` and `Tool`.

## Start here

- Project overview: [README.md](README.md)
- Build and architecture details: [DEVELOPMENT.md](DEVELOPMENT.md)
- Prompt and custom instruction docs: [Docs/CustomInstructions.md](Docs/CustomInstructions.md), [Docs/PromptFiles.md](Docs/PromptFiles.md), [Docs/BYOK.md](Docs/BYOK.md)

## Repository map

- `Copilot for Xcode/`: host app UI and settings
- `EditorExtension/`: Xcode editor extension that forwards editor content and applies suggestions
- `ExtensionService/`: background service and app-level integration logic
- `CommunicationBridge/`: communication bridge between app/extension and service
- `Core/`: shared Swift logic for the app/service
- `Tool/`: helper Swift tooling package used by the project
- `Server/`: Node/TypeScript assets used for the language server bundle
- `Script/`: local build scripts and install helpers
- `Docs/`: project docs and instructions

## Build and validation

- This project is macOS/Xcode-specific. Local validation should be done on macOS with Xcode installed.
- The recommended local app build flow is documented in [DEVELOPMENT.md](DEVELOPMENT.md): run the scripts in `Script/` to uninstall, clean, and build a fresh local app.
- For Node-side assets in `Server/`, use the package scripts from `Server/package.json` (for example, webpack builds via `npm run build`).
- Unit tests are run through the `Copilot for Xcode` Xcode target and should be tracked in `TestPlan.xctestplan`.

## Conventions

- Prefer fixes in the shared logic under `Core` and `Tool` when the behavior is common to multiple targets.
- If a change affects the app, extension, bridge, or background service together, verify the cross-target interaction rather than patching only one layer.
- Keep edits minimal and aligned with the existing project structure; do not duplicate logic across targets when a shared package is the better home.
- Follow the project’s Swift style: 4-space indentation and SwiftFormat-based formatting, in line with the Ray Wenderlich style guide described in [DEVELOPMENT.md](DEVELOPMENT.md).
- For new tests, add them to the test plan rather than creating ad hoc validation only in one target.

## Environment caveats

- `node` and `npm` must be available on PATH for scripts used by the build pipeline.
- Xcode entitlements, permissions, and sandboxing rules matter for this repo; app, extension, and service changes may need coordination across entitlements and launch config files.
- App versioning and target versioning are controlled via `Version.xcconfig`, as noted in [DEVELOPMENT.md](DEVELOPMENT.md).

## When working on this repo

- Start by checking the relevant target and the surrounding shared package before changing behavior.
- Prefer verifying the change against the smallest Xcode or script-based build path that exercises the codepath. Avoid broad, speculative edits.
- Link to the existing docs instead of re-explaining them when the answer is already documented.
