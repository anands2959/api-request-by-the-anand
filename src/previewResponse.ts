import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.previewResponse', (data: string) => {
        const panel = vscode.window.createWebviewPanel(
            'responsePreview',
            'Response Preview',
            vscode.ViewColumn.Two,
            {}
        );

        panel.webview.html = `<pre>${data}</pre>`;
    }));
}
