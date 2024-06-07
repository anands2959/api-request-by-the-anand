import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register the command to send request
	let disposableSend = vscode.commands.registerCommand('extension.sendRequest', () => {
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'apiRequester',
			'API Requester',
			vscode.ViewColumn.One,
			{}
		);

		// Set HTML content for the webview
		panel.webview.html = getWebViewContent(context);
	});

	// Register the command to preview response
	let disposablePreview = vscode.commands.registerCommand('extension.previewResponse', (data: string) => {
		const panel = vscode.window.createWebviewPanel(
			'responsePreview',
			'Response Preview',
			vscode.ViewColumn.Two,
			{}
		);

		panel.webview.html = `<pre>${data}</pre>`;
	});

	context.subscriptions.push(disposableSend, disposablePreview);
}

function getWebViewContent(context: vscode.ExtensionContext) {
	// Get endpoint suggestions from configuration
	const endpointSuggestions: string[] = vscode.workspace.getConfiguration().get('apiRequest.endpointSuggestions') || [];
	const suggestionItems = endpointSuggestions.map(endpoint => `<option value="${endpoint}">${endpoint}</option>`).join('');

	// Get environment variables
	const environmentVariables: { [key: string]: string } = vscode.workspace.getConfiguration().get('apiRequest.environmentVariables') || {};

	return `
        <html>
            <body>
                <h2>API Request Tester</h2>
                <input type="text" id="urlInput" list="endpoints" placeholder="Enter API Endpoint" style="width: 300px;">
                <datalist id="endpoints">
                    ${suggestionItems}
                </datalist>
                <select id="methodSelect">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <div>
                    <h3>Headers</h3>
                    <input type="text" id="headerKey" placeholder="Header Key">
                    <input type="text" id="headerValue" placeholder="Header Value">
                    <button onclick="addHeader()">Add Header</button>
                    <ul id="headersList"></ul>
                </div>
                <div>
                    <h3>Query Parameters</h3>
                    <input type="text" id="queryKey" placeholder="Parameter Key">
                    <input type="text" id="queryValue" placeholder="Parameter Value">
                    <button onclick="addQuery()">Add Parameter</button>
                    <ul id="queryList"></ul>
                </div>
                <div>
                    <h3>Request Body</h3>
                    <textarea id="requestBody" style="width: 300px; height: 100px;" placeholder="Request Body"></textarea>
                </div>
                <button onclick="sendRequest()">Send Request</button>
                <button onclick="clearResponse()">Clear Response</button>
                <div id="response"></div>
                <script>
                    let headers = {};
                    let query = {};

                    function addHeader() {
                        const key = document.getElementById('headerKey').value;
                        const value = document.getElementById('headerValue').value;
                        headers[key] = value;
                        updateHeaderList();
                    }

                    function updateHeaderList() {
                        const headerList = document.getElementById('headersList');
                        headerList.innerHTML = '';
                        Object.entries(headers).forEach(([key, value]) => {
                            const li = document.createElement('li');
                            li.textContent = \`\${key}: \${value}\`;
                            headerList.appendChild(li);
                        });
                    }

                    function addQuery() {
                        const key = document.getElementById('queryKey').value;
                        const value = document.getElementById('queryValue').value;
                        query[key] = value;
                        updateQueryList();
                    }

                    function updateQueryList() {
                        const queryList = document.getElementById('queryList');
                        queryList.innerHTML = '';
                        Object.entries(query).forEach(([key, value]) => {
                            const li = document.createElement('li');
                            li.textContent = \`\${key}: \${value}\`;
                            queryList.appendChild(li);
                        });
                    }

                    function sendRequest() {
                        let url = document.getElementById('urlInput').value;
                        const method = document.getElementById('methodSelect').value;
                        const requestBody = document.getElementById('requestBody').value;
                        const responseDiv = document.getElementById('response');

                        // Replace environment variables
                        Object.entries(environmentVariables).forEach(([key, value]) => {
                            url = url.replace('{{' + key + '}}', value);
                        });

                        responseDiv.innerHTML = 'Sending request...';

                        const requestOptions = {
                            method,
                            headers,
                            body: requestBody
                        };

                        // Append query parameters to URL
                        const queryParams = new URLSearchParams(query);
                        const requestUrl = url + '?' + queryParams.toString();

                        fetch(requestUrl, requestOptions)
                            .then(res => res.text())
                            .then(data => {
                                vscode.commands.executeCommand('extension.previewResponse', data);
                            })
                            .catch(err => {
                                responseDiv.innerHTML = '<pre style="color: red;">' + err + '</pre>';
                            });
                    }

                    function clearResponse() {
                        document.getElementById('response').innerHTML = '';
                    }
                </script>
            </body>
        </html>
    `;
}
