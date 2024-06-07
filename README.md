# api-request-by-the-anand

API Request Tester is a Visual Studio Code extension that allows you to send HTTP requests and view responses directly within the editor.

## Features

- Syntax highlighting for HTTP requests (GET, POST, PUT, DELETE) and responses (JSON, XML, HTML).
- Auto-completion for API endpoints.
- Interactive request building with headers, query parameters, and request body.
- Environment variables support for easy switching between different environments.
- Response preview within VS Code.
- Request history to easily re-execute previous requests.
- And more...

## Installation

You can install API Request Tester from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.api-request-tester).

## Usage

1. **Define Environment Variables:**
   - Define environment variables in the `settings.json` file.
   - Example:
     ```json
     "apiRequest.environmentVariables": {
         "BASE_URL": "https://api.example.com",
         "API_KEY": "your_api_key"
     }
     ```

2. **Write Requests:**
   - Open a new file with the `.api` extension.
   - Write your API requests. You can use environment variables like `{{BASE_URL}}` in the URL.

3. **Send Requests:**
   - Fill in the URL, select the HTTP method, add headers, query parameters, and request body.
   - Click "Send Request" to send the request.

4. **View Response:**
   - You'll see the response displayed in a webview panel.

5. **Preview Response:**
   - You can also preview the response separately using the "Preview Response" command.

6. **Access History:**
   - The history of requests is automatically maintained. You can access it from the workspace state.

## Configuration

- `apiRequest.endpointSuggestions`: Static list of endpoint suggestions.
- `apiRequest.environmentVariables`: Environment variables to replace in requests.

## Keyboard Shortcuts

- `Ctrl+Shift+R` / `Cmd+Shift+R`: Send API Request
- `Ctrl+Shift+E` / `Cmd+Shift+E`: Preview Response

## Known Issues

- No known issues.

## Contributing

Contributions are welcome! Please check the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.