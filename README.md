# OnecxRemoteComponentExampleUi

## Use the example remote component in OneCX

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
    npm start
    ```
3. Start onecx-local-env using the all profile:
   ```bash
   docker compose --profile=all up -d
   ```
4. Navigate to http://local-proxy/onecx-shell/admin/product
5. Use the three dots menu to configure a dummy application:
    - name: example-app
    - version: 1.0.0
    - display name: Example App
    - base path: /example
6. Navigate to http://local-proxy/onecx-shell/admin/product/apps
7. Use the three dots menu to create a new UI component:
    - Management Details:
        - App ID: onecx-remote-component-example-ui
        - Name: onecx-remote-component-example-ui
        - Version: 1.0.0
        - Application Name: example-app
    - Remote Module:
        - Type: Component
        - Technology: WebComponent (Module)
        - Exposed Module: ./OneCXDisplayTextComponent
        - Remote Entry: http://localhost:4200/remoteEntry.js
        - Remote Base URL: http://localhost:4200/
        - Remote Name: onecx-remote-component-example-ui
        - Tag Name: ocx-display-text-component
8. Navigate to http://local-proxy/onecx-shell/admin/workspace/admin and open the "Slots" tab
9. Open the slot that you want to use the component in
10. Register the component
11. Reload the page and you should see the component in the slot